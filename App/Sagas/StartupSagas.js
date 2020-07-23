import { put, select, call } from 'redux-saga/effects'
import StarytupActions, { GithubSelectors } from '../Redux/StartupRedux'

let response;

export function * loadAllDataSaga (api) {
  // console.log(api.getAllData)
  yield call(api.getAllData, mycb)
  // const response = yield call(api.getUser, username)
  console.log(response)
  // if (response.ok) {
  //   // do data conversion here if needed
  //   yield put(StarytupActions.loadAllDataSuccess(response))
  // } else {
  //   yield put(StarytupActions.loadAllDataFailure())
  // }
}

mycb = ss => {
  response = ss.val()
  console.log(response)
  return response
}