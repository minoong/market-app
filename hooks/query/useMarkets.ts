import type { UseQueryOptionsOf } from '@interface/index'
import { useQuery } from '@tanstack/react-query'
import { getMarkets } from 'libs/api/markets'

export function useMarkets(symbols: string, options: UseQueryOptionsOf<typeof getMarkets> = {}) {
 return useQuery(extractKey(symbols), () => getMarkets(symbols), options)
}

const extractKey = (symbols: string) => ['markets', symbols]

useMarkets.extractKey = extractKey
