import Mark from '@components/market/grid/column/Mark'
import Percent from '@components/market/grid/column/Percent'
import Price from '@components/market/grid/column/Price'
import Symbol from '@components/market/grid/column/Symbol'
import TodayCandle from '@components/market/grid/column/TodayCandle'
import Volume from '@components/market/grid/column/Volume'
import usePrevious from '@hooks/usePrevious'
import type { CandleByTickerProps } from '@interface/market'
import { numberToHuman } from '@utils/markets'
import React, { useMemo } from 'react'
import styled from 'styled-components'

interface Props {
 data: CandleByTickerProps
 koreanName: string
}

function Row(props: Props) {
 const { data, koreanName } = props

 const previousChange = usePrevious(data.trade_price)

 const enName = useMemo(() => {
  const [krw, symbol] = data.market.split('-')

  return `${symbol}/${krw}`
 }, [data.market])

 return (
  <RowBlock>
   <Mark />
   <TodayCandle
    opening_price={data.opening_price}
    high_price={data.high_price}
    low_price={data.low_price}
    trade_price={data.trade_price}
    yesterdayChnage={data.change}
   />
   <Symbol korName={koreanName} enName={enName} />
   <Price
    key={data.market}
    tradePrice={data.trade_price.toLocaleString()}
    yesterdayChnage={data.change}
    change={
     data.trade_price > (previousChange ?? 0) ? 'RISE' : data.trade_price < (previousChange ?? 0) ? 'FALL' : 'EVEN'
    }
   />
   <Percent
    signedChangeRate={`${data.signed_change_rate > 0 ? '+' : ''}${(data.signed_change_rate * 100).toFixed(2)}%`}
    signedChangePrice={data.signed_change_price.toLocaleString()}
    yesterdayChnage={data.change}
   />
   <Volume price={numberToHuman(data.acc_trade_price_24h)[0]} unit={numberToHuman(data.acc_trade_price_24h)[1]} />
  </RowBlock>
 )
}

const RowBlock = styled.div`
 display: grid;
 grid-template-columns: minmax(1rem, 3%) minmax(7px, 3%) 25.5% 22.5% 22.5% 22.5%;
 padding: 10px;
 border-bottom: 1px solid #d6d6d6;
 transition: all 0.3s;
 text-align: right;
 color: #333;
 font-size: 0.765rem;
 cursor: default;

 &:hover {
  background-color: #efefef;
 }
`

export default React.memo(Row)
