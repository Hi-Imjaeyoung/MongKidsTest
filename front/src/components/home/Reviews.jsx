import { useState } from 'react'
import { reviews } from '../../data/homeContent'
import './Reviews.css'

const VISIBLE_COUNT = 3

function Reviews() {
  const [startIndex, setStartIndex] = useState(0)

  // 마지막 후기 다음에는 처음 후기로 이어지도록 순환한다.
  const visibleReviews = Array.from(
    { length: Math.min(VISIBLE_COUNT, reviews.length) },
    (_, offset) => reviews[(startIndex + offset) % reviews.length],
  )

  const showNext = () => setStartIndex((index) => (index + 1) % reviews.length)

  return (
    <section className="reviews container" aria-labelledby="reviews-title">
      <div className="reviews__panel">
        <h2 id="reviews-title" className="reviews__title">
          <span className="reviews__title-line">원장님들의</span>{' '}
          <span className="reviews__title-line">생생한 후기</span>
          <span className="reviews__bubble" aria-hidden="true">💬</span>
        </h2>

        <ul className="reviews__list">
          {visibleReviews.map((review) => (
            <li key={review.id} className="review-card">
              <span className="review-card__stars" aria-label={`별점 ${review.rating}점`}>
                {'★'.repeat(review.rating)}
              </span>
              <p className="review-card__content">{review.content}</p>
              <p className="review-card__author">- {review.author} -</p>
            </li>
          ))}
        </ul>

        <button type="button" className="reviews__next" aria-label="다음 후기" onClick={showNext}>
          ›
        </button>
      </div>
    </section>
  )
}

export default Reviews
