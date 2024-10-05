'use client'
import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { YnsLink } from '@/ui/yns-link'

interface TenpoRecommendationDetails {
  productSlug: string
}

interface TenpoRecommendationResponse {
  tenpoList: { id: string; name: string; images: string[]; metadata: { slug: string } }[]
}

export function TenpoRecommendation({ productSlug }: TenpoRecommendationDetails) {
  const [data, setData] = useState<TenpoRecommendationResponse>({
    tenpoList: [],
  })

  useEffect(() => {
    const fetchTenpoRecommendation = async () => {
      const response = await fetch(`/api/tenpoRecommendationDetails?productSlug=${productSlug}`)
      const tenpoRecommendationDetails = (await response.json()) as TenpoRecommendationResponse
      setData({ tenpoList: tenpoRecommendationDetails.tenpoList })
    }

    void fetchTenpoRecommendation()
  }, [productSlug])

  return (
    <>
      <div style={{ fontWeight: 'bold' }}>この二郎に関連する二郎</div>
      <ul className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {data.tenpoList.map((tenpo) => {
          return (
            <YnsLink href={`/product/${tenpo.metadata.slug}`} key={tenpo.id}>
              <li key={tenpo.id} className="group">
                <article className="overflow-hidden rounded border bg-white">
                  <div className="p-4">
                    <h2 className="text-lg font-semibold text-neutral-700">{tenpo.name}</h2>
                  </div>
                  <div>
                    <Image src={tenpo.images[0] ?? ''} alt={tenpo.name} width={400} height={300} className="w-full h-48 object-cover" />
                  </div>
                </article>
              </li>
            </YnsLink>
          )
        })}
      </ul>
    </>
  )
}
