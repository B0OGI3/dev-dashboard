import { useState, useEffect } from 'react'
import { restClient } from '../lib/github'

export function useGitHubUser(username) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [rateLimit, setRateLimit] = useState(null)

  useEffect(() => {
    if (!username) return

    let cancelled = false
    setLoading(true)
    setError(null)
    setData(null)

    restClient
      .get(`/users/${username}`)
      .then((res) => {
        if (cancelled) return
        const remaining = res.headers['x-ratelimit-remaining']
        const limit = res.headers['x-ratelimit-limit']
        const reset = res.headers['x-ratelimit-reset']
        if (remaining !== undefined) {
          setRateLimit({
            remaining: parseInt(remaining),
            limit: parseInt(limit),
            resetTime: new Date(parseInt(reset) * 1000).toLocaleTimeString(),
          })
        }
        setData(res.data)
      })
      .catch((err) => {
        if (cancelled) return
        setError({
          message: err.rateLimited
            ? `GitHub API rate limit exceeded. Resets at ${err.resetTime}.`
            : err.response?.status === 404
              ? `User "${username}" not found.`
              : err.message || 'Failed to fetch user data.',
          rateLimited: !!err.rateLimited,
        })
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })

    return () => {
      cancelled = true
    }
  }, [username])

  return { data, loading, error, rateLimit }
}
