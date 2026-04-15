import { PRIORITY_META } from '../constants'
import { formatCompactDate, formatDateTime } from '../utils/date'
import { CheckIcon } from '../ui/TodoIcons'
import {
  EmptyState,
  PriorityBadge,
  StatusBadge,
} from '../ui/TodoPrimitives'
import {
  cn,
  fieldBaseClass,
  fieldLabelClass,
  ghostButtonClass,
  listCardClass,
  miniPillClass,
  panelDelayClassNames,
  panelFadeClass,
  primaryButtonClass,
  priorityOptionActiveClass,
  priorityOptionBaseClass,
  secondaryButtonClass,
  sectionKickerClass,
  sectionTitleClass,
  surfaceCardClass,
  ghostDangerClass,
} from '../ui/classes'

const formCardClass = cn(
  surfaceCardClass,
  panelFadeClass,
  panelDelayClassNames[140],
  'p-6',
)

const overdueCardClass = cn(
  surfaceCardClass,
  panelFadeClass,
  panelDelayClassNames[200],
  'p-6',
)

const doneCardClass = cn(
  surfaceCardClass,
  panelFadeClass,
  panelDelayClassNames[240],
  'p-6',
)

const statusPillBaseClass = cn(
  miniPillClass,
  'min-h-[3.15rem] flex-col justify-center gap-0 px-3 pb-2 pt-3 text-center leading-none',
)

// Rail kanan memusatkan aksi create task dan daftar status sekunder seperti overdue/done.
export function RightSidebar({
  doneTasks,
  form,
  handleDeleteTask,
  handleSubmit,
  overdueTasks,
  setSelectedDate,
  syncFormDueDate,
  updateForm,
}) {
  return (
    <aside className="space-y-6">
      <section className={formCardClass}>
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className={sectionKickerClass}>Add Project</p>
            <h2 className={cn(sectionTitleClass, 'mt-2')}>Create a new task card</h2>
            <p className="mt-2 text-sm leading-6 text-[#756f94]">
              Masukkan agenda, pilih tanggal, lalu tentukan prioritas sebelum
              menekan submit.
            </p>
          </div>
        </div>

        <form className="mt-6 space-y-5" onSubmit={handleSubmit}>
          <label className="block">
            <span className={fieldLabelClass}>Task detail</span>
            <textarea
              className={cn(fieldBaseClass, 'resize-none')}
              placeholder="Contoh: Selesaikan wireframe homepage untuk presentasi besok pagi."
              value={form.title}
              onChange={(event) => updateForm('title', event.target.value)}
            />
          </label>

          <label className="block">
            <span className={fieldLabelClass}>Due date</span>
            <input
              className={fieldBaseClass}
              type="date"
              value={form.dueDate}
              onChange={(event) => updateForm('dueDate', event.target.value)}
            />
          </label>

          <div>
            <span className={fieldLabelClass}>Priority</span>
            <div className="mt-3 grid grid-cols-3 gap-3">
              {Object.entries(PRIORITY_META).map(([priorityKey, meta]) => {
                const isSelected = form.priority === priorityKey

                return (
                  <button
                    key={priorityKey}
                    className={cn(
                      priorityOptionBaseClass,
                      isSelected ? priorityOptionActiveClass : meta.buttonClassName,
                    )}
                    type="button"
                    onClick={() => updateForm('priority', priorityKey)}
                  >
                    {meta.label}
                  </button>
                )
              })}
            </div>
          </div>

          <div className="grid gap-3">
            <button className={cn(primaryButtonClass, 'w-full justify-center')} type="submit">
              Submit task
            </button>
          </div>
        </form>
      </section>

      <section className={overdueCardClass}>
        <div className="flex items-end justify-between gap-3">
          <div>
            <p className={sectionKickerClass}>Overdue</p>
            <h2 className={cn(sectionTitleClass, 'mt-2')}>Agenda yang terlambat</h2>
          </div>
          <span
            className={cn(
              statusPillBaseClass,
              'min-w-[3.35rem] border-[#ffe3c4] bg-[#fff5e9] text-[#c87021]',
            )}
          >
            <span className="block font-display text-sm font-extrabold leading-none [font-variant-numeric:tabular-nums]">
              {overdueTasks.length}
            </span>
            <span className="mt-1 block text-[11px] font-semibold leading-none">item</span>
          </span>
        </div>

        <div className="mt-5 space-y-3 xl:max-h-[340px] xl:overflow-auto xl:pr-1">
          {overdueTasks.length ? (
            overdueTasks.map((task) => (
              <article
                key={task.id}
                className={cn(listCardClass, 'border-[#ffe8d4] bg-[#fff8ef]')}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="font-semibold leading-6 text-[#1b1635]">{task.title}</p>
                    <p className="mt-2 text-sm text-[#c87021]">
                      Deadline {formatCompactDate(task.dueDate)}
                    </p>
                  </div>
                  <PriorityBadge priority={task.priority} />
                </div>

                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  <button
                    className={cn(secondaryButtonClass, 'justify-center')}
                    type="button"
                    onClick={() => {
                      setSelectedDate(task.dueDate)
                      syncFormDueDate(task.dueDate)
                    }}
                  >
                    Buka tanggal
                  </button>
                  <button
                    className={cn(
                      ghostButtonClass,
                      ghostDangerClass,
                      'justify-center',
                    )}
                    type="button"
                    onClick={() => handleDeleteTask(task.id)}
                  >
                    Delete
                  </button>
                </div>
              </article>
            ))
          ) : (
            <EmptyState
              title="Tidak ada overdue"
              description="Semua agenda masih sesuai jadwal atau sudah berhasil diselesaikan."
            />
          )}
        </div>
      </section>

      <section className={doneCardClass}>
        <div className="flex items-end justify-between gap-3">
          <div>
            <p className={sectionKickerClass}>Done</p>
            <h2 className={cn(sectionTitleClass, 'mt-2')}>Daftar yang selesai</h2>
          </div>
          <span
            className={cn(
              statusPillBaseClass,
              'min-w-[4.6rem] border-[#d7f5ea] bg-[#effcf7] text-[#17835c]',
            )}
          >
            <span className="block font-display text-sm font-extrabold leading-none [font-variant-numeric:tabular-nums]">
              {doneTasks.length}
            </span>
            <span className="mt-1 block text-[11px] font-semibold leading-none">
              selesai
            </span>
          </span>
        </div>

        <div className="mt-5 space-y-3 xl:max-h-[360px] xl:overflow-auto xl:pr-1">
          {doneTasks.length ? (
            doneTasks.map((task) => (
              <article
                key={task.id}
                className={cn(listCardClass, 'border-[#d8f5ea] bg-[#effcf7]')}
              >
                <div className="flex items-start gap-3">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[18px] bg-[#17835c] text-white shadow-[0_20px_28px_-24px_rgba(23,131,92,0.9)]">
                    <CheckIcon />
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="font-semibold leading-6 text-[#1b1635] line-through decoration-2">
                      {task.title}
                    </p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      <PriorityBadge priority={task.priority} />
                      <StatusBadge done />
                    </div>
                    <p className="mt-3 text-xs text-[#4b8d6d]">
                      Selesai pada {formatDateTime(task.completedAt ?? task.createdAt)}
                    </p>
                  </div>
                </div>

                <button
                  className={cn(
                    ghostButtonClass,
                    ghostDangerClass,
                    'mt-4 w-full justify-center',
                  )}
                  type="button"
                  onClick={() => handleDeleteTask(task.id)}
                >
                  Delete
                </button>
              </article>
            ))
          ) : (
            <EmptyState
              title="Belum ada tugas selesai"
              description="Centang task pada daftar utama agar agenda pindah otomatis ke panel Done."
            />
          )}
        </div>
      </section>
    </aside>
  )
}
