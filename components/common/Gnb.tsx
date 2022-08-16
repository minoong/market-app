import Link from 'next/link'
import React from 'react'
import styled from 'styled-components'

const GnbBlock = styled.article`
 header {
  nav {
   width: 100vw;
   background-color: red;

   div {
    display: flex;
    justify-content: space-between;

    section {
     &:first-child {
      margin-left: 2rem;
     }
     &:last-child {
      margin-right: 2rem;
     }
     a {
      text-decoration: none;
      color: white;

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
       <Link href="/exchange">거래소</Link>
       <Link href="/balances">입출금</Link>
       <Link href="/investments/balances">거래내역</Link>
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
