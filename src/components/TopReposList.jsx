import './TopReposList.css'

function TimeAgo({ dateStr }) {
  const diff = Date.now() - new Date(dateStr).getTime()
  const days = Math.floor(diff / 86400000)
  if (days === 0) return 'today'
  if (days === 1) return 'yesterday'
  if (days < 30) return `${days}d ago`
  const months = Math.floor(days / 30)
  if (months < 12) return `${months}mo ago`
  return `${Math.floor(months / 12)}y ago`
}

export function TopReposList({ repos }) {
  if (!repos?.length) return null

  const top = [...repos].sort((a, b) => b.stargazers_count - a.stargazers_count).slice(0, 6)

  return (
    <div className="repos-card">
      <h3 className="section-title">Top Repositories</h3>
      <div className="repos-grid">
        {top.map((repo) => (
          <a
            key={repo.id}
            className="repo-item"
            href={repo.html_url}
            target="_blank"
            rel="noreferrer"
          >
            <div className="repo-top">
              <span className="repo-name">{repo.name}</span>
              {repo.fork && <span className="repo-badge">Fork</span>}
              {repo.archived && <span className="repo-badge repo-badge-archived">Archived</span>}
            </div>
            {repo.description && (
              <p className="repo-description">{repo.description}</p>
            )}
            <div className="repo-meta">
              {repo.language && (
                <span className="repo-lang">{repo.language}</span>
              )}
              <span className="repo-stat">
                <svg viewBox="0 0 16 16" width="12" height="12" fill="currentColor">
                  <path d="M8 .25a.75.75 0 0 1 .673.418l1.882 3.815 4.21.612a.75.75 0 0 1 .416 1.279l-3.046 2.97.719 4.192a.751.751 0 0 1-1.088.791L8 12.347l-3.766 1.98a.75.75 0 0 1-1.088-.79l.72-4.194L.818 6.374a.75.75 0 0 1 .416-1.28l4.21-.611L7.327.668A.75.75 0 0 1 8 .25z" />
                </svg>
                {repo.stargazers_count.toLocaleString()}
              </span>
              <span className="repo-stat">
                <svg viewBox="0 0 16 16" width="12" height="12" fill="currentColor">
                  <path d="M5 5.372v.878c0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75v-.878a2.25 2.25 0 1 1 1.5 0v.878a2.25 2.25 0 0 1-2.25 2.25h-1.5v2.128a2.251 2.251 0 1 1-1.5 0V8.5h-1.5A2.25 2.25 0 0 1 3.5 6.25v-.878a2.25 2.25 0 1 1 1.5 0zM5 3.25a.75.75 0 1 0-1.5 0 .75.75 0 0 0 1.5 0zm6.75.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5zm-3 8.75a.75.75 0 1 0-1.5 0 .75.75 0 0 0 1.5 0z" />
                </svg>
                {repo.forks_count.toLocaleString()}
              </span>
              <span className="repo-updated">
                Updated <TimeAgo dateStr={repo.updated_at} />
              </span>
            </div>
          </a>
        ))}
      </div>
    </div>
  )
}
