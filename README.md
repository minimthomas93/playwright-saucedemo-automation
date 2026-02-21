# Playwright Automation Framework – SauceDemo

End-to-end UI test automation framework built using **Playwright (JavaScript)** following **industry best practices**, including Page Object Model (POM), custom fixtures, multi-environment support, CI integration, tagging, retries, parallel execution, and reporting (html and allure).

---

## 🧰 Tech Stack
- **Playwright** (JavaScript)
- **Node.js**
- **Jenkins CI**
- **GitHub**
- **Page Object Model (POM)**
- **Custom Fixtures**
- **HTML Reports & Screenshots**

---

## 🏗️ Framework Architecture
src/
├── pages/ # Page Object classes
├── tests/ # Test cases
├── fixtures/ # Custom Playwright fixtures
├── config/ # Environment configuration
├── utils/ # Logger, helpers
├── test-data/ # Test data (if any)
playwright.config.js
Jenkinsfile

---

## 🚀 Key Features
- ✅ Page Object Model (POM) for maintainable code
- ✅ Custom Playwright fixtures for reusable workflows
- ✅ Multi-environment support (qa, staging)
- ✅ Test tagging (@smoke, @regression)
- ✅ Encrypted login credentials
- ✅ Retry logic & flaky test handling
- ✅ Parallel execution
- ✅ Jenkins CI integration
- ✅ HTML reports with screenshots
- ✅ Environment-based execution
- ✅ Clean & maintainable test structure

---


## 🌍 Environment Configuration
Supports multiple environments using `TEST_ENV`.

---

### Available environments
- qa
- staging
- prod

---

### Example Usage:
```bash
# Default (qa) environment
npx playwright test

---

# Specific Environment

```bash
TEST_ENV=staging npx playwright test
```

or

```powershell
$env:TEST_ENV="qa"
npx playwright test
```

**Default environment is `qa` if `TEST_ENV` is not provided.**

## 🧪 Running Tests Locally

### Install dependencies

```bash
npm install
```

### Run all tests

```bash
npx playwright test
```

### Run a specific test file

```bash
 npx playwright test inventory-testcases.spec.js
```

## Run tests by tag

```bash
 npx playwright test --grep @smoke
```

## 🔒 Encrypted Credentials

- Login credentials (`username` and `password`) are stored in environment-specific configuration files (e.g., `env.qa`, `env.staging`, `env.prod`) in **encrypted format**.  
- The framework automatically **decrypts credentials at runtime** using a secure key stored in environment variables (SALT).  
- This ensures no sensitive data is hardcoded or exposed in the repository.  
- Users can safely switch between environments (`qa`, `staging`, `prod`) without modifying the source code.

## 🔁 Retry & Flaky Test Handling

Retries are configured in `playwright.config.js`:

```js
retries: process.env.CI ? 2 : 0
```

Retries are automatically enabled in CI environments.


## ⚡ Parallel Execution

Parallel execution is enabled using Playwright workers:

```js
workers: process.env.CI ? 2 : undefined
```

This improves test execution speed in Jenkins CI.


## 🧩 Custom Fixtures (Advanced)

Custom fixtures are used to:

Handle login once

Reuse inventory, cart, checkout flows

Avoid repetitive code in test cases

Example:

test('Checkout flow', async ({ inventoryPage, cartPage, checkoutPage }) => {
    await inventoryPage.addProductToCart();
    await cartPage.navigateToCheckoutPage();
    await checkoutPage.completeCheckout();
});

---

## 📊 Reporting (HTML + Allure)

This framework supports:

- ✅ Playwright HTML Report (default)
- ✅ Allure Report (advanced reporting)

Allure provides:
- Interactive dashboards
- Test categorization (feature, severity, tags)
- Screenshot attachments
- CI-friendly reporting

---

### Install Allure

```bash
npm install -D allure-playwright
npm install -g allure-commandline --save-dev
```

### Configure Playwright
Update `playwright.config.js`

reporter: [
  ['html'],
  ['allure-playwright']
],


### Generate Allure Report

```bash
npx playwright test
allure serve allure-results
```


