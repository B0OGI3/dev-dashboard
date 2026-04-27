import './RateLimitBanner.css'

export function RateLimitBanner({ rateLimit }) {
  if (!rateLimit) return null
  const isLow = rateLimit.remaining < 10

  return (
    <div className={`rate-banner ${isLow ? 'rate-banner-warn' : ''}`}>
      <svg viewBox="0 0 16 16" width="12" height="12" fill="currentColor">
        <path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0ZM1.5 8a6.5 6.5 0 1 0 13 0 6.5 6.5 0 0 0-13 0Zm7-3.25v2.992l1.816 1.816a.75.75 0 0 1-1.06 1.06L7.22 8.626A.75.75 0 0 1 7 8.107V4.75a.75.75 0 0 1 1.5 0Z" />
      </svg>
      API: {rateLimit.remaining}/{rateLimit.limit} requests remaining
      {isLow && ` · Resets at ${rateLimit.resetTime}`}
    </div>
  )
}
