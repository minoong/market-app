import { renderHook, act } from '@testing-library/react'
import useCounter from '@hooks/useCounter'

test('should increment counter', () => {
 const { result } = renderHook(() => useCounter())

 expect(result.current.value).toBe(0)

 act(() => {
  result.current.onIncrement()
 })

 expect(result.current.value).toBe(1)

 act(() => {
  result.current.onDecrement()
 })
 expect(result.current.value).toBe(0)
})
