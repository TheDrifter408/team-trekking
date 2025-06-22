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
│   │   └── rtkQuery.ts
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
- 	RTK Query: API integration via src/service/rtkQuery.ts
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
# Story Book Guide:
Storybook allows us to showcase and test our Components based on the props we pass to it by writing _Stories_.

### 1. Identify the Component Type:
- does the component render directly like a **Button** or a **Card**?
- Does it wrap _children_ like a **Popover**, **Dropdown** or **Modal** ?
- does it depend on external state or context?

### 2. Create a .stories.ts file for the Component
For example to test for the `<AssigneeAvatar />` component create an `AssigneeAvatar.stories.ts` file under the `stories/` folder.

### 3. Input the following default code:
```typescript
import { Meta, StoryObj } from '@storybook/react';
import { AssigneeAvatar } from '@/components/common/assignee-avatar';
import { Assignee } from '@/types/props/Common';

import '@/index.css';

const getSeed = (name: string) => {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  return Math.abs(hash).toString();
};

const mockAssignee: Assignee = {
  id: 123,
  name: 'Jane Doe',
  role: 'admin',
  avatar: `https://api.diMetacebear.com/6.x/avataaars/svg?seed=${getSeed('Jane Doe')}`,
  isWatching: false,
};

const meta: Meta<typeof AssigneeAvatar> = {
  title: 'Components/AssigneeAvatar',
  component: AssigneeAvatar,
  tags: ['autodocs'],
  argTypes: {
    onRemove: { action: 'remove clicked' },
  },
};

export default meta;

type Story = StoryObj<typeof AssigneeAvatar>;

export const Default: Story = {
  args: {
    assignee: mockAssignee,
    displayName: false,
    onRemove: () => { },
  },
};

export const WithRing: Story = {
  args: {
    assignee: mockAssignee,
    displayName: true,
    showAvatarRing: true,
    onRemove: () => { },
  },
};

export const WithButtons: Story = {
  args: {
    assignee: mockAssignee,
    displayName: true,
    showAvatarRing: true,
    showButtons: true,
    onRemove: () => { },
  },
};

export const SelectedAndRemovable: Story = {
  args: {
    assignee: mockAssignee,
    displayName: true,
    enterAssignee: true,
    isSelected: true,
    showAvatarRing: true,
    onRemove: () => { },
  },
};
```
### 4. Run Storybook
In the terminal run `npm run storybook` which will turn on the storybook server and show a UI to test component based on the `args` property that we passed into each object that is of type `Story`.

#### Notes:
- Don't forget to to include the `@/index.css` as we are using tailwind and not individual CSS files.
- Not passing any args will render the component without any options to toggle or any changeable parameters.


