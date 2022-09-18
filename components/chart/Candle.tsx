import type { CandleByTickerProps, Change } from '@interface/market'
import React, { useEffect } from 'react'
import * as d3 from 'd3'

interface Props extends Pick<CandleByTickerProps, 'opening_price' | 'high_price' | 'low_price' | 'trade_price'> {
 refEl: React.RefObject<SVGSVGElement>
 yesterdayChnage: Change
}

function Candle(props: Props) {
 const { high_price, low_price, opening_price, refEl, trade_price, yesterdayChnage } = props

 useEffect(() => {
  if (!refEl?.current) return

  const { width, height } = refEl.current.getClientRects()[0]

  const low = opening_price - low_price
  const high = high_price - opening_price

  const max = Math.max(low, high)

  const yScale = d3
   .scaleLinear()
   .domain([opening_price - max, opening_price + max])
   .range([height, 0])

  d3
   .select(refEl.current)
   .call((g) => g.selectAll('rect').remove())
   .append('rect')
   .attr('width', width)
   .attr('height', () => {
    const result = Math.abs(yScale(opening_price) - yScale(trade_price))
    return result === 0 ? 1 : result
   })
   .attr('x', 0)
   .attr('y', () => yScale(Math.max(trade_price, opening_price)))
   .attr('fill', () => {
    if (yesterdayChnage === 'RISE') return '#c84a31'
    else if (yesterdayChnage === 'FALL') return '#1261c4'
    const result = opening_price > trade_price

    return result ? '#1261c4' : 'black'
   })

  const doc2 = d3.select(refEl.current)

  const up = trade_price > opening_price

  doc2
   .call((g) => g.selectAll('.high-line').remove())
   .append('line')
   .attr('class', 'high-line')
   .attr('x1', width / 2)
   .attr('x2', width / 2)
   .attr('y1', up ? yScale(trade_price) : yScale(opening_price))
   .attr('y2', yScale(high_price))
   .attr('stroke', () => {
    if (yesterdayChnage === 'RISE') return '#c84a31'
    else if (yesterdayChnage === 'FALL') return '#1261c4'
    const result = opening_price > trade_price

    return result ? '#1261c4' : 'black'
   })

  doc2
   .call((g) => g.selectAll('.low-line').remove())
   .append('line')
   .attr('class', 'low-line')
   .attr('x1', width / 2)
   .attr('x2', width / 2)
   .attr('y1', yScale(Math.max(trade_price, opening_price)))
   .attr('y2', yScale(low_price))
   .attr('stroke', () => {
    if (yesterdayChnage === 'RISE') return '#c84a31'
    else if (yesterdayChnage === 'FALL') return '#1261c4'
    const result = opening_price > trade_price

    return result ? '#1261c4' : 'black'
   })
 }, [high_price, low_price, opening_price, refEl, trade_price, yesterdayChnage])

 return <></>
}

export default Candle
