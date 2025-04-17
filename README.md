# Treatment Facilities

Front-end for treatment facilities

---

## Deployment

This project is live and deployed on **Vercel**!  
Visit the live demo: **[Next Intl Auth Boilerplate Live](https://next-intl-auth-mu.vercel.app/)**


## Features

- **Next.js**: React framework for server-side rendering and optimized performance.
- **TypeScript**: Strongly-typed development for enhanced code reliability.
- **Next-Auth**: Simplified authentication with OAuth and JWT support.
- **shadcn/ui**: Modular, accessible UI components built on top of Radix UI and styled with Tailwind CSS.
- **Zod**: Type-safe schema validation for forms and APIs.
- **next-intl**: Internationalization support with dynamic locale management.
- **Tailwind CSS**: Utility-first CSS framework for rapid UI development.
- **Lucide Icons**: A modern and consistent icon library for React.
- **Light/Dark Mode**: Customizable themes with user preference persistence.

---

## Quick Start

### Prerequisites

Make sure you have the following installed:

- Node.js >= 18.x
- Yarn (preferred) or npm
- Git

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/Sayyat/next-intl-auth.git
   cd next-intl-auth
   ```

2. Install dependencies:

   ```bash
   yarn install
   ```

3. Create a `.env` file in the root directory and add the following environment variables:

   ```env
   API_URL=<Your API URL>
   NEXTAUTH_SECRET=<Your NextAuth Secret>
   NEXTAUTH_URL=http://localhost:3000
   API_URL=http://127.0.0.1:8000
   ```

4. Start the development server:

   ```bash
   yarn dev
   ```

   The application will be available at `http://localhost:3000`.

---

## File Structure

<details>
<summary>Click to expand the file structure</summary>

```plaintext
src/
├── app/
│   ├── (authentication)/
│   │   ├── login/
│   │   │   └── page.tsx
│   │   ├── register/
│   │   │   └── page.tsx
│   │   └── layout.tsx
│   ├── (ui)/
│   │   ├── _components/
│   │   │   ├── Footer.tsx
│   │   │   └── Header.tsx
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── api/
│   │   └── auth/
│   │       └── [...nextauth]/
│   │           └── route.ts
│   └── layout.tsx
├── core/
│   ├── data/
│   │   └── env/
│   │       ├── client.ts
│   │       └── server.ts
│   ├── providers/
│   │   └── AllProviders.tsx
│   ├── styles/
│   │   └── globals.css
│   └── utils/
│       └── case.ts
├── features/
│   ├── authentication/
│   │   └── lib/
│   │       └── zod.ts
│   ├── services/
│   │   ├── authService.ts
│   │   └── tokenHelpers.ts
│   └── type.d.ts
├── locales/
│   ├── config/
│   │   ├── locales.ts
│   │   ├── request.ts
│   │   ├── server.ts
│   │   └── translation.ts
│   └── messages/
│       ├── en.json
│       ├── kk.json
│       └── ru.json
├── services/
│   └── apiClient.ts
├── shared/
│   └── components/
│   │   ├── svg/
│   │   │   └── Loading.tsx
│   │   ├── ui/ - for shadcn cli
│   │   │   ├── button.tsx
│   │   │   ├── checkbox.tsx
│   │   │   ├── input.tsx
│   │   │   ├── label.tsx
│   │   │   └── select.tsx
│   │   ├── Checkbox.tsx
│   │   ├── Input.tsx
│   │   ├── LanguageSelect.tsx
│   │   └── Select.tsx
│   ├── hooks/
│   │   └── useTheme.ts
│   └── lib/
│       └── utils.ts
├── tests/
│   ├── e2e/ - all e2e tests folder
│   └── setup.ts
├── types/
│   ├── api.d.ts
│   ├── user.d.ts
│   └── next-auth.d.ts
├── auth.ts
└── middleware.ts
```

</details>

---

## How to Use

### Authentication

- **Sign Up**: Use the `/register` page to create a new account. The backend API handles user registration and returns access and refresh tokens.
- **Log In**: Access `/login` to authenticate users. Tokens are stored securely, and JWT is decoded for user details.

### Localization

- The project uses `next-intl` for localization.
- Languages supported: `Kazakh`, `English`, and `Russian`.
- The language can be changed using the dropdown in the header.

### Toast Notifications

- Feedback is provided using `react-toastify`.
- Example: Error messages during authentication or form validation feedback.

### Zod Validation

- Zod is used for client-side schema validation for forms.
- Errors are displayed with translations based on the current locale.

---

## Customization

### Add New Languages

1. Create a new JSON file in the `locales/messages/` directory, e.g., `fr.json` for French.
2. Add translations for the keys in the JSON file.
3. Update the `locales` array in `locales/config/locales.ts`:

   ```typescript
   export const locales = ['en', 'ru', 'kk', 'fr'];
   ```

4. The language will automatically be added to the selector.

### Add New Pages

1. Create a new folder under the `app` directory, e.g., `app/dashboard`.
2. Add a new `page.tsx` file inside the folder.
3. Use the existing components for layout and styles.

---

## Built With

- **[Next.js](https://nextjs.org/)** - React framework for server-rendered applications
- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first CSS framework
- **[Next-Auth](https://authjs.dev/)** - Authentication for Next.js
- **[Next-Intl](https://next-intl-docs.vercel.app/)** - Internationalization and localization
- **[shadcn/ui](https://ui.shadcn.com/)**: Modular, accessible UI components built on top of Radix UI and styled with Tailwind CSS.
- **[Lucide Icons](https://lucide.dev/)**: A modern and consistent icon library for React.
- **[Zod](https://zod.dev/)** - Schema validation
- **[React-Toastify](https://fkhadra.github.io/react-toastify/)** - Toast notifications
- **[@t3-oss/env-nextjs](https://github.com/t3-oss/t3-env)** - Type-safe environment variable management for Next.js
- **[@tanstack/react-query](https://tanstack.com/query/latest)** - Optimized data fetching and caching for React

---

## 🚀 Running Tests

This project includes a robust testing setup to ensure code quality and application reliability. Below are the details for running different types of tests:

### 1. **Unit and Integration Tests**
We use **Vitest** with **React Testing Library** to write and run unit and integration tests.

#### Run Unit/Integration Tests:
```bash
yarn test
```

#### Watch Tests:
```bash
yarn test:watch
```

#### Coverage Report:
```bash
yarn coverage
```

---

### 2. **End-to-End (E2E) Tests**
We use **Playwright** for writing end-to-end tests.

#### Run E2E Tests:
```bash
yarn test:e2e
```

#### Playwright Test Runner UI:
```bash
yarn test:e2e --ui
```

### Notes:
- Ensure the application is running locally before starting E2E tests.
- Configure environment variables in `.env.test` for test-specific setups.

---

### 3. **Test Setup**
- **Unit Testing Framework**: [Vitest](https://vitest.dev/)
- **E2E Testing Framework**: [Playwright](https://playwright.dev/)
- **Component Testing**: [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)

#### Test Directory Structure
- Unit tests: `src/` (next to each component)
- E2E tests: `src/tests/e2e/`

---

### Example Test Command:
```bash
yarn test  # Runs all unit and integration tests
yarn test:e2e  # Runs all E2E tests
```

---

## License

This project is licensed under the **GNU General Public License v3.0**.  
See the [LICENSE](https://github.com/Sayyat/next-intl-auth/blob/main/LICENSE) file for details.

---

## Author

Created with ❤ by [ZIZ INC.](https://github.com/Sayyat/next-intl-auth)
