## 📝 Description
<!-- Add the ticket link -->
 **Ticket Link:** 
<!-- Describe the changes made -->
- Tests were added/updated for the module: [Login / Logout / Products]
- New Page Objects were implemented for: [Page Name]

## Type of Change: 
 - [ ] New Test Case
 - [ ] Bug Fix (Test Repair)  
 - [ ] Refactor (POM improvement)
 - [ ] Framework Update
 - [ ] 📝 Documentation (Changes to README or comments)

## 🛠️ Proposed Changes
<!-- Add the files that were added or updated -->
- Created `checkout.page.ts` to handle the payment flow.
- Added smoke tests for guest checkout.
- Updated `user-data.json` with new staging credentials.

## ✅ Automation Checklist
- [ ] **Naming Conventions:** Do all variables, functions, and files follow our kebab-case/camelCase standards?
- [ ] **POM Pattern:** Are selectors isolated in Page Objects? (No selectors in `.spec` files).
- [ ] **Assertions:** Are all assertions inside the Test Layer, not the Page Layer?
- [ ] **Cleanup:** Does the test leave the environment clean (e.g., deleting created users)?
- [ ] **Locators:** Are we using stable locators (id, data-testid) instead of brittle XPaths?

Note on Non-Code Changes: If the change type is Documentation, checklist items related to POM Pattern and Locators can be marked as N/A.

## 🧪 How was it tested?
<!-- Describe the commands executed to validate these changes -->
- [ ] `npm run lint` (No linter errors)
- [ ] `npm run pw` (All tests pass locally)
- [ ] Verified that the report generates correctly.

## 🚀 Execution Results
- **Run Command:** `npx playwright test tests/checkout.spec.ts`
- [ ] Passed Locally (Headed)
- [ ] Passed Locally (Headless)

## 📸 Evidence
