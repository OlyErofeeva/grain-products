import { Reducer, useCallback, useEffect, useReducer } from 'react'
import RequestStatus from './requestStatuses'

enum ActionType {
  REQUEST_START,
  REQUEST_SUCCESS,
  REQUEST_ERROR,
}

type Action = {
  type: ActionType
  payload?: Category[]
}

type State = {
  status: RequestStatus
  items: Category[]
}

type Category = {
  id: string
  name: string
  type: string
}

const initialState = {
  status: RequestStatus.IDLE,
  items: [],
}

const reducer: Reducer<State, Action> = (state, action) => {
  console.log(`Action: ${action.type}; Payload:`, action.payload)
  switch (action.type) {
    case ActionType.REQUEST_START: {
      return {
        ...state,
        status: RequestStatus.WORK,
      }
    }
    case ActionType.REQUEST_SUCCESS: {
      return {
        ...state,
        status: RequestStatus.SUCCESS,
        items: action.payload ? action.payload : [],
      }
    }
    case ActionType.REQUEST_ERROR: {
      return {
        ...state,
        status: RequestStatus.ERROR,
      }
    }
  }
}

export const useCategoryList = () => {
  const [state, dispatch] = useReducer(reducer, initialState)

  const performRequest = useCallback(() => {
    dispatch({ type: ActionType.REQUEST_START })

    fetch(`api/category`)
      .then(res => {
        if (!res.ok || res.status !== 200) {
          throw new Error(`Request failed with status code ${res.status}`)
        }
        return res.json()
      })
      .then(data => dispatch({ type: ActionType.REQUEST_SUCCESS, payload: data.reverse() }))
      .catch(err => {
        console.error(err)
        dispatch({ type: ActionType.REQUEST_ERROR })
      })
  }, [])

  useEffect(() => {
    performRequest()
  }, [performRequest])

  return {
    ...state,
  }
}
