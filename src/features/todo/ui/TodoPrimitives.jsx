import { PRIORITY_META } from '../constants'
import { SparkIcon } from './TodoIcons'

export function PriorityBadge({ priority }) {
  const meta = PRIORITY_META[priority]

  return (
    <span
      className={`inline-flex items-center rounded-full border px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] ${meta.badgeClassName}`}
    >
      {meta.label}
    </span>
  )
}

export function StatusBadge({ overdue = false, done = false }) {
  const className = done
    ? 'border-[#d7f5ea] bg-[#effcf7] text-[#17835c]'
    : overdue
      ? 'border-[#ffd4df] bg-[#fff1f5] text-[#d24d75]'
      : 'border-[#ddd3ff] bg-[#f2eeff] text-[#5b3de3]'
  const label = done ? 'Done' : overdue ? 'Overdue' : 'On Track'

  return (
    <span
      className={`inline-flex items-center rounded-full border px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] ${className}`}
    >
      {label}
    </span>
  )
}

export function EmptyState({ title, description }) {
  return (
    <div className="rounded-[28px] border border-dashed border-[#d9d0ff] bg-white/70 px-5 py-8 text-center">
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#f2eeff] text-[#6c4df6]">
        <SparkIcon className="h-6 w-6" />
      </div>
      <p className="mt-4 font-display text-xl font-extrabold text-[#1b1635]">{title}</p>
      <p className="mt-2 text-sm leading-6 text-[#756f94]">{description}</p>
    </div>
  )
}

export function ProgressRing({ value }) {
  const safeValue = Math.max(0, Math.min(100, value))

  return (
    <div
      className="progress-ring"
      style={{
        background: `conic-gradient(#ffffff ${safeValue * 3.6}deg, rgba(255,255,255,0.18) 0deg)`,
      }}
    >
      <div className="progress-ring__inner">
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
  const toneClassName =
    tone === 'mint'
      ? 'border-[#d7f5ea] bg-[#effcf7] text-[#17835c]'
      : tone === 'peach'
        ? 'border-[#ffe3c4] bg-[#fff5e9] text-[#c87021]'
        : 'border-[#ddd3ff] bg-[#f2eeff] text-[#5b3de3]'

  return (
    <article className={`stat-card h-full ${toneClassName}`}>
      <p className="text-[11px] font-semibold uppercase tracking-[0.22em] opacity-75">
        {label}
      </p>
      <p className="mt-3 font-display text-3xl font-extrabold">{value}</p>
      <p className="mt-2 text-sm opacity-80">{detail}</p>
    </article>
  )
}
