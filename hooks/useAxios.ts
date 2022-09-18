import axios, { AxiosError, AxiosRequestConfig } from 'axios'
import { useReducer, useEffect, useRef } from 'react'

type ReducerType<T> = {
 loading: boolean
 data: T | null
 error: AxiosError<T> | null
}

type ReducerAction<T> = { type: 'LOADING' } | { type: 'SUCCESS'; payload: T } | { type: 'ERROR'; error: AxiosError<T> }

function createReducer<T>() {
 return function reducer(state: ReducerType<T>, action: ReducerAction<T>): ReducerType<T> {
  switch (action.type) {
   case 'LOADING':
    return {
     ...state,
     loading: true,
    }
   case 'SUCCESS':
    return {
     loading: false,
     data: action.payload,
     error: null,
    }
   case 'ERROR':
    return {
     loading: false,
     data: null,
     error: action.error,
    }
   default:
    throw new Error(`Unhandled action type: ${action}`)
  }
 }
}

function useAxios<T>(config: AxiosRequestConfig<T>, deps = [], skip = false) {
 const controllerRef = useRef(new AbortController())
 const reducer = createReducer<T>()
 const [state, dispatch] = useReducer(reducer, {
  loading: false,
  data: null,
  error: null,
 })

 const cancel = () => {
  controllerRef.current.abort()
  controllerRef.current = new AbortController()
 }

 const fetchData = async () => {
  dispatch({ type: 'LOADING' })
  try {
   const { data } = await axios.request<T>({
    signal: controllerRef.current.signal,
    ...config,
   })
   dispatch({ type: 'SUCCESS', payload: data })
  } catch (e: unknown) {
   const err = e as AxiosError<T>
   dispatch({ type: 'ERROR', error: err })
  }
 }

 useEffect(() => {
  if (skip) return
  fetchData()
  // eslint-disable-next-line react-hooks/exhaustive-deps
 }, deps)

 return { state, fetchData, cancel }
}

export default useAxios
