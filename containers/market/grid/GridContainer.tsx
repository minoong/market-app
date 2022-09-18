import Grid from '@components/market/grid/Grid'
import { useAppSelector } from '@features/hooks'
import { useMarkets } from '@hooks/query/useMarkets'
import React, { useRef } from 'react'
import * as _ from 'lodash'

interface Props {
 symbols: string
}

function GridContainer(props: Props) {
 const { symbols } = props
 const searchSymbol = useAppSelector((state) => state.market.searchSymbol)
 const ref = useRef<HTMLDivElement>(null)

 const { data } = useMarkets(symbols, {
  suspense: true,
  refetchInterval: 20000,
 })

 const result = _.filter(data, (test) => {
  const reg = new RegExp(searchSymbol, 'ig')

  return reg.test(test.market)
 })

 return <div ref={ref}>{data && <Grid data={result} />}</div>
}

export default GridContainer
