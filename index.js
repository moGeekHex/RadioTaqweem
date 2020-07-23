import './App/Config/ReactotronConfig'
import { AppRegistry, I18nManager,Platform } from 'react-native'
import App from './App/Containers/App'
import 'babel-polyfill';
import widgetTask from './WidgetTask';
I18nManager.allowRTL(false);

AppRegistry.registerComponent('QuranKareem', () => App)
if(Platform.OS =='android'){


AppRegistry.registerHeadlessTask('WidgetTask', () => widgetTask);
}