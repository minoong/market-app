import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { Market } from '@interface/market'

interface MarketSlice {
 markets: Market[]
 searchSymbol: string
}

const initialState: MarketSlice = {
 markets: [],
 searchSymbol: '',
}

export const marketSlice = createSlice({
 name: 'market',
 initialState,
 reducers: {
  invoke: (state, action: PayloadAction<Market[]>) => {
   state.markets = action.payload
  },
  searchSymbol: (state, action: PayloadAction<string>) => {
   state.searchSymbol = action.payload
  },
 },
})

export const { invoke, searchSymbol } = marketSlice.actions

export default marketSlice.reducer
