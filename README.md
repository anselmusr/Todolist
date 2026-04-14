# Task Management & To-do List App

A responsive task dashboard built with React, Vite, and Tailwind CSS 4. The app focuses on a soft, mobile-inspired interface while keeping the workflow practical: create tasks, set priorities, track overdue items, review completed work, and manage everything locally in the browser.

## Highlights

- Add tasks with title, due date, and priority
- Filter tasks by selected date through the center dashboard strip
- Mark tasks as done and move them automatically to the `Done` panel
- Track overdue tasks in a dedicated status panel
- Edit profile data and persist it in `localStorage`
- Delete single tasks, or delete all tasks with a custom confirmation modal
- Show toast feedback after create, complete, delete, and clear-all actions
- Responsive layout tuned for desktop and mobile

## Tech Stack

- React 19
- Vite 8
- Tailwind CSS 4
- ESLint 9

## Project Structure

```text
public/
|-- favicon.ico
`-- icons.svg

src/
|-- App.jsx
|-- index.css
|-- main.jsx
|-- assets/
|   |-- hero.png
|   |-- react.svg
|   `-- vite.svg
|-- features/
|   `-- todo/
|       |-- constants.js
|       |-- hooks/
|       |   `-- useTodoApp.js
|       |-- sections/
|       |   |-- LeftSidebar.jsx
|       |   |-- CenterPanel.jsx
|       |   `-- RightSidebar.jsx
|       |-- ui/
|       |   |-- TodoIcons.jsx
|       |   `-- TodoPrimitives.jsx
|       `-- utils/
|           |-- date.js
|           `-- tasks.js
`-- styles/
    |-- base.css
    |-- components.css
    |-- dashboard.css
    |-- forms.css
    |-- layout.css
    `-- motion.css
```

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Run the development server

```bash
npm run dev
```

If you use PowerShell on Windows and hit an execution-policy issue for `npm.ps1`, run:

```powershell
npm.cmd run dev
```

### 3. Build for production

```bash
npm run build
```

### 4. Preview the production build

```bash
npm run preview
```

## Scripts

- `npm run dev` starts the Vite dev server
- `npm run build` creates the production bundle in `dist/`
- `npm run preview` serves the production build locally
- `npm run lint` runs ESLint

## Architecture Notes

- `useTodoApp` is the central hook for state, persistence, derived task lists, feedback state, and action handlers.
- `sections/` contains the three main dashboard columns.
- `ui/` contains reusable presentational pieces such as badges, icons, empty states, progress ring, and summary tiles.
- `styles/` separates shared layout, dashboard-specific styling, form styles, motion, and component utilities.

## Persistence

Task data and profile data are stored in `localStorage`, so the dashboard keeps its state after refresh without requiring a backend.

## Verification

Recommended local checks:

```bash
npm run lint
npm run build
```
