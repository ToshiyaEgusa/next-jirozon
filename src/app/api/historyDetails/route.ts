import { execSync } from 'child_process'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const productSlug = searchParams.get('productSlug')

  if (!productSlug) {
    return NextResponse.json({ error: 'Product Name is required' }, { status: 400 })
  }

  try {
    const res = execSync(`grpcurl -plaintext -d '{"tenpo": "${productSlug}"}' 57.180.8.59:50063 history.HistoryService.GetHistory`).toString()
    const parsedRes = JSON.parse(res) as { historyList: Array<{ tenpo: string; volume: number }> }

    if (!parsedRes.historyList) {
      return NextResponse.json({ volume: 0 })
    }

    const aggregatedHistory = parsedRes.historyList.reduce((acc: Array<{ tenpo: string; volume: number }>, item) => {
      const existing = acc.find((h) => h.tenpo === item.tenpo)
      if (existing) {
        existing.volume += item.volume
      } else {
        acc.push({ tenpo: item.tenpo, volume: item.volume })
      }
      return acc
    }, [])

    return NextResponse.json({ volume: aggregatedHistory[0]?.volume })
  } catch (error) {
    console.error('Error executing grpc command:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  const { searchParams } = new URL(request.url)
  const productSlug = searchParams.get('productSlug')
  const volume = searchParams.get('volume')

  if (!productSlug || !volume) {
    return NextResponse.json({ error: 'Product Name and Volume are required' }, { status: 400 })
  }

  const date = new Date().toISOString()

  try {
    const res = execSync(
      `grpcurl -plaintext -d '{"tenpo": "${productSlug}", "volume": ${volume}, "date": "${date}"}' 57.180.8.59:50063 history.HistoryService.CreateHistory`
    ).toString()
    const parsedRes = JSON.parse(res) as { tenpo: string; volume: number; date: string }

    return NextResponse.json(parsedRes)
  } catch (error) {
    console.error('Error executing grpc command:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
