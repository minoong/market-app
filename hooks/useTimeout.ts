import { useEffect, useRef } from 'react'

interface Props {
 callback: () => void
 delay: number | null
}

function useTimeout(props: Props) {
 const { callback, delay } = props
 const savedCallback = useRef(callback)

 useEffect(() => {
  savedCallback.current = callback
 }, [callback])

 useEffect(() => {
  if (!delay && delay !== 0) {
   return
  }

  const id = setTimeout(() => savedCallback.current(), delay)

  return () => clearTimeout(id)
 }, [delay])
}

export default useTimeout
