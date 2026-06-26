# Parliamo Cypress Tests

Comprehensive E2E test suite for Parliamo application with 40+ test files covering all major features.

## Test Coverage

### Chat Features (13 files)
- `message-sending.cy.ts` - Message sending, multiple messages, Enter/Shift+Enter
- `message-reactions.cy.ts` - Add/remove reactions, multiple emojis
- `channel-view.cy.ts` - Channel navigation, message list, header
- `message-editing.cy.ts` - Edit, cancel, edit indicator
- `emoji-picker.cy.ts` - Emoji selection, multiple emojis
- `file-upload.cy.ts` - Image/PDF upload, preview, removal
- `threads.cy.ts` - Thread creation, replies, closing
- `gif-picker.cy.ts` - GIF search, selection, sending
- `slash-commands.cy.ts` - Command menu, /away, /agendar
- `search.cy.ts` - Cmd+K search, results navigation
- `command-palette.cy.ts` - Command palette, filtering
- `dm-view.cy.ts` - DM navigation, messaging
- `bookmarks-pins.cy.ts` - Pin/bookmark messages
- `audio-recorder.cy.ts` - Audio recording and playback

### Workspace Features (3 files)
- `workspace-sidebar.cy.ts` - Channel list, sections, creation
- `channel-settings.cy.ts` - Settings modal, name/description
- `navigation.cy.ts` - Channel/DM navigation, command palette

### Authentication (3 files)
- `login.cy.ts` - Login, validation, tabs
- `forgot-password.cy.ts` - Password recovery
- `mfa.cy.ts` - MFA validation

### Security (4 files)
- `authentication-security.cy.ts` - Session, cookies, rate limiting
- `authorization-security.cy.ts` - Admin access control
- `xss-injection.cy.ts` - XSS prevention
- `api-security.cy.ts` - CSRF, SQL injection, rate limiting

### Edge Cases (2 files)
- `error-handling.cy.ts` - 404, 500, session expiry
- `offline-network.cy.ts` - Offline detection, recovery

### Data Integrity (2 files)
- `message-integrity.cy.ts` - Persistence, ordering
- `business-rules.cy.ts` - Validation, limits

### Performance (3 files)
-files)
- `loading-performance.cy.ts` - Page load times
- `api-stress-testing.cy.ts` - Concurrent requests
- `stress-testing.cy.ts` - High volume messaging

### Profile & Settings (2 files)
- `profile-settings.cy.ts` - Name, theme, modal
- `notification-preferences.cy.ts` - Push, mentions

### Accessibility (2 files)
- `a11y-basics.cy.ts` - Labels, ARIA, keyboard nav
- `responsiveness.cy.ts` - Mobile, tablet, desktop

### Full System & Stress (2 files)
- `full-system.cy.ts` - End-to-end flows
- `stress.cy.ts` - High volume messaging

## Running Tests

```bash
# Install dependencies
npm install

# Open Cypress UI
npm run cypress:open

# Run all tests headless
npm run cypress:run

# Run specific browser
npm run cypress:run:chrome

# Run with recording
npm run cypress:run:record
```

## CI/CD

GitHub Actions workflow runs on:
- Push to main/develop
- Pull requests to main

Runs tests in Chrome and Firefox in parallel.

## Test Structure

```
cypress/
├── config.ts              # Cypress configuration
├── e2e/                   # Test files by category
│   ├── chat/              # 13 chat feature tests
│   ├── workspace/         # 3 workspace tests
│   ├── auth/              # 3 auth tests
│   ├── security/          # 4 security tests
│   ├── edge-cases/        # 2 edge case tests
│   ├── data-integrity/    # 2 data integrity tests
│   ├── performance/       # 3 performance tests
│   ├── profile/           # 1 profile test
│   ├── notifications/     # 1 notification test
│   ├── accessibility/     # 2 accessibility tests
│   ├── call/              # 2 call tests
│   ├── data-integrity/    # 2 data integrity tests
│   ├── edge-cases/        # 2 edge case tests
│   └── full-system.cy.ts  # Integration tests
├── fixtures/              # Test files (images, PDFs)
├── support/
│   ├── commands.ts        # Custom commands
│   └── e2e.ts             # Global hooks
└── fixtures/              # Test assets
```

## Custom Commands

- `cy.login(email, password)` - Login with session caching
- `cy.getByTestId(id)` - Get element by data-testid
- `cy.pageIsReady()` - Wait for page load
- `cy.waitForLoading()` - Wait for loading states