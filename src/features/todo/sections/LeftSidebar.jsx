import { useState } from 'react'

import { formatCompactDate } from '../utils/date'
import { ClockIcon, CalendarIcon } from '../ui/TodoIcons'
import { PriorityBadge, SummaryTile } from '../ui/TodoPrimitives'

// Rail kiri menampung identitas user, statistik singkat, dan shortcut planner.
export function LeftSidebar({
  activeTasksCount,
  doneTasksCount,
  handleDeleteAll,
  nextTask,
  profile,
  updateProfile,
}) {
  const isProfileComplete = Boolean(profile.name.trim() && profile.role.trim())
  const [isEditingProfile, setIsEditingProfile] = useState(!isProfileComplete)
  const shouldShowProfileFields = isEditingProfile || !isProfileComplete

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

        {shouldShowProfileFields ? (
          <>
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

            <div className="profile-edit-row">
              {isProfileComplete ? (
                <button
                  className="secondary-button"
                  type="button"
                  onClick={() => setIsEditingProfile(false)}
                >
                  Selesai edit
                </button>
              ) : (
                <p className="profile-edit-hint">
                  Isi nama dan role agar form bisa disembunyikan otomatis.
                </p>
              )}
            </div>
          </>
        ) : (
          <div className="profile-toolbar">
            <button
              className="ghost-button"
              type="button"
              onClick={() => setIsEditingProfile(true)}
            >
              Edit profil
            </button>
          </div>
        )}
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
