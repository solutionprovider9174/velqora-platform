export function cn(...classes: (string | false | null | undefined)[]) {
  return classes.filter(Boolean).join(' ')
}

export function formatCurrency(amount: number, currency = 'EUR', locale = 'en-EU') {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(amount)
}

export function formatNumber(value: number, locale = 'en-US') {
  return new Intl.NumberFormat(locale).format(value)
}

export function formatDate(value: string | Date, locale = 'en-GB') {
  const d = typeof value === 'string' ? new Date(value) : value
  return d.toLocaleDateString(locale, { day: '2-digit', month: 'short', year: 'numeric' })
}

export function formatDateTime(value: string | Date, locale = 'en-GB') {
  const d = typeof value === 'string' ? new Date(value) : value
  return d.toLocaleString(locale, {
    day: '2-digit', month: 'short', year: 'numeric',
    hour: '2-digit', minute: '2-digit',
  })
}

export function relativeTime(value: string | Date) {
  const d = typeof value === 'string' ? new Date(value) : value
  const seconds = Math.floor((Date.now() - d.getTime()) / 1000)
  if (seconds < 60) return 'just now'
  const minutes = Math.floor(seconds / 60)
  if (minutes < 60) return `${minutes}m ago`
  const hours = Math.floor(minutes / 60)
  if (hours < 24) return `${hours}h ago`
  const days = Math.floor(hours / 24)
  if (days < 30) return `${days}d ago`
  return formatDate(d)
}

export function statusLabel(status: string) {
  return status
    .toLowerCase()
    .split('_')
    .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
    .join(' ')
}
