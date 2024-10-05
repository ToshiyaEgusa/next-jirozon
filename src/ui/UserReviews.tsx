'use client'

import React, { useState, useEffect } from 'react'
import { Star } from '@mui/icons-material'

interface ReviewDetails {
  productSlug: string
}

interface Review {
  nickname: string
  rating: number
  content: string
  tenpo: string
}

export function UserReviews({ productSlug }: ReviewDetails) {
  const [reviews, setReviews] = useState<Review[]>([])
  const [nickname, setNickname] = useState('')
  const [rating, setRating] = useState(0)
  const [content, setContent] = useState('')

  useEffect(() => {
    const fetchReviewDetails = async () => {
      try {
        const reviewDetails = await fetch(`/api/reviewDetails?productSlug=${productSlug}`).then((res) => res.text())
        const parsedData = JSON.parse(reviewDetails) as Review[]
        setReviews(parsedData)
      } catch (error) {
        console.error('Failed to fetch reviews:', error)
      }
    }

    fetchReviewDetails().catch((error) => {
      console.error('Failed to fetch reviews:', error)
    })
  }, [productSlug])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const newReview: Review = {
      nickname,
      rating,
      content,
      tenpo: '',
    }

    const queryParams = new URLSearchParams({
      nickname: newReview.nickname,
      rating: newReview.rating.toString(),
      content: newReview.content,
      productSlug: productSlug,
    }).toString()

    try {
      const response = await fetch(`/api/reviewDetails?${queryParams}`, {
        method: 'POST',
      })

      if (!response.ok) {
        throw new Error('Failed to submit review')
      }

      const reviewDetails = await fetch(`/api/reviewDetails?productSlug=${productSlug}`).then((res) => res.text())
      const parsedData = JSON.parse(reviewDetails) as Review[]
      setReviews(parsedData)
      setNickname('')
      setRating(0)
      setContent('')
    } catch (error) {
      console.error('Failed to submit review:', error)
    }
  }

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-4">ユーザーレビュー</h2>
      <form onSubmit={handleSubmit} className="mb-6">
        <input
          type="text"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          placeholder="ニックネーム"
          className="w-full mb-2 p-2 border rounded"
          required
        />
        <div className="flex mb-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star
              key={star}
              className={`h-6 w-6 cursor-pointer ${star <= rating ? 'text-yellow-400' : 'text-gray-300'}`}
              onClick={() => setRating(star)}
            />
          ))}
        </div>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="コメント"
          className="w-full mb-2 p-2 border rounded"
          required
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mb-5">
          レビューを投稿
        </button>
      </form>
      <div>
        {reviews.length === 0 ? (
          <p> </p>
        ) : (
          reviews.map((review) => (
            <div key={review.nickname} className="mb-4 p-4 border rounded">
              <p className="font-bold">{review.nickname}</p>
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className={`h-5 w-5 ${star <= review.rating ? 'text-yellow-400' : 'text-gray-300'}`} />
                ))}
              </div>
              <p>{review.content}</p>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
