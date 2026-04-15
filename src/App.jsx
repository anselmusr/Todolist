import { lazy, Suspense, useEffect } from 'react'

import { useTodoApp } from './features/todo/hooks/useTodoApp'
import { CheckIcon, TrashIcon } from './features/todo/ui/TodoIcons'
import {
  cn,
  dangerButtonClass,
  ghostButtonClass,
  heroCardClass,
  iconMdClass,
  surfaceCardClass,
} from './features/todo/ui/classes'

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

const fallbackStackClass = 'space-y-6'
const sidebarFallbackCardClass = cn(surfaceCardClass, 'animate-pulse p-6')
const centerFallbackCardClass = cn(heroCardClass, 'animate-pulse p-6 sm:p-7')

function SidebarFallback() {
  return (
    <div className={fallbackStackClass}>
      <div className={sidebarFallbackCardClass}>
        <div className="h-6 w-40 rounded-full bg-[#ebe4ff]" />
        <div className="mt-4 h-20 rounded-[28px] bg-[#f4f0ff]" />
        <div className="mt-5 space-y-3">
          <div className="h-12 rounded-[22px] bg-[#f4f0ff]" />
          <div className="h-12 rounded-[22px] bg-[#f4f0ff]" />
        </div>
      </div>

      <div className={sidebarFallbackCardClass}>
        <div className="h-5 w-32 rounded-full bg-[#ebe4ff]" />
        <div className="mt-4 h-28 rounded-[24px] bg-[#f7f4ff]" />
      </div>
    </div>
  )
}

function CenterFallback() {
  return (
    <div className={fallbackStackClass}>
      <div className={centerFallbackCardClass}>
        <div className="h-6 w-40 rounded-full bg-white/16" />
        <div className="mt-4 h-14 max-w-xl rounded-[28px] bg-white/14" />
        <div className="mt-3 h-5 max-w-2xl rounded-full bg-white/12" />
        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          <div className="h-28 rounded-[26px] bg-white/12" />
          <div className="h-28 rounded-[26px] bg-white/12" />
          <div className="h-28 rounded-[26px] bg-white/12" />
        </div>
      </div>

      <div className={cn(surfaceCardClass, 'animate-pulse p-6')}>
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

function DeleteAllDialog({ taskCount, onCancel, onConfirm }) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(20,12,54,0.48)] p-4 backdrop-blur-[12px] sm:p-6"
      onClick={onCancel}
    >
      <div
        className={cn(
          surfaceCardClass,
          'w-full max-w-[28rem] rounded-[32px] bg-[radial-gradient(circle_at_top_right,rgba(255,214,232,0.24),transparent_34%),linear-gradient(180deg,rgba(255,255,255,0.98)_0%,rgba(247,243,255,0.96)_100%)] p-6 text-center shadow-[0_36px_90px_-46px_rgba(35,17,100,0.78),inset_0_1px_0_rgba(255,255,255,0.85)] sm:p-7',
        )}
        role="dialog"
        aria-modal="true"
        aria-labelledby="delete-all-dialog-title"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-[20px] bg-[linear-gradient(135deg,#fff1f5_0%,#ffe7ee_100%)] text-[#d24d75] shadow-[0_20px_34px_-24px_rgba(210,77,117,0.7)]">
          <TrashIcon className={iconMdClass} />
        </div>
        <p className="mt-5 text-[11px] font-semibold uppercase tracking-[0.28em] text-[#8a7fbe]">
          Delete Tasks
        </p>
        <h2
          className="mt-3 font-display text-[1.9rem] font-extrabold leading-tight text-[#1b1635]"
          id="delete-all-dialog-title"
        >
          Hapus semua tugas?
        </h2>
        <p className="mt-3 text-sm leading-7 text-[#6f6890]">
          <span className="font-bold text-[#d24d75]">{taskCount} agenda</span>{' '}
          akan dihapus permanen dari daftar dan penyimpanan browser.
        </p>

        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          <button
            className={cn(ghostButtonClass, 'w-full justify-center')}
            type="button"
            onClick={onCancel}
          >
            Batal
          </button>
          <button
            className={cn(dangerButtonClass, 'w-full justify-center')}
            type="button"
            onClick={onConfirm}
          >
            Hapus semua
          </button>
        </div>
      </div>
    </div>
  )
}

function FeedbackToast({ text, title, tone = 'success' }) {
  const icon =
    tone === 'danger' ? <TrashIcon className={iconMdClass} /> : <CheckIcon className={iconMdClass} />

  const toastToneClassName =
    tone === 'danger'
      ? 'border-[#ffd8e2] bg-[radial-gradient(circle_at_top_right,rgba(255,214,232,0.56),transparent_34%),linear-gradient(180deg,rgba(255,244,247,0.98)_0%,rgba(255,255,255,0.95)_100%)]'
      : 'border-[#cceee0] bg-[radial-gradient(circle_at_top_right,rgba(215,245,234,0.72),transparent_34%),linear-gradient(180deg,rgba(241,252,247,0.98)_0%,rgba(255,255,255,0.95)_100%)]'

  const iconToneClassName =
    tone === 'danger'
      ? 'bg-[linear-gradient(135deg,#fff1f5_0%,#ffe3ea_100%)] text-[#d24d75] shadow-[0_18px_28px_-22px_rgba(210,77,117,0.65)]'
      : 'bg-[linear-gradient(135deg,#effcf7_0%,#dff7ec_100%)] text-[#17835c] shadow-[0_18px_28px_-22px_rgba(23,131,92,0.65)]'

  const titleToneClassName = tone === 'danger' ? 'text-[#7b2747]' : 'text-[#19533f]'
  const textToneClassName = tone === 'danger' ? 'text-[#92566b]' : 'text-[#427560]'

  return (
    <div
      className="fixed inset-x-0 bottom-4 z-40 flex justify-center px-4 sm:bottom-6 sm:justify-end sm:px-6"
      role="status"
      aria-live="polite"
    >
      <div
        className={cn(
          'pointer-events-auto flex w-full max-w-[24rem] items-start gap-3 rounded-[26px] border px-4 py-4 shadow-[0_24px_60px_-36px_rgba(35,17,100,0.42),inset_0_1px_0_rgba(255,255,255,0.88)]',
          toastToneClassName,
        )}
      >
        <div
          className={cn(
            'flex h-11 w-11 shrink-0 items-center justify-center rounded-[18px]',
            iconToneClassName,
          )}
        >
          {icon}
        </div>

        <div className="min-w-0">
          <p className={cn('font-display text-lg font-extrabold leading-tight', titleToneClassName)}>
            {title}
          </p>
          <p className={cn('mt-1 text-sm leading-6', textToneClassName)}>{text}</p>
        </div>
      </div>
    </div>
  )
}

// App hanya merakit tiga panel besar; seluruh logika bisnis tetap tinggal di hook feature.
function App() {
  const todo = useTodoApp()
  const { closeDeleteAllDialog, isDeleteAllDialogOpen } = todo

  useEffect(() => {
    if (!isDeleteAllDialogOpen) {
      return undefined
    }

    const previousOverflow = document.body.style.overflow

    document.body.style.overflow = 'hidden'

    function handleKeyDown(event) {
      if (event.key === 'Escape') {
        closeDeleteAllDialog()
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [closeDeleteAllDialog, isDeleteAllDialogOpen])

  return (
    <main className="relative min-h-screen overflow-hidden px-4 py-6 sm:px-6 lg:px-8">
      <div className="pointer-events-none fixed -right-16 top-[-5rem] z-0 h-72 w-72 rounded-full bg-[rgba(120,96,255,0.16)] blur-[70px]" />
      <div className="pointer-events-none fixed -left-20 bottom-32 z-0 h-80 w-80 rounded-full bg-[rgba(255,198,228,0.18)] blur-[70px]" />

      <div className="relative z-10 mx-auto max-w-[1460px]">
        <div className="grid gap-6 xl:grid-cols-[290px_minmax(0,1fr)_360px]">
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

        <footer className="mt-8 pb-2 text-center">
          <p className="text-sm leading-6 text-[#6f6890]">
            &copy; 2026{' '}
            <a
              className="text-[#4a77d2] transition-colors duration-200 hover:text-[#315ebe]"
              href="mailto:anselmusrusdiatmaja"
            >
              Anselmus R
            </a>
            . All rights reserved. &bull; Made with{' '}
            <span className="text-[#f04d74]" aria-hidden="true">
              &hearts;
            </span>
          </p>
        </footer>
      </div>

      {isDeleteAllDialogOpen && (
        <DeleteAllDialog
          taskCount={todo.totalTasksCount}
          onCancel={closeDeleteAllDialog}
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
    </main>
  )
}

export default App
