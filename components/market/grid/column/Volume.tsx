import React from 'react'
import styled from 'styled-components'

interface Props {
 price: string
 unit: string
}

function Volume(props: Props) {
 const { price, unit } = props
 return (
  <VolumeBlock>
   <PriceBlock>{price}</PriceBlock>
   <UnitBlock>{unit}</UnitBlock>
  </VolumeBlock>
 )
}

const VolumeBlock = styled.div`
 display: flex;
 justify-content: end;
 letter-spacing: 1px;
`
const PriceBlock = styled.div``
const UnitBlock = styled.div`
 color: #999;
`

export default React.memo(Volume)
