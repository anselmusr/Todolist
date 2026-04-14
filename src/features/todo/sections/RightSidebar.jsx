import { PRIORITY_META } from '../constants'
import { formatCompactDate, formatDateTime } from '../utils/date'
import { CheckIcon } from '../ui/TodoIcons'
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
    <aside className="sidebar-stack">
      <section className="surface-card panel-fade panel-delay-140 right-sidebar-card">
        <div className="section-heading-row section-heading-row-start">
          <div>
            <p className="section-kicker">Add Project</p>
            <h2 className="section-title section-title-offset">Create a new task card</h2>
            <p className="panel-intro-copy">
              Masukkan agenda, pilih tanggal, lalu tentukan prioritas sebelum
              menekan submit.
            </p>
          </div>
        </div>

        <form className="task-form-layout" onSubmit={handleSubmit}>
          <label className="field-group">
            <span className="field-label">Task detail</span>
            <textarea
              className="field-base textarea-field"
              placeholder="Contoh: Selesaikan wireframe homepage untuk presentasi besok pagi."
              value={form.title}
              onChange={(event) => updateForm('title', event.target.value)}
            />
          </label>

          <label className="field-group">
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
            <div className="priority-grid">
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

          <div className="button-stack">
            <button className="primary-button button-full" type="submit">
              Submit task
            </button>
            <div className="button-grid-two">
              <button
                className="secondary-button button-center"
                type="button"
                onClick={() => syncFormDueDate(todayKey)}
              >
                Hari ini
              </button>
              <button
                className="ghost-button button-center"
                type="button"
                onClick={() => syncFormDueDate(selectedDate)}
              >
                Pakai filter
              </button>
            </div>
          </div>
        </form>
      </section>

      <section className="surface-card panel-fade panel-delay-200 right-sidebar-card">
        <div className="section-heading-row section-heading-row-end">
          <div>
            <p className="section-kicker">Overdue</p>
            <h2 className="section-title section-title-offset">Agenda yang terlambat</h2>
          </div>
          <span className="mini-pill status-pill status-pill-overdue">
            <span className="status-pill-count">{overdueTasks.length}</span>
            <span className="status-pill-label">item</span>
          </span>
        </div>

        <div className="status-list-overdue">
          {overdueTasks.length ? (
            overdueTasks.map((task) => (
              <article key={task.id} className="list-card overdue-task-card">
                <div className="status-card-header">
                  <div className="status-card-copy">
                    <p className="overdue-task-title">{task.title}</p>
                    <p className="overdue-task-date">
                      Deadline {formatCompactDate(task.dueDate)}
                    </p>
                  </div>
                  <PriorityBadge priority={task.priority} />
                </div>

                <div className="status-card-actions">
                  <button
                    className="secondary-button button-center"
                    type="button"
                    onClick={() => {
                      setSelectedDate(task.dueDate)
                      syncFormDueDate(task.dueDate)
                    }}
                  >
                    Buka tanggal
                  </button>
                  <button
                    className="ghost-button ghost-button-danger button-center"
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

      <section className="surface-card panel-fade panel-delay-240 right-sidebar-card">
        <div className="section-heading-row section-heading-row-end">
          <div>
            <p className="section-kicker">Done</p>
            <h2 className="section-title section-title-offset">Daftar yang selesai</h2>
          </div>
          <span className="mini-pill status-pill status-pill-done">
            <span className="status-pill-count">{doneTasks.length}</span>
            <span className="status-pill-label">selesai</span>
          </span>
        </div>

        <div className="status-list-done">
          {doneTasks.length ? (
            doneTasks.map((task) => (
              <article key={task.id} className="list-card done-task-card">
                <div className="done-task-layout">
                  <div className="done-check-icon">
                    <CheckIcon />
                  </div>

                  <div className="done-task-content">
                    <p className="done-task-title">{task.title}</p>
                    <div className="done-task-meta">
                      <PriorityBadge priority={task.priority} />
                      <StatusBadge done />
                    </div>
                    <p className="done-task-date">
                      Selesai pada {formatDateTime(task.completedAt ?? task.createdAt)}
                    </p>
                  </div>
                </div>

                <button
                  className="ghost-button ghost-button-danger button-full done-delete-button"
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
