import { useState } from 'react'

import { formatCompactDate } from '../utils/date'
import { ClockIcon, CalendarIcon } from '../ui/TodoIcons'
import { PriorityBadge, SummaryTile } from '../ui/TodoPrimitives'
import {
  cn,
  dangerButtonClass,
  fieldBaseClass,
  fieldLabelClass,
  ghostButtonClass,
  iconSmClass,
  miniPillClass,
  panelDelayClassNames,
  panelFadeClass,
  secondaryButtonClass,
  sectionKickerClass,
  sectionTitleClass,
  softIconClass,
  surfaceCardClass,
} from '../ui/classes'

const introCardClass = cn(
  surfaceCardClass,
  panelFadeClass,
  panelDelayClassNames[60],
  'overflow-hidden p-6',
)

const focusCardClass = cn(
  surfaceCardClass,
  panelFadeClass,
  panelDelayClassNames[120],
  'p-6',
)

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
    <aside className="space-y-6">
      <section className={introCardClass}>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="mt-2 font-display text-[1.75rem] font-extrabold leading-tight text-[#1b1635]">
              Task Management & To-do List App
            </h1>
          </div>
        </div>

        <div className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-1">
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
            <div className="mt-6 space-y-4">
              <label className="block">
                <span className={fieldLabelClass}>Display name</span>
                <input
                  className={fieldBaseClass}
                  type="text"
                  placeholder="Masukkan nama user"
                  value={profile.name}
                  onChange={(event) => updateProfile('name', event.target.value)}
                />
              </label>

              <label className="block">
                <span className={fieldLabelClass}>Role</span>
                <input
                  className={fieldBaseClass}
                  type="text"
                  placeholder="Masukkan jabatan"
                  value={profile.role}
                  onChange={(event) => updateProfile('role', event.target.value)}
                />
              </label>
            </div>

            <div className="mt-4 flex items-center justify-center gap-3">
              {isProfileComplete ? (
                <button
                  className={secondaryButtonClass}
                  type="button"
                  onClick={() => setIsEditingProfile(false)}
                >
                  Selesai edit
                </button>
              ) : (
                <p className="text-center text-sm leading-6 text-[#7a729c]">
                  Isi nama dan role agar form bisa disembunyikan otomatis.
                </p>
              )}
            </div>
          </>
        ) : (
          <div className="mt-5 flex justify-center">
            <button
              className={ghostButtonClass}
              type="button"
              onClick={() => setIsEditingProfile(true)}
            >
              Edit profil
            </button>
          </div>
        )}
      </section>

      <section className={focusCardClass}>
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className={sectionKickerClass}>Quick Focus</p>
            <h2 className={cn(sectionTitleClass, 'mt-2')}>Planner shortcuts</h2>
          </div>
          <div className={cn(softIconClass, 'bg-[#fff5e9] text-[#c87021]')}>
            <ClockIcon />
          </div>
        </div>

        <div className="mt-5 rounded-[28px] border border-[#ebe4ff] bg-[#faf8ff] p-4">
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#857db1]">
            Next up
          </p>
          {nextTask ? (
            <>
              <p className="mt-3 font-display text-xl font-extrabold text-[#1b1635]">
                {nextTask.title}
              </p>
              <div className="mt-3 flex flex-wrap items-center gap-2">
                <PriorityBadge priority={nextTask.priority} />
                <span className={miniPillClass}>
                  <CalendarIcon className={iconSmClass} />
                  {formatCompactDate(nextTask.dueDate)}
                </span>
              </div>
            </>
          ) : (
            <p className="mt-3 text-sm leading-6 text-[#756f94]">
              Belum ada agenda aktif. Tambahkan task baru untuk mulai mengatur
              hari ini.
            </p>
          )}
        </div>

        <div className="mt-5 space-y-3">
          <button
            className={cn(dangerButtonClass, 'w-full justify-center')}
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
