import React from 'react'
import styled from 'styled-components'

interface Props {
 korName: string
 enName: string
}

function Symbol(props: Props) {
 const { korName, enName } = props
 return (
  <SymbolBlock>
   <TitleBlock>{korName}</TitleBlock>
   <SubTitleBlock>{enName}</SubTitleBlock>
  </SymbolBlock>
 )
}

const SymbolBlock = styled.div`
 text-align: left;
`

const TitleBlock = styled.div`
 color: #333;
 font-weight: 500;
`

const SubTitleBlock = styled.em`
 color: #666;
`

export default React.memo(Symbol)
