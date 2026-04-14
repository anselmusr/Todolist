export const STORAGE_KEYS = {
  profile: 'todo.mobile.profile',
  tasks: 'todo.mobile.tasks',
}

export const DEFAULT_PROFILE = {
  name: 'Anisa Putri',
  role: 'Mobile Productivity Planner',
}

export const PRIORITY_META = {
  low: {
    label: 'Low',
    badgeClassName: 'priority-badge-low',
    buttonClassName: 'priority-option-low',
  },
  medium: {
    label: 'Medium',
    badgeClassName: 'priority-badge-medium',
    buttonClassName: 'priority-option-medium',
  },
  high: {
    label: 'High',
    badgeClassName: 'priority-badge-high',
    buttonClassName: 'priority-option-high',
  },
}

export const PRIORITY_ORDER = {
  high: 0,
  medium: 1,
  low: 2,
}

export const FEEDBACK_CLASS_NAMES = {
  success: 'feedback-banner-success',
  danger: 'feedback-banner-danger',
  warning: 'feedback-banner-warning',
}
