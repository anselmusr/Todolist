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
    <div className="space-y-6">
      <div className="surface-card animate-pulse p-6">
        <div className="h-6 w-40 rounded-full bg-[#ebe4ff]" />
        <div className="mt-4 h-20 rounded-[28px] bg-[#f4f0ff]" />
        <div className="mt-5 space-y-3">
          <div className="h-12 rounded-[22px] bg-[#f4f0ff]" />
          <div className="h-12 rounded-[22px] bg-[#f4f0ff]" />
        </div>
      </div>

      <div className="surface-card animate-pulse p-6">
        <div className="h-5 w-32 rounded-full bg-[#ebe4ff]" />
        <div className="mt-4 h-28 rounded-[24px] bg-[#f7f4ff]" />
      </div>
    </div>
  )
}

function CenterFallback() {
  return (
    <div className="space-y-6">
      <div className="hero-card animate-pulse p-6 sm:p-7">
        <div className="h-6 w-40 rounded-full bg-white/16" />
        <div className="mt-4 h-14 max-w-xl rounded-[28px] bg-white/14" />
        <div className="mt-3 h-5 max-w-2xl rounded-full bg-white/12" />
        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          <div className="h-28 rounded-[26px] bg-white/12" />
          <div className="h-28 rounded-[26px] bg-white/12" />
          <div className="h-28 rounded-[26px] bg-white/12" />
        </div>
      </div>

      <div className="surface-card animate-pulse p-6">
        <div className="h-6 w-52 rounded-full bg-[#ebe4ff]" />
        <div className="mt-5 grid gap-3 sm:grid-cols-5">
          <div className="h-28 rounded-[28px] bg-[#f7f4ff]" />
          <div className="h-28 rounded-[28px] bg-[#f7f4ff]" />
          <div className="h-28 rounded-[28px] bg-[#f7f4ff]" />
          <div className="h-28 rounded-[28px] bg-[#f7f4ff]" />
          <div className="h-28 rounded-[28px] bg-[#f7f4ff]" />
        </div>
      </div>
    </div>
  )
}

// App hanya merakit tiga panel besar; seluruh logika bisnis tetap tinggal di hook feature.
function App() {
  const todo = useTodoApp()

  return (
    <main className="min-h-screen overflow-hidden px-4 py-6 sm:px-6 lg:px-8">
      <div className="app-noise app-noise-one" />
      <div className="app-noise app-noise-two" />

      <div className="mx-auto max-w-[1460px]">
        <div className="grid gap-6 xl:grid-cols-[290px_minmax(0,1fr)_360px]">
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
