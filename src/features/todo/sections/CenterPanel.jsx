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
import {
  cn,
  ghostButtonClass,
  ghostDangerClass,
  heroCardClass,
  iconSmClass,
  miniPillClass,
  panelDelayClassNames,
  panelFadeClass,
  sectionKickerClass,
  sectionTitleClass,
  surfaceCardClass,
} from '../ui/classes'

const heroSectionClass = cn(
  heroCardClass,
  panelFadeClass,
  panelDelayClassNames[100],
  'overflow-hidden p-6 sm:p-7',
)

const agendaSectionClass = cn(
  surfaceCardClass,
  panelFadeClass,
  panelDelayClassNames[160],
  'p-6',
)

const dateChipBaseClass =
  'flex min-h-[108px] min-w-0 snap-start flex-col items-center justify-center rounded-[24px] border px-3 py-4 text-center transition duration-200 hover:-translate-y-0.5 focus:outline-none focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[rgba(108,77,246,0.14)] sm:min-h-[132px] sm:rounded-[28px] sm:py-5'

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
    <section className="space-y-6">
      <section className={heroSectionClass}>
        <div className="grid gap-6 lg:grid-cols-[1.08fr_0.92fr] lg:items-stretch">
          <div className="flex h-full flex-col">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-white/70">
                Workspace
              </p>
              <h2 className="mt-3 font-display text-4xl font-extrabold leading-[1.05] text-white sm:text-[3.25rem]">
                Organize your day in a softer, mobile-inspired dashboard.
              </h2>
              <p className="mt-4 max-w-2xl text-sm leading-7 text-white/72 [text-align:justify] sm:text-base">
                Semua fitur tetap ada: tambah agenda, atur prioritas, filter tanggal,
                cek overdue, lihat yang selesai, dan simpan profil langsung di
                browser.
              </p>
            </div>

            <div className="mt-6">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-stretch">
                <button
                  className="inline-flex min-h-14 items-center justify-center rounded-[20px] bg-white px-5 py-3 text-sm font-semibold text-[#1b1635] shadow-[0_18px_30px_-18px_rgba(255,255,255,0.65)] transition duration-200 hover:-translate-y-0.5 focus:outline-none focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-white/20"
                  type="button"
                  onClick={() => setSelectedDate(todayKey)}
                >
                  Tinjau hari ini
                </button>

                <label className="inline-flex min-h-14 items-center gap-3 rounded-[20px] border border-white/16 bg-white/12 px-4 py-3 text-sm font-semibold text-white/88 backdrop-blur-[12px]">
                  <input
                    className="min-w-0 w-full border-none bg-transparent text-inherit outline-none [color-scheme:dark]"
                    type="date"
                    value={selectedDate}
                    onChange={(event) => setSelectedDate(event.target.value)}
                  />
                </label>
              </div>

              {feedback && feedback.surface !== 'toast' && (
                <div
                  className={cn(
                    'mt-5 rounded-[24px] border px-4 py-3 text-sm font-semibold',
                    feedbackClassName,
                  )}
                >
                  {feedback.text}
                </div>
              )}
            </div>
          </div>

          <div className="relative flex h-full flex-col rounded-[32px] border border-white/12 bg-white/10 p-5 backdrop-blur-md shadow-[0_32px_80px_-44px_rgba(24,10,82,0.8)]">
            <div className="absolute -right-10 top-10 h-28 w-28 rounded-full bg-white/12 blur-3xl" />
            <div className="absolute -left-12 bottom-0 h-36 w-36 rounded-full bg-[rgba(255,204,242,0.2)] blur-3xl" />

            <div className="relative flex h-full flex-col">
              <div className="inline-flex items-center gap-2 rounded-full bg-white/12 px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-white/76">
                <ClockIcon className={iconSmClass} />
                {formatClock(now)}
              </div>

              <div className="mt-6 flex flex-1 flex-col justify-center">
                <div className="flex justify-center">
                  <ProgressRing value={completionRate} />
                </div>

                <div className="mt-5 grid gap-3">
                  <div className="rounded-[24px] border border-white/12 bg-white/8 p-4">
                    <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white/60">
                      Selected day
                    </span>
                    <p className="mt-1 font-display text-xl font-extrabold text-white">
                      {formatCompactDate(selectedDate)}
                    </p>
                  </div>

                  <div className="rounded-[24px] border border-white/12 bg-white/8 p-4">
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

              <div className="mt-5 grid grid-cols-3 gap-3 lg:hidden">
                <div className="flex min-h-16 flex-col items-center justify-center gap-1 rounded-[22px] border border-white/12 bg-white/8 px-3 py-3 text-center text-[12px] text-white/75">
                  <span>Open</span>
                  <strong className="shrink-0 font-display text-lg leading-none font-extrabold text-white [font-variant-numeric:tabular-nums]">
                    {activeTasksCount}
                  </strong>
                </div>
                <div className="flex min-h-16 flex-col items-center justify-center gap-1 rounded-[22px] border border-white/12 bg-white/8 px-3 py-3 text-center text-[12px] text-white/75">
                  <span>Done</span>
                  <strong className="shrink-0 font-display text-lg leading-none font-extrabold text-white [font-variant-numeric:tabular-nums]">
                    {doneTasksCount}
                  </strong>
                </div>
                <div className="flex min-h-16 flex-col items-center justify-center gap-1 rounded-[22px] border border-white/12 bg-white/8 px-3 py-3 text-center text-[12px] text-white/75">
                  <span>Overdue</span>
                  <strong className="shrink-0 font-display text-lg leading-none font-extrabold text-white [font-variant-numeric:tabular-nums]">
                    {overdueTasksCount}
                  </strong>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 hidden gap-4 sm:grid sm:grid-cols-2 xl:grid-cols-3">
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

      <section className={agendaSectionClass}>
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className={sectionKickerClass}>Today&apos;s Tasks</p>
            <h2 className={cn(sectionTitleClass, 'mt-2')}>
              Agenda untuk {selectedDateLabel}
            </h2>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-[#756f94]">
              Tampilan ini tetap fokus pada tugas aktif di tanggal yang dipilih,
              dengan nuansa card layout yang lebih dekat ke referensi Figma.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <span className={miniPillClass}>
              <SparkIcon className={iconSmClass} />
              {selectedTasks.length} active
            </span>
            <span className={miniPillClass}>
              <CheckIcon className={iconSmClass} />
              {selectedDoneTasksCount} done
            </span>
          </div>
        </div>

        <div className="mt-6 grid grid-flow-col auto-cols-[calc((100%-1.5rem)/3)] gap-3 overflow-x-auto pb-2 pr-1 [scroll-snap-type:x_proximity] [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden sm:grid-flow-row sm:auto-cols-auto sm:grid-cols-5 sm:overflow-visible sm:pb-0 sm:pr-0">
          {dateStrip.map((item) => {
            const isSelected = item.dateKey === selectedDate
            const isToday = item.dateKey === todayKey

            return (
              <button
                key={item.dateKey}
                className={cn(
                  dateChipBaseClass,
                  isSelected
                    ? 'border-transparent bg-[linear-gradient(180deg,#7b61ff_0%,#5b38f2_100%)] text-white shadow-[0_30px_50px_-30px_rgba(91,56,242,0.8)]'
                    : 'border-[rgba(108,77,246,0.12)] bg-[rgba(250,248,255,0.8)] text-[#756f94]',
                )}
                type="button"
                ref={isSelected ? selectedDateChipRef : null}
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
              <article
                key={task.id}
                className="rounded-[30px] border border-[rgba(108,77,246,0.12)] bg-[linear-gradient(180deg,rgba(255,255,255,0.98)_0%,rgba(248,245,255,0.94)_100%)] p-5 shadow-[0_24px_50px_-36px_rgba(77,57,173,0.45)] motion-safe:animate-[panel-rise_0.75s_cubic-bezier(0.22,1,0.36,1)_both]"
              >
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
                  <button
                    className="flex h-[3.25rem] w-[3.25rem] shrink-0 items-center justify-center rounded-[22px] border border-[rgba(108,77,246,0.16)] bg-[#f5f1ff] text-[#6c4df6] shadow-[inset_0_1px_0_rgba(255,255,255,0.6)] transition duration-200 hover:-translate-y-0.5 hover:border-[rgba(108,77,246,0.28)] hover:bg-[#ece6ff] focus:outline-none focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[rgba(108,77,246,0.12)]"
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
                        className={cn(
                          ghostButtonClass,
                          ghostDangerClass,
                          'shrink-0',
                        )}
                        type="button"
                        onClick={() => handleDeleteTask(task.id)}
                      >
                        <TrashIcon />
                        Delete
                      </button>
                    </div>

                    <div className="mt-4 flex flex-wrap gap-2">
                      <PriorityBadge priority={task.priority} />
                      <span className={miniPillClass}>
                        <CalendarIcon className={iconSmClass} />
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
