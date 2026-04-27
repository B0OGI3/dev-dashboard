import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts'
import './LanguageChart.css'

const COLORS = [
  '#58a6ff', '#bc8cff', '#f78166', '#3fb950', '#d2a8ff',
  '#ffa657', '#79c0ff', '#56d364',
]

export function LanguageChart({ languages }) {
  if (!languages?.length) return null

  return (
    <div className="lang-chart-card">
      <h3 className="section-title">Top Languages</h3>
      <ResponsiveContainer width="100%" height={240}>
        <PieChart>
          <Pie
            data={languages}
            dataKey="count"
            nameKey="name"
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={90}
            paddingAngle={2}
          >
            {languages.map((entry, i) => (
              <Cell key={entry.name} fill={COLORS[i % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip
            formatter={(value, name, props) => [`${props.payload.percent}%`, name]}
            contentStyle={{
              background: 'var(--surface)',
              border: '1px solid var(--border)',
              borderRadius: '8px',
              color: 'var(--text-primary)',
              fontSize: '0.8rem',
            }}
          />
          <Legend
            formatter={(value) => (
              <span style={{ color: 'var(--text-secondary)', fontSize: '0.8rem' }}>{value}</span>
            )}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}
