import moment from 'moment';
import {Platform} from 'react-native';
import {Notifications} from 'react-native-notifications';

const LocalNotification = data => {
  const {title, text} = data;
  let date = new Date();

  if (Platform.OS === 'android') {
    Notifications.postLocalNotification({
      body: text ? text : 'Local notification!',
      title: title ? title : 'Local Notification Title',
      sound: 'chime.aiff',
      silent: false,
      category: 'SOME_CATEGORY',
      userInfo: {},
      fireDate: new Date(),
    });
  } else {
    Notifications.postLocalNotification({
      body: text ? text : 'Local notification!',
      title: title ? title : 'Local Notification Title',
      sound: 'chime.aiff',
      silent: false,
      category: 'SOME_CATEGORY',
      userInfo: {},
      // fireDate: new Date().toISOString(),
      fireDate: new Date(date.setSeconds(date.getSeconds() + 3)).toISOString(),
    });
  }
};

export default LocalNotification;
