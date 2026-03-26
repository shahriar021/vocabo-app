# 📱 React Native App

![Platform](https://img.shields.io/badge/platform-Android%20%7C%20iOS-blue?style=flat-square)
![Expo](https://img.shields.io/badge/Expo-53.0.27-000020?style=flat-square&logo=expo)
![React Native](https://img.shields.io/badge/React%20Native-0.79.6-61DAFB?style=flat-square&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.8.3-3178C6?style=flat-square&logo=typescript)
![Node](https://img.shields.io/badge/Node-20.20.0-339933?style=flat-square&logo=nodedotjs)

> A scalable, production-ready React Native application built with Expo, Firebase, Redux Toolkit, and a battle-tested folder architecture.

---

## 🚀 Tech Stack

| Layer | Technology |
|---|---|
| Framework | React Native (Expo) |
| Language | TypeScript |
| Styling | Tailwind CSS (NativeWind) |
| State Management | Redux Toolkit (RTK) |
| Authentication | Firebase Auth (Email/Password + Google Sign-In) |
| Remote Data | RTK Query — `https://jsonplaceholder.typicode.com/posts` |
| Navigation | React Navigation (Stack + Bottom Tabs) |
| Reusable Components | Shared component library (in `src/components/shared`) |

---

## 📁 Project Architecture

```
src/
├── components/
│   ├── context/                  # React Context providers
│   ├── layout/
│   │   └── MainLayout.tsx        # Root layout wrapper
│   ├── shared/                   # Reusable UI primitives
│   │   ├── ErrorMessage.tsx
│   │   ├── InputField.tsx
│   │   ├── Loading.tsx
│   │   ├── OfflineBanner.tsx
│   │   ├── PrimaryButton.tsx
│   │   └── verifyEmail.tsx
│   └── ui/
│       ├── homepage/             # Homepage-specific UI components
│       └── splashScreen/         # Splash screen UI
│
├── hooks/
│   └── useAuth.ts                # Custom hook — Firebase auth state
│
├── redux/                        # Redux Toolkit slices, RTK Query APIs
│
├── routes/
│   ├── AuthStack.tsx             # Unauthenticated navigation stack
│   ├── BottomNavigation.tsx      # Tab navigator (authenticated)
│   └── StackNavigation.tsx       # Root stack navigator
│
├── screens/
│   ├── Auth/
│   │   ├── LoginScreen.tsx
│   │   ├── OnBoarding.tsx
│   │   └── SignUpUser.tsx
│   ├── Home/
│   │   └── HomeScreen.tsx
│   ├── Post/                     # Post list + details screens
│   └── Profile/                  # User profile screen
│
├── services/                     # Firebase, API service configs
├── types/                        # Global TypeScript type definitions
├── index.ts                      # Entry barrel export
└── firebaseConfig.ts             # Firebase project configuration

android/
assets/
plugins/
node_modules/
.env
```

---

## 🔐 Authentication

Authentication is powered by **Firebase Auth** with two sign-in methods:

- **Email / Password** — standard registration and login flow
- **Google Sign-In** — via Firebase Google Auth Provider

Auth state is exposed through a custom hook:

```ts
// hooks/useAuth.ts
const { user, loading, signOut } = useAuth();
```

The hook listens to `onAuthStateChanged` and provides the current user object reactively across the app. Navigation is gated by auth state — unauthenticated users are directed to `AuthStack`, authenticated users enter `BottomNavigation`.

---

## 📰 Posts — Data Fetching & Optimisation

Posts are fetched from the public REST API:

```
GET https://jsonplaceholder.typicode.com/posts
```

### Implementation

- **RTK Query** handles fetching, caching, and loading/error states — no manual `useEffect` boilerplate.
- **FlatList** with `keyExtractor`, `initialNumToRender`, and `windowSize` tuning for smooth scrolling performance on large lists.
- Each post card is a memoised component (`React.memo`) to prevent unnecessary re-renders.
- Tapping a post navigates to a **Post Detail screen** that receives the post data via navigation params — no second network call.

### Like Feature

Post likes are managed in **Redux** (a dedicated slice in `src/redux/`):

```ts
// Toggle like for a post
dispatch(toggleLike(postId));

// Read like state
const isLiked = useSelector(selectIsLiked(postId));
```

Like state persists across navigation and survives re-renders, with O(1) lookup via a normalised map in the Redux store.

---

## 🧱 Shared Components

All reusable primitives live in `src/components/shared/` and are designed to be consumed anywhere in the app without prop-drilling.

| Component | Purpose |
|---|---|
| `InputField` | Controlled text input with label, error display, and theming |
| `PrimaryButton` | Main CTA button with loading state support |
| `Loading` | Full-screen or inline spinner |
| `ErrorMessage` | Standardised inline error display |
| `OfflineBanner` | Network status banner, shown when device is offline |
| `verifyEmail` | Email verification prompt component |

---

## 🗂️ State Management

Redux Toolkit is the single source of truth for all client-side state.

```
redux/
├── store.ts           # Configured Redux store
├── postsApi.ts        # RTK Query API slice (posts endpoint)
└── likesSlice.ts      # Likes feature slice
```

- **RTK Query** manages all server state (fetching, caching, invalidation).
- **Feature slices** manage all local UI state (likes, etc.).
- Components connect via typed `useAppSelector` and `useAppDispatch` hooks.

---

## 🧭 Navigation Structure

```
RootNavigator
├── AuthStack          ← shown when user is not authenticated
│   ├── OnBoarding
│   ├── Login
│   └── SignUp
│
└── BottomNavigation   ← shown when user is authenticated
    ├── Home (Stack)
    │   ├── HomeScreen
    │   ├── Post List
    │   └── Post Detail
    └── Profile
```

---

## 🌐 Network Status (NetInfo + Context)

Network state is monitored globally using `@react-native-community/netinfo` and exposed via React Context. This powers the `OfflineBanner` component which automatically appears across all screens when the device loses connectivity — no prop-drilling required.

---

## 🤖 AI Usage in This Project

AI tooling was used deliberately to accelerate specific parts of development without replacing engineering judgment.

### Where AI was used

**1. Post Detail — UI Design**
Claude was used to rapidly prototype the visual layout of the Post Detail screen. Rather than spending time iterating on spacing and component arrangement manually, I described the design intent and used the output as a strong starting point, then refined it to match the app's design language.

**2. TypeScript Typing**
For complex type definitions (particularly around Redux state shape and RTK Query response types), I used Claude to generate accurate boilerplate types faster. This removed the repetitive overhead of writing generic constraints by hand while keeping full type safety.

**3. General Repetitive Work**
For tasks that are structurally identical across files — such as screen scaffolding, slice boilerplate, and navigation config — AI was used to generate the initial structure. All generated code was reviewed, understood, and adjusted before committing.

### What AI did NOT do

- Architecture decisions (folder structure, state management strategy, navigation design)
- Business logic and feature design
- Firebase integration and auth flow
- Performance decisions (FlatList configuration, memoisation strategy)

> **Note:** AI is used as a productivity tool, not a replacement for understanding. Every line of generated code was read, reasoned about, and owned before it entered the codebase.

---

## 📐 Folder Structure Philosophy

This folder structure is one I have refined and used across multiple production projects over the years. The core principle is **separation of concerns by role**, not by feature — at this scale, it keeps the codebase navigable and predictable.

Key decisions:
- `shared/` components are stateless and reusable — they know nothing about business logic.
- `screens/` own their layout and connect to Redux/hooks — they are the integration layer.
- `hooks/` encapsulates side-effectful logic (auth state, device info) so screens stay clean.
- `redux/` is the single source of truth — no prop-drilling, no local state for shared data.
- `services/` isolates third-party SDK configuration (Firebase) from the rest of the app.

This structure scales cleanly: adding a new feature means adding a folder in `screens/`, a slice in `redux/`, and wiring up a route — the rest of the app is untouched.

---

## 📝 Commit Convention

This project follows the [Conventional Commits](https://www.conventionalcommits.org/) specification.

```
feat:     a new feature
fix:      a bug fix
refactor: code change that is not a feature or fix
style:    formatting, missing semicolons, etc. (no logic change)
chore:    build process, dependency updates, tooling
docs:     documentation only changes
test:     adding or updating tests
perf:     performance improvements
```

### Examples

```bash
feat: add Google Sign-In via Firebase Auth
feat: implement post like toggle with Redux slice
fix: resolve FlatList re-render on likes state change
refactor: extract post card into reusable component
chore: update Firebase SDK to v10
docs: add architecture section to README
perf: memoize PostCard to prevent unnecessary renders
style: fix inconsistent padding in shared InputField
```

---

## ⚙️ Getting Started

```bash
# Install dependencies
npm install

# Start Expo dev server
npx expo start

# Run on Android
npx expo run:android

### Environment Variables

Create a `.env` file at the root (see `.env.example`):

```env
EXPO_PUBLIC_BASE_URL="https://jsonplaceholder.typicode.com"
 

```
 
> **⚠️ Note for reviewer:**
> The `.env` file and `google-services.json` (Firebase config) have been intentionally committed to this repository **for evaluation purposes only**, so you can clone and run the project immediately without any additional setup.
>
> In a real production project, both of these files would be listed in `.gitignore` and never pushed to version control. Sensitive credentials would be managed via a secrets manager or provided securely out-of-band.
 
 --use expo prebuild for firebase google sign in
---

## 📄 License

MIT