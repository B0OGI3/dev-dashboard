import './StatsBar.css'

function Stat({ label, value }) {
  return (
    <div className="stat-item">
      <span className="stat-value">{value?.toLocaleString() ?? '—'}</span>
      <span className="stat-label">{label}</span>
    </div>
  )
}

export function StatsBar({ user, contributions }) {
  return (
    <div className="stats-bar">
      <Stat label="Commits" value={contributions?.totalCommits} />
      <Stat label="Pull Requests" value={contributions?.totalPRs} />
      <Stat label="Issues" value={contributions?.totalIssues} />
      <Stat label="Public Repos" value={user?.public_repos} />
    </div>
  )
}
