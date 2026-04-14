import { lazy, Suspense } from 'react'

import { useTodoApp } from './features/todo/hooks/useTodoApp'

const LeftSidebar = lazy(() =>
  import('./features/todo/sections/LeftSidebar').then((module) => ({
    default: module.LeftSidebar,
  })),
)

const CenterPanel = lazy(() =>
  import('./features/todo/sections/CenterPanel').then((module) => ({
    default: module.CenterPanel,
  })),
)

const RightSidebar = lazy(() =>
  import('./features/todo/sections/RightSidebar').then((module) => ({
    default: module.RightSidebar,
  })),
)

function SidebarFallback() {
  return (
    <div className="fallback-stack">
      <div className="surface-card sidebar-fallback-card">
        <div className="sidebar-fallback-title" />
        <div className="sidebar-fallback-panel" />
        <div className="sidebar-fallback-lines">
          <div className="sidebar-fallback-line" />
          <div className="sidebar-fallback-line" />
        </div>
      </div>

      <div className="surface-card sidebar-fallback-card">
        <div className="sidebar-fallback-mini-title" />
        <div className="sidebar-fallback-block" />
      </div>
    </div>
  )
}

function CenterFallback() {
  return (
    <div className="fallback-stack">
      <div className="hero-card center-fallback-card">
        <div className="center-fallback-kicker" />
        <div className="center-fallback-heading" />
        <div className="center-fallback-copy" />
        <div className="center-fallback-grid">
          <div className="center-fallback-stat" />
          <div className="center-fallback-stat" />
          <div className="center-fallback-stat" />
        </div>
      </div>

      <div className="surface-card date-fallback-card">
        <div className="date-fallback-title" />
        <div className="date-fallback-grid">
          <div className="date-fallback-chip" />
          <div className="date-fallback-chip" />
          <div className="date-fallback-chip" />
          <div className="date-fallback-chip" />
          <div className="date-fallback-chip" />
        </div>
      </div>
    </div>
  )
}

// App hanya merakit tiga panel besar; seluruh logika bisnis tetap tinggal di hook feature.
function App() {
  const todo = useTodoApp()

  return (
    <main className="app-shell">
      <div className="app-noise app-noise-one" />
      <div className="app-noise app-noise-two" />

      <div className="app-frame">
        <div className="app-grid">
          <Suspense fallback={<SidebarFallback />}>
            <LeftSidebar
              activeProfileName={todo.activeProfileName}
              activeProfileRole={todo.activeProfileRole}
              activeTasksCount={todo.activeTasks.length}
              doneTasksCount={todo.doneTasks.length}
              handleDeleteAll={todo.handleDeleteAll}
              nextTask={todo.nextTask}
              profile={todo.profile}
              selectedDate={todo.selectedDate}
              setSelectedDate={todo.setSelectedDate}
              syncFormDueDate={todo.syncFormDueDate}
              todayKey={todo.todayKey}
              updateProfile={todo.updateProfile}
            />
          </Suspense>

          <Suspense fallback={<CenterFallback />}>
            <CenterPanel
              activeProfileName={todo.activeProfileName}
              activeProfileRole={todo.activeProfileRole}
              activeTasksCount={todo.activeTasks.length}
              completionRate={todo.completionRate}
              dateStrip={todo.dateStrip}
              doneTasksCount={todo.doneTasks.length}
              feedback={todo.feedback}
              feedbackClassName={todo.feedbackClassName}
              handleDeleteTask={todo.handleDeleteTask}
              handleToggleTask={todo.handleToggleTask}
              now={todo.now}
              overdueTasksCount={todo.overdueTasks.length}
              selectedDate={todo.selectedDate}
              selectedDateCompletionRate={todo.selectedDateCompletionRate}
              selectedDateLabel={todo.selectedDateLabel}
              selectedDoneTasksCount={todo.selectedDoneTasks.length}
              selectedTasks={todo.selectedTasks}
              setSelectedDate={todo.setSelectedDate}
              todayKey={todo.todayKey}
              todayTaskCount={todo.todayTaskCount}
            />
          </Suspense>

          <Suspense fallback={<SidebarFallback />}>
            <RightSidebar
              doneTasks={todo.doneTasks}
              form={todo.form}
              handleDeleteTask={todo.handleDeleteTask}
              handleSubmit={todo.handleSubmit}
              overdueTasks={todo.overdueTasks}
              selectedDate={todo.selectedDate}
              setSelectedDate={todo.setSelectedDate}
              syncFormDueDate={todo.syncFormDueDate}
              todayKey={todo.todayKey}
              updateForm={todo.updateForm}
            />
          </Suspense>
        </div>
      </div>
    </main>
  )
}

export default App
