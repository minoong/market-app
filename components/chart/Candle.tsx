import type { CandleByTickerProps, Change } from '@interface/market'
import React, { useMemo } from 'react'
import * as d3 from 'd3'

interface Props extends Pick<CandleByTickerProps, 'opening_price' | 'high_price' | 'low_price' | 'trade_price'> {
 refEl: React.RefObject<SVGSVGElement>
 size: {
  width: number
  height: number
 }
 yesterdayChnage: Change
}

function Candle(props: Props) {
 const {
  high_price,
  low_price,
  opening_price,
  trade_price,
  yesterdayChnage,
  size: { width, height },
 } = props

 const yScale = useMemo(() => {
  const low = opening_price - low_price
  const high = high_price - opening_price

  const max = Math.max(low, high)

  return d3
   .scaleLinear()
   .domain([opening_price - max, opening_price + max])
   .range([height, 0])
 }, [height, high_price, low_price, opening_price])

 const rectHeight = useMemo(() => {
  const result = Math.abs(yScale(opening_price) - yScale(trade_price))
  return result === 0 ? 1 : result
 }, [opening_price, trade_price, yScale])

 const chage = useMemo(() => {
  if (yesterdayChnage === 'RISE') return '#c84a31'
  else if (yesterdayChnage === 'FALL') return '#1261c4'
  const result = opening_price > trade_price

  return result ? '#1261c4' : 'black'
 }, [opening_price, trade_price, yesterdayChnage])

 const isUp = useMemo(() => trade_price > opening_price, [opening_price, trade_price])
 const lineWidth = useMemo(() => width / 2, [width])

 return (
  <g>
   <rect x={0} width={width} height={rectHeight} y={yScale(Math.max(trade_price, opening_price))} fill={chage} />
   <line
    x1={lineWidth}
    x2={lineWidth}
    y1={isUp ? yScale(trade_price) : yScale(opening_price)}
    y2={yScale(high_price)}
    stroke={chage}
   />
   <line
    x1={lineWidth}
    x2={lineWidth}
    y1={yScale(Math.max(trade_price, opening_price))}
    y2={yScale(low_price)}
    stroke={chage}
   />
  </g>
 )
}

export default React.memo(Candle)
