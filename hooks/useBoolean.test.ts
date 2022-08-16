import { renderHook, act } from '@testing-library/react'
import useBoolean from './useBoolean'

test('should increment counter', () => {
 const { result } = renderHook(() => useBoolean())

 act(() => {
  result.current.setTest((prev) => !prev)
 })

 expect(result.current.test).toBe(false)
})
