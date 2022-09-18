import { Dispatch, useReducer } from 'react'

export type MapOrEntries<K, V> = Map<K, V> | [K, V][]

export interface Actions<K, V> {
 set: (key: K, value: V) => void
 setAll: (entries: MapOrEntries<K, V>) => void
 remove: (key: K) => void
 reset: Map<K, V>['clear']
}

// type Return<K, V> = [Omit<Map<K, V>, 'set' | 'clear' | 'delete'>, Actions<K, V>]

type ReducerAction<K, V> =
 | { type: 'SET'; payload: { key: K; value: V } }
 | { type: 'SET_ALL'; payload: MapOrEntries<K, V> }
 | { type: 'REMOVE'; payload: K }
 | { type: 'RESET' }

function createReducer<K, V>() {
 return function reducer(state: MapOrEntries<K, V>, action: ReducerAction<K, V>) {
  let copy = null
  switch (action.type) {
   case 'SET':
    copy = new Map(state)
    copy.set(action.payload.key, action.payload.value)
    return copy
   case 'SET_ALL':
    copy = new Map(action.payload)
    return copy
   case 'REMOVE':
    copy = new Map(state)
    copy.delete(action.payload)
    return copy
   case 'RESET':
    return new Map()
   default:
    return state
  }
 }
}

function useMap<K, V>(
 initialState: MapOrEntries<K, V> = new Map(),
): [MapOrEntries<K, V>, Dispatch<ReducerAction<K, V>>] {
 const reducer = createReducer<K, V>()
 const [state, dispatch] = useReducer(reducer, new Map(initialState))

 return [state, dispatch]
}

export default useMap
