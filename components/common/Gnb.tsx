import Link from 'next/link'
import React from 'react'
import styled from 'styled-components'
import NavLink from './NavLink'

const GnbBlock = styled.article`
 header {
  nav {
   width: 100vw;
   background-color: #006eff;

   div {
    display: flex;
    justify-content: space-between;

    section {
     padding: 1rem;

     &:first-child {
      margin-left: 2rem;
     }
     &:last-child {
      margin-right: 2rem;
     }
     a {
      &:not(:last-child) {
       margin-right: 2rem;
      }
     }
    }
   }
  }
 }
`

function Gnb() {
 return (
  <GnbBlock>
   <header>
    <nav>
     <div>
      <section>
       <NavLink href={{ pathname: '/exchange', query: { id: 5 } }}>거래소</NavLink>
       <NavLink href="/balances">입출금</NavLink>
       <NavLink href="/investments/balances">거래내역</NavLink>
      </section>
      <section>
       <Link href="/login">로그인</Link>
      </section>
     </div>
    </nav>
   </header>
  </GnbBlock>
 )
}

export default Gnb
