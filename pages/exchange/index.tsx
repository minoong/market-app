import { gql, useQuery } from '@apollo/client'
import Input from '@components/market/search/Input'
import { increment } from '@features/counter/counterSlice'
import { useAppDispatch, useAppSelector } from '@features/hooks'
import { invoke } from '@features/market/marketSlice'
import { wrapper } from '@features/store'
import type { Market } from '@interface/market'
import { dehydrate, QueryClient } from '@tanstack/react-query'
import axios from 'axios'
import GridContainer from 'containers/market/grid/GridContainer'
import { Post, QueryPostArgs } from 'generated/graphql'
import { getMarkets } from 'libs/api/markets'
import type { GetServerSideProps, NextPage } from 'next'
import { Suspense } from 'react'

const GET_ORDER = gql`
 query post($id: ID!) {
  post(id: $id) {
   body
   id
   title
   user {
    name
   }
  }
 }
`

const Exchange: NextPage<{ symbolSnake: string }> = (props) => {
 const { symbolSnake } = props
 const count = useAppSelector((state) => state.counter.value)
 const dispatch = useAppDispatch()

 useQuery<Post, QueryPostArgs>(GET_ORDER, {
  variables: {
   id: '5',
  },
 })

 return (
  <div>
   <Input />
   <Suspense fallback={<div>lㅋㅋㅋㅋㅋㅋㅋㅋoading</div>}>
    <GridContainer symbols={symbolSnake} />
   </Suspense>
   <button type="button" onClick={() => dispatch(increment())}>
    dispatch
   </button>
   main page count {count}
  </div>
 )
}

export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps((store) => async (context) => {
 const symbol = context.query.symbol
 const markets = await axios.get<Market[]>('https://api.upbit.com/v1/market/all').then((res) => res.data)
 const krwMarkets = markets.filter((market) => market.market.startsWith('KRW-'))
 await store.dispatch(invoke(krwMarkets))

 const symbolSnake = krwMarkets.map((market) => market.market).join(',')

 const queryClient = new QueryClient()
 await queryClient.prefetchQuery(['markets', symbolSnake], () => getMarkets(symbolSnake))

 return {
  ...(!symbol && {
   redirect: {
    permanent: false,
    destination: '/exchange?symbol=KRW-BTC',
   },
  }),
  props: {
   dehydratedState: dehydrate(queryClient),
   symbolSnake,
  },
 }
})

export default Exchange
