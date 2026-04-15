import { PRIORITY_META } from '../constants'
import { SparkIcon } from './TodoIcons'
import {
  badgeBaseClass,
  cn,
  iconMdClass,
  statCardClass,
} from './classes'

const emptyStateCardClass =
  'rounded-[28px] border border-dashed border-[#d9d0ff] bg-[rgba(255,255,255,0.7)] px-5 py-8 text-center'

const emptyStateIconClass =
  'mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#f2eeff] text-[#6c4df6]'

const progressRingClass =
  'relative grid h-[8.75rem] w-[8.75rem] place-items-center rounded-full bg-[radial-gradient(circle_at_28%_22%,rgba(255,255,255,0.16),transparent_38%),rgba(255,255,255,0.04)] p-[0.7rem] shadow-[inset_0_1px_0_rgba(255,255,255,0.15),0_25px_50px_-34px_rgba(9,3,31,0.75)] sm:h-40 sm:w-40'

const progressRingInnerClass =
  'relative z-10 flex h-full w-full flex-col items-center justify-center rounded-full bg-white/8 backdrop-blur-[12px]'

const summaryToneClassNames = {
  violet: 'border-[#ddd3ff] bg-[#f2eeff] text-[#5b3de3]',
  mint: 'border-[#d7f5ea] bg-[#effcf7] text-[#17835c]',
  peach: 'border-[#ffe3c4] bg-[#fff5e9] text-[#c87021]',
}

const statusToneClassNames = {
  done: 'border-[#d7f5ea] bg-[#effcf7] text-[#17835c]',
  overdue: 'border-[#ffd4df] bg-[#fff1f5] text-[#d24d75]',
  track: 'border-[#ddd3ff] bg-[#f2eeff] text-[#5b3de3]',
}

export function PriorityBadge({ priority }) {
  const meta = PRIORITY_META[priority]

  return (
    <span
      className={cn(badgeBaseClass, meta.badgeClassName)}
    >
      {meta.label}
    </span>
  )
}

export function StatusBadge({ overdue = false, done = false }) {
  const label = done ? 'Done' : overdue ? 'Overdue' : 'On Track'
  const toneClassName = done
    ? statusToneClassNames.done
    : overdue
      ? statusToneClassNames.overdue
      : statusToneClassNames.track

  return (
    <span
      className={cn(badgeBaseClass, toneClassName)}
    >
      {label}
    </span>
  )
}

export function EmptyState({ title, description }) {
  return (
    <div className={emptyStateCardClass}>
      <div className={emptyStateIconClass}>
        <SparkIcon className={iconMdClass} />
      </div>
      <p className="mt-4 font-display text-xl font-extrabold text-[#1b1635]">
        {title}
      </p>
      <p className="mt-2 text-sm leading-6 text-[#756f94]">{description}</p>
    </div>
  )
}

export function ProgressRing({ value }) {
  const safeValue = Math.max(0, Math.min(100, value))
  const radius = 42
  const circumference = 2 * Math.PI * radius
  const dashOffset = circumference * (1 - safeValue / 100)

  return (
    <div
      className={progressRingClass}
      role="img"
      aria-label={`${safeValue}% completed`}
    >
      <svg
        className="absolute inset-[0.7rem] h-[calc(100%-1.4rem)] w-[calc(100%-1.4rem)] -rotate-90 overflow-visible"
        viewBox="0 0 100 100"
        aria-hidden="true"
      >
        <circle
          cx="50"
          cy="50"
          r={radius}
          fill="none"
          stroke="rgba(255, 255, 255, 0.18)"
          strokeWidth="8"
        />
        <circle
          cx="50"
          cy="50"
          r={radius}
          fill="none"
          stroke="#fff"
          strokeLinecap="round"
          strokeWidth="8"
          className="drop-shadow-[0_0_12px_rgba(255,255,255,0.35)] transition-[stroke-dashoffset] duration-[450ms] ease-out"
          strokeDasharray={circumference}
          strokeDashoffset={dashOffset}
        />
      </svg>

      <div className={progressRingInnerClass}>
        <span className="font-display text-3xl font-extrabold text-white">
          {safeValue}%
        </span>
        <span className="mt-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-white/72">
          Completed
        </span>
      </div>
    </div>
  )
}

export function SummaryTile({ label, value, detail, tone = 'violet' }) {
  const toneClassName = summaryToneClassNames[tone] ?? summaryToneClassNames.violet

  return (
    <article className={cn(statCardClass, 'h-full', toneClassName)}>
      <p className="text-[11px] font-semibold uppercase tracking-[0.22em] opacity-75">
        {label}
      </p>
      <p className="mt-3 font-display text-3xl font-extrabold">{value}</p>
      <p className="mt-2 text-sm opacity-80">{detail}</p>
    </article>
  )
}
