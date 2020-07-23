import React from 'react'
import { BackHandler, Platform, AsyncStorage } from 'react-native'
import { addNavigationHelpers } from 'react-navigation'
import { createReduxBoundAddListener } from 'react-navigation-redux-helpers'
import { connect } from 'react-redux'
import AppNavigation from './AppNavigation'
import Actions from '../Redux/StartupRedux';

class ReduxNavigation extends React.Component {
  async componentDidMount() {
    let isDayLightSaving = await AsyncStorage.getItem('isDayLightSaving');

    if (isDayLightSaving !== null) {
      isDayLightSaving = eval(isDayLightSaving)
    }
    this.props.setIsDayLightSaving(isDayLightSaving || false)
  }

  componentWillMount() {
    if (Platform.OS === 'ios') return
    BackHandler.addEventListener('hardwareBackPress', () => {
      const { dispatch, nav } = this.props
      // change to whatever is your first screen, otherwise unpredictable results may occur
      if (nav.routes.length === 1 && (nav.routes[0].routeName === 'مواقيت')) {
        return false
      }
      if(nav.index === 0){
        return false;
      }
      // if (shouldCloseApp(nav)) return false
      dispatch({ type: 'Navigation/BACK' })
      return true
    })
  }

  componentWillUnmount() {
    if (Platform.OS === 'ios') return
    BackHandler.removeEventListener('hardwareBackPress')
  }

  render() {
    return <AppNavigation navigation={addNavigationHelpers({ dispatch: this.props.dispatch, state: this.props.nav, addListener: createReduxBoundAddListener('root') })} />
  }
}

const mapStateToProps = state => ({
  nav: state.nav
})

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch,
    setIsDayLightSaving: (value) => dispatch(Actions.setIsDayLightSaving(value))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ReduxNavigation)
