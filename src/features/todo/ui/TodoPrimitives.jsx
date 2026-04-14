import { PRIORITY_META } from '../constants'
import { SparkIcon } from './TodoIcons'

export function PriorityBadge({ priority }) {
  const meta = PRIORITY_META[priority]

  return (
    <span
      className={`badge-base ${meta.badgeClassName}`}
    >
      {meta.label}
    </span>
  )
}

export function StatusBadge({ overdue = false, done = false }) {
  const className = done
    ? 'status-badge-done'
    : overdue
      ? 'status-badge-overdue'
      : 'status-badge-track'
  const label = done ? 'Done' : overdue ? 'Overdue' : 'On Track'

  return (
    <span
      className={`badge-base ${className}`}
    >
      {label}
    </span>
  )
}

export function EmptyState({ title, description }) {
  return (
    <div className="empty-state-card">
      <div className="empty-state-icon">
        <SparkIcon className="icon-md" />
      </div>
      <p className="empty-state-title">{title}</p>
      <p className="empty-state-description">{description}</p>
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
      className="progress-ring"
      role="img"
      aria-label={`${safeValue}% completed`}
    >
      <svg className="progress-ring__svg" viewBox="0 0 100 100" aria-hidden="true">
        <circle className="progress-ring__track" cx="50" cy="50" r={radius} />
        <circle
          className="progress-ring__progress"
          cx="50"
          cy="50"
          r={radius}
          strokeDasharray={circumference}
          strokeDashoffset={dashOffset}
        />
      </svg>

      <div className="progress-ring__inner">
        <span className="progress-ring__value">{safeValue}%</span>
        <span className="progress-ring__label">Completed</span>
      </div>
    </div>
  )
}

export function SummaryTile({ label, value, detail, tone = 'violet' }) {
  const toneClassName =
    tone === 'mint'
      ? 'summary-tile-mint'
      : tone === 'peach'
        ? 'summary-tile-peach'
        : 'summary-tile-violet'

  return (
    <article className={`stat-card summary-tile ${toneClassName}`}>
      <p className="summary-tile-label">{label}</p>
      <p className="summary-tile-value">{value}</p>
      <p className="summary-tile-detail">{detail}</p>
    </article>
  )
}
