// Left-hand promo cards of the new auth screens (desktop / lg+ only).
// Login: Figma "CArd" 5352:153765 (2 slides) + 2 extra slides with new line-art
// illustrations. Signup: "CArd" 5352:153192 with a 5-review testimonial carousel.
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { authCardBase } from "./authStyles";
import SkylineArt from "../../Assets/Images/NewLogin/illustration-skyline.svg";
import RentArt from "../../Assets/Images/NewLogin/illustration-rent.svg";
import PasswordArt from "../../Assets/Images/NewLogin/illustration-password.svg";
import BuildingArt from "../../Assets/Images/NewLogin/signup-card-building.png";
import BedsArt from "../../Assets/Images/NewLogin/illustration-beds.svg";
import CheckinArt from "../../Assets/Images/NewLogin/illustration-checkin.svg";
import Stars from "../../Assets/Images/NewLogin/stars.svg";
import DoubleQuotes from "../../Assets/Images/NewLogin/double-quotes.svg";

/**
 * Auto-advancing carousel index. Pauses while hovered / focused, restarts the
 * timer after a manual pick, and never auto-advances for reduced motion.
 */
function useAutoCarousel(count, delay) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  useEffect(() => {
    if (paused || count < 2) return undefined;
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) {
      return undefined;
    }
    const id = setTimeout(() => setIndex((i) => (i + 1) % count), delay);
    return () => clearTimeout(id);
  }, [index, paused, count, delay]);
  const bind = {
    onMouseEnter: () => setPaused(true),
    onMouseLeave: () => setPaused(false),
    onFocus: () => setPaused(true),
    onBlur: () => setPaused(false),
  };
  return { index, setIndex, bind };
}

/** Pill dots (active = 14×4 brand, others 4×4) with 16px hit areas. */
function CarouselDots({ count, index, onSelect, label, inactiveClass }) {
  return (
    <div className="flex items-center" role="group" aria-label={label}>
      {Array.from({ length: count }, (_, i) => (
        <button data-testid={`auth-promo-cards-select-btn-${i}`}
          key={i}
          type="button"
          onClick={() => onSelect(i)}
          aria-label={`Show ${i + 1} of ${count}`}
          aria-current={i === index ? "true" : undefined}
          className="flex h-[16px] items-center border-0 bg-transparent px-[2px] py-0"
        >
          <span
            className={`block h-[4px] rounded-[20px] transition-all duration-300 ${
              i === index ? "w-[14px] bg-primary-500" : `w-[4px] ${inactiveClass}`
            }`}
          />
        </button>
      ))}
    </div>
  );
}

CarouselDots.propTypes = {
  count: PropTypes.number.isRequired,
  index: PropTypes.number.isRequired,
  onSelect: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
  inactiveClass: PropTypes.string.isRequired,
};

/**
 * Mesh gradient background: four large blurred colour blobs on a soft base.
 * It is ONE persistent layer — changing `palette` slides and recolours the
 * blobs with a CSS transition, so slides never fade two backgrounds over each
 * other (that dip to white is what made the old crossfade look jumpy).
 * palette = [{ color, x, y }] × 4, x / y in % of the card.
 */
function MeshBackground({ palette }) {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden bg-[#FAFAFF]"
    >
      {palette.map((blob, i) => (
        <span
          key={i}
          className="absolute aspect-square w-[68%] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-[0.38] blur-[80px] transition-[left,top,background-color] duration-[1600ms] ease-in-out motion-reduce:transition-none"
          style={{ left: `${blob.x}%`, top: `${blob.y}%`, backgroundColor: blob.color }}
        />
      ))}
      {/* Light veil keeps the #222 heading readable on the brighter blobs. */}
      <span className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.35)_0%,rgba(255,255,255,0)_45%,rgba(255,255,255,0.25)_100%)]" />
    </div>
  );
}

MeshBackground.propTypes = {
  palette: PropTypes.arrayOf(
    PropTypes.shape({
      color: PropTypes.string.isRequired,
      x: PropTypes.number.isRequired,
      y: PropTypes.number.isRequired,
    }),
  ).isRequired,
};

const MESH = {
  aqua: [
    { color: "#5EEAD4", x: 8, y: 6 },
    { color: "#7C9CFF", x: 92, y: 14 },
    { color: "#F9A8D4", x: 78, y: 62 },
    { color: "#C4B5FD", x: 14, y: 88 },
  ],
  sunset: [
    { color: "#93C5FD", x: 14, y: 12 },
    { color: "#A78BFA", x: 88, y: 26 },
    { color: "#FDBA74", x: 22, y: 70 },
    { color: "#F472B6", x: 86, y: 90 },
  ],
  mint: [
    { color: "#67E8F9", x: 90, y: 8 },
    { color: "#818CF8", x: 10, y: 34 },
    { color: "#86EFAC", x: 80, y: 74 },
    { color: "#FDE68A", x: 20, y: 94 },
  ],
  berry: [
    { color: "#F0ABFC", x: 12, y: 10 },
    { color: "#7DD3FC", x: 86, y: 30 },
    { color: "#FCA5A5", x: 18, y: 66 },
    { color: "#A5B4FC", x: 84, y: 92 },
  ],
};

// Slide content crossfade: the outgoing slide fades out fast, the incoming one
// fades in a beat later while rising 12px — no muddy half-and-half overlap.
const slideActive =
  "translate-y-[0px] opacity-100 delay-200 duration-700";
const slideInactive =
  "pointer-events-none translate-y-[12px] opacity-0 delay-0 duration-300";

const headingClass =
  "mb-0 font-tasa text-[clamp(30px,2.9vw,48px)] font-semibold leading-[1.2] text-[#222222]";
const introClass =
  "mb-0 p-[2px] font-tasa text-[clamp(15px,1.15vw,18px)] font-normal leading-[1.5] text-[#222222] opacity-90";
const textBlockClass =
  "relative mx-[10.5%] mt-[clamp(32px,9vh,96px)] flex max-w-[440px] flex-col gap-[clamp(14px,2.4vh,24px)]";

// Bottom-anchored art, sized from the card width so it scales with the card.
const LineArt = ({ src, opacityClass = "opacity-50" }) => (
  <img
    src={src}
    alt=""
    width="632"
    height="260"
    className={`pointer-events-none absolute bottom-[clamp(40px,6vh,56px)] left-1/2 h-auto w-[92%] -translate-x-1/2 ${opacityClass}`}
  />
);
LineArt.propTypes = {
  src: PropTypes.string.isRequired,
  opacityClass: PropTypes.string,
};

const LOGIN_SLIDES = [
  {
    mesh: MESH.aqua,
    title: "An A-Z PG Software, unlike any other..!",
    text: "Discover How Smartstay can streamline your Hostel, From Check-in to Check-Out",
    art: <LineArt src={SkylineArt} />,
  },
  {
    mesh: MESH.sunset,
    title: "Hassle free Rent Collection, from your pocket..!",
    text: "Discover How Smartstay can streamline your Hostel, From Check-in to Check-Out",
    art: <LineArt src={RentArt} />,
  },
  {
    mesh: MESH.mint,
    title: "Every bed, every room, one clear view..!",
    text: "See which beds are free, booked or due today, across all your properties.",
    art: <LineArt src={BedsArt} />,
  },
  {
    mesh: MESH.berry,
    title: "Check-ins in minutes, not in hours..!",
    text: "Add tenants, collect KYC and deposits, and hand over the keys in a few taps.",
    art: <LineArt src={CheckinArt} />,
  },
];

export function LoginPromoCard() {
  const { index, setIndex, bind } = useAutoCarousel(LOGIN_SLIDES.length, 5000);
  return (
    <aside
      className={authCardBase}
      aria-roledescription="carousel"
      aria-label="Why Smartstay"
      {...bind}
    >
      <MeshBackground palette={LOGIN_SLIDES[index].mesh} />
      {LOGIN_SLIDES.map((slide, i) => (
        <div
          key={slide.title}
          aria-hidden={i !== index}
          aria-roledescription="slide"
          className={`absolute inset-0 transition-[opacity,transform] ease-out motion-reduce:transition-none ${
            i === index ? slideActive : slideInactive
          }`}
        >
          {slide.art}
          <div className={textBlockClass}>
            <h2 className={headingClass}>{slide.title}</h2>
            <p className={introClass}>{slide.text}</p>
          </div>
        </div>
      ))}
      <div className="absolute bottom-[clamp(16px,3vh,28px)] right-[24px]">
        <CarouselDots
          count={LOGIN_SLIDES.length}
          index={index}
          onSelect={setIndex}
          label="Choose highlight"
          inactiveClass="bg-[#222222]/25"
        />
      </div>
    </aside>
  );
}

// Forgot-password card: one message per step over the mesh, which drifts to a
// new palette as the user moves on. The animated SVG (dots typing in, padlock
// opening, shield tick) plays throughout.
const FORGOT_STEPS = [
  {
    mesh: MESH.aqua,
    title: "Locked out? We’ve got the key..!",
    text: "Enter your registered email and we’ll send you a 6-digit code to get back in.",
  },
  {
    mesh: MESH.sunset,
    title: "Check your inbox, it’s on the way..!",
    text: "Type the 6-digit code we just sent. It works for a short time only, so use it soon.",
  },
  {
    mesh: MESH.mint,
    title: "Make it strong, make it yours..!",
    text: "Mix upper and lower case letters, a number and a symbol. Skip names and birthdays.",
  },
];

export function ForgotPromoCard({ step = 0 }) {
  const current = Math.min(step, FORGOT_STEPS.length - 1);
  return (
    <aside className={authCardBase} aria-label="Reset your password">
      <MeshBackground palette={FORGOT_STEPS[current].mesh} />
      <LineArt src={PasswordArt} opacityClass="opacity-70" />
      {/* All messages share one grid cell so the block keeps its height. */}
      <div className="relative mx-[10.5%] mt-[clamp(32px,9vh,96px)] grid max-w-[440px]">
        {FORGOT_STEPS.map((item, i) => (
          <div
            key={item.title}
            aria-hidden={i !== current}
            className={`flex flex-col gap-[clamp(14px,2.4vh,24px)] transition-[opacity,transform] ease-out [grid-area:1/1] motion-reduce:transition-none ${
              i === current ? slideActive : slideInactive
            }`}
          >
            <h2 className={headingClass}>{item.title}</h2>
            <p className={introClass}>{item.text}</p>
          </div>
        ))}
      </div>
    </aside>
  );
}

ForgotPromoCard.propTypes = { step: PropTypes.number };

// Plain-English owner reviews for the signup testimonial carousel.
const REVIEWS = [
  {
    name: "Sam",
    role: "Founder @ Mige inn",
    text: "I used to track rent in a notebook. Now every payment is in one place, and tenants get reminders on their own.",
  },
  {
    name: "Priya Raman",
    role: "Owner, Sri Sai Ladies PG, Chennai",
    text: "Adding a new tenant takes two minutes. KYC, room and deposit are saved together, so I never search for papers.",
  },
  {
    name: "Arjun Mehta",
    role: "Manager, Blue Nest Co-living, Bengaluru",
    text: "We run three buildings. Smartstay shows me which beds are free today, so we fill rooms much faster.",
  },
  {
    name: "Kavya Nair",
    role: "Owner, Green Leaf Hostel, Kochi",
    text: "EB bills were always a fight. Now the reading is split per room and added to the invoice for me.",
  },
  {
    name: "Rahul Verma",
    role: "Partner, Urban Stay PG, Pune",
    text: "Very simple to use. My staff learnt it in a day, and tenants can see when their complaint is fixed.",
  },
];

const REVIEW_MESH = [MESH.sunset, MESH.aqua, MESH.berry, MESH.mint];

const initials = (name) =>
  name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

export function SignupPromoCard() {
  const { index, setIndex, bind } = useAutoCarousel(REVIEWS.length, 6000);
  return (
    <aside className={authCardBase}>
      {/* Mesh drifts to a new palette with each review. */}
      <MeshBackground palette={REVIEW_MESH[index % REVIEW_MESH.length]} />
      <div className="pointer-events-none absolute bottom-[-14px] right-[-37px] aspect-[456/213] w-[72.5%] overflow-hidden opacity-40">
        <img
          src={BuildingArt}
          alt=""
          className="absolute left-[-36.99%] top-[-67.47%] h-[222.09%] w-[148.31%] max-w-none"
        />
      </div>

      <div className="relative mx-[10%] mt-[clamp(28px,5vh,42px)] flex flex-col gap-[clamp(24px,5vh,48px)]">
        <div className="flex max-w-[440px] flex-col gap-[clamp(14px,2.4vh,24px)]">
          <h2 className={headingClass}>Trusted by properties and hostel owners</h2>
          <p className={introClass}>
            Discover How Smartstay can streamline your Hostel, From Check-in to
            Check-Out
          </p>
        </div>

        <figure
          className="relative m-0 flex w-full max-w-[380px] flex-col justify-center gap-[16px] rounded-[10px] bg-white p-[20px] shadow-[0_38.5px_12.7px_rgba(56,56,56,0.06),0_20px_6.5px_rgba(56,56,56,0.05),0_8.1px_3.3px_rgba(56,56,56,0.04),0_1.9px_1.6px_rgba(56,56,56,0.02)]"
          aria-roledescription="carousel"
          aria-label="Customer reviews"
          {...bind}
        >
          <img
            src={DoubleQuotes}
            alt=""
            width="62"
            height="57.683"
            className="absolute right-0 top-[-9px] -scale-x-100"
          />
          <img src={Stars} alt="Rated 5 out of 5" width="101.002" height="17.2164" />

          {/* All reviews share one grid cell so the card keeps the tallest height. */}
          <div className="grid">
            {REVIEWS.map((review, i) => (
              <div
                key={review.name}
                aria-hidden={i !== index}
                className={`flex flex-col gap-[16px] transition-[opacity,transform] ease-out [grid-area:1/1] motion-reduce:transition-none ${
                  i === index ? slideActive : slideInactive
                }`}
              >
                <blockquote className="mb-0 max-w-[320px] font-tasa text-[14px] font-light leading-[24px] text-[#425466]">
                  {review.text}
                </blockquote>
                <div className="flex items-center gap-[10px]">
                  <span className="flex h-[42px] w-[42px] shrink-0 items-center justify-center rounded-full bg-[#D1D5DC] font-tasa text-[16px] leading-[16px] text-[#4F5763]">
                    {initials(review.name)}
                  </span>
                  <span className="flex flex-col gap-[4px]">
                    <span className="font-tasa text-[16px] font-medium leading-[normal] text-[#313131]">
                      {review.name}
                    </span>
                    <span className="font-tasa text-[10px] leading-none text-[#425466]">
                      {review.role}
                    </span>
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="absolute bottom-[20px] right-[16px]">
            <CarouselDots
              count={REVIEWS.length}
              index={index}
              onSelect={setIndex}
              label="Choose review"
              inactiveClass="bg-[#D9D9D9]"
            />
          </div>
        </figure>
      </div>
    </aside>
  );
}
