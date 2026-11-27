// Record one Playwright test per screen, each into its own e2e/<name>.spec.js.
//
//   npm run e2e:codegen -- <name> [start-path]
//   npm run e2e:codegen -- banking /banking
//   npm run e2e:codegen -- add-room            (starts on the dashboard "/")
//   npm run e2e:codegen                        (name = recording-<date-time>)
//
// - Starts already logged in (saved session). If the session is missing or the
//   token has expired, it first opens the login page: log in, then CLOSE that
//   browser window, and recording starts automatically.
// - Never overwrites: if e2e/<name>.spec.js exists it writes <name>-2.spec.js, …
// - Needs the dev server running (npm start).
import { spawnSync } from "node:child_process";
import { existsSync, readFileSync, writeFileSync } from "node:fs";

const BASE_URL = "http://localhost:5173";
const AUTH_FILE = "playwright/.auth/user.json";
const VIEWPORT = "1260,580";
const MIN_TOKEN_MINUTES = 15; // re-login if the token expires sooner than this

const [rawName, rawPath = "/"] = process.argv.slice(2);

function timestamp() {
  const d = new Date();
  const p = (n) => String(n).padStart(2, "0");
  return `${d.getFullYear()}${p(d.getMonth() + 1)}${p(d.getDate())}-${p(d.getHours())}${p(d.getMinutes())}`;
}

function toFileName(name) {
  return name.trim().toLowerCase().replace(/\.spec\.js$/, "").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
}

function uniqueSpecPath(base) {
  let path = `e2e/${base}.spec.js`;
  for (let i = 2; existsSync(path); i++) path = `e2e/${base}-${i}.spec.js`;
  return path;
}

// Minutes until the saved v2-token expires (-Infinity if missing/unreadable).
function sessionMinutesLeft() {
  try {
    const state = JSON.parse(readFileSync(AUTH_FILE, "utf8"));
    const token = state.cookies.find((c) => c.name === "v2-token")?.value;
    const payload = JSON.parse(Buffer.from(token.split(".")[1], "base64url"));
    return (payload.exp * 1000 - Date.now()) / 60000;
  } catch {
    return -Infinity;
  }
}

function codegen(args) {
  const result = spawnSync("npx", ["playwright", "codegen", ...args], { stdio: "inherit", shell: true });
  return result.status === 0;
}

async function main() {
  // 1. Dev server must be up, otherwise codegen opens an error page.
  try {
    await fetch(BASE_URL);
  } catch {
    console.error(`\nDev server is not running at ${BASE_URL}. Start it with "npm start" in another terminal, then retry.\n`);
    process.exit(1);
  }

  // 2. Make sure we have a valid login session.
  if (sessionMinutesLeft() < MIN_TOKEN_MINUTES) {
    console.log("\nLogin session missing or expired.");
    console.log("-> Log in in the browser that opens, then CLOSE the browser window to continue.\n");
    codegen([`--save-storage=${AUTH_FILE}`, `--viewport-size=${VIEWPORT}`, `${BASE_URL}/hostel-management-login`]);
    if (sessionMinutesLeft() < MIN_TOKEN_MINUTES) {
      console.error("\nStill not logged in (no valid token saved). Run again and complete the login before closing the window.\n");
      process.exit(1);
    }
  }

  // 3. Record into a new file.
  const name = toFileName(rawName || `recording-${timestamp()}`) || `recording-${timestamp()}`;
  const specPath = uniqueSpecPath(name);
  const startPath = rawPath.startsWith("/") ? rawPath : `/${rawPath}`;

  console.log(`\nRecording -> ${specPath} (starting at ${startPath}). Close the browser window when done.\n`);
  codegen([
    `--load-storage=${AUTH_FILE}`,
    `--output=${specPath}`,
    `--viewport-size=${VIEWPORT}`,
    `${BASE_URL}${startPath}`,
  ]);

  if (!existsSync(specPath)) {
    console.log("\nNothing was recorded.\n");
    return;
  }

  // 4. Tidy the generated file: relative URLs (baseURL from playwright.config.js),
  //    a test title matching the file name, the session from the config (not
  //    test.use), and the first page.goto → openApp() so the test re-logs in and
  //    picks the E2E hostel when the saved session was ended.
  let code = readFileSync(specPath, "utf8")
    .replaceAll(`'${BASE_URL}/`, "'/")
    .replaceAll(`'${BASE_URL}'`, "'/'")
    .replace("test('test',", `test('${name}',`)
    .replace(/^\s*storageState: '[^']*',\r?\n/m, "");
  const firstGoto = /await page\.goto\('([^']*)'\);/;
  if (firstGoto.test(code)) {
    code = code
      .replace(firstGoto, (_, p) => `await openApp(page${p && p !== "/" ? `, '${p}'` : ""}); // logged in, on E2E_HOSTEL`)
      .replace(/(import \{ test, expect \} from '@playwright\/test';)/, "$1\nimport { openApp } from './helpers/auth';");
  }
  writeFileSync(specPath, code);

  console.log(`\nSaved ${specPath}`);
  console.log(`Run it:  npx playwright test ${specPath}\n`);
}

main();
