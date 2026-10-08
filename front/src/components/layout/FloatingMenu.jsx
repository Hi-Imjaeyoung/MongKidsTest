import { floatingActions } from '../../data/homeContent'
import './FloatingMenu.css'

function FloatingMenu() {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

  return (
    <aside className="floating-menu" aria-label="빠른 상담">
      {floatingActions.map((action) => (
        <button
          key={action.id}
          type="button"
          className={`floating-menu__item floating-menu__item--${action.theme}`}
        >
          <span className="floating-menu__icon" aria-hidden="true">{action.icon}</span>
          <span className="floating-menu__label">{action.label}</span>
        </button>
      ))}
      <button
        type="button"
        className="floating-menu__item floating-menu__item--white"
        onClick={scrollToTop}
      >
        <span className="floating-menu__icon floating-menu__icon--top" aria-hidden="true">⌃</span>
        <span className="floating-menu__label">맨 위로</span>
      </button>
    </aside>
  )
}

export default FloatingMenu
