# 📁 Project Folder Structure
```
team-trekking-front-end/
├── .husky/                # Git hooks (pre-commit/pre-push)
├── public/                # Static public files (e.g., index.html, favicon)
├── src/                   # Source code
│   ├── assets/            # Static assets like images, icons, fonts
│   ├── components/        # Reusable UI components (buttons, dialogs, etc.)
│   │   ├── layout/        # Layout-related components (e.g., sidebar, header)
│   │   ├── shadcn-ui/     # Customized shadcn/ui components
│   │   └── space/         # Feature-specific components for the 'space' module
│   ├── lib/               # Utility code shared across the app
│   │   ├── config/        # App-level configurations (e.g., environment setup)
│   │   ├── constants/     # Common constants used throughout the app
│   │   ├── context/       # React Context providers
│   │   ├── hooks/         # Custom React hooks
│   │   ├── validation/    # Zod validation schemas
│   │   └── utils.ts       # General utility functions
│   ├── mock/              # Mock data for testing or prototyping
│   ├── pages/             # Page-level components (mapped to routes)
│   │   ├── board/         
│   │   ├── calendar/
│   │   ├── dashboard/
│   │   ├── folder/
│   │   ├── gantt-chart/
│   │   ├── inbox/
│   │   ├── layout/
│   │   ├── list/
│   │   ├── login/
│   │   ├── space/
│   │   └── task/
│   ├── routes/            # React Router route definitions
│   ├── service/           # Axios instance and RTK base query setup
│   │   ├── axiosInstance.ts
│   │   ├── baseQuery.ts
│   │   └── authQuery.ts
│   ├── stores/            # Zustand stores and middlewares
│   │   └── zustand/
│   │       ├── apiErrorMiddleware.ts
│   │       └── store.ts
│   ├── types/             # TypeScript type definitions
│   │   ├── interfaces/    
│   │   ├── props/
│   │   └── request-response/
│   ├── App.tsx            # Root application component
│   ├── index.css          # Tailwind base styles
│   ├── main.tsx           # App entry point
│   └── vite-env.d.ts      # Vite-specific TypeScript definitions
├── .gitignore             # Files ignored by Git
├── .prettierrc            # Prettier config
├── .prettierignore        # Ignore rules for Prettier
├── eslint.config.js       # ESLint config
├── components.json        # Custom component registry (used by shadcn/ui)
├── index.html             # Main HTML template for Vite
├── package.json           # Project metadata and dependencies
└── tsconfig.json          # TypeScript configuration
```

# 🧠 Developer Notes

### ✅ Why this structure?
- Separation of concerns: Components, logic, utilities, and pages are isolated and easy to locate.
-	Scalability: Designed to support new features without clutter.
-	Team-friendly: New devs can contribute quickly by following folder conventions.

### 🔧 Key Libraries Used
- 	Zustand: Lightweight state management in src/stores/
- 	RTK Query: API integration via src/service/authQuery.ts
- 	Axios: Custom instance in src/service/axiosInstance.ts
- 	React Router: Route definitions in src/routes/
- 	Tailwind CSS: Utility-first styling via index.css
- 	shadcn/ui: Modular UI components in components/shadcn-ui/
- 	Zod: Schema validation in lib/validation/
- 	ESLint + Prettier + Husky: Code quality enforced with pre-commit hooks

# 🚀 Run Guide for Developers
This guide helps developers clone, install, run, lint, and build the project efficiently.

### ✅ 1. Clone the Repository
```
git clone https://gitlab.com/tarun02001/team-trekking-front-end.git
```
Navigate into the project folder:
```
cd team-trekking-front-end
```

### ✅ 2. Install Dependencies
Use npm to install all required packages:
```
npm install 
```
Or
```
npm install --legecy-peer-deps
```
### ✅ 3. Start the Development Server
```
npm run dev
```


