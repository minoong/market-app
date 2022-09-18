import { AnyAction, CombinedState, combineReducers, configureStore, Reducer } from '@reduxjs/toolkit'
import { createWrapper, HYDRATE } from 'next-redux-wrapper'
import counterReducer from './counter/counterSlice'
import marketReducer from './market/marketSlice'

const rootReducer = combineReducers({
 counter: counterReducer,
 market: marketReducer,
})

let initialRootState: RootState

const reducer = (state: RootState, action: AnyAction): CombinedState<RootState> => {
 switch (action.type) {
  case HYDRATE:
   if (state === initialRootState) {
    return {
     ...state,
     ...action.payload,
    }
   } else {
    return state
   }
  default:
   return rootReducer(state, action)
 }
}

const initStore = () => {
 const store = configureStore({
  reducer: reducer as Reducer<CombinedState<RootState>, AnyAction>,
  devTools: true,
 })

 initialRootState = store.getState()

 return store
}

export const wrapper = createWrapper(initStore)

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof initStore>
export type AppDispatch = AppStore['dispatch']
