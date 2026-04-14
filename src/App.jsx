import { lazy, Suspense, useEffect } from 'react'
import { Analytics } from '@vercel/analytics/react'

import { useTodoApp } from './features/todo/hooks/useTodoApp'
import { CheckIcon, TrashIcon } from './features/todo/ui/TodoIcons'

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

function DeleteAllDialog({ taskCount, onCancel, onConfirm }) {
  return (
    <div className="confirm-dialog-overlay" onClick={onCancel}>
      <div
        className="confirm-dialog surface-card"
        role="dialog"
        aria-modal="true"
        aria-labelledby="delete-all-dialog-title"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="confirm-dialog-icon">
          <TrashIcon className="icon-md" />
        </div>
        <p className="confirm-dialog-kicker">Delete Tasks</p>
        <h2 className="confirm-dialog-title" id="delete-all-dialog-title">
          Hapus semua tugas?
        </h2>
        <p className="confirm-dialog-copy">
          <span className="confirm-dialog-emphasis">{taskCount} agenda</span>{' '}
          akan dihapus permanen dari daftar dan penyimpanan browser.
        </p>

        <div className="confirm-dialog-actions">
          <button className="ghost-button button-full" type="button" onClick={onCancel}>
            Batal
          </button>
          <button className="danger-button button-full" type="button" onClick={onConfirm}>
            Hapus semua
          </button>
        </div>
      </div>
    </div>
  )
}

function FeedbackToast({ text, title, tone = 'success' }) {
  const icon =
    tone === 'danger' ? <TrashIcon className="icon-md" /> : <CheckIcon className="icon-md" />

  return (
    <div className="feedback-toast-wrap" role="status" aria-live="polite">
      <div className={`feedback-toast feedback-toast-${tone}`}>
        <div className={`feedback-toast-icon feedback-toast-icon-${tone}`}>
          {icon}
        </div>

        <div className="feedback-toast-copy">
          <p className="feedback-toast-title">{title}</p>
          <p className="feedback-toast-text">{text}</p>
        </div>
      </div>
    </div>
  )
}

// App hanya merakit tiga panel besar; seluruh logika bisnis tetap tinggal di hook feature.
function App() {
  const todo = useTodoApp()

  useEffect(() => {
    if (!todo.isDeleteAllDialogOpen) {
      return undefined
    }

    const previousOverflow = document.body.style.overflow

    document.body.style.overflow = 'hidden'

    function handleKeyDown(event) {
      if (event.key === 'Escape') {
        todo.closeDeleteAllDialog()
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [todo.closeDeleteAllDialog, todo.isDeleteAllDialogOpen])

  return (
    <main className="app-shell">
      <div className="app-noise app-noise-one" />
      <div className="app-noise app-noise-two" />

      <div className="app-frame">
        <div className="app-grid">
          <Suspense fallback={<SidebarFallback />}>
            <LeftSidebar
              activeTasksCount={todo.activeTasks.length}
              doneTasksCount={todo.doneTasks.length}
              handleDeleteAll={todo.handleDeleteAll}
              nextTask={todo.nextTask}
              profile={todo.profile}
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
              setSelectedDate={todo.setSelectedDate}
              syncFormDueDate={todo.syncFormDueDate}
              updateForm={todo.updateForm}
            />
          </Suspense>
        </div>

        <footer className="app-footer">
          <p className="app-footer-copy">
            &copy; 2026{' '}
            <a className="app-footer-link" href="mailto:anselmusrusdiatmaja">
              Anselmus R
            </a>
            . All rights reserved. • Made with{' '}
            <span className="app-footer-heart" aria-hidden="true">
              ♥
            </span>
          </p>
        </footer>
      </div>

      {todo.isDeleteAllDialogOpen && (
        <DeleteAllDialog
          taskCount={todo.totalTasksCount}
          onCancel={todo.closeDeleteAllDialog}
          onConfirm={todo.confirmDeleteAll}
        />
      )}

      {todo.feedback?.surface === 'toast' && (
        <FeedbackToast
          tone={todo.feedback.tone}
          title={todo.feedback.title ?? 'Berhasil'}
          text={todo.feedback.text}
        />
      )}

      <Analytics />
    </main>
  )
}

export default App
