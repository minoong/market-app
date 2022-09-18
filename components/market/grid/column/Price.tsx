import usePrevious from '@hooks/usePrevious'
import type { Change } from '@interface/market'
import React, { useEffect, useState } from 'react'
import styled, { css } from 'styled-components'

interface Props {
 tradePrice: string
 change: Change
 yesterdayChnage: Change
}

function Price(props: Props) {
 const { tradePrice, change, yesterdayChnage } = props
 const [currentChange, setCurrentChange] = useState<Change>(change)
 const previousChange = usePrevious(change)

 useEffect(() => {
  if (previousChange !== change) {
   setCurrentChange(change)
  }
  const id = setTimeout(() => {
   setCurrentChange('EVEN')
  }, 300)

  return () => clearTimeout(id)
 }, [change, previousChange])

 return (
  <ChageBlock change={currentChange} yesterdayChnage={yesterdayChnage}>
   {tradePrice}
  </ChageBlock>
 )
}

type ChageBlockProps = {
 change: 'RISE' | 'FALL' | 'EVEN'
 yesterdayChnage: 'RISE' | 'FALL' | 'EVEN'
}

const ChageBlock = styled.div<ChageBlockProps>`
 transition: all 0.3s ease-in;
 border: 1px solid rgba(0, 0, 0, 0);
 font-weight: bold;
 ${({ change }) => {
  if (change === 'RISE') {
   return css`
    border: 1px solid #c84a31;
   `
  } else if (change === 'FALL') {
   return css`
    border: 1px solid #1261c4;
   `
  }
 }}
 ${({ yesterdayChnage }) => {
  if (yesterdayChnage === 'RISE') {
   return css`
    color: #c84a31;
   `
  } else if (yesterdayChnage === 'FALL') {
   return css`
    color: #1261c4;
   `
  } else {
   return css`
    color: #333;
   `
  }
 }}
`

export default Price
