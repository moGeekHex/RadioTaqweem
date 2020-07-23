// a library to wrap and simplify api calls
import apisauce from 'apisauce'
import firebase from 'firebase'

var config = {
  apiKey: "AIzaSyBXgnPc72IZtf85MaYfG7ivaRBTVOvHlUI",
  authDomain: "qurankareem-bb641.firebaseapp.com",
  databaseURL: "https://qurankareem-bb641.firebaseio.com",
  projectId: "qurankareem-bb641",
  storageBucket: "",
  messagingSenderId: "12222005306"
};
firebase.initializeApp(config);

// our "constructor"
const create = (baseURL = 'https://api.github.com/') => {
  const api = apisauce.create({
    baseURL,
    headers: {
      'Cache-Control': 'no-cache'
    },
    // 10 second timeout...
    timeout: 10000
  })

  const getAllData = (cb) => {
    return firebase.database().ref(`daysInfos`).on("value", cb)
  }
  const getGeneralInfo = (cb) => {
    return firebase.database().ref(`generalInfo`).on("value", cb)
  }
  const getTodayAndOffsetPromise = (year, month, day) =>{

    const offsetApi = firebase.database().ref(`daysInfos/offset`).once("value",()=>{
      

    })
    const todayApi = firebase.database().ref(`daysInfos/${year}/${month}/${day}`).once("value",()=>{
  
    })
   
    return Promise.all([todayApi,offsetApi])
  }
  const getTodaysInfoOffset = ( cb) => {
    return firebase.database().ref(`daysInfos/offset`).once("value", cb)
  }
  const getTodaysInfo = (year, month, day, cb) => {
    return firebase.database().ref(`daysInfos/${year}/${month}/${day}`).on("value", cb)
  }


  return {
    getAllData,
    getGeneralInfo,
    getTodaysInfo,
    getTodaysInfoOffset,
    getTodayAndOffsetPromise
  }
}

// let's return back our create method as the default.
export default {
  create
}
