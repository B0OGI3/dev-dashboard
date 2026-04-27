import './ProfileCard.css'

export function ProfileCard({ user }) {
  return (
    <div className="profile-card">
      <a href={user.html_url} target="_blank" rel="noreferrer">
        <img className="profile-avatar" src={user.avatar_url} alt={user.login} />
      </a>
      <div className="profile-info">
        <h2 className="profile-name">{user.name || user.login}</h2>
        <a className="profile-login" href={user.html_url} target="_blank" rel="noreferrer">
          @{user.login}
        </a>
        {user.bio && <p className="profile-bio">{user.bio}</p>}
        <div className="profile-meta">
          {user.location && (
            <span className="profile-meta-item">
              <svg viewBox="0 0 16 16" width="14" height="14" fill="currentColor">
                <path d="M8 0a5.53 5.53 0 0 0-5.5 5.5c0 3.26 4.84 9.41 5.05 9.67a.6.6 0 0 0 .9 0C8.66 14.91 13.5 8.76 13.5 5.5A5.53 5.53 0 0 0 8 0zm0 8a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5z" />
              </svg>
              {user.location}
            </span>
          )}
          {user.blog && (
            <a
              className="profile-meta-item profile-link"
              href={user.blog.startsWith('http') ? user.blog : `https://${user.blog}`}
              target="_blank"
              rel="noreferrer"
            >
              <svg viewBox="0 0 16 16" width="14" height="14" fill="currentColor">
                <path d="M7.775 3.275a.75.75 0 0 0 1.06 1.06l1.25-1.25a2 2 0 1 1 2.83 2.83l-2.5 2.5a2 2 0 0 1-2.83 0 .75.75 0 0 0-1.06 1.06 3.5 3.5 0 0 0 4.95 0l2.5-2.5a3.5 3.5 0 0 0-4.95-4.95l-1.25 1.25zm-4.69 9.64a2 2 0 0 1 0-2.83l2.5-2.5a2 2 0 0 1 2.83 0 .75.75 0 0 0 1.06-1.06 3.5 3.5 0 0 0-4.95 0l-2.5 2.5a3.5 3.5 0 0 0 4.95 4.95l1.25-1.25a.75.75 0 0 0-1.06-1.06l-1.25 1.25a2 2 0 0 1-2.83 0z" />
              </svg>
              {user.blog}
            </a>
          )}
        </div>
        <div className="profile-follows">
          <span>
            <strong>{user.followers.toLocaleString()}</strong> followers
          </span>
          <span className="profile-follows-sep">·</span>
          <span>
            <strong>{user.following.toLocaleString()}</strong> following
          </span>
        </div>
      </div>
    </div>
  )
}
