// Adds data-testid attributes to interactive JSX elements, for Playwright tests.
//
//   node scripts/add-testids.mjs <file-or-folder> [...more] [--dry]
//   node scripts/add-testids.mjs src/Pages/Banking --dry      (report only)
//
// What gets an id: buttons, links, inputs/selects/textareas, forms, react-bootstrap
// Button / Form.Control / Form.Check / Form.Select / Modal / Offcanvas / Dropdown,
// antd DatePicker, NavLink/Link, and any other element with an onClick/onChange handler.
// react-select and react-datepicker ignore data-* props, so they are wrapped in
// <div data-testid="…" className="contents"> (display:contents = no layout change).
//
// Id format: <file-name>-<label>-<role>, e.g. "add-room-save-btn". The label comes
// from aria-label / placeholder / name / id / title / text / handler name. Inside a
// .map() the nearest `key` is appended, e.g. `user-list-edit-icon-${user.id}`.
// Elements that already have a data-testid are left alone, so re-running is safe.
// The attribute is inserted inline after the tag name: no other code is reformatted.
import { readFileSync, writeFileSync, statSync, readdirSync } from "node:fs";
import { join, basename, dirname } from "node:path";
import { parse } from "@babel/parser";
import traverseModule from "@babel/traverse";

const traverse = traverseModule.default || traverseModule;
const args = process.argv.slice(2);
const DRY = args.includes("--dry");
const targets = args.filter((a) => !a.startsWith("--"));
if (!targets.length) {
  console.log("usage: node scripts/add-testids.mjs <file-or-folder> [...] [--dry]");
  process.exit(1);
}

const ROLE_BY_NAME = {
  button: "btn", Button: "btn",
  a: "link", Link: "link", NavLink: "link", "Nav.Link": "link",
  textarea: "textarea",
  select: "select", "Form.Select": "select",
  form: "form", Form: "form",
  Modal: "modal", Offcanvas: "drawer",
  "Form.Check": "check", "Form.Switch": "switch",
  "Dropdown.Toggle": "dropdown", "Dropdown.Item": "option",
  "Form.Control": "input", FormControl: "input", input: "input",
  img: "img", Image: "img",
  // src/Utils controls (they forward data-testid to their native input / tab buttons)
  AmountInput: "input", Checkbox: "checkbox", Radio: "radio", Switch: "switch", Tabs: "tabs",
};
// In ROLE_BY_NAME only for naming; tagged only when they have a handler.
const NON_TARGET = new Set(["img", "Image", "Form"]);
const HANDLERS = ["onClick", "onChange", "onSubmit", "onMouseDown", "onDoubleClick"];
const GENERIC_ALTS = /^(image|img|icon|alt|alt-?image|logo|bedd|pic|photo|close|\s*)$/i;

const files = [];
const walk = (p) => {
  const st = statSync(p);
  if (st.isDirectory()) readdirSync(p).forEach((f) => walk(join(p, f)));
  else if (/\.jsx$/.test(p) && !/[\\/]__test__[\\/]/.test(p)) files.push(p);
};
targets.forEach(walk);

const kebab = (s) =>
  String(s)
    .replace(/([a-z0-9])([A-Z])/g, "$1-$2")
    .replace(/[^A-Za-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .toLowerCase();

const shorten = (s, max = 32) => {
  if (s.length <= max) return s;
  const cut = s.slice(0, max);
  return cut.includes("-") ? cut.slice(0, cut.lastIndexOf("-")) : cut;
};

const nameOf = (n) =>
  n.type === "JSXIdentifier" ? n.name
    : n.type === "JSXMemberExpression" ? `${nameOf(n.object)}.${nameOf(n.property)}`
      : n.type === "JSXNamespacedName" ? `${n.namespace.name}:${n.name.name}` : "";

function filePrefix(file) {
  const base = basename(file).replace(/\.jsx$/, "");
  return kebab(base.toLowerCase() === "index" ? basename(dirname(file)) : base);
}

function attr(opening, name) {
  return opening.attributes.find((a) => a.type === "JSXAttribute" && nameOf(a.name) === name);
}
function strAttr(opening, name) {
  const a = attr(opening, name);
  if (!a?.value) return null;
  if (a.value.type === "StringLiteral") return a.value.value;
  const e = a.value.expression;
  if (a.value.type === "JSXExpressionContainer") {
    if (e?.type === "StringLiteral") return e.value;
    if (e?.type === "TemplateLiteral" && e.expressions.length === 0) return e.quasis[0].value.cooked;
  }
  return null;
}

function staticText(el, depth = 0) {
  if (depth > 4) return "";
  let out = "";
  for (const c of el.children || []) {
    if (c.type === "JSXText") out += ` ${c.value}`;
    else if (c.type === "JSXElement") out += ` ${staticText(c, depth + 1)}`;
    else if (c.type === "JSXExpressionContainer" && c.expression.type === "StringLiteral") out += ` ${c.value}`;
  }
  return out.replace(/\s+/g, " ").trim();
}

// handleShowAddRoom → show-add-room ; () => setActiveTab("CHECKIN") → active-tab-checkin
function handlerLabel(opening) {
  for (const h of HANDLERS) {
    const a = attr(opening, h);
    const e = a?.value?.type === "JSXExpressionContainer" ? a.value.expression : null;
    if (!e) continue;
    let call = null;
    let ident = null;
    if (e.type === "Identifier") ident = e.name;
    else if (e.type === "MemberExpression" && !e.computed) ident = e.property.name;
    else if (e.type === "ArrowFunctionExpression" || e.type === "FunctionExpression") {
      const body = e.body.type === "BlockStatement"
        ? e.body.body.find((s) => s.type === "ExpressionStatement" && s.expression.type === "CallExpression")?.expression
        : e.body.type === "CallExpression" ? e.body : null;
      if (body) call = body;
    }
    if (call) {
      const callee = call.callee;
      ident = callee.type === "Identifier" ? callee.name
        : callee.type === "MemberExpression" && !callee.computed ? callee.property.name : null;
      const firstStr = call.arguments.find((x) => x.type === "StringLiteral");
      if (ident && firstStr) ident = `${ident}-${firstStr.value}`;
    }
    if (ident && !/^(preventDefault|stopPropagation)$/.test(ident)) {
      return kebab(ident).replace(/^(handle|on)-/, "").replace(/^set-/, "");
    }
  }
  return null;
}

function roleOf(name, opening, kind) {
  if (kind === "select") return "select";
  if (kind === "date") return "date";
  if (name === "input") {
    const t = strAttr(opening, "type");
    if (t && ["checkbox", "radio", "file", "date"].includes(t)) return t;
    return "input";
  }
  if ((name === "Form.Control" || name === "FormControl") && strAttr(opening, "as") === "textarea") return "textarea";
  if (name === "DatePicker") return "date";
  if (ROLE_BY_NAME[name]) return ROLE_BY_NAME[name];
  if (/^[A-Z]/.test(name)) {
    // custom field component (onChange only) vs. iconsax / react-icons icon with onClick
    return attr(opening, "onChange") && !attr(opening, "onClick") ? "input" : "icon";
  }
  return "action"; // div/span/label/li… with a click handler
}

const LABEL_TAGS = new Set(["label", "Form.Label", "FormLabel"]);
const FIELD_ROLES = new Set(["input", "textarea", "select", "date", "check", "switch", "checkbox", "radio", "file"]);
// Placeholders that say nothing about the field.
const GENERIC_PLACEHOLDER = /^(dd-mm-yyyy|mm-dd-yyyy|yyyy-mm-dd|0|0-00|00|write-here|type-here|enter|select|search|enter-amount|amount|e-g)$/;

// Clean a label: drop filler words ("enter", "select an", "undefined", "*").
function tidy(s) {
  return kebab(s)
    .split("-")
    .filter((w) => w && !["undefined", "null", "nan"].includes(w))
    .join("-")
    .replace(/^(please-)?(enter|select|choose|type)(-(the|a|an|your))?-(?=.)/, "");
}

// Visible <label>/<Form.Label> text just before the field (same Form.Group / wrapper).
function nearbyLabel(path) {
  let child = path;
  let jsxLevels = 0;
  for (let p = path.parentPath; p && jsxLevels < 3; child = p, p = p.parentPath) {
    if (!p.isJSXElement()) continue;
    jsxLevels++;
    const kids = p.node.children;
    const idx = kids.indexOf(child.node);
    for (let i = (idx < 0 ? kids.length : idx) - 1; i >= 0; i--) {
      const k = kids[i];
      if (k.type === "JSXElement" && LABEL_TAGS.has(nameOf(k.openingElement.name))) {
        const t = tidy(staticText(k));
        if (t) return t;
      }
    }
  }
  return null;
}

function labelOf(path, name, role) {
  const el = path.node;
  const o = el.openingElement;
  const isField = FIELD_ROLES.has(role);
  const placeholder = strAttr(o, "placeholder");
  const usefulPlaceholder = placeholder && !GENERIC_PLACEHOLDER.test(tidy(placeholder)) ? placeholder : null;
  const candidates = [
    strAttr(o, "aria-label"),
    isField ? nearbyLabel(path) : null,
    usefulPlaceholder, strAttr(o, "name"),
    strAttr(o, "id"), strAttr(o, "controlId"), strAttr(o, "title"), strAttr(o, "label"),
  ];
  const alt = strAttr(o, "alt");
  if (alt && !GENERIC_ALTS.test(alt)) candidates.push(alt);
  for (const c of candidates) if (c && tidy(c)) return tidy(c);
  if (!isField) {
    const t = tidy(staticText(el));
    if (t) return t.split("-").slice(0, 4).join("-");
  }
  return handlerLabel(o) || (placeholder ? tidy(placeholder) : null);
}

// Nearest non-literal `key` on the element or a JSX ancestor (loop index scope).
function keyExpr(path, code) {
  for (let p = path; p; p = p.parentPath) {
    if (p.isJSXElement()) {
      const k = attr(p.node.openingElement, "key");
      const e = k?.value?.type === "JSXExpressionContainer" ? k.value.expression : null;
      if (e && e.type !== "StringLiteral" && e.type !== "NumericLiteral") return code.slice(e.start, e.end);
    }
    if (p.isProgram()) break;
  }
  return null;
}

const totals = { files: 0, changed: 0, ids: 0, wrapped: 0 };

for (const file of files) {
  totals.files++;
  const code = readFileSync(file, "utf8");
  let ast;
  try {
    ast = parse(code, { sourceType: "module", plugins: ["jsx"] });
  } catch (e) {
    console.log(`SKIP (parse error) ${file}: ${e.message}`);
    continue;
  }

  // Local names imported from react-select / react-datepicker / antd.
  const wrapNames = new Set();
  const antdNames = new Set();
  for (const node of ast.program.body) {
    if (node.type !== "ImportDeclaration") continue;
    const src = node.source.value;
    if (/^react-select(\/|$)/.test(src) || src === "react-datepicker") {
      node.specifiers.forEach((s) => {
        if (s.type === "ImportDefaultSpecifier" || (s.imported && /Select$/.test(s.imported.name))) wrapNames.add(s.local.name);
      });
    }
    if (src === "antd") node.specifiers.forEach((s) => antdNames.add(s.local.name));
  }
  const datepickerNames = new Set(
    ast.program.body
      .filter((n) => n.type === "ImportDeclaration" && n.source.value === "react-datepicker")
      .flatMap((n) => n.specifiers.map((s) => s.local.name)),
  );

  const prefix = filePrefix(file);
  const used = new Map();
  const edits = []; // { at, text }
  let fileIds = 0;
  let fileWrapped = 0;

  traverse(ast, {
    JSXElement(path) {
      const el = path.node;
      const o = el.openingElement;
      const name = nameOf(o.name);
      if (!name || attr(o, "data-testid")) return;

      const isWrap = wrapNames.has(name);
      const hasHandler = HANDLERS.some((h) => attr(o, h));
      const isTarget = isWrap || (ROLE_BY_NAME[name] !== undefined && !NON_TARGET.has(name)) || (name === "DatePicker" && antdNames.has(name)) || hasHandler;
      if (!isTarget) return;
      if (name === "Form" && !attr(o, "onSubmit")) return; // layout-only <Form>
      if (isWrap && path.parentPath.isJSXAttribute()) return; // can't wrap a prop value

      const kind = isWrap ? (datepickerNames.has(name) ? "date" : "select") : null;
      const role = roleOf(name, o, kind);
      const label = labelOf(path, name, role);
      const short = label ? shorten(label) : null;
      // "booking-date" + "date" → "booking-date-date" reads badly; keep one.
      const roleRedundant = short && short.split("-").pop() === role;
      const base = [prefix, short, roleRedundant ? null : role].filter(Boolean).join("-");
      const n = (used.get(base) || 0) + 1;
      used.set(base, n);
      const id = n > 1 ? `${base}-${n}` : base;

      const key = keyExpr(path, code);
      const value = key ? `{\`${id}-\${${key}}\`}` : `"${id}"`;

      if (isWrap) {
        const ownKey = attr(o, "key");
        const keyProp = ownKey?.value ? ` key=${code.slice(ownKey.value.start, ownKey.value.end)}` : "";
        edits.push({ at: el.start, text: `<div${keyProp} data-testid=${value} className="contents">` });
        edits.push({ at: el.end, text: "</div>" });
        fileWrapped++;
      } else {
        edits.push({ at: o.name.end, text: ` data-testid=${value}` });
      }
      fileIds++;
    },
  });

  if (!edits.length) continue;
  edits.sort((a, b) => b.at - a.at);
  let out = code;
  for (const e of edits) out = out.slice(0, e.at) + e.text + out.slice(e.at);

  // Safety: the result must still parse.
  try {
    parse(out, { sourceType: "module", plugins: ["jsx"] });
  } catch (e) {
    console.log(`SKIP (would break) ${file}: ${e.message}`);
    continue;
  }
  totals.changed++;
  totals.ids += fileIds;
  totals.wrapped += fileWrapped;
  if (!DRY) writeFileSync(file, out);
  console.log(`${DRY ? "[dry] " : ""}${String(fileIds).padStart(4)} ids  ${file}`);
}

console.log(`\n${DRY ? "[dry] " : ""}${totals.ids} ids (${totals.wrapped} wrapped selects/datepickers) in ${totals.changed} of ${totals.files} files`);
