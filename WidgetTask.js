
import { NativeModules, ToastAndroid, AsyncStorage } from 'react-native'
import moment from 'moment';
import bgTimer from 'react-native-background-timer'
const salawat = require("./App/Fixtures/FormattedSalawat.json");
const { BackgroundTaskBridge } = NativeModules



async function calculateSalah(){
       let isDayLightSaving = await AsyncStorage.getItem('isDayLightSaving');
 if (isDayLightSaving !== null) {
      isDayLightSaving = eval(isDayLightSaving)
    }
  const currentMiladiDay = {
        selectedDay: moment().format('DD'),
        selectedMonth: moment().format('MM'),
        selectedYear: moment().format('YYYY'),
      }
        const salah = salawat[currentMiladiDay.selectedMonth].find(salah => salah.day == currentMiladiDay.selectedDay);

        if (!salah) {
          return {
            fajer: '',
            sunrise: '',
            dhuhur: '',
            asr: '',
            maghreb: '',
            Ishaa: ''
          }
        }
      const momentFajer = salah.fajer && moment(salah.fajer, "h:mm");
      const momentSunrise = salah.sunrise && moment(salah.sunrise, "h:mm");
      let momentDhuhur = salah.dhuhur && moment(salah.dhuhur, "h:mm");
      const momentAsr = salah.asr && moment(`${salah.asr} pm`, "h:mm a");
      const momentMaghreb = salah.maghreb && moment(`${salah.maghreb} pm`, "h:mm a");
      const momentIshaa = salah.Ishaa && moment(`${salah.Ishaa} pm`, "h:mm a");

      const hoursOfDhuhur = momentDhuhur.format("hh");
      if (hoursOfDhuhur < 5 && hoursOfDhuhur >= 1) {
        //pm
        momentDhuhur = salah.dhuhur && moment(`${salah.dhuhur} pm`, "h:mm");
      } else {
        // hoursOfDhuur > 9 && <= 12
        // am
        momentDhuhur = salah.dhuhur && moment(`${salah.dhuhur} am`, "h:mm");
      }
    

        if (isDayLightSaving) {
        return {
          fajer: momentFajer.add(1, 'h').format("h:mm"),
          sunrise: momentSunrise.add(1, 'h').format("h:mm"),
          dhuhur: momentDhuhur.add(1, 'h').format("h:mm"),
          asr: momentAsr.add(1, 'h').format("h:mm"),
          maghreb: momentMaghreb.add(1, 'h').format("h:mm"),
          Ishaa: momentIshaa.add(1, 'h').format("h:mm")
        }
      }
      else {
        return {
          fajer: momentFajer.format("h:mm"),
          sunrise: momentSunrise.format("h:mm"),
          dhuhur: momentDhuhur.format("h:mm"),
          asr: momentAsr.format("h:mm"),
          maghreb: momentMaghreb.format("h:mm"),
          Ishaa: momentIshaa.format("h:mm")
        }
      }
    

}
export default async function WidgetTask (taskData) {
 
  bgTimer.setTimeout(() => {
 
 synchronizeWidget()
 
   
   
  }, 1000)
}

export function synchronizeWidget () {
  ToastAndroid.show(`Initializing ...`, ToastAndroid.SHORT);
    calculateSalah().then( times=>{
      console.log(times)
  BackgroundTaskBridge.initializeWidgetBridge(times)
    }).catch(e=>console.log(e))
}

function triggerCharm (id) {
  if (!id) return
  ToastAndroid.show(`Triggering ${id}...`, ToastAndroid.SHORT);
}