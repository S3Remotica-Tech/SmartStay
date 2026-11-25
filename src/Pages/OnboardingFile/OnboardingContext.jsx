/* eslint-disable react-hooks/exhaustive-deps */
// Shared state for the 4 onboarding steps:
//  - `draft`: plain form values, mirrored to sessionStorage (no files,
//    passwords or tokens) so a refresh keeps typed data;
//  - `logo` / `images`: picked files, kept in memory only (File objects can't
//    go to sessionStorage); they are compressed exactly like Add Paying Guest;
//  - per-step validation + the final submit.
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import PropTypes from "prop-types";
import imageCompression from "browser-image-compression";
import {
  IMAGE_COMPRESSION_OPTIONS,
  LOGO_MIN_DIMENSION,
  MAX_PROPERTY_IMAGES,
  STEPS,
} from "./onboardingConfig";
import {
  clearDraft,
  imageFileError,
  loadDraft,
  readImageSize,
  saveDraft,
  validateBasic,
  validateMedia,
  validateServices,
  validateTax,
} from "./onboardingUtils";
import { OnboardingSubmitError, submitOnboarding } from "./onboardingService";

const OnboardingContext = createContext(null);

let nextImageId = 1;

/** Compresses one picked file. Resolves an image entry (ready or error). */
async function processImage(file, { minDimension, signal, onProgress }) {
  const base = { name: file.name, size: file.size, originalSize: file.size };
  const typeError = imageFileError(file);
  if (typeError) return { ...base, status: "error", error: typeError };

  const dims = await readImageSize(file);
  if (!dims) {
    return { ...base, status: "error", error: "This file is not a readable image" };
  }
  if (
    minDimension &&
    (dims.width < minDimension || dims.height < minDimension)
  ) {
    return {
      ...base,
      ...dims,
      status: "error",
      error: `Image is ${dims.width} × ${dims.height} px — at least ${minDimension} × ${minDimension} px`,
    };
  }

  try {
    const blob = await imageCompression(file, {
      ...IMAGE_COMPRESSION_OPTIONS,
      signal,
      onProgress,
    });
    const compressed = new File([blob], file.name, {
      type: blob.type,
      lastModified: Date.now(),
    });
    return {
      ...base,
      ...dims,
      file: compressed,
      size: compressed.size,
      previewUrl: URL.createObjectURL(compressed),
      status: "ready",
      error: "",
    };
  } catch (error) {
    if (signal?.aborted) return null;
    console.error("Image compression error:", error);
    return { ...base, status: "error", error: "Couldn't process this image" };
  }
}

const revoke = (entry) => {
  if (entry?.previewUrl) URL.revokeObjectURL(entry.previewUrl);
};

export function OnboardingProvider({ children, onCompleted }) {
  const [draft, setDraft] = useState(loadDraft);
  const [logo, setLogo] = useState(null);
  const [images, setImages] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const submitLock = useRef(false);
  const logoAbort = useRef(null);
  const imageAborts = useRef(new Map());
  const latest = useRef({ logo, images });
  latest.current = { logo, images };

  useEffect(() => {
    saveDraft(draft);
  }, [draft]);

  // Release object URLs / pending work when the flow unmounts.
  useEffect(
    () => () => {
      logoAbort.current?.abort();
      imageAborts.current.forEach((c) => c.abort());
      revoke(latest.current.logo);
      latest.current.images.forEach(revoke);
    },
    [],
  );

  /** updateSection("basic", { city: "Chennai" }) or a (prev) => patch fn. */
  const updateSection = useCallback((section, patch) => {
    setDraft((prev) => {
      const next = typeof patch === "function" ? patch(prev[section]) : patch;
      return { ...prev, [section]: { ...prev[section], ...next } };
    });
    setSubmitError("");
  }, []);

  /* ---------------------------------------------------------------- logo */

  const setLogoFile = useCallback(async (file) => {
    logoAbort.current?.abort();
    const controller = new AbortController();
    logoAbort.current = controller;
    setLogo((prev) => {
      revoke(prev);
      return { name: file.name, size: file.size, status: "processing", progress: 0 };
    });
    const entry = await processImage(file, {
      minDimension: LOGO_MIN_DIMENSION,
      signal: controller.signal,
      onProgress: (progress) =>
        setLogo((prev) =>
          prev?.status === "processing" ? { ...prev, progress } : prev,
        ),
    });
    if (controller.signal.aborted || !entry) return;
    setLogo(entry);
  }, []);

  const cancelLogo = useCallback(() => {
    logoAbort.current?.abort();
    setLogo(null);
  }, []);

  const removeLogo = useCallback(() => {
    logoAbort.current?.abort();
    setLogo((prev) => {
      revoke(prev);
      return null;
    });
  }, []);

  /* -------------------------------------------------------------- images */

  const runImage = useCallback(async (id, file) => {
    imageAborts.current.get(id)?.abort();
    const controller = new AbortController();
    imageAborts.current.set(id, controller);
    const entry = await processImage(file, {
      signal: controller.signal,
      onProgress: (progress) =>
        setImages((prev) =>
          prev.map((img) => (img.id === id ? { ...img, progress } : img)),
        ),
    });
    if (controller.signal.aborted || !entry) return;
    imageAborts.current.delete(id);
    setImages((prev) =>
      prev.map((img) => (img.id === id ? { ...entry, id } : img)),
    );
  }, []);

  /** Adds files up to MAX_PROPERTY_IMAGES; returns how many were skipped. */
  const addImages = useCallback(
    (fileList) => {
      const files = Array.from(fileList || []);
      const room = Math.max(0, MAX_PROPERTY_IMAGES - latest.current.images.length);
      const accepted = files.slice(0, room);
      const created = accepted.map((file) => ({
        id: nextImageId++,
        name: file.name,
        size: file.size,
        status: "processing",
        progress: 0,
      }));
      if (created.length) setImages((prev) => [...prev, ...created]);
      created.forEach((entry, i) => runImage(entry.id, accepted[i]));
      setSubmitError("");
      return files.length - accepted.length;
    },
    [runImage],
  );

  const replaceImage = useCallback(
    (id, file) => {
      setImages((prev) =>
        prev.map((img) => {
          if (img.id !== id) return img;
          revoke(img);
          return { id, name: file.name, size: file.size, status: "processing", progress: 0 };
        }),
      );
      runImage(id, file);
    },
    [runImage],
  );

  const removeImage = useCallback((id) => {
    imageAborts.current.get(id)?.abort();
    imageAborts.current.delete(id);
    setImages((prev) => {
      const target = prev.find((img) => img.id === id);
      revoke(target);
      return prev.filter((img) => img.id !== id);
    });
  }, []);

  /* ---------------------------------------------------------- validation */

  const errorsByStep = useMemo(
    () => ({
      basic: validateBasic(draft.basic),
      tax: validateTax(draft.tax),
      media: validateMedia(images),
      services: validateServices(draft.services),
    }),
    [draft.basic, draft.tax, draft.services, images],
  );

  const isStepValid = useCallback(
    (index) => Object.keys(errorsByStep[STEPS[index].key] || {}).length === 0,
    [errorsByStep],
  );

  /** Highest step the user may open: every earlier step must be valid. */
  const maxReachableStep = useMemo(() => {
    for (let i = 0; i < STEPS.length; i += 1) {
      if (!isStepValid(i)) return i;
    }
    return STEPS.length - 1;
  }, [isStepValid]);

  /* -------------------------------------------------------------- submit */

  const submit = useCallback(async () => {
    // Ref, not state: two clicks in the same tick both see the old state.
    if (submitLock.current) return false;
    submitLock.current = true;
    setSubmitting(true);
    setSubmitError("");
    try {
      const logoFile = logo?.status === "ready" ? logo.file : null;
      const imageFiles = images
        .filter((img) => img.status === "ready")
        .slice(0, MAX_PROPERTY_IMAGES)
        .map((img) => img.file);
      await submitOnboarding(
        draft,
        { logoFile, imageFiles },
        {
          onHostelCreated: ({ hostelId }) =>
            setDraft((prev) => ({
              ...prev,
              hostelCreated: true,
              createdHostelId: hostelId,
            })),
        },
      );
      clearDraft();
      onCompleted?.();
      return true;
    } catch (error) {
      // Data stays in place (state + sessionStorage) so the user can retry.
      const message =
        error instanceof OnboardingSubmitError
          ? error.message
          : "Something went wrong. Please try again.";
      setSubmitError(message);
      setSubmitting(false);
      submitLock.current = false;
      return false;
    }
  }, [draft, logo, images, onCompleted]);

  const value = useMemo(
    () => ({
      draft,
      updateSection,
      logo,
      setLogoFile,
      cancelLogo,
      removeLogo,
      images,
      addImages,
      replaceImage,
      removeImage,
      errorsByStep,
      isStepValid,
      maxReachableStep,
      submit,
      submitting,
      submitError,
    }),
    [
      draft,
      updateSection,
      logo,
      setLogoFile,
      cancelLogo,
      removeLogo,
      images,
      addImages,
      replaceImage,
      removeImage,
      errorsByStep,
      isStepValid,
      maxReachableStep,
      submit,
      submitting,
      submitError,
    ],
  );

  return (
    <OnboardingContext.Provider value={value}>
      {children}
    </OnboardingContext.Provider>
  );
}

OnboardingProvider.propTypes = {
  children: PropTypes.node,
  onCompleted: PropTypes.func,
};

export function useOnboarding() {
  const ctx = useContext(OnboardingContext);
  if (!ctx) throw new Error("useOnboarding must be used inside OnboardingProvider");
  return ctx;
}
