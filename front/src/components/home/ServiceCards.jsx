import ImagePlaceholder from '../common/ImagePlaceholder'
import { services } from '../../data/homeContent'
import './ServiceCards.css'

function ServiceCards() {
  return (
    <section className="services container" id="programs" aria-label="몽키즈 프로그램">
      {services.map((service) => (
        <article key={service.id} className={`service-card service-card--${service.theme}`}>
          <div className="service-card__body">
            <h2 className="service-card__title">{service.title}</h2>
            <p className="service-card__description">{service.description}</p>
            <a href={service.href} className="service-card__more">
              <span className="service-card__arrow" aria-hidden="true">›</span>
              자세히 보기
            </a>
          </div>
          <div className="service-card__image">
            <ImagePlaceholder label={service.imageLabel} />
          </div>
        </article>
      ))}
    </section>
  )
}

export default ServiceCards
