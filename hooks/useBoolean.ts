import { useState } from 'react'

function useBoolean() {
 const [test, setTest] = useState(true)
 return { test, setTest }
}

export default useBoolean
