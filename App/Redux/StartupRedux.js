import { createActions, createReducer } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  loadAllDataRequest: null,
  loadAllDataSuccess: null,
  loadAllDataFailure: null,
  setIsDayLightSaving: ['value'],
  setNotifications: ['value'],
  increaseFontSizeFactor: null,
  decreaseFontSizeFactor: null,
})

export const StartupTypes = Types
export default Creators

export const INITIAL_STATE = Immutable({
  allData: null,
  fetching: null,
  error: null,
  isDayLightSaving: false,
  notifications: false,
  fontSizeFactor: 1
})

/* ------------- Selectors ------------- */

export const StartUpSelectors = {
  selectAvatar: state => state.github.avatar,
}

/* ------------- Reducers ------------- */

export const setIsDayLightSaving = (state, action) => {
  return state.merge({ isDayLightSaving: action.value })
}

export const increaseFontSizeFactor = (state, action) => {
  return state.merge({ fontSizeFactor: state.fontSizeFactor + 0.1 })
}
export const decreaseFontSizeFactor = (state, action) => {
  return state.merge({ fontSizeFactor: state.fontSizeFactor - 0.1 })
}

export const setNotifications = (state, action) => {
  return state.merge({ notifications: action.value })
}
// request the avatar for a user
export const request = (state) =>
  state.merge({ fetching: true, allData: null })

// successful avatar lookup
export const success = (state, action) => {
  console.log(action)
  return state.merge({ fetching: false, error: null, allData:{} })
}

// failed to get the avatar
export const failure = (state) =>
  state.merge({ fetching: false, error: true, allData: null })

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.LOAD_ALL_DATA_REQUEST]: request,
  [Types.LOAD_ALL_DATA_SUCCESS]: success,
  [Types.LOAD_ALL_DATA_FAILURE]: failure,
  [Types.SET_IS_DAY_LIGHT_SAVING]: setIsDayLightSaving,
  [Types.SET_NOTIFICATIONS]: setNotifications,
  [Types.INCREASE_FONT_SIZE_FACTOR]: increaseFontSizeFactor,
  [Types.DECREASE_FONT_SIZE_FACTOR]: decreaseFontSizeFactor,
})
