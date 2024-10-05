import { execSync } from 'child_process'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const productSlug = searchParams.get('productSlug')

  if (!productSlug) {
    return NextResponse.json({ error: 'Product Name is required' }, { status: 400 })
  }

  try {
    const res = execSync(`grpcurl -plaintext -d '{"tenpo": "${productSlug}"}' 57.180.8.59:50061 review.ReviewService.GetReviewsFromTenpo`).toString()
    const parsedRes = JSON.parse(res) as { reviews: Array<{ tenpo: string; nickname: string; content: string; rating: number }> }

    if (!parsedRes?.reviews) {
      return NextResponse.json([])
    }

    // 配列のレスポンスを作るときに、無駄にネストさせないようにする.　.json({ reviews: parsedRes.reviews }) ではなく .json(parsedRes.reviews) とする
    return NextResponse.json(parsedRes.reviews)
  } catch (error) {
    console.error('Error executing grpc command:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  const { searchParams } = new URL(request.url)
  const productSlug = searchParams.get('productSlug')
  const nickname = searchParams.get('nickname')
  const rating = searchParams.get('rating')
  const content = searchParams.get('content')

  if (!productSlug) {
    return NextResponse.json({ error: 'Product Name is required' }, { status: 400 })
  }

  if (!nickname || !rating || !content) {
    return NextResponse.json({ error: 'Nickname, Rating, and Content are required' }, { status: 400 })
  }

  try {
    execSync(
      `grpcurl -plaintext -d '{"tenpo": "${productSlug}", "nickname": "${nickname}", "rating": ${rating}, "content": "${content}"}' 57.180.8.59:50061 review.ReviewService.CreateReview`
    )
    return NextResponse.json({ message: 'OK' }, { status: 200 })
  } catch (error) {
    console.error('Error executing grpc command:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
