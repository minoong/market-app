import { useCallback, useReducer } from 'react'

interface Action {
 type: 'INCREMENT' | 'DECREMENT'
}

function reducer(state: number, action: Action): number {
 switch (action.type) {
  case 'INCREMENT':
   return state + 1
  case 'DECREMENT':
   return state - 1
  default:
   return state
 }
}

function useCounter(initialValue?: number) {
 const [value, dispatch] = useReducer(reducer, initialValue ?? 0)

 const onIncrement = useCallback(() => dispatch({ type: 'INCREMENT' }), [])
 const onDecrement = useCallback(() => dispatch({ type: 'DECREMENT' }), [])

 return { value, onIncrement, onDecrement }
}

export default useCounter
