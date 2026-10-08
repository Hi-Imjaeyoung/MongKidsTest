import './Button.css'

// variant: 'yellow' | 'blue', size: 'md' | 'lg'
function Button({ variant = 'yellow', size = 'md', icon, children, ...props }) {
  return (
    <button type="button" className={`btn btn--${variant} btn--${size}`} {...props}>
      {icon && <span className="btn__icon" aria-hidden="true">{icon}</span>}
      {children}
    </button>
  )
}

export default Button
