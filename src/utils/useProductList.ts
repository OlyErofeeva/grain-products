import { useCallback, useEffect, useReducer, Reducer } from 'react'
import * as uuid from 'uuid'
import RequestStatus from './requestStatuses'

enum ActionType {
  FILTER_CHANGE,
  FILTER_RESET,
  REQUEST_START,
  REQUEST_SUCCESS,
  REQUEST_ERROR,
}

type Action =
  | { type: ActionType.FILTER_CHANGE; payload: Filter }
  | { type: ActionType.FILTER_RESET }
  | { type: ActionType.REQUEST_START; payload: { currentRequestId: string } }
  | { type: ActionType.REQUEST_SUCCESS; payload: { currentRequestId: string; data: ProductListResponse } }
  | { type: ActionType.REQUEST_ERROR; payload: { currentRequestId: string } }

type Filter = {
  isNew: boolean
  isLimited: boolean
  category: string[]
  search: string
}

type State = {
  requestId: string
  filter: Filter
  status: RequestStatus
  items: Product[]
  categoriesPresent: Set<string>
}

type Product = {
  id: string
  name: string
  description: string
  categoryId: string
  categoryName: string
  categoryType: string
  isLimited: boolean
  isNew: boolean
  price: number
  discount: number
}

type ProductListResponse = {
  total: number
  page: number
  pageSize: number
  results: Product[]
}

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
  status: RequestStatus.IDLE,
  items: [],
  categoriesPresent: new Set<string>(),
}

const isFilterEmpty = (filter: Filter) => {
  return !filter.isNew && !filter.isLimited && filter.category.length === 0 && filter.search === ''
}

const reducer: Reducer<State, Action> = (state, action) => {
  if (action.type !== ActionType.FILTER_RESET) {
    console.log(`Action: ${action.type}; Payload:`, action.payload)
  } else {
    console.log(`Action: ${action.type}`)
  }

  switch (action.type) {
    case ActionType.FILTER_CHANGE: {
      return {
        ...state,
        status: RequestStatus.WORK,
        filter: {
          ...state.filter,
          ...action.payload,
        },
      }
    }
    case ActionType.FILTER_RESET: {
      return {
        ...state,
        status: RequestStatus.WORK,
        filter: {
          ...initialState.filter,
        },
      }
    }
    case ActionType.REQUEST_START: {
      return {
        ...state,
        status: RequestStatus.WORK,
        requestId: action.payload.currentRequestId,
      }
    }
    case ActionType.REQUEST_SUCCESS: {
      if (action.payload.currentRequestId === state.requestId) {
        return {
          ...state,
          status: RequestStatus.SUCCESS,
          items: action.payload.data.results,
          categoriesPresent: isFilterEmpty(state.filter)
            ? new Set(action.payload.data.results.map(item => item.categoryId))
            : state.categoriesPresent,
        }
      }
      return state
    }
    case ActionType.REQUEST_ERROR: {
      if (action.payload.currentRequestId === state.requestId) {
        return {
          ...state,
          status: RequestStatus.ERROR,
        }
      }
      return state
    }
  }
}

export const useProductList = () => {
  const [state, dispatch] = useReducer(reducer, initialState)

  const updateFilter = useCallback((filter = {}) => dispatch({ type: ActionType.FILTER_CHANGE, payload: filter }), [])

  const resetFilter = useCallback(() => dispatch({ type: ActionType.FILTER_RESET }), [])

  const performRequest = useCallback(() => {
    const currentRequestId = uuid.v4()
    dispatch({ type: ActionType.REQUEST_START, payload: { currentRequestId } })
    // prettier-ignore
    const serializeFilter = (filter: Filter) => [
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
      .then(data => dispatch({ type: ActionType.REQUEST_SUCCESS, payload: { data, currentRequestId } }))
      .catch(err => {
        console.error(err)
        dispatch({ type: ActionType.REQUEST_ERROR, payload: { currentRequestId } })
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
