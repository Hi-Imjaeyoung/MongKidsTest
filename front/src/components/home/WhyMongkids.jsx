import Highlight from '../common/Highlight'
import { reasons } from '../../data/homeContent'
import './WhyMongkids.css'

function WhyMongkids() {
  return (
    <section className="why container" id="about">
      <header className="section-heading">
        <p className="section-heading__eyebrow">
          WHY <span>MONGKIDS?</span>
        </p>
        <h2 className="section-heading__title">몽키즈가 특별한 이유</h2>
      </header>

      <ul className="why__list">
        {reasons.map((reason) => (
          <li key={reason.title} className="why__item">
            <span className={`why__icon why__icon--${reason.theme}`} aria-hidden="true">
              {reason.icon}
            </span>
            <h3 className="why__title">{reason.title}</h3>
            <p className="why__description">
              <Highlight text={reason.description} word={reason.highlight} />
            </p>
          </li>
        ))}
      </ul>
    </section>
  )
}

export default WhyMongkids
