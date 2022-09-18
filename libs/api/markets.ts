import axios from 'axios'
import type { CandleByTickerProps } from '@interface/market'

export async function getMarkets(symbols: string) {
 const { data } = await axios.get<CandleByTickerProps[]>(`https://api.upbit.com/v1/ticker?markets=${symbols}`)
 return data
}
