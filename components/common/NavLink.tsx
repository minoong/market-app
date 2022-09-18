import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'

interface Props extends React.ComponentProps<typeof Link> {
 children: React.ReactNode
}

function NavLink(props: Props) {
 const { children, ...rest } = props
 const { asPath } = useRouter()
 const [active, setActive] = useState(false)

 useEffect(() => {
  const { as, href } = props
  const pathname = typeof href === 'string' ? href : href['pathname']
  const linkPathname = new URL((as as URL) || pathname, location.href).pathname
  const activePathname = new URL(asPath, location.href).pathname

  setActive(activePathname === linkPathname)
 }, [asPath, props])

 return (
  <Link {...rest} passHref>
   <LinkBlock active={active} className={active ? 'active' : ''}>
    {children}
   </LinkBlock>
  </Link>
 )
}

export default React.memo(NavLink)

type StyledProps = {
 active: boolean
}

const LinkBlock = styled.a<StyledProps>`
 display: inline-block;
 font-weight: bold;
 color: ${(props) => (props.active ? props.theme.color.point : props.theme.color.info)};
 text-decoration: none;
 transition: all 0.15s ease-in-out;

 &:hover:not(.active) {
  transform: scale3d(1.1, 1.1, 1);
  color: white;
 }
`
