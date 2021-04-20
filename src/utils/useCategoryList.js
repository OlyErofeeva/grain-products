import { useCallback, useEffect, useReducer } from 'react'

const initialState = {
  status: 'idle', // idle | work | success | error
  items: [],
}
const reducer = (state, action) => {
  console.log(`Action: ${action.type}; Payload:`, action.payload)
  switch (action.type) {
    case 'request:start': {
      return {
        ...state,
        status: 'work',
      }
    }
    case 'request:success': {
      return {
        ...state,
        status: 'success',
        items: action.payload,
      }
    }
    case 'request:error': {
      return {
        ...state,
        status: 'error',
      }
    }
  }
}
export const useCategoryList = () => {
  const [state, dispatch] = useReducer(reducer, initialState)

  const performRequest = useCallback(() => {
    dispatch({ type: 'request:start' })

    fetch(`api/category`)
      .then(res => {
        if (!res.ok || res.status !== 200) {
          throw new Error(`Request failed with status code ${res.status}`)
        }
        return res.json()
      })
      .then(data => dispatch({ type: 'request:success', payload: data.reverse() }))
      .catch(err => {
        console.error(err)
        dispatch({ type: 'request:error' })
      })
  }, [])

  useEffect(() => {
    performRequest()
  }, [performRequest])

  return {
    ...state,
  }
}
