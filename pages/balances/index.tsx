import { useAppSelector } from '@features/hooks'
import useAsync from 'hooks/useAxios'
import React from 'react'

export interface Geo {
 lat: string
 lng: string
}

export interface Address {
 street: string
 suite: string
 city: string
 zipcode: string
 geo: Geo
}

export interface Company {
 name: string
 catchPhrase: string
 bs: string
}

export interface RootObject {
 id: number
 name: string
 username: string
 email: string
 address: Address
 phone: string
 website: string
 company: Company
}

function Balances() {
 const count = useAppSelector((state) => state.counter.value)
 const { state, fetchData, cancel } = useAsync<RootObject>(
  {
   url: 'https://jsonplaceholder.typicode.com/users/5',
   method: 'GET',
  },
  [],
  true,
 )
 const { state: state2, fetchData: fetchData2 } = useAsync<RootObject>(
  {
   url: 'https://jsonplaceholder.typicode.com/users/5',
   method: 'GET',
  },
  [],
  false,
 )
 const { loading, data: users, error } = state
 const { loading: loading2, data: users2, error: error2 } = state2
 console.log(loading, loading2)
 if (loading || loading2)
  return (
   <div>
    로딩중..<button onClick={cancel}>cancel</button>
   </div>
  )

 console.log(error2?.code, error2)
 if (error || error2)
  return (
   <div>
    에러가 발생했습니다<button onClick={fetchData}>불러오기</button>
    <button onClick={fetchData2}>불러오기2</button>
   </div>
  )
 if (!users && !users2)
  return (
   <>
    <button onClick={fetchData}>불러오기</button>
    <button onClick={fetchData2}>불러오기2</button>
   </>
  )

 return (
  <div>
   Balances {count} {users?.id} {users2?.id}
   <button onClick={cancel}>cancel</button>
   <button onClick={fetchData}>불러오기</button>
   <button onClick={fetchData2}>불러오기2</button>
  </div>
 )
}

export default Balances
