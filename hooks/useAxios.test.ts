import { renderHook, act } from '@testing-library/react'
import useAxios from './useAxios'

type MockResponse = {
 imagePath: string
 name: string
}

describe('useAxios | test', () => {
 test('data fetch cancel', async () => {
  const { result } = renderHook(
   () =>
    useAxios<MockResponse[]>(
     {
      url: 'http://localhost:3030/scoops',
     },
     [],
     true,
    ),
   {},
  )

  await act(async () => {
   result.current.fetchData()
   result.current.cancel()
  })

  expect(result.current.state.error?.message).toBe('canceled')
 })
 test('data fetch', async () => {
  const { result } = renderHook(
   () =>
    useAxios<MockResponse[]>(
     {
      url: 'http://localhost:3030/scoops',
     },
     [],
     true,
    ),
   {},
  )

  await act(async () => {
   await result.current.fetchData()
  })

  expect(result.current.state).toEqual({
   data: [
    { imagePath: '/images/chocolate.png', name: 'Chocolate' },
    { imagePath: '/images/vanilla.png', name: 'Vanilla' },
   ],
   error: null,
   loading: false,
  })
 })
})
