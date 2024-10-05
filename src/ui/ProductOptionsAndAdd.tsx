'use client'
import React from 'react'
import { AddToCartButton } from './add-to-cart-button'

export function ProductOptionsAndAdd({ productId, productSlug }: { productId: string; productSlug: string }) {
  // const [options, setOptions] = useState({
  //   ninniku: 2,
  //   yasai: 2,
  //   karame: 2,
  //   abura: 2,
  // })

  // const handleOptionChange = (key: string, value: number) => {
  //   setOptions((prevOptions) => ({
  //     ...prevOptions, // 既存のoptionsオブジェクトを展開してコピー
  //     [key]: value, // 特定のキー（ninniku, yasai, karame, abura）のみを更新
  //   }))
  // }

  return (
    <div>
      {/* <div className="mb-5" style={{ fontWeight: 'bold', fontSize: '25px' }}>
        ニンニク入れますか？
      </div>
      <div>
        <label>
          ニンニク:
          <select
            className="ml-2 mb-5"
            value={options.ninniku}
            onChange={(e) => handleOptionChange('ninniku', Number(e.target.value))}
          >
            <option value={0}>なし</option>
            <option value={1}>少なめ</option>
            <option value={2}>普通</option>
            <option value={3}>マシ</option>
            <option value={4}>マシマシ</option>
          </select>
        </label>
      </div>
      <div>
        <label>
          ヤサイ:
          <select
            className="ml-2 mb-5"
            value={options.yasai}
            onChange={(e) => handleOptionChange('yasai', Number(e.target.value))}
          >
            <option value={0}>なし</option>
            <option value={1}>少なめ</option>
            <option value={2}>普通</option>
            <option value={3}>マシ</option>
            <option value={4}>マシマシ</option>
          </select>
        </label>
      </div>
      <div>
        <label>
          味の濃さ:
          <select
            className="ml-2 mb-5"
            value={options.karame}
            onChange={(e) => handleOptionChange('karame', Number(e.target.value))}
          >
            <option value={0}>なし</option>
            <option value={1}>少なめ</option>
            <option value={2}>普通</option>
            <option value={3}>カラメ</option>
            <option value={4}>カラカラ</option>
          </select>
        </label>
      </div>
      <div className="mb-10">
        <label>
          アブラ:
          <select
            className="ml-2"
            value={options.abura}
            onChange={(e) => handleOptionChange('abura', Number(e.target.value))}
          >
            <option value={0}>なし</option>
            <option value={1}>少なめ</option>
            <option value={2}>普通</option>
            <option value={3}>マシ</option>
            <option value={4}>マシマシ</option>
          </select>
        </label>
      </div> */}
      <AddToCartButton productId={productId} productSlug={productSlug} />
    </div>
  )
}
