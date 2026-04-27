import './Skeleton.css'

function Bone({ width, height, radius }) {
  return (
    <div
      className="skeleton-bone"
      style={{
        width: width || '100%',
        height: height || '1rem',
        borderRadius: radius || '4px',
      }}
    />
  )
}

export function ProfileSkeleton() {
  return (
    <div className="skeleton-profile">
      <Bone width="80px" height="80px" radius="50%" />
      <div className="skeleton-profile-lines">
        <Bone width="160px" height="1.2rem" />
        <Bone width="100px" height="0.9rem" />
        <Bone width="220px" height="0.85rem" />
        <Bone width="140px" height="0.8rem" />
      </div>
    </div>
  )
}

export function StatsBarSkeleton() {
  return (
    <div className="skeleton-stats">
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className="skeleton-stat-item">
          <Bone width="50px" height="1.5rem" />
          <Bone width="70px" height="0.7rem" />
        </div>
      ))}
    </div>
  )
}

export function ChartSkeleton() {
  return (
    <div className="skeleton-chart-card">
      <Bone width="140px" height="1rem" />
      <div className="skeleton-chart-circle">
        <Bone width="180px" height="180px" radius="50%" />
      </div>
    </div>
  )
}

export function ContribSkeleton() {
  return (
    <div className="skeleton-contrib-card">
      <Bone width="200px" height="1rem" />
      <div className="skeleton-contrib-grid">
        {Array.from({ length: 53 * 7 }).map((_, i) => (
          <Bone key={i} width="11px" height="11px" radius="2px" />
        ))}
      </div>
    </div>
  )
}

export function ReposSkeleton() {
  return (
    <div className="skeleton-repos-card">
      <Bone width="160px" height="1rem" />
      <div className="skeleton-repos-grid">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="skeleton-repo-item">
            <Bone width="70%" height="0.9rem" />
            <Bone height="0.78rem" />
            <Bone width="50%" height="0.78rem" />
          </div>
        ))}
      </div>
    </div>
  )
}
