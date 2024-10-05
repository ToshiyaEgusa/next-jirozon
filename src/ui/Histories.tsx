'use client'
import React, { useState, useEffect } from 'react'

interface HistoryDetails {
  productSlug: string
}

interface ParsedData {
  volume: string
}

export function Histories({ productSlug }: HistoryDetails) {
  const [data, setData] = useState({
    volume: '',
  })

  useEffect(() => {
    const fetchHistoryDetails = async () => {
      try {
        const historyDetails = await fetch(`/api/historyDetails?productSlug=${productSlug}`).then((res) => res.text())
        const parsedData = JSON.parse(historyDetails) as ParsedData
        setData(parsedData)
      } catch (error) {
        console.error('Failed to fetch history details:', error)
      }
    }

    fetchHistoryDetails().catch((error) => {
      console.error('Failed to fetch history details:', error)
    })
  }, [productSlug])

  return (
    <div className="mt-2">
      <span style={{ color: 'red' }}>過去{data.volume}杯売れました</span>
    </div>
  )
}
