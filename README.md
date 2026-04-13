# Task Management & To-do List App

A responsive to-do list app built with React and Vite. The UI is styled to feel closer to a modern mobile task management dashboard, while the core functionality stays simple and practical: create tasks, assign priorities, track overdue items, and review completed work.

## Features

- Create tasks with title, due date, and priority
- Persist profile and tasks in `localStorage`
- Filter tasks by selected date
- Mark tasks as done and move them to the `Done` panel
- Highlight overdue tasks automatically
- Delete individual tasks or clear all tasks with confirmation
- Responsive dashboard layout for desktop and mobile
- Lazy-loaded section components for lighter initial loading

## Tech Stack

- React 19
- Vite 8
- Tailwind CSS 4
- ESLint 9

## Project Structure

```text
src/
|-- App.jsx
|-- index.css
|-- main.jsx
`-- features/
    `-- todo/
        |-- constants.js
        |-- hooks/
        |   `-- useTodoApp.js
        |-- sections/
        |   |-- LeftSidebar.jsx
        |   |-- CenterPanel.jsx
        |   `-- RightSidebar.jsx
        |-- ui/
        |   |-- TodoIcons.jsx
        |   `-- TodoPrimitives.jsx
        `-- utils/
            |-- date.js
            `-- tasks.js
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

If you are using PowerShell on Windows and see an execution policy error for `npm.ps1`, use:

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

## Available Scripts

- `npm run dev` starts the Vite dev server
- `npm run build` creates the production build in `dist/`
- `npm run preview` serves the production build locally
- `npm run lint` runs ESLint

## Architecture Notes

- `useTodoApp` is the main feature hook that owns state, persistence, derived task lists, and action handlers.
- `sections/` contains the three main dashboard areas.
- `ui/` contains reusable presentational pieces such as badges, empty states, progress ring, and icons.
- `utils/` contains helpers for date formatting, local storage normalization, and task sorting.

## Data Persistence

This app stores profile and task data in the browser using `localStorage`, so your data remains available after refresh without requiring a backend.

## Verification

The project is expected to pass:

```bash
npm run lint
npm run build
```
