export const STORAGE_KEYS = {
  profile: 'todo.mobile.profile',
  tasks: 'todo.mobile.tasks',
}

export const DEFAULT_PROFILE = {
  name: 'Alexandra Rosemary',
  role: 'Mobile Productivity Planner',
}

export const PRIORITY_META = {
  low: {
    label: 'Low',
    badgeClassName:
      'border-[#d7f5ea] bg-[#effcf7] text-[#17835c] shadow-[0_14px_30px_-22px_rgba(23,131,92,0.65)]',
    buttonClassName:
      'border-[#d7f5ea] bg-[#effcf7] text-[#17835c] hover:border-[#b7ead5] hover:bg-[#e4f8ef]',
  },
  medium: {
    label: 'Medium',
    badgeClassName:
      'border-[#ffe3c4] bg-[#fff5e9] text-[#c87021] shadow-[0_14px_30px_-22px_rgba(200,112,33,0.65)]',
    buttonClassName:
      'border-[#ffe3c4] bg-[#fff5e9] text-[#c87021] hover:border-[#ffd3a3] hover:bg-[#ffefd8]',
  },
  high: {
    label: 'High',
    badgeClassName:
      'border-[#ffd4df] bg-[#fff1f5] text-[#d24d75] shadow-[0_14px_30px_-22px_rgba(210,77,117,0.65)]',
    buttonClassName:
      'border-[#ffd4df] bg-[#fff1f5] text-[#d24d75] hover:border-[#ffbdd0] hover:bg-[#ffe7ee]',
  },
}

export const PRIORITY_ORDER = {
  high: 0,
  medium: 1,
  low: 2,
}

export const FEEDBACK_CLASS_NAMES = {
  success: 'border-[#ddd3ff] bg-[#f2eeff] text-[#5b3de3]',
  danger: 'border-[#ffd1dc] bg-[#fff1f5] text-[#d24d75]',
  warning: 'border-[#ffe3c4] bg-[#fff6ea] text-[#c87021]',
}
