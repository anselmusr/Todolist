export function cn(...classes) {
  return classes.filter(Boolean).join(' ')
}

export const iconSmClass = 'h-3.5 w-3.5'
export const iconMdClass = 'h-6 w-6'

export const panelFadeClass =
  'motion-safe:animate-[panel-rise_0.8s_cubic-bezier(0.22,1,0.36,1)_both]'

export const panelDelayClassNames = {
  60: '[animation-delay:60ms]',
  100: '[animation-delay:100ms]',
  120: '[animation-delay:120ms]',
  140: '[animation-delay:140ms]',
  160: '[animation-delay:160ms]',
  200: '[animation-delay:200ms]',
  240: '[animation-delay:240ms]',
}

export const surfaceCardClass =
  'rounded-[32px] border border-[var(--color-stroke)] bg-[var(--color-surface)] backdrop-blur-xl shadow-[var(--shadow-card)]'

export const heroCardClass =
  'rounded-[36px] border border-white/12 bg-[radial-gradient(circle_at_top_right,rgba(255,214,232,0.28),transparent_25%),linear-gradient(135deg,#7b61ff_0%,#5d3bf2_52%,#28115a_100%)] text-white shadow-[0_42px_100px_-46px_rgba(44,18,118,0.9)]'

export const statCardClass =
  'rounded-[26px] border p-4 backdrop-blur-sm shadow-[0_22px_34px_-30px_rgba(77,57,173,0.65)]'

export const listCardClass =
  'rounded-[26px] border p-4 shadow-[0_18px_38px_-32px_rgba(77,57,173,0.4)]'

export const sectionKickerClass =
  'text-[11px] font-semibold uppercase tracking-[0.28em] text-[#8177af]'

export const sectionTitleClass =
  'font-display text-[1.55rem] font-extrabold leading-tight text-[#1b1635]'

export const miniPillClass =
  'inline-flex items-center gap-2 rounded-full border border-[rgba(108,77,246,0.14)] bg-[rgba(250,248,255,0.92)] px-3 py-2 text-xs font-semibold text-[#6e6790]'

export const softIconClass =
  'flex h-11 w-11 items-center justify-center rounded-[18px] border border-white/60 shadow-[inset_0_1px_0_rgba(255,255,255,0.8)]'

export const fieldLabelClass = 'text-sm font-semibold text-[var(--color-muted)]'

export const fieldBaseClass =
  'mt-2 w-full rounded-[22px] border border-[rgba(108,77,246,0.14)] bg-[rgba(250,248,255,0.96)] px-4 py-3 text-[15px] text-[var(--color-text)] shadow-[inset_0_1px_0_rgba(255,255,255,0.7)] outline-none transition placeholder:text-[#a198c8] focus:border-[rgba(108,77,246,0.45)] focus:outline-none focus-visible:ring-4 focus-visible:ring-[rgba(108,77,246,0.12)]'

const buttonBaseClass =
  'inline-flex items-center justify-center rounded-[20px] px-5 py-3 text-sm font-semibold transition duration-200 hover:-translate-y-0.5 focus:outline-none focus-visible:outline-none focus-visible:ring-4 disabled:pointer-events-none disabled:opacity-60'

export const primaryButtonClass = cn(
  buttonBaseClass,
  'text-white bg-[linear-gradient(135deg,#7b61ff_0%,#5b38f2_100%)] shadow-[0_18px_34px_-18px_rgba(91,56,242,0.85)] focus-visible:ring-[rgba(108,77,246,0.18)]',
)

export const secondaryButtonClass = cn(
  buttonBaseClass,
  'border border-[rgba(108,77,246,0.14)] bg-[rgba(242,238,255,0.9)] text-[#5b3de3] focus-visible:ring-[rgba(108,77,246,0.16)]',
)

export const ghostButtonClass = cn(
  buttonBaseClass,
  'gap-2 border border-[rgba(108,77,246,0.14)] bg-[rgba(255,255,255,0.72)] px-4 text-[#6e6790] focus-visible:ring-[rgba(108,77,246,0.12)]',
)

export const dangerButtonClass = cn(
  buttonBaseClass,
  'border border-[rgba(210,77,117,0.16)] bg-[rgba(255,241,245,0.96)] text-[#d24d75] focus-visible:ring-[rgba(210,77,117,0.18)]',
)

export const ghostDangerClass =
  'text-[#d24d75] hover:border-[#ffd4df] hover:bg-[#fff1f5] focus-visible:ring-[rgba(210,77,117,0.18)]'

export const priorityOptionBaseClass = cn(
  buttonBaseClass,
  'rounded-[20px] border px-3 py-3',
)

export const priorityOptionActiveClass =
  'translate-y-[-2px] border-transparent text-white bg-[linear-gradient(135deg,#7b61ff_0%,#5b38f2_100%)] shadow-[0_18px_32px_-20px_rgba(91,56,242,0.9)]'

export const badgeBaseClass =
  'inline-flex items-center rounded-full border px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em]'
