import { useAppSelector } from '@features/hooks'
import type { CandleByTickerProps } from '@interface/market'
import React from 'react'
import Row from './Row'
import * as _ from 'lodash'

interface Props {
 data: CandleByTickerProps[]
}

function Grid(props: Props) {
 const { data } = props
 const { markets } = useAppSelector((state) => state.market)

 return (
  <div>
   <div style={{ maxHeight: '320px', overflow: 'auto' }}>
    {data.map((market) => (
     <Row
      key={market.market}
      data={market}
      koreanName={_.find(markets, { market: market.market })?.korean_name ?? ''}
     />
    ))}
   </div>
  </div>
 )
}

export default React.memo(Grid)
