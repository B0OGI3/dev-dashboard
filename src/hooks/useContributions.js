import { useState, useEffect } from 'react'
import { graphqlFetch } from '../lib/github'

const CONTRIBUTION_QUERY = `
  query($login: String!) {
    user(login: $login) {
      contributionsCollection {
        totalCommitContributions
        totalPullRequestContributions
        totalIssueContributions
        contributionCalendar {
          totalContributions
          weeks {
            contributionDays {
              date
              contributionCount
              color
            }
          }
        }
      }
    }
  }
`

export function useContributions(username) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!username) return

    let cancelled = false
    setLoading(true)
    setError(null)
    setData(null)

    graphqlFetch(CONTRIBUTION_QUERY, { login: username })
      .then((json) => {
        if (cancelled) return
        const contrib = json?.user?.contributionsCollection
        if (!contrib) {
          setError({ message: `User "${username}" not found or no contribution data.` })
          return
        }
        setData({
          totalCommits: contrib.totalCommitContributions,
          totalPRs: contrib.totalPullRequestContributions,
          totalIssues: contrib.totalIssueContributions,
          totalContributions: contrib.contributionCalendar.totalContributions,
          weeks: contrib.contributionCalendar.weeks,
        })
      })
      .catch((err) => {
        if (cancelled) return
        setError({
          message: err.rateLimited
            ? 'GitHub API rate limit exceeded.'
            : !import.meta.env.VITE_GITHUB_TOKEN
              ? 'A GitHub Personal Access Token is required for contribution data. Add VITE_GITHUB_TOKEN to your .env file.'
              : err.message || 'Failed to fetch contribution data.',
          rateLimited: !!err.rateLimited,
          missingToken: !import.meta.env.VITE_GITHUB_TOKEN,
        })
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })

    return () => {
      cancelled = true
    }
  }, [username])

  return { data, loading, error }
}
