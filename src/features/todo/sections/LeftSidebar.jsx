import { formatCompactDate } from '../utils/date'
import { getInitials } from '../utils/tasks'
import { ClockIcon, CalendarIcon } from '../ui/TodoIcons'
import { PriorityBadge, SummaryTile } from '../ui/TodoPrimitives'

// Rail kiri menampung identitas user, statistik singkat, dan shortcut planner.
export function LeftSidebar({
  activeProfileName,
  activeProfileRole,
  activeTasksCount,
  doneTasksCount,
  handleDeleteAll,
  nextTask,
  profile,
  selectedDate,
  setSelectedDate,
  syncFormDueDate,
  todayKey,
  updateProfile,
}) {
  return (
    <aside className="sidebar-stack">
      <section className="surface-card panel-fade panel-delay-60 left-sidebar-intro-card">
        <div className="sidebar-card-header">
          <div>
            <h1 className="sidebar-app-title">
              Task Management & To-do List App
            </h1>
          </div>
        </div>

        <div className="profile-summary-card">
          <div className="profile-summary-layout">
            <div className="profile-avatar">
              {getInitials(activeProfileName)}
            </div>
            <div className="profile-copy">
              <p className="profile-name">{activeProfileName}</p>
              <p className="profile-role">{activeProfileRole}</p>
            </div>
          </div>

          <p className="profile-description">
            Identitas ini tetap disimpan di browser, jadi tampilan akan terasa
            personal setiap kali app dibuka lagi.
          </p>
        </div>

        <div className="profile-field-stack">
          <label className="field-group">
            <span className="field-label">Display name</span>
            <input
              className="field-base"
              type="text"
              placeholder="Masukkan nama user"
              value={profile.name}
              onChange={(event) => updateProfile('name', event.target.value)}
            />
          </label>

          <label className="field-group">
            <span className="field-label">Role</span>
            <input
              className="field-base"
              type="text"
              placeholder="Masukkan jabatan"
              value={profile.role}
              onChange={(event) => updateProfile('role', event.target.value)}
            />
          </label>
        </div>

        <div className="profile-summary-grid">
          <SummaryTile
            label="Open tasks"
            value={activeTasksCount}
            detail="Agenda yang masih aktif"
          />
          <SummaryTile
            label="Done"
            value={doneTasksCount}
            detail="Tugas yang sudah selesai"
            tone="mint"
          />
        </div>
      </section>

      <section className="surface-card panel-fade panel-delay-120 left-sidebar-focus-card">
        <div className="section-heading-row section-heading-row-center">
          <div>
            <p className="section-kicker">Quick Focus</p>
            <h2 className="section-title section-title-offset">Planner shortcuts</h2>
          </div>
          <div className="soft-icon soft-icon-peach">
            <ClockIcon />
          </div>
        </div>

        <div className="planner-focus-card">
          <p className="focus-kicker">Next up</p>
          {nextTask ? (
            <>
              <p className="focus-task-title">{nextTask.title}</p>
              <div className="focus-meta-row">
                <PriorityBadge priority={nextTask.priority} />
                <span className="mini-pill">
                  <CalendarIcon className="icon-sm" />
                  {formatCompactDate(nextTask.dueDate)}
                </span>
              </div>
            </>
          ) : (
            <p className="focus-empty-text">
              Belum ada agenda aktif. Tambahkan task baru untuk mulai mengatur
              hari ini.
            </p>
          )}
        </div>

        <div className="focus-action-stack">
          <button
            className="secondary-button button-full"
            type="button"
            onClick={() => {
              setSelectedDate(todayKey)
              syncFormDueDate(todayKey)
            }}
          >
            Gunakan hari ini
          </button>
          <button
            className="ghost-button button-full"
            type="button"
            onClick={() => syncFormDueDate(selectedDate)}
          >
            Samakan tanggal form dengan filter
          </button>
          <button
            className="danger-button button-full"
            type="button"
            onClick={handleDeleteAll}
          >
            Hapus semua tugas
          </button>
        </div>
      </section>
    </aside>
  )
}
