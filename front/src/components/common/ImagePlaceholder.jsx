import './ImagePlaceholder.css'

// 실제 사진이 준비되기 전까지 사용하는 이미지 자리 표시 영역
function ImagePlaceholder({ label, className = '' }) {
  return (
    <div className={`image-placeholder ${className}`} role="img" aria-label={label}>
      <span className="image-placeholder__icon" aria-hidden="true">📷</span>
      <span className="image-placeholder__label">{label}</span>
    </div>
  )
}

export default ImagePlaceholder
