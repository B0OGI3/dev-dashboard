import axios from 'axios'

const TOKEN = import.meta.env.VITE_GITHUB_TOKEN

export const restClient = axios.create({
  baseURL: 'https://api.github.com',
  headers: {
    Accept: 'application/vnd.github+json',
    ...(TOKEN ? { Authorization: `Bearer ${TOKEN}` } : {}),
  },
})

restClient.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 403) {
      const reset = err.response.headers['x-ratelimit-reset']
      const resetTime = reset ? new Date(reset * 1000).toLocaleTimeString() : 'soon'
      err.rateLimited = true
      err.resetTime = resetTime
    }
    return Promise.reject(err)
  }
)

export async function graphqlFetch(query, variables = {}) {
  if (!TOKEN) throw new Error('VITE_GITHUB_TOKEN is required for GraphQL queries')

  const res = await fetch('https://api.github.com/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${TOKEN}`,
    },
    body: JSON.stringify({ query, variables }),
  })

  const json = await res.json()

  if (!res.ok) {
    if (res.status === 403) {
      const err = new Error('Rate limit exceeded')
      err.rateLimited = true
      throw err
    }
    throw new Error(json.message || 'GraphQL request failed')
  }

  if (json.errors) {
    throw new Error(json.errors[0]?.message || 'GraphQL error')
  }

  return json.data
}
