# 🏆 Brag Document

A daily log of things I've learned while building **Survey System**.

---

## 2026-01-20 — 2026-01-24

### Landing Page — Foundation

- Initialized the project with Vite + React + TypeScript, establishing the feature-based directory structure (`src/features/auth/`, `src/features/landingPage/`, `src/features/dashboard/`).
- Built the complete **Landing Page** with multiple sections: Hero, Impact stats, Info cards, News & Updates, FAQ, and Demo CTA.
- Created the `LandingPageLayout` to wrap the public-facing pages.
- Added `InfoCard` component for displaying feature highlights in the Info section.
- Implemented smooth, responsive layout using Tailwind CSS utility classes.

---

## 2026-04-06 — 2026-04-22

### Authentication — Structure & Auth Pages

- Restructured the project and scaffolded the authentication feature.
- Built **Sign Up** page with form validation — email, username, password fields with error handling.
- Built **Login** page with email/password fields, password visibility toggle, and "Forgot Password" flow.
- Created `AuthContext` to manage global auth state (profile data, loading, sign-out).
- Set up initial routing in `App.tsx` with React Router v7 — landing page, auth pages, and dashboard shell.

---

## 2026-04-25 — 2026-05-31

### Create Survey — Multi-Step Wizard & Survey Builder

- Broke down the monolithic create-survey form into a **5-step wizard** with navigation stepper.
- **Step 1 — Survey Information**: Title, description, category, and target audience inputs with Yup validation.
- **Step 2 — Survey Goal**: Primary goal selection and usage-of-results picker.
- **Step 3 — Sections & Questions**: Dynamic section/question builder supporting **5 question types** — text, multiple_choice, single_choice, likert_scale, yes_no.
- **Step 4 — Settings**: Start/end date pickers, response limit, and visibility controls with date-range validation.
- **Step 5 — Review & Summary**: Read-only preview of the entire survey before publishing.
- Created `CreateSurveyProvider` context for tracking the current step/route within the wizard.
- Built `SurveyStepper` component — interactive step indicator showing progress through the wizard.
- Implemented dynamic Yup schema generation — each step validates only its own fields, with conditional validation for dates and response limits.
- Added error display for sections and questions at the form level.

### Theming System — Global Appearance & Accent Colors

- Built the entire **Theme system** via `ThemeContext` — supports three appearances: `default` (neutral gray), `light`, and `dark`.
- Implemented **4 accent color palettes**: Ocean Blue, Forest Green, Crimson Red, Royal Purple.
- Accent colors are applied via CSS custom properties (`--accent-50` through `--accent-900`) on the document root.
- Added **Theme Pictures** feature — users can set city, nature, or marble background images with dark overlays.
- Created `themePictures.ts` with a preload utility to eagerly load selected background images.
- All theme preferences persisted to `localStorage` and synced with the backend user settings.
- Implemented smooth color transitions with `transition-colors duration-300` on theme changes.

---

## 2026-06-06 — 2026-06-17

### Dashboard Layout & API Layer

- Built **Dashboard Layout** with responsive sidebar (mobile drawer, tablet hover/toggle, desktop expanded).
- Created **Header** component with search bar, notification bell, and user avatar.
- Added skeleton loading states for the dashboard layout while auth/profile data loads.
- Sidebar has responsive breakpoints: mobile (full-screen overlay drawer), tablet (collapsible icon bar), desktop (full labels).
- Implemented click-outside detection for tablet sidebar auto-close.
- Set up **Axios** instance with configurable `baseURL` from environment variables, request interceptor (Bearer token injection), and response interceptor (user-friendly error messages mapped by HTTP status code).
- Created `authService.ts` with signup, login, logout, getMe, and updatePassword API calls.
- Integrated signup endpoint with toast notifications for success/failure.
- Added `Toaster` component (sonner) for global toast notifications with rich colors.

---

## 2026-06-18 — 2026-06-19

### Auth Integration & Dashboard Analytics

- Completed **AuthContext** refactor — switched from Supabase to custom backend auth with session storage.
- Login flow now saves JWT token to `sessionStorage`, redirects to dashboard, and fetches user profile.
- Implemented **dashboard statistics** integration — fetches `GET /api/v1/dashboard/stats` for survey quantity, total responses, questions responded, new questions with week-over-week change percentages.
- Created `StatsCard` component with animated bar charts and positive/negative trend indicators.
- Integrated **recent surveys** endpoint — fetches `GET /api/v1/dashboard/recent-surveys` and displays them in a card list.
- Replaced static text with animated loading spinners (`ldrs` library) while data fetches.
- Sign-out flow clears session storage and redirects to login page.
- Added **avatar upload** functionality — users can select from 11 SVG avatar options.
- Fixed avatar display in the sidebar to show the selected avatar from the backend.

---

## 2026-06-20 — 2026-06-22

### Settings Page — Full Integration

- Built three-tab **Settings page**: Profile, Global Appearance, Theme Picture.
- **Profile Tab**: Change username, update email, reset password (with current/new password fields), avatar selector grid.
- **Global Appearance Tab**: Three appearance modes (Default/Light/Dark) with visual cards, four accent color pickers with live preview.
- **Theme Picture Tab**: City/Nature/Marble background image selection with preview thumbnails.
- Integrated **all settings endpoints**: `PUT /api/v1/users/me/profile`, `PUT /api/v1/users/me/password`, `PUT /api/v1/users/me/settings`.
- Added "Save Changes" button pattern for settings — user edits are tracked in local state and bulk-saved.
- Theme settings sync bidirectionally between `AuthContext` and `ThemeContext` via a custom `theme-synced` event.
- Error message priority changed to prefer backend error messages over generic ones in toast notifications.

---

## 2026-06-23 — 2026-06-25

### Surveys List, View & Table Component

- Revamped the **Surveys list page** (`/dashboard/surveys`) with search, status filter, and sort controls.
- Built **SurveyView page** (`/dashboard/surveys/:id/view`) — full survey detail with sections and questions rendered.
- Added survey **status management** — toggle between draft, active, inactive, closed with `PATCH /api/v1/surveys/:id/status`.
- Implemented **delete survey** flow with confirmation dialog.
- Added **duplicate survey** functionality.
- Built generic **Table component** with sortable columns, pagination, and row actions.
- Added **response answers** UI — renders each question type's answer with proper formatting.
- Created **participant detail** and **response detail** route shells with data fetching.
- Fixed sidebar routing — active states now correctly reflect the current URL path.

---

## 2026-06-26 — 2026-06-28

### Create Survey — 5-Step Wizard Refinement

- Completely refactored the **Create Survey multi-step wizard** — improved UX and validation logic.
- **Step 1** improvements: Better category selector, description character counter (max 200).
- **Step 2** improvements: Goal and usage radio button groups with descriptions.
- **Step 3** improvements: Dynamic section reordering, question type switching, option management for choice questions.
- **Step 4** improvements: Date picker validation (start date ≥ today, end date > start date), response limit with "Unlimited" option.
- Fixed step navigation — users can move forward/backward without losing form state.
- Interactive **stepper UI** — visual progress indicator showing completed, current, and upcoming steps.
- Added auto-save draft functionality — saves progress via `POST /api/v1/surveys/draft`.

---

## 2026-06-29

### Survey Actions & Save Progress

- **Save as Draft** now fully works — survey data is persisted to backend before publishing.
- Added more **survey card actions**: edit, duplicate, change status, delete, view responses.
- **Survey status manipulation** — dropdown/buttons to switch between states with API integration.
- View survey base implementation renders read-only survey structure.
- UI improvements to the survey cards — better visual hierarchy and action button placement.
- Fixed routing issues between `/create-survey` sub-routes and `/surveys` list page.

---

## 2026-06-30 — 2026-07-01

### Global Search & Loading Skeletons

- Implemented **Global Search** — search bar in the header that queries across surveys, responses, and participants.
- Integrated global search with the backend API and added local filtering fallback.
- Added **skeleton loaders** for the dashboard layout — animated placeholders for sidebar, header, and main content while data loads.
- Added **loading skeleton for surveys list** — shimmer effect while survey data is being fetched.
- Added `cursor-pointer` utility class to interactive elements for better UX.
- Removed the unused "Account & Billing" tab from Settings.
- **Mock data removed** — all survey views now use real API data.
- **Response answers UI improved** — better layout for viewing individual question answers per response.
- **Date formatter utility** created for consistent date display across the app.
- **Axios error message priority fixed** — `userMessage` from interceptor is now used first before falling back to generic messages.

---

## 2026-07-02 — 2026-07-07

### Public Survey Response & Bug Fixes

- Built the **public Survey Response page** (`/survey/:surveyId`) — participants can view and submit responses without authentication.
- Renders all 5 question types with proper interactive controls:
  - **text**: Textarea input
  - **multiple_choice**: Toggle buttons with check marks
  - **single_choice**: Radio button list
  - **likert_scale**: 5-point scale buttons
  - **yes_no**: Yes/No toggle buttons
- Added **respondent info collection** — name and email fields at the top of the form.
- **Required question validation** — checks all required questions before submission.
- **Collapsible sections** — users can expand/collapse survey sections for easier navigation.
- Mock survey data available via `?mock=true` for testing.
- **Success screen** after submission with green checkmark animation.
- **Dynamic data integration** — fetches live survey data from `GET /api/v1/surveys/:id`.
- Fixed **pagination bug** across all pages — surveys, responses, and participants now paginate correctly.
- Fixed **table component prop naming conflict** — two props had the same name causing rendering issues.
- Fixed **sidebar active route highlighting** — active state now correctly persists after navigation.
- Fixed **theme appearance bug on refresh** — dark/default/light mode now persists correctly after page reload.

---

## Project Architecture Summary

### Tech Stack

| Technology                | Purpose                                            |
| ------------------------- | -------------------------------------------------- |
| **React 19**              | UI framework                                       |
| **TypeScript**            | Type safety                                        |
| **Vite 7**                | Build tool & dev server                            |
| **Tailwind CSS v4**       | Utility-first styling                              |
| **React Router v7**       | Client-side routing                                |
| **Axios**                 | HTTP client                                        |
| **Yup + React Hook Form** | Form validation                                    |
| **shadcn/ui**             | UI primitives (Button, Dialog, Pagination, Sonner) |
| **Lucide React**          | Icon library                                       |
| **ldrs**                  | Loading spinners                                   |
| **Sonner**                | Toast notifications                                |

### Feature-Based Architecture

- **`src/features/auth/`** — Login/Signup pages, auth forms
- **`src/features/landingPage/`** — Public-facing landing with 7 sections
- **`src/features/dashboard/`** — Main app with Analytics, Surveys, Create Survey, Responses, Participants, Settings
- **`src/features/surveyResponse/`** — Public survey submission page

### State Management

- **AuthContext** — User profile, auth state, sign-out
- **ThemeContext** — Appearance mode, accent color, theme picture
- **CreateSurveyContext** — Multi-step wizard step tracking

### API Integration

- Axios instance with token-based auth and centralized error handling
- All endpoints follow `/api/v1/` prefix pattern
- Error interceptor maps HTTP status codes to user-friendly messages
- Session storage for JWT tokens

### Theming System

- 3 appearance modes (Default/Light/Dark)
- 4 accent color palettes with CSS custom properties
- 3 background theme pictures (City/Nature/Marble)
- Bidirectional sync between user settings (backend) and local preferences

---

## 2026-07-28

### SS_Brag.md — Project Retrospective

- Created this comprehensive brag document summarizing the entire Survey System development journey from January to July 2026.
- Document covers: Landing page, Authentication, Survey CRUD, Multi-step wizard, 5 question types, Theming system, Dashboard analytics, Response management, Participant management, Global search, Public survey response page, and all bug fixes.
- Committed and pushed to both the project repo and Learning-Journal.

### TanStack Query Migration — Full Data Layer Overhaul

- Installed `@tanstack/react-query` and configured `QueryClientProvider` with sensible defaults:
  - `staleTime: 5 * 60 * 1000` (5 min) for most queries
  - `retry: 1` for all queries
  - `refetchOnWindowFocus: false`
- Created `src/hooks/useQuery/` with **10 custom query hooks**: `useProfile`, `useDashboardStats`, `useRecentSurveys`, `useSurveys`, `useSurveyById`, `useGlobalResponses`, `useSurveyResponses`, `useGlobalParticipants`, `useSurveyParticipants`, `useGlobalSearch`.
- Created `src/hooks/useMutation/` with **15 custom mutation hooks**: `useLogin`, `useSignUp`, `useLogout`, `useUpdatePassword`, `useUpdateUserName`, `useUpdateAvatar`, `useDeleteAccount`, `useUpdateAppearanceAndAccent`, `useUpdateThemePicture`, `useCreateSurvey`, `useSaveSurveyDraft`, `useUpdateSurvey`, `useDeleteSurvey`, `useUpdateSurveyStatus`, `useSubmitSurveyResponse`.
- All mutations include `onSuccess` with `queryClient.invalidateQueries()` for stale cache invalidation and `onError` with `toast.error()` for user feedback.
- **Migrated 16 components** from `useEffect + useState + raw Axios` to `useQuery/useMutation`:
  - `Analytic.tsx` — dashboard stats + recent surveys
  - `SurveyList.tsx` — surveys list with loading/empty/error states
  - `SurveyView.tsx` — survey detail + delete/status mutations
  - `GlobalResponses.tsx` — global responses table with pagination
  - `GlobalParticipants.tsx` — global participants table with pagination
  - `ResponseDetail.tsx` — survey-specific responses table
  - `ParticipantDetail.tsx` — survey-specific participants table
  - `Login.tsx` — login mutation with `isPending` loading state
  - `SignUp.tsx` — signup mutation with form validation
  - `ProfileTab.tsx` — username, avatar, password, account deletion mutations
  - `AppearanceTab.tsx` — appearance/accent update mutation with sessionStorage sync
  - `ThemeTab.tsx` — theme picture update mutation with sessionStorage sync
  - `SurveyCard.tsx` — delete survey mutation with confirmation dialog
  - `CreateSurvey.tsx` — draft save/update, create survey, draft loading
  - `SurveyResponsePage.tsx` — survey loading + response submission
- **Refactored `AuthContext.tsx`** — replaced raw `getProfile()` call with `useProfile` query hook, simplified the data flow (sessionStorage hydration → TanStack Query background fetch).
- **Kept**: `ThemeContext` (pure UI state), `CreateSurveyContext` (wizard step tracking).
- **Pattern**: Every component now handles `isLoading` (skeleton/spinner), `isError` (toast from hook), and `data` (normal render).

---

## 2026-07-29

### React Query — staleTime & retry Deep Dive

- **`staleTime`**: Controls how long cached data is considered _fresh_. While fresh, React Query skips automatic refetches on remount/refocus. Once stale, the next trigger event causes a background refetch to update the cache.

- **`retry`**: Number of automatic retry attempts when a `queryFn` fails. Default is 3; setting `retry: 1` means 2 total attempts (original + 1 retry). Used across this project for faster failure feedback.

- **Key insight — `staleTime: Infinity` for rarely-changing data**: For data like user profiles that only change via explicit user action (update name, avatar, password), `staleTime: Infinity` is the correct choice — not an arbitrary 5-minute window. The profile only needs to refetch when a mutation explicitly calls `invalidateQueries({ queryKey: ['profile'] })`, which all profile mutations already do. Using a finite `staleTime` causes wasteful background refetches for unchanged data. Updated `useProfile` to use `staleTime: Infinity`.

- **The pattern**: _read-often, write-rarely_ data → `staleTime: Infinity` + manual `invalidateQueries` in mutations. _Frequently-changing_ data → shorter `staleTime` or the default (0).

---

## 2026-07-30

### Global Search → Settings Tab Routing

- Fixed global search so clicking a settings result lands on the **correct tab** instead of always defaulting to Profile.
- `Header.tsx` navigates with a `?tab=` query param (`appearance`, `theme`, `profile`).
- `SettingsView.tsx` now reads `tab` from the URL on mount **and** syncs `activeTab` back to the URL when tabs are clicked manually.
- Global search input now **clears on route change** — navigating away no longer leaves stale search text/results in the header.

### Dashboard StatsCard — Full Revamp

- Coordinated with the backend to add `weekly_trend` (7-day daily counts) to `GET /api/v1/dashboard/stats`.
- Extended `DashboardStats` type with `weekly_trend.survey_quantity`, `.total_responses`, `.questions_responded`, `.new_questions`.
- Replaced the hardcoded/static bars with a **real mini bar chart** — each bar scaled proportionally to the week's max value, today's bar highlighted with the accent color, day labels (M–S) underneath, skeleton bars while loading.
- Added a **per-card icon** (FileText, MessageSquare, HelpCircle, PlusCircle) in an accent-tinted chip.
- Replaced the flat change text with a **colored pill badge** (green/red/gray) showing `X% ↗/↘`.
- Added a subtle **accent top border** to each card.

### MutationOverlay — Global Mutation Loading State

- Created reusable `MutationOverlay` component — full-screen blurred backdrop with `Pinwheel` spinner + contextual message.
- Design rule: the Pinwheel overlay is **only** for mutation `isPending` states (form submits, saves, deletes) — query loading states keep their skeleton UIs.
- Integrated across the app with action-specific messages:
  - Login → "Signing in..." | Sign Up → "Creating account..."
  - Survey View → "Deleting survey..." / "Updating status..."
  - Profile Tab → "Updating username/avatar/password..." / "Deleting account..."
  - Appearance Tab → "Saving appearance..." | Theme Tab → "Saving theme..."
  - Survey Response → "Submitting response..."

### Bug Fixes

- Fixed missing `RotateCcw` lucide import in `AppearanceTab.tsx`.
- Fixed `formatDate` type error — accepts `string | null | undefined` to match `endDate`.

---

## 2026-07-31

### Survey View — Layout & Confirmation UX

- Moved the survey **status badge** next to the title (left side) and kept the top-right purely for action buttons — clear visual separation between identity and actions.
- Added a **confirmation modal** before Activate / Deactivate / Close status changes — status only changes after the user confirms. Each action shows its own title, description, icon, and colored confirm button.

### Survey Response Page — Refactor & Full Integration

- Added `/answer` to the public route: `/survey/:surveyId/answer`. Updated the copy-link buttons in `SurveyView` and `SurveyCard`.
- **Split the 430-line `SurveyResponsePage` into smaller components**:
  - `SurveyResponsePage.tsx` (main — state + orchestration)
  - `components/QuestionInput.tsx` (renders all 5 question types)
  - `components/SurveySection.tsx` (collapsible section)
  - `components/RespondentInfo.tsx` (name/email form)
  - `components/SuccessScreen.tsx` (submitted confirmation)
  - `components/AppearanceToggle.tsx` (light/dark toggle for respondents)
- Moved shared types to `src/types/surveyResponsePage.ts` (following the types folder pattern).
- **Removed the mock survey entirely** — the page now always fetches from the real API.

### Bug Fixes & Debugging

- **"Survey not found" on pasted links** — traced through a stale Vite cache + duplicate dev server on port 5173, then found the real cause: the backend's `GET /api/v1/surveys/:id` returned **401 for anonymous users**. The endpoint needs to be public. Improved the error screen to show status-specific messages (401 vs 404 vs generic).
- **Invisible submit button** — the public page wasn't wrapped in `ThemeProvider`, so `--accent-*` CSS vars weren't set and `bg-accent-600 text-white` rendered invisible. Fixed by wrapping the route in `ThemeProvider`.

### Survey Response Submission

- Wired up the **real submission** (previously a placeholder that faked success).
- Aligned the payload to the backend's accepted shape: `respondent_email`, `answers[].question_id`, `answer_text`, `answer_option_ids`, `likert_value`, `yes_no_value`.
- Added option IDs to the survey normalization so `answer_option_ids` sends the option's UUID.
- Added a **submit confirmation modal** — validation runs first, then the user confirms before the request is sent.
- Fixed the submit endpoint path to **`POST /api/v1/surveys/{surveyId}/responses`** (it was hitting a non-existent `POST /api/v1/responses` → 404).

---

## 2026-08-01

### Responses Table — Action Menu Popup Fix

- Diagnosed why the three-dot row action menu was **clipped/hidden inside the table** — the table wrapper and the dashboard `<main>` both have `overflow-hidden`, and the app layout's `transition-all`/transform chain creates a new containing block that traps `position: fixed` elements.
- Tried and ruled out several approaches:
  - **Centered overlay modal** (full-screen backdrop) — worked but was the wrong UX for a three-dot menu.
  - **Portal + `position: fixed` + high `z-index`** — still clipped by the layout's stacking context.
  - **Sibling-of-wrapper fixed overlay** — reliable but still a modal, not an anchored dropdown.
- **Final solution — Floating UI (`@floating-ui/react-dom`)**: built a reusable `ActionMenu` component that anchors the dropdown to the trigger button with `useFloating` + `strategy: "fixed"`, `flip` (opens above when no room below), `shift` (stays inside the viewport), and `autoUpdate` (repositions on scroll/resize). Rendered via `createPortal` to `document.body`, so it fully escapes the table's overflow clipping.
- Learned the hard way about the **two Floating UI packages**: `@floating-ui/react-dom` only exports the positioning engine (`useFloating`, middleware) — the interaction hooks (`useClick`, `useDismiss`, `useRole`, `useInteractions`) and `FloatingPortal`/`FloatingFocusManager` live in `@floating-ui/react`. For a simple menu, manual open/close state + `createPortal` + a `mousedown` outside-click listener and Escape handler is all that's needed.
- The dropdown now appears **anchored right next to the three-dots button** (exactly like a standard table actions menu), auto-flips above/below to stay visible, and closes on outside click or Escape.
- **Polish**: thickened the three-dot icon (`strokeWidth` 1.5 → 2.5), gave menu items a visible **accent-colored hover state** (`hover:bg-accent-100` / `dark:hover:bg-accent-900/30` + text/icon shifting to accent), and made the whole menu **theme-aware** — it now follows the user's chosen accent color and light/dark appearance via the `--accent-*` CSS variables from `ThemeContext`.
