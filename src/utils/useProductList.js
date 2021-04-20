import { useCallback, useEffect, useReducer } from 'react'
import * as uuid from 'uuid'

const initialState = {
  /*
    requestId is an identifier of the last performed request. 
    it helps to ignore an outdated response in cases like this:

    request-1
    request-2
    response-2 (will be stored in state)
    response-1 (will be ignored)
  */
  requestId: '',
  filter: {
    isNew: false,
    isLimited: false,
    category: [],
    search: '',
  },
  status: 'idle', // idle | work | success | error
  items: [],
  categoriesPresent: new Set(),
}
const isFilterEmpty = filter => {
  return !filter.isNew && !filter.isLimited && filter.category.length === 0 && filter.search === ''
}
const reducer = (state, action) => {
  console.log(`Action: ${action.type}; Payload:`, action.payload)
  switch (action.type) {
    case 'filter:change': {
      return {
        ...state,
        status: 'work',
        filter: {
          ...state.filter,
          ...action.payload,
        },
      }
    }
    case 'filter:reset': {
      return {
        ...state,
        status: 'work',
        filter: {
          ...initialState.filter,
        },
      }
    }
    case 'request:start': {
      return {
        ...state,
        status: 'work',
        requestId: action.payload.currentRequestId,
      }
    }
    case 'request:success': {
      if (action.payload.currentRequestId === state.requestId) {
        return {
          ...state,
          status: 'success',
          items: action.payload.data.results,
          categoriesPresent: isFilterEmpty(state.filter)
            ? new Set(action.payload.data.results.map(item => item.categoryId))
            : state.categoriesPresent,
        }
      }
      return state
    }
    case 'request:error': {
      if (action.payload.currentRequestId === state.requestId) {
        return {
          ...state,
          status: 'error',
        }
      }
      return state
    }
  }
}
export const useProductList = () => {
  const [state, dispatch] = useReducer(reducer, initialState)
  const updateFilter = useCallback((filter = {}) => dispatch({ type: 'filter:change', payload: filter }), [])
  const resetFilter = useCallback(() => dispatch({ type: 'filter:reset' }), [])

  const performRequest = useCallback(() => {
    const currentRequestId = uuid.v4()
    dispatch({ type: 'request:start', payload: { currentRequestId } })
    // prettier-ignore
    const serializeFilter = filter => [
      ...filter.category.map(categoryId => `category[]=${categoryId}`),
      `isNew=${filter.isNew}`,
      `isLimited=${filter.isLimited}`,
      `search=${filter.search}`
    ].join('&')

    fetch(`/api/product?${serializeFilter(state.filter)}`)
      .then(res => {
        if (!res.ok || res.status !== 200) {
          throw new Error(`Request failed with status code ${res.status}`)
        }
        return res.json()
      })
      .then(data => dispatch({ type: 'request:success', payload: { data, currentRequestId } }))
      .catch(err => {
        console.error(err)
        dispatch({ type: 'request:error', payload: { currentRequestId } })
      })
  }, [state.filter])

  useEffect(() => {
    performRequest()
  }, [performRequest])

  return {
    ...state,
    updateFilter,
    resetFilter,
  }
}
