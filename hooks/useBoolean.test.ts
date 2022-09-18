import { act, renderHook } from '@testing-library/react'
import useBoolean from '@hooks/useBoolean'

test('should increment counter', () => {
 const { result } = renderHook(() => useBoolean())

 expect(result.current.value).toBe(false)

 act(() => {
  result.current.setTrue()
 })

 expect(result.current.value).toBe(true)

 act(() => {
  result.current.toggle()
 })

 expect(result.current.value).toBe(false)
})
