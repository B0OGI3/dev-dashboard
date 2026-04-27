import { useState } from 'react'
import { SearchInput } from '../components/SearchInput'
import { ProfileCard } from '../components/ProfileCard'
import { StatsBar } from '../components/StatsBar'
import { LanguageChart } from '../components/LanguageChart'
import { ContributionGraph } from '../components/ContributionGraph'
import { TopReposList } from '../components/TopReposList'
import { RateLimitBanner } from '../components/RateLimitBanner'
import { ErrorBoundary } from '../components/ErrorBoundary'
import {
  ProfileSkeleton,
  StatsBarSkeleton,
  ChartSkeleton,
  ContribSkeleton,
  ReposSkeleton,
} from '../components/Skeleton'
import { useGitHubUser } from '../hooks/useGitHubUser'
import { useRepos } from '../hooks/useRepos'
import { useContributions } from '../hooks/useContributions'
import './Dashboard.css'

function ApiError({ error }) {
  return (
    <div className={`api-error ${error.rateLimited ? 'api-error-rate' : ''}`}>
      <svg viewBox="0 0 16 16" width="14" height="14" fill="currentColor">
        <path d="M6.457 1.047c.659-1.234 2.427-1.234 3.086 0l6.082 11.378A1.75 1.75 0 0 1 14.082 15H1.918a1.75 1.75 0 0 1-1.543-2.575Zm1.763.707a.25.25 0 0 0-.44 0L1.698 13.132a.25.25 0 0 0 .22.368h12.164a.25.25 0 0 0 .22-.368Zm.53 3.996v2.5a.75.75 0 0 1-1.5 0v-2.5a.75.75 0 0 1 1.5 0ZM9 11a1 1 0 1 1-2 0 1 1 0 0 1 2 0Z" />
      </svg>
      {error.message}
    </div>
  )
}

export function Dashboard() {
  const [username, setUsername] = useState('')

  const { data: user, loading: userLoading, error: userError, rateLimit } = useGitHubUser(username)
  const { data: repos, languages, loading: reposLoading, error: reposError } = useRepos(username)
  const { data: contributions, loading: contribLoading, error: contribError } = useContributions(username)

  const anyLoading = userLoading || reposLoading || contribLoading

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <div className="dashboard-brand">
          <svg viewBox="0 0 16 16" width="22" height="22" fill="currentColor">
            <path d="M8 0c4.42 0 8 3.58 8 8a8.013 8.013 0 0 1-5.45 7.59c-.4.08-.55-.17-.55-.38 0-.27.01-1.13.01-2.2 0-.75-.25-1.23-.54-1.48 1.78-.2 3.65-.88 3.65-3.95 0-.88-.31-1.59-.82-2.15.08-.2.36-1.02-.08-2.12 0 0-.67-.22-2.2.82-.64-.18-1.32-.27-2-.27-.68 0-1.36.09-2 .27-1.53-1.03-2.2-.82-2.2-.82-.44 1.1-.16 1.92-.08 2.12-.51.56-.82 1.28-.82 2.15 0 3.06 1.86 3.75 3.64 3.95-.23.2-.44.55-.51 1.07-.46.21-1.61.55-2.33-.66-.15-.24-.6-.83-1.23-.82-.67.01-.27.38.01.53.34.19.73.9.82 1.13.16.45.68 1.31 2.69.94 0 .67.01 1.3.01 1.49 0 .21-.15.45-.55.38A7.995 7.995 0 0 1 0 8c0-4.42 3.58-8 8-8Z" />
          </svg>
          <span>GitHub Dashboard</span>
        </div>
        <RateLimitBanner rateLimit={rateLimit} />
      </header>

      <main className="dashboard-main">
        <section className="dashboard-search">
          <h1 className="dashboard-title">Explore any GitHub profile</h1>
          <p className="dashboard-subtitle">Search by username to visualize contributions, languages, and repositories.</p>
          <SearchInput onSearch={setUsername} loading={anyLoading} />
        </section>

        {!username && (
          <div className="dashboard-empty">
            <svg viewBox="0 0 24 24" width="48" height="48" fill="none" stroke="currentColor" strokeWidth="1">
              <circle cx="11" cy="11" r="8" /><path strokeLinecap="round" d="m21 21-4.35-4.35" />
            </svg>
            <p>Enter a GitHub username above to get started.</p>
          </div>
        )}

        {username && (
          <ErrorBoundary>
            <div className="dashboard-content">
              {userLoading ? <ProfileSkeleton /> : userError ? <ApiError error={userError} /> : user ? <ProfileCard user={user} /> : null}

              {userLoading || reposLoading || contribLoading ? (
                <StatsBarSkeleton />
              ) : (user || contributions) ? (
                <StatsBar user={user} contributions={contributions} />
              ) : null}

              <div className="dashboard-row">
                <div className="dashboard-col">
                  {reposLoading ? (
                    <ChartSkeleton />
                  ) : reposError ? (
                    <ApiError error={reposError} />
                  ) : languages ? (
                    <LanguageChart languages={languages} />
                  ) : null}
                </div>

                <div className="dashboard-col dashboard-col-wide">
                  {contribLoading ? (
                    <ContribSkeleton />
                  ) : contribError ? (
                    <div className="contrib-error-wrap">
                      <ApiError error={contribError} />
                      {contribError.missingToken && (
                        <p className="contrib-token-hint">
                          Add <code>VITE_GITHUB_TOKEN=ghp_…</code> to your <code>.env</code> file and restart the dev server.
                        </p>
                      )}
                    </div>
                  ) : contributions ? (
                    <ContributionGraph weeks={contributions.weeks} totalContributions={contributions.totalContributions} />
                  ) : null}
                </div>
              </div>

              {reposLoading ? (
                <ReposSkeleton />
              ) : reposError ? null : repos ? (
                <TopReposList repos={repos} />
              ) : null}
            </div>
          </ErrorBoundary>
        )}
      </main>

      <footer className="dashboard-footer">
        <span>Built with React + GitHub API</span>
      </footer>
    </div>
  )
}
