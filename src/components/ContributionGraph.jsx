import './ContributionGraph.css'

const MONTH_LABELS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
const DAY_LABELS = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat']

function levelFromCount(count) {
  if (count === 0) return 0
  if (count <= 3) return 1
  if (count <= 6) return 2
  if (count <= 9) return 3
  return 4
}

export function ContributionGraph({ weeks, totalContributions }) {
  if (!weeks?.length) return null

  const monthPositions = []
  let lastMonth = -1
  weeks.forEach((week, wi) => {
    const firstDay = week.contributionDays[0]
    if (firstDay) {
      const m = new Date(firstDay.date).getMonth()
      if (m !== lastMonth) {
        monthPositions.push({ month: m, col: wi })
        lastMonth = m
      }
    }
  })

  return (
    <div className="contrib-card">
      <div className="contrib-header">
        <h3 className="section-title">Contribution Activity</h3>
        <span className="contrib-total">{totalContributions.toLocaleString()} contributions in the last year</span>
      </div>
      <div className="contrib-wrapper">
        <div className="contrib-day-labels">
          {DAY_LABELS.map((d, i) => (
            <span key={d} className="contrib-day-label" style={{ gridRow: i + 1 }}>
              {i % 2 !== 0 ? d : ''}
            </span>
          ))}
        </div>
        <div className="contrib-grid-wrapper">
          <div className="contrib-month-labels">
            {monthPositions.map(({ month, col }) => (
              <span
                key={`${month}-${col}`}
                className="contrib-month-label"
                style={{ gridColumnStart: col + 1 }}
              >
                {MONTH_LABELS[month]}
              </span>
            ))}
          </div>
          <div className="contrib-grid" style={{ '--cols': weeks.length }}>
            {weeks.map((week, wi) =>
              week.contributionDays.map((day) => (
                <div
                  key={day.date}
                  className={`contrib-cell contrib-level-${levelFromCount(day.contributionCount)}`}
                  title={`${day.date}: ${day.contributionCount} contribution${day.contributionCount !== 1 ? 's' : ''}`}
                />
              ))
            )}
          </div>
        </div>
      </div>
      <div className="contrib-legend">
        <span className="contrib-legend-label">Less</span>
        {[0, 1, 2, 3, 4].map((l) => (
          <div key={l} className={`contrib-cell contrib-level-${l}`} />
        ))}
        <span className="contrib-legend-label">More</span>
      </div>
    </div>
  )
}
