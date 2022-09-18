import React, { useState } from 'react'
import styled from 'styled-components'
import SearchIcon from '@mui/icons-material/Search'
import { useObservable, useSubscription } from 'observable-hooks'
import { debounceTime, distinctUntilChanged, map } from 'rxjs'
import { useAppDispatch, useAppSelector } from '@features/hooks'
import { searchSymbol as testSearchSymbol } from '@features/market/marketSlice'

function Input() {
 const dispatch = useAppDispatch()
 const result = useAppSelector((state) => state.market.searchSymbol)
 const [searchSymbol, setSearchSymbol] = useState<string>('')
 const value$ = useObservable(
  (inputs$) =>
   inputs$.pipe(
    map(([value]) => value),
    debounceTime(150),
    distinctUntilChanged(),
   ),
  [searchSymbol],
 )

 const handleSearchSybol = (searchSymbol: string) => {
  dispatch(testSearchSymbol(searchSymbol))
 }

 useSubscription(value$, handleSearchSybol)

 return (
  <InputBlock>
   <input
    placeholder="코인명/심볼검색"
    type="text"
    name="symbol"
    onChange={(e) => setSearchSymbol(e.target.value)}
    value={searchSymbol}
   />
   <div>
    <SearchIcon color="primary" />
    {result}
   </div>
  </InputBlock>
 )
}

export default Input

const InputBlock = styled.div`
 display: flex;
 align-items: center;

 input {
  flex: 1;
  border: none;
  outline: none;
  padding: 0.765rem;
  font-size: 1.125rem;
  font-weight: bold;
  border: 1px solid white;
  border-bottom: 1px solid #d4d4d4;

  &:focus {
   border: 1px solid #448fff;
  }
 }
`
