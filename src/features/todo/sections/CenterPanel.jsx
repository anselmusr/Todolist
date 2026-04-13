import { formatClock, formatCompactDate, formatDateTime } from '../utils/date'
import { isOverdue } from '../utils/tasks'
import {
  CalendarIcon,
  CheckIcon,
  ClockIcon,
  SparkIcon,
  TrashIcon,
} from '../ui/TodoIcons'
import {
  EmptyState,
  PriorityBadge,
  ProgressRing,
  StatusBadge,
  SummaryTile,
} from '../ui/TodoPrimitives'

// Panel tengah adalah area kerja utama: hero summary, strip tanggal, dan daftar task aktif.
export function CenterPanel({
  activeProfileName,
  activeProfileRole,
  activeTasksCount,
  completionRate,
  dateStrip,
  doneTasksCount,
  feedback,
  feedbackClassName,
  handleDeleteTask,
  handleToggleTask,
  now,
  overdueTasksCount,
  selectedDate,
  selectedDateCompletionRate,
  selectedDateLabel,
  selectedDoneTasksCount,
  selectedTasks,
  setSelectedDate,
  todayKey,
  todayTaskCount,
}) {
  return (
    <section className="space-y-6">
      <section
        className="hero-card panel-fade overflow-hidden p-6 sm:p-7"
        style={{ '--delay': '100ms' }}
      >
        <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr] lg:items-start">
          <div>
            <p className="hero-kicker">Premium productivity workspace</p>
            <h2 className="mt-3 font-display text-4xl font-extrabold leading-[1.05] text-white sm:text-[3.25rem]">
              Organize your day in a softer, mobile-inspired dashboard.
            </h2>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-white/72 sm:text-base">
              Semua fitur tetap ada: tambah agenda, atur prioritas, filter tanggal,
              cek overdue, lihat yang selesai, dan simpan profil langsung di
              browser.
            </p>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <button
                className="hero-primary-button"
                type="button"
                onClick={() => setSelectedDate(todayKey)}
              >
                Tinjau hari ini
              </button>

              <label className="hero-date-field">
                <CalendarIcon />
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(event) => setSelectedDate(event.target.value)}
                />
              </label>
            </div>

            {feedback && (
              <div
                className={`mt-5 rounded-[24px] border px-4 py-3 text-sm font-semibold ${feedbackClassName}`}
              >
                {feedback.text}
              </div>
            )}

            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              <SummaryTile
                label="Today"
                value={todayTaskCount}
                detail="Agenda aktif untuk hari ini"
              />
              <SummaryTile
                label="Overdue"
                value={overdueTasksCount}
                detail="Yang perlu dibereskan"
                tone="peach"
              />
              <SummaryTile
                label="Selected day"
                value={`${selectedDateCompletionRate}%`}
                detail="Progress pada tanggal dipilih"
                tone="mint"
              />
            </div>
          </div>

          <div className="relative rounded-[32px] border border-white/12 bg-white/10 p-5 shadow-[0_32px_80px_-44px_rgba(24,10,82,0.8)] backdrop-blur-md">
            <div className="absolute -right-10 top-10 h-28 w-28 rounded-full bg-white/12 blur-3xl" />
            <div className="absolute -left-12 bottom-0 h-36 w-36 rounded-full bg-[#ffccf2]/20 blur-3xl" />

            <div className="relative">
              <div className="inline-flex items-center gap-2 rounded-full bg-white/12 px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-white/76">
                <ClockIcon className="h-3.5 w-3.5" />
                {formatClock(now)}
              </div>

              <div className="mt-6 grid gap-5 sm:grid-cols-[160px_1fr] sm:items-center">
                <ProgressRing value={completionRate} />

                <div className="space-y-3">
                  <div className="hero-mini-card">
                    <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white/60">
                      Selected day
                    </span>
                    <p className="mt-1 font-display text-xl font-extrabold text-white">
                      {formatCompactDate(selectedDate)}
                    </p>
                  </div>

                  <div className="hero-mini-card">
                    <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white/60">
                      Profile
                    </span>
                    <p className="mt-1 font-display text-lg font-extrabold text-white">
                      {activeProfileName}
                    </p>
                    <p className="mt-1 text-sm text-white/70">{activeProfileRole}</p>
                  </div>
                </div>
              </div>

              <div className="mt-5 grid gap-3 sm:grid-cols-3">
                <div className="hero-chip">
                  <span>Open</span>
                  <strong>{activeTasksCount}</strong>
                </div>
                <div className="hero-chip">
                  <span>Done</span>
                  <strong>{doneTasksCount}</strong>
                </div>
                <div className="hero-chip">
                  <span>Overdue</span>
                  <strong>{overdueTasksCount}</strong>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="surface-card panel-fade p-6" style={{ '--delay': '160ms' }}>
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="section-kicker">Today&apos;s Tasks</p>
            <h2 className="section-title mt-2">Agenda untuk {selectedDateLabel}</h2>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-[#756f94]">
              Tampilan ini tetap fokus pada tugas aktif di tanggal yang dipilih,
              dengan nuansa card layout yang lebih dekat ke referensi Figma.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <span className="mini-pill">
              <SparkIcon className="h-3.5 w-3.5" />
              {selectedTasks.length} active
            </span>
            <span className="mini-pill">
              <CheckIcon className="h-3.5 w-3.5" />
              {selectedDoneTasksCount} done
            </span>
          </div>
        </div>

        <div className="mt-6 grid gap-3 sm:grid-cols-5">
          {dateStrip.map((item) => {
            const isSelected = item.dateKey === selectedDate
            const isToday = item.dateKey === todayKey

            return (
              <button
                key={item.dateKey}
                className={`date-chip ${isSelected ? 'date-chip-active' : ''}`}
                type="button"
                onClick={() => setSelectedDate(item.dateKey)}
              >
                <span className="text-[11px] font-semibold uppercase tracking-[0.22em]">
                  {item.weekday}
                </span>
                <strong className="mt-2 font-display text-2xl font-extrabold">
                  {item.dayNumber}
                </strong>
                <span className="mt-1 text-sm">{item.month}</span>
                {isToday && <span className="mt-3 h-1.5 w-1.5 rounded-full bg-current" />}
              </button>
            )
          })}
        </div>

        <div className="mt-6 space-y-4">
          {selectedTasks.length ? (
            selectedTasks.map((task) => (
              <article key={task.id} className="task-card">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
                  <button
                    className="task-check-button"
                    type="button"
                    aria-label={`Tandai ${task.title} selesai`}
                    onClick={() => handleToggleTask(task.id)}
                  >
                    <CheckIcon />
                  </button>

                  <div className="min-w-0 flex-1">
                    <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
                      <div className="min-w-0">
                        <p className="font-display text-xl font-extrabold leading-snug text-[#1b1635]">
                          {task.title}
                        </p>
                        <p className="mt-2 text-sm text-[#756f94]">
                          Dibuat {formatDateTime(task.createdAt)}
                        </p>
                      </div>

                      <button
                        className="ghost-button shrink-0 text-[#d24d75] hover:border-[#ffd4df] hover:bg-[#fff1f5]"
                        type="button"
                        onClick={() => handleDeleteTask(task.id)}
                      >
                        <TrashIcon />
                        Delete
                      </button>
                    </div>

                    <div className="mt-4 flex flex-wrap gap-2">
                      <PriorityBadge priority={task.priority} />
                      <span className="mini-pill">
                        <CalendarIcon className="h-3.5 w-3.5" />
                        {formatCompactDate(task.dueDate)}
                      </span>
                      <StatusBadge overdue={isOverdue(task, todayKey)} />
                    </div>
                  </div>
                </div>
              </article>
            ))
          ) : (
            <EmptyState
              title="Belum ada agenda aktif di tanggal ini"
              description="Pilih tanggal lain atau tambahkan tugas baru dari panel kanan agar daftar kembali terisi."
            />
          )}
        </div>
      </section>
    </section>
  )
}
