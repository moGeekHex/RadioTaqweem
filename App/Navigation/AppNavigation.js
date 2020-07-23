import { TabNavigator, TabBarBottom } from 'react-navigation'
import WhoAreWeScreen from '../Containers/WhoAreWeScreen'
import React from 'react'
import { Image } from "react-native";
import PrayersTimesScreen from '../Containers/PrayersTimesScreen'
import StreamingScreen from '../Containers/StreamingScreen'
import VirtueScreen from '../Containers/VirtueScreen'
import QiblaScreen from '../Containers/QiblaScreen'
import CalendarScreen from '../Containers/CalendarScreen'
import SettingsScreen from '../Containers/SettingsScreen'
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';
const image = require('../Images/iPhone.png');
import EvilIcons from 'react-native-vector-icons/EvilIcons'
const QKLogoBW = require('../Images/QKLogoBW.png')

// Manifest of possible screens
const PrimaryNav = TabNavigator({
  'التقويم': { screen: ({ navigation }) => <PrayersTimesScreen navigation={navigation} image={image}/> },
  'بث': { screen: () => <StreamingScreen image={image} /> },
  'رسالة اليوم': { screen: () => <VirtueScreen image={image} /> },
  // 'القبلة': { screen: () => <QiblaScreen image={image} /> },
  'المذكرة': { screen: () => <CalendarScreen image={image} /> },
  'من نحن': { screen: () => <WhoAreWeScreen image={image}/> },
  'المزيد': { screen: () => <SettingsScreen image={image} /> },
},
  {
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, tintColor }) => {
        const { routeName } = navigation.state;
        let iconName;
        if (routeName === 'رسالة اليوم') {
          iconName = `message${focused ? '' : '-outline'}`;
          return <MaterialCommunityIcons name={iconName} size={25} color={tintColor} />;
        } else if (routeName === 'المزيد') {
          iconName = `ios-options${focused ? '' : '-outline'}`;
          return <Ionicons name={iconName} size={25} color={tintColor} />;
        } else if (routeName === 'التقويم') {
          iconName = `unread${focused ? '' : ''}`;
          return <Entypo name={iconName} size={25} color={tintColor} />;
        // } else if (routeName === 'القبلة') {
        //   iconName = `compass${focused ? '' : '-outline'}`;
        //   return <MaterialCommunityIcons name={iconName} size={25} color={tintColor} />;
        } else if (routeName === 'بث') {
          iconName = `play-circle${focused ? '' : '-outline'}`;
          return <MaterialCommunityIcons name={iconName} size={25} color={tintColor} />;
        } else if (routeName === 'المذكرة') {
          iconName = `calendar${focused ? '' : ''}`;
          return <FontAwesome name={iconName} size={25} color={tintColor} />;
        } else if (routeName === 'من نحن') {
          return <Image source={QKLogoBW} style={{width: 36, height: 36}} />;
        }
      },
    }),
    tabBarOptions: {
      activeTintColor: 'tomato',
      inactiveTintColor: 'gray',
    },
    tabBarComponent: TabBarBottom,
    tabBarPosition: 'bottom',
    animationEnabled: false,
    swipeEnabled: false,
  })

export default PrimaryNav
