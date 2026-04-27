import { useState } from 'react'
import './SearchInput.css'

export function SearchInput({ onSearch, loading }) {
  const [value, setValue] = useState('')

  function handleSubmit(e) {
    e.preventDefault()
    const trimmed = value.trim()
    if (trimmed) onSearch(trimmed)
  }

  return (
    <form className="search-form" onSubmit={handleSubmit} role="search">
      <div className="search-input-wrap">
        <svg className="search-icon" viewBox="0 0 16 16" width="16" height="16" fill="currentColor">
          <path d="M10.68 11.74a6 6 0 0 1-7.922-8.982 6 6 0 0 1 8.982 7.922l3.04 3.04a.749.749 0 0 1-.326 1.275.749.749 0 0 1-.734-.215ZM11.5 7a4.499 4.499 0 1 0-8.997 0A4.499 4.499 0 0 0 11.5 7Z" />
        </svg>
        <input
          className="search-input"
          type="text"
          placeholder="Enter a GitHub username…"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          aria-label="GitHub username"
          autoComplete="off"
          spellCheck={false}
        />
      </div>
      <button className="search-btn" type="submit" disabled={loading || !value.trim()}>
        {loading ? 'Loading…' : 'Search'}
      </button>
    </form>
  )
}
