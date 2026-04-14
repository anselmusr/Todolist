import { PRIORITY_META } from '../constants'
import { formatCompactDate, formatDateTime } from '../utils/date'
import { CheckIcon, SparkIcon } from '../ui/TodoIcons'
import {
  EmptyState,
  PriorityBadge,
  StatusBadge,
} from '../ui/TodoPrimitives'

// Rail kanan memusatkan aksi create task dan daftar status sekunder seperti overdue/done.
export function RightSidebar({
  doneTasks,
  form,
  handleDeleteTask,
  handleSubmit,
  overdueTasks,
  selectedDate,
  setSelectedDate,
  syncFormDueDate,
  todayKey,
  updateForm,
}) {
  return (
    <aside className="space-y-6">
      <section className="surface-card panel-fade p-6" style={{ '--delay': '140ms' }}>
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="section-kicker">Add Project</p>
            <h2 className="section-title mt-2">Create a new task card</h2>
            <p className="mt-2 text-sm leading-6 text-[#756f94]">
              Masukkan agenda, pilih tanggal, lalu tentukan prioritas sebelum
              menekan submit.
            </p>
          </div>
        </div>

        <form className="mt-6 space-y-5" onSubmit={handleSubmit}>
          <label className="block">
            <span className="field-label">Task detail</span>
            <textarea
              className="field-base resize-none"
              placeholder="Contoh: Selesaikan wireframe homepage untuk presentasi besok pagi."
              value={form.title}
              onChange={(event) => updateForm('title', event.target.value)}
            />
          </label>

          <label className="block">
            <span className="field-label">Due date</span>
            <input
              className="field-base"
              type="date"
              value={form.dueDate}
              onChange={(event) => updateForm('dueDate', event.target.value)}
            />
          </label>

          <div>
            <span className="field-label">Priority</span>
            <div className="mt-3 grid grid-cols-3 gap-3">
              {Object.entries(PRIORITY_META).map(([priorityKey, meta]) => {
                const isSelected = form.priority === priorityKey

                return (
                  <button
                    key={priorityKey}
                    className={`priority-option ${meta.buttonClassName} ${
                      isSelected ? 'priority-option-active' : ''
                    }`}
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
            <button className="primary-button w-full justify-center" type="submit">
              Submit task
            </button>
            <div className="grid gap-3 sm:grid-cols-2">
              <button
                className="secondary-button justify-center"
                type="button"
                onClick={() => syncFormDueDate(todayKey)}
              >
                Hari ini
              </button>
              <button
                className="ghost-button justify-center"
                type="button"
                onClick={() => syncFormDueDate(selectedDate)}
              >
                Pakai filter
              </button>
            </div>
          </div>
        </form>
      </section>

      <section className="surface-card panel-fade p-6" style={{ '--delay': '200ms' }}>
        <div className="flex items-end justify-between gap-3">
          <div>
            <p className="section-kicker">Overdue</p>
            <h2 className="section-title mt-2">Agenda yang terlambat</h2>
          </div>
          <span className="mini-pill border-[#ffe3c4] bg-[#fff5e9] text-[#c87021]">
            {overdueTasks.length} item
          </span>
        </div>

        <div className="mt-5 space-y-3 xl:max-h-[340px] xl:overflow-auto xl:pr-1">
          {overdueTasks.length ? (
            overdueTasks.map((task) => (
              <article key={task.id} className="list-card border-[#ffe8d4] bg-[#fff8ef]">
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
                    className="secondary-button justify-center"
                    type="button"
                    onClick={() => {
                      setSelectedDate(task.dueDate)
                      syncFormDueDate(task.dueDate)
                    }}
                  >
                    Buka tanggal
                  </button>
                  <button
                    className="ghost-button justify-center text-[#d24d75] hover:border-[#ffd4df] hover:bg-[#fff1f5]"
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

      <section className="surface-card panel-fade p-6" style={{ '--delay': '240ms' }}>
        <div className="flex items-end justify-between gap-3">
          <div>
            <p className="section-kicker">Done</p>
            <h2 className="section-title mt-2">Daftar yang selesai</h2>
          </div>
          <span className="mini-pill border-[#d7f5ea] bg-[#effcf7] text-[#17835c]">
            {doneTasks.length} selesai
          </span>
        </div>

        <div className="mt-5 space-y-3 xl:max-h-[360px] xl:overflow-auto xl:pr-1">
          {doneTasks.length ? (
            doneTasks.map((task) => (
              <article key={task.id} className="list-card border-[#d8f5ea] bg-[#effcf7]">
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
                  className="ghost-button mt-4 w-full justify-center text-[#d24d75] hover:border-[#ffd4df] hover:bg-[#fff1f5]"
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
