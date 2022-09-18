import type { Change } from '@interface/market'
import React from 'react'
import styled, { css } from 'styled-components'

interface Props {
 signedChangeRate: string
 signedChangePrice: string
 yesterdayChnage: Change
}

function Percent(props: Props) {
 const { signedChangeRate, signedChangePrice, yesterdayChnage } = props

 return (
  <PercentBlock yesterdayChnage={yesterdayChnage}>
   <SignedChangeRateBlock>{signedChangeRate}</SignedChangeRateBlock>
   <SignedChangePriceBlock>{signedChangePrice}</SignedChangePriceBlock>
  </PercentBlock>
 )
}

type PercentBlockProps = {
 yesterdayChnage: 'RISE' | 'FALL' | 'EVEN'
}

const PercentBlock = styled.div<PercentBlockProps>`
 transition: all 0.3s ease-in;
 border: 1px solid rgba(0, 0, 0, 0);
 font-weight: bold;
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

const SignedChangeRateBlock = styled.div``
const SignedChangePriceBlock = styled.em``

export default Percent
