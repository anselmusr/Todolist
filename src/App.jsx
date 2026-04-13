import { useTodoApp } from './features/todo/hooks/useTodoApp'
import { CenterPanel } from './features/todo/sections/CenterPanel'
import { LeftSidebar } from './features/todo/sections/LeftSidebar'
import { RightSidebar } from './features/todo/sections/RightSidebar'

// App hanya merakit tiga panel besar; seluruh logika bisnis tetap tinggal di hook feature.
function App() {
  const todo = useTodoApp()

  return (
    <main className="min-h-screen overflow-hidden px-4 py-6 sm:px-6 lg:px-8">
      <div className="app-noise app-noise-one" />
      <div className="app-noise app-noise-two" />

      <div className="mx-auto max-w-[1460px]">
        <div className="grid gap-6 xl:grid-cols-[290px_minmax(0,1fr)_360px]">
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
        </div>
      </div>
    </main>
  )
}

export default App
