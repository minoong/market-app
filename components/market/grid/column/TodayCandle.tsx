import Candle from '@components/chart/Candle'
import type { CandleByTickerProps, Change } from '@interface/market'
import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'

type Props = Pick<CandleByTickerProps, 'opening_price' | 'high_price' | 'low_price' | 'trade_price'> & {
 yesterdayChnage: Change
}

function TodayCandle(props: Props) {
 const { opening_price, high_price, low_price, trade_price, yesterdayChnage } = props
 const divRef = useRef<HTMLDivElement>(null)
 const svgRef = useRef<SVGSVGElement>(null)
 const [height, setHeight] = useState<number>(0)

 useEffect(() => {
  if (divRef.current) {
   const { height } = divRef.current.getClientRects()[0]
   setHeight(height)
  }
 }, [])

 return (
  <TodayCandleBlock ref={divRef}>
   <svg ref={svgRef} width={7} height={height}></svg>
   {height && (
    <Candle
     refEl={svgRef}
     high_price={high_price}
     low_price={low_price}
     opening_price={opening_price}
     trade_price={trade_price}
     yesterdayChnage={yesterdayChnage}
    />
   )}
  </TodayCandleBlock>
 )
}

const TodayCandleBlock = styled.div`
 display: flex;
 justify-content: center;
`

export default React.memo(TodayCandle)
