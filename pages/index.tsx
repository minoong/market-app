import type { NextPage } from 'next'
import { useEffect } from 'react'

const Home: NextPage = () => {
 useEffect(() => {
  console.log(1)
 }, [])

 return <div>main page</div>
}

export default Home
