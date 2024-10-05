import { execSync } from 'child_process'
import { NextResponse } from 'next/server'

interface MenResponse {
  men: {
    futosa: string
    katasa: string
  }
}

interface SoupResponse {
  volume: string
}

interface ButaResponse {
  volume: string
}

interface NinnikuResponse {
  volume: string
}

interface YasaiResponse {
  volume: string
}

interface AburaResponse {
  volume: string
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const productSlug = searchParams.get('productSlug')

  if (!productSlug) {
    return NextResponse.json({ error: 'Product Name is required' }, { status: 400 })
  }

  try {
    const menRes = execSync(`grpcurl -plaintext -d '{"tenpo": "${productSlug}"}' localhost:50056 men.MenService.GetMen`).toString()
    const parsedMenRes = JSON.parse(menRes) as MenResponse
    const soupRes = execSync(`grpcurl -plaintext -d '{"tenpo": "${productSlug}"}' localhost:50052 soup.SoupService.GetSoup`).toString()
    const parsedSoupRes = JSON.parse(soupRes) as SoupResponse
    const butaRes = execSync(`grpcurl -plaintext -d '{"tenpo": "${productSlug}"}' localhost:50054 buta.ButaService.GetButa`).toString()
    const parsedButaRes = JSON.parse(butaRes) as ButaResponse
    const ninnikuRes = execSync(`grpcurl -plaintext -d '{"tenpo": "${productSlug}"}' localhost:50053 ninniku.NinnikuService.GetNinniku`).toString()
    const parsedNinnikuRes = JSON.parse(ninnikuRes) as NinnikuResponse
    const yasaiRes = execSync(`grpcurl -plaintext -d '{"tenpo": "${productSlug}"}' localhost:50055 yasai.YasaiService.GetYasai`).toString()
    const parsedYasaiRes = JSON.parse(yasaiRes) as YasaiResponse
    const aburaRes = execSync(`grpcurl -plaintext -d '{"tenpo": "${productSlug}"}' localhost:50051 abura.AburaService.GetAbura`).toString()
    const parsedAburaRes = JSON.parse(aburaRes) as AburaResponse

    return NextResponse.json({
      mennofutosa: parsedMenRes.men.futosa,
      mennokatasa: parsedMenRes.men.katasa,
      soup: parsedSoupRes.volume,
      buta: parsedButaRes.volume,
      ninniku: parsedNinnikuRes.volume,
      yasai: parsedYasaiRes.volume,
      abura: parsedAburaRes.volume,
    })
  } catch (error) {
    console.error('Error executing grpc command:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
