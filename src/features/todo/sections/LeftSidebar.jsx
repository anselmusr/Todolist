import { formatCompactDate } from '../utils/date'
import { getInitials } from '../utils/tasks'
import { ClockIcon, CalendarIcon, SparkIcon } from '../ui/TodoIcons'
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
    <aside className="space-y-6">
      <section
        className="surface-card panel-fade overflow-hidden p-6"
        style={{ '--delay': '60ms' }}
      >
        <div className="flex items-center justify-between">
          <div>
            <h1 className="mt-2 font-display text-[1.75rem] font-extrabold leading-tight text-[#1b1635]">
              Task Management & To-do List App
            </h1>
          </div>
        </div>

        <div className="mt-6 rounded-[28px] bg-[linear-gradient(180deg,rgba(244,240,255,0.95)_0%,rgba(255,255,255,0.96)_100%)] p-4">
          <div className="flex items-center gap-4">
            <div className="flex h-[3.75rem] w-[3.75rem] items-center justify-center rounded-[24px] bg-[linear-gradient(135deg,#7b61ff_0%,#5b38f2_100%)] font-display text-xl font-extrabold text-white shadow-[0_24px_36px_-24px_rgba(91,56,242,0.9)]">
              {getInitials(activeProfileName)}
            </div>
            <div className="min-w-0">
              <p className="truncate font-display text-xl font-extrabold text-[#1b1635]">
                {activeProfileName}
              </p>
              <p className="mt-1 truncate text-sm text-[#746d95]">
                {activeProfileRole}
              </p>
            </div>
          </div>

          <p className="mt-4 text-sm leading-6 text-[#756f94]">
            Identitas ini tetap disimpan di browser, jadi tampilan akan terasa
            personal setiap kali app dibuka lagi.
          </p>
        </div>

        <div className="mt-6 space-y-4">
          <label className="block">
            <span className="field-label">Display name</span>
            <input
              className="field-base"
              type="text"
              placeholder="Masukkan nama user"
              value={profile.name}
              onChange={(event) => updateProfile('name', event.target.value)}
            />
          </label>

          <label className="block">
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
      </section>

      <section className="surface-card panel-fade p-6" style={{ '--delay': '120ms' }}>
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="section-kicker">Quick Focus</p>
            <h2 className="section-title mt-2">Planner shortcuts</h2>
          </div>
          <div className="soft-icon bg-[#fff5e9] text-[#c87021]">
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
                <span className="mini-pill">
                  <CalendarIcon className="h-3.5 w-3.5" />
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
            className="secondary-button w-full justify-center"
            type="button"
            onClick={() => {
              setSelectedDate(todayKey)
              syncFormDueDate(todayKey)
            }}
          >
            Gunakan hari ini
          </button>
          <button
            className="ghost-button w-full justify-center"
            type="button"
            onClick={() => syncFormDueDate(selectedDate)}
          >
            Samakan tanggal form dengan filter
          </button>
          <button
            className="danger-button w-full justify-center"
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
