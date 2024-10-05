'use client'
import React, { useState, useEffect } from 'react'

interface ProductDetails {
  productSlug: string
}

export function ProductInformation({ productSlug }: ProductDetails) {
  const [data, setData] = useState({
    mennofutosa: '',
    mennokatasa: '',
    soup: '',
    buta: '',
    ninniku: '',
    yasai: '',
    abura: '',
  })

  useEffect(() => {
    const fetchProductDetails = async () => {
      const response = await fetch(`/api/productDetails?productSlug=${productSlug}`)
      const productDetails = await response.json()
      setData(
        productDetails as { mennofutosa: string; mennokatasa: string; soup: string; buta: string; ninniku: string; yasai: string; abura: string }
      )
    }

    void fetchProductDetails()
  }, [productSlug])

  const containerStyle = {
    padding: '20px',
    border: '1px solid #ddd',
    borderRadius: '8px',
    maxWidth: '400px',
    margin: '25px auto',
  }

  const titleStyle = {
    fontSize: '24px',
    fontWeight: 'bold',
    marginBottom: '16px',
    textAlign: 'left',
  }

  const itemStyle = {
    marginBottom: '12px',
    fontSize: '18px',
  }

  const spanStyle = {
    fontWeight: 'bold',
  }

  return (
    <div style={containerStyle}>
      <h1 style={{ ...titleStyle, textAlign: 'center' as const }}>商品情報(デフォルトの場合)</h1>
      <p style={itemStyle}>
        <span style={spanStyle}>スープの濃さ:</span> {data.soup}
      </p>
      <p style={itemStyle}>
        <span style={spanStyle}>麺の太さ:</span> {data.mennofutosa}
      </p>
      <p style={itemStyle}>
        <span style={spanStyle}>麺の硬さ:</span> {data.mennokatasa}
      </p>
      <p style={itemStyle}>
        <span style={spanStyle}>豚肉の枚数:</span> {data.buta}
      </p>
      <p style={itemStyle}>
        <span style={spanStyle}>ニンニクの量:</span> {data.ninniku}
      </p>
      <p style={itemStyle}>
        <span style={spanStyle}>野菜の量:</span> {data.yasai}
      </p>
      <p style={itemStyle}>
        <span style={spanStyle}>油の量:</span> {data.abura}
      </p>
    </div>
  )
}
