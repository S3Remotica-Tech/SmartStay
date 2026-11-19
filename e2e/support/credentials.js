const email = process.env.E2E_EMAIL;
const password = process.env.E2E_PASSWORD;

function requireCredentials() {
  if (!email || !password) {
    throw new Error(
      "E2E_EMAIL / E2E_PASSWORD are not set. Copy .env.e2e.example to .env.e2e and fill them in.",
    );
  }
  return { email, password };
}

module.exports = { requireCredentials };
