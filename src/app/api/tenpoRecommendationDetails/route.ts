import { execSync } from 'child_process'
import { NextResponse } from 'next/server'
import * as Commerce from 'commerce-kit'

interface TenpoRecommendResponse {
  tenpoList: string[]
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const productSlug = searchParams.get('productSlug')

  if (!productSlug) {
    return NextResponse.json({ error: 'Product Name is required' }, { status: 400 })
  }

  try {
    const res = execSync(
      `grpcurl -plaintext -d '{"tenpo": "${productSlug}", "size": "6"}' 57.180.8.59:50062 tenpoRecommend.TenpoRecommendService.GetTenpoRecommend`
    ).toString()
    const parsedRes = JSON.parse(res) as TenpoRecommendResponse
    const allProducts = await Commerce.productBrowse({})
    const tenpoProducts = allProducts.filter((product) => parsedRes.tenpoList.includes(product.metadata.slug))
    return NextResponse.json({ tenpoList: tenpoProducts })
  } catch (error) {
    console.error('Error executing grpc command:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
