import { useState, useEffect } from 'react'
import { restClient } from '../lib/github'

export function useRepos(username) {
  const [data, setData] = useState(null)
  const [languages, setLanguages] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!username) return

    let cancelled = false
    setLoading(true)
    setError(null)
    setData(null)
    setLanguages(null)

    async function fetchAll() {
      let page = 1
      let allRepos = []

      while (true) {
        const res = await restClient.get(`/users/${username}/repos`, {
          params: { per_page: 100, page, sort: 'updated' },
        })
        allRepos = allRepos.concat(res.data)
        if (res.data.length < 100) break
        page++
      }

      return allRepos
    }

    fetchAll()
      .then((repos) => {
        if (cancelled) return
        setData(repos)
        setLanguages(aggregateLanguages(repos))
      })
      .catch((err) => {
        if (cancelled) return
        setError({
          message: err.rateLimited
            ? `GitHub API rate limit exceeded. Resets at ${err.resetTime}.`
            : err.message || 'Failed to fetch repositories.',
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

  return { data, languages, loading, error }
}

function aggregateLanguages(repos) {
  const counts = {}
  for (const repo of repos) {
    if (repo.language) {
      counts[repo.language] = (counts[repo.language] || 0) + 1
    }
  }
  const total = Object.values(counts).reduce((a, b) => a + b, 0)
  return Object.entries(counts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 8)
    .map(([name, count]) => ({
      name,
      count,
      percent: Math.round((count / total) * 100),
    }))
}
