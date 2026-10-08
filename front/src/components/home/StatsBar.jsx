import { stats } from '../../data/homeContent'
import './StatsBar.css'

function StatsBar() {
  return (
    <section className="stats container" aria-label="몽키즈 운영 현황">
      <ul className="stats__list">
        {stats.items.map((item) => (
          <li key={item.label} className="stats__item">
            <span className="stats__icon" aria-hidden="true">{item.icon}</span>
            <div>
              <strong className="stats__value">
                {item.value}
                <small>{item.suffix}</small>
              </strong>
              <span className="stats__label">{item.label}</span>
            </div>
          </li>
        ))}
      </ul>
      <p className="stats__baseline">{stats.baseline}</p>
    </section>
  )
}

export default StatsBar
