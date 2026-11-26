// px -> rem for every declaration > 1px, so one root font-size scales the whole
// UI (Tailwind arbitrary px, Bootstrap, antd). The root stays 16px except in the
// product at laptop widths (see `html.app-density` in src/index.css), so the
// login/landing pages and >1600px screens render exactly as before.
// 1px hairlines stay px; url() and @media params are untouched.
const pxToRem = () => ({
  postcssPlugin: "local-px-to-rem",
  Declaration(decl) {
    if (!decl.value.includes("px") || decl.value.includes("url(")) return;
    const next = decl.value.replace(/(-?\d*\.?\d+)px\b/g, (m, n) => {
      const px = parseFloat(n);
      return Math.abs(px) <= 1 ? m : `${+(px / 16).toFixed(5)}rem`;
    });
    if (next !== decl.value) decl.value = next;
  },
});
pxToRem.postcss = true;

module.exports = {
  plugins: [require("tailwindcss"), require("autoprefixer"), pxToRem()],
};
