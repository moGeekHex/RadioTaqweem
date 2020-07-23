

import React from 'react';
import { StyleSheet, Text, View,AppRegistry,Dimensions } from 'react-native';
import { DevMenu } from 'react-native-today-widget';
import moment from 'moment';
import PrayersTimesDay from './App/Containers/PrayersTimesDay';
//const { width } = Dimensions.get('window')
const currentMiladiDay =  {
  selectedDay: moment().format('DD'),
  selectedMonth: moment().format('MM'),
  selectedYear: moment().format('YYYY'),
} 
const styles = StyleSheet.create({
  container: {
    flex: 1,
   
  },

  widget: {
    flex: 1,
  
  },
});
//<PrayersTimesDay currentMiladiDay={currentMiladiDay}/>
const TodayWidget = () => (
  <View style={styles.container}>
    <View
      style={styles.widget}
    >
    <PrayersTimesDay currentMiladiDay={currentMiladiDay}
    hideHighlightCurrentSalah={true}
    />
    </View>
    {__DEV__ && <DevMenu title="Developer Menu" />}
  </View>
);
AppRegistry.registerComponent("TodayWidgetExtension", () => TodayWidget);