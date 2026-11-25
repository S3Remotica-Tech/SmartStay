// Step 3 — Media (Figma 5671:178007) using the New design System "Document
// slot" anatomy (37:744) for every tile state.
import React, { useState } from "react";
import PropTypes from "prop-types";
import { useOnboarding } from "./OnboardingContext";
import { GroupError, StepActions, useStepForm } from "./OnboardingParts";
import { AddPhotoSlot, PhotoSlot } from "./ImagePicker";
import { MAX_PROPERTY_IMAGES } from "./onboardingConfig";

const FIELD_IDS = { images: "ob-add-photo" };

function Step3Media({ onNext, onBack, onFinish }) {
  const { images, addImages, replaceImage, removeImage, errorsByStep, submitting, submitError } =
    useOnboarding();
  const isLast = Boolean(onFinish);
  const { errorFor, handleSubmit, isValid } = useStepForm(errorsByStep.media, FIELD_IDS);
  const [notice, setNotice] = useState("");
  const remaining = MAX_PROPERTY_IMAGES - images.length;
  const shownError = errorFor("images") || notice;

  const onFiles = (files) => {
    const skipped = addImages(files);
    setNotice(
      skipped > 0
        ? `Only ${MAX_PROPERTY_IMAGES} photos can be added — ${skipped} ${skipped === 1 ? "was" : "were"} skipped.`
        : "",
    );
  };

  return (
    <form
      noValidate
      onSubmit={handleSubmit(() => {
        if (!isLast) onNext();
        else if (!submitting) onFinish();
      })}
      aria-busy={submitting || undefined}
      className="flex flex-col gap-[13px] sm:px-[4px]"
    >
      <div
        role="group"
        aria-label="Property photos"
        className="grid grid-cols-1 gap-[12px] min-[480px]:grid-cols-2 md:grid-cols-3"
      >
        {images.map((img, i) => (
          <PhotoSlot
            key={img.id}
            index={i}
            value={img}
            onReplace={(file) => replaceImage(img.id, file)}
            onRemove={() => {
              removeImage(img.id);
              setNotice("");
            }}
          />
        ))}
        {/* Figma shows an "Add image" tile while there is room; at the limit
            it stays visible but disabled (Document slot "Disabled"). */}
        <AddPhotoSlot
          id={FIELD_IDS.images}
          onFiles={onFiles}
          disabled={remaining <= 0}
          remaining={Math.max(0, remaining)}
          describedBy={shownError ? "ob-photos-error" : undefined}
        />
      </div>
      <GroupError id="ob-photos" error={shownError} />

      {isLast && (
        <div role="alert" aria-live="assertive">
          {submitError ? (
            <div className="rounded-[8px] border-[1px] border-solid border-field-error bg-[#FFF1F1] px-[12px] py-[10px] font-gilroy text-[14px] font-medium text-field-error">
              {submitError} Your details are kept — press Finish Setup to try again.
            </div>
          ) : null}
        </div>
      )}

      {isLast ? (
        <StepActions
          label="Finish Setup"
          icon="check"
          invalid={!isValid}
          loading={submitting}
          loadingLabel="Setting up…"
          onBack={onBack}
        />
      ) : (
        <StepActions label="Save & Continue" icon="arrow" invalid={!isValid} onBack={onBack} />
      )}
    </form>
  );
}

Step3Media.propTypes = {
  onNext: PropTypes.func.isRequired,
  onBack: PropTypes.func.isRequired,
  /** Set when Media is the last step (outside development): submits. */
  onFinish: PropTypes.func,
};

export default Step3Media;
