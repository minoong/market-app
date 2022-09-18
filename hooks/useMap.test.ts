import { renderHook, act } from '@testing-library/react'
import useMap, { type MapOrEntries } from '@hooks/useMap'

const initialValues: MapOrEntries<string, string> = [['key', '🆕']]

test('should increment counter', () => {
 const { result } = renderHook(() => useMap<string, string>(initialValues))

 act(() => {
  result.current[1]({
   type: 'SET',
   payload: {
    key: String(Date.now()),
    value: '📦',
   },
  })
 })

 expect(new Map(result.current[0]).size).toBe(2)

 act(() => {
  result.current[1]({
   type: 'REMOVE',
   payload: 'key',
  })
 })
 expect(new Map(result.current[0]).size).toBe(1)
 act(() => {
  result.current[1]({
   type: 'RESET',
  })
 })
 expect(new Map(result.current[0]).size).toBe(0)
})

test('should increment counter', () => {
 const { result } = renderHook(() => useMap<string, string>())

 expect(new Map(result.current[0]).size).toBe(0)
 act(() => {
  result.current[1]({
   type: 'SET_ALL',
   payload: [
    ['hello', '👋'],
    ['data', '📦'],
    ['data2', '📦'],
   ],
  })
 })

 expect(new Map(result.current[0]).size).toBe(3)
})
