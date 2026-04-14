import { useEffect, useRef } from 'react'

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
  const selectedDateChipRef = useRef(null)

  useEffect(() => {
    if (!selectedDateChipRef.current) {
      return
    }

    if (!window.matchMedia('(max-width: 639px)').matches) {
      return
    }

    selectedDateChipRef.current.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
      inline: 'center',
    })
  }, [dateStrip, selectedDate])

  return (
    <section className="dashboard-stack">
      <section className="hero-card panel-fade panel-delay-100 dashboard-hero-section">
        <div className="dashboard-hero-grid">
          <div className="dashboard-hero-copy">
            <div>
              <p className="hero-kicker">Workspace</p>
              <h2 className="dashboard-hero-title">
                Organize your day in a softer, mobile-inspired dashboard.
              </h2>
              <p className="dashboard-hero-description">
                Semua fitur tetap ada: tambah agenda, atur prioritas, filter tanggal,
                cek overdue, lihat yang selesai, dan simpan profil langsung di
                browser.
              </p>
            </div>

            <div className="dashboard-hero-actions">
              <div className="dashboard-hero-action-row">
                <button
                  className="hero-primary-button"
                  type="button"
                  onClick={() => setSelectedDate(todayKey)}
                >
                  Tinjau hari ini
                </button>

                <label className="hero-date-field">
                  <input
                    type="date"
                    value={selectedDate}
                    onChange={(event) => setSelectedDate(event.target.value)}
                  />
                </label>
              </div>

              {feedback && feedback.surface !== 'toast' && (
                <div className={`feedback-banner ${feedbackClassName}`}>
                  {feedback.text}
                </div>
              )}
            </div>
          </div>

          <div className="hero-glass-card">
            <div className="hero-glass-orb hero-glass-orb-top" />
            <div className="hero-glass-orb hero-glass-orb-bottom" />

            <div className="hero-glass-body">
              <div className="hero-time-pill">
                <ClockIcon className="icon-sm" />
                {formatClock(now)}
              </div>

              <div className="hero-progress-stack">
                <div className="hero-progress-wrap">
                  <ProgressRing value={completionRate} />
                </div>

                <div className="hero-mini-grid">
                  <div className="hero-mini-card">
                    <span className="hero-meta-label">Selected day</span>
                    <p className="hero-meta-value">{formatCompactDate(selectedDate)}</p>
                  </div>

                  <div className="hero-mini-card">
                    <span className="hero-meta-label">Profile</span>
                    <p className="hero-profile-value">{activeProfileName}</p>
                    <p className="hero-profile-role">{activeProfileRole}</p>
                  </div>
                </div>
              </div>

              <div className="hero-chip-grid">
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

        <div className="dashboard-summary-grid">
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
      </section>

      <section className="surface-card panel-fade panel-delay-160 dashboard-agenda-section">
        <div className="agenda-header">
          <div>
            <p className="section-kicker">Today&apos;s Tasks</p>
            <h2 className="section-title section-title-offset">
              Agenda untuk {selectedDateLabel}
            </h2>
            <p className="agenda-description">
              Tampilan ini tetap fokus pada tugas aktif di tanggal yang dipilih,
              dengan nuansa card layout yang lebih dekat ke referensi Figma.
            </p>
          </div>

          <div className="agenda-pill-row">
            <span className="mini-pill">
              <SparkIcon className="icon-sm" />
              {selectedTasks.length} active
            </span>
            <span className="mini-pill">
              <CheckIcon className="icon-sm" />
              {selectedDoneTasksCount} done
            </span>
          </div>
        </div>

        <div className="date-strip-grid">
          {dateStrip.map((item) => {
            const isSelected = item.dateKey === selectedDate
            const isToday = item.dateKey === todayKey

            return (
              <button
                key={item.dateKey}
                className={`date-chip ${isSelected ? 'date-chip-active' : ''}`}
                type="button"
                ref={isSelected ? selectedDateChipRef : null}
                onClick={() => setSelectedDate(item.dateKey)}
              >
                <span className="date-chip-label">{item.weekday}</span>
                <strong className="date-chip-value">{item.dayNumber}</strong>
                <span className="date-chip-month">{item.month}</span>
                {isToday && <span className="date-chip-today-dot" />}
              </button>
            )
          })}
        </div>

        <div className="task-list">
          {selectedTasks.length ? (
            selectedTasks.map((task) => (
              <article key={task.id} className="task-card">
                <div className="task-layout">
                  <button
                    className="task-check-button"
                    type="button"
                    aria-label={`Tandai ${task.title} selesai`}
                    onClick={() => handleToggleTask(task.id)}
                  >
                    <CheckIcon />
                  </button>

                  <div className="task-content">
                    <div className="task-header">
                      <div className="task-copy">
                        <p className="task-title">{task.title}</p>
                        <p className="task-created">Dibuat {formatDateTime(task.createdAt)}</p>
                      </div>

                      <button
                        className="ghost-button ghost-button-danger task-delete-button"
                        type="button"
                        onClick={() => handleDeleteTask(task.id)}
                      >
                        <TrashIcon />
                        Delete
                      </button>
                    </div>

                    <div className="task-meta-row">
                      <PriorityBadge priority={task.priority} />
                      <span className="mini-pill">
                        <CalendarIcon className="icon-sm" />
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
