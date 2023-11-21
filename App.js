/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useEffect} from 'react';
import {LogBox, StyleSheet, SafeAreaView} from 'react-native';
import {NativeBaseProvider, extendTheme} from 'native-base';
import AppNavigation from './src/navigation/AppNavigation';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {I18nextProvider} from 'react-i18next';
import 'react-native-gesture-handler';
import {persistStore} from 'redux-persist';
import {Notifications} from 'react-native-notifications';
import {PersistGate} from 'redux-persist/integration/react';
import store from './src/store/index';
import SplashScreen from 'react-native-splash-screen';
import Toast from 'react-native-toast-message';
import {Provider} from 'react-redux';
import {toastConfig} from '@components/utils/Validators';
import i18n from './src/translations/i18n';
import LocalNotification from '@components/utils/Notification';

function App() {
  const config = {
    useSystemColorMode: true, // Default system color mode
  };

  const extendedTheme = extendTheme({config});

  useEffect(() => {
    SplashScreen.hide();
    async function loadLanguage() {
      try {
        const language = await AsyncStorage.getItem('appLanguage');
        if (language) {
          await i18n.changeLanguage(language);
        }
      } catch (error) {}
    }
    loadLanguage();
  }, []);

  LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
  LogBox.ignoreLogs(['EventEmitter.removeListener']); //X Ignore log notification by message
  LogBox.ignoreLogs([
    'A non-serializable value was detected in the state, in the path',
  ]); //X Ignore log notification by message
  LogBox.ignoreAllLogs(); //Ignore all log notifications
  const persistor = persistStore(store);

  // console.error = error => error.apply;

  const AppWrapper = () => {
    // const notificationAction = remoteMessage => {};

    // useEffect(() => {
    //   Notifications.registerRemoteNotifications();

    //   const messageSub = messaging().onMessage(async remoteMessage => {
    //     LocalNotification({
    //       title: remoteMessage?.notification?.title,
    //       text: remoteMessage?.notification?.body,
    //     });

    //     if (
    //       remoteMessage?.notification?.title?.includes(
    //         'has requested a delivery',
    //       )
    //     ) {
    //       // ?? RUN ANY ACTION HERE WHEN APPLICATION IS IN FORGEORUND STATE
    //     }
    //   });

    //   messaging().setBackgroundMessageHandler(async remoteMessage => {
    //     Notifications.events().registerNotificationReceivedBackground(
    //       completion => {
    //         if (remoteMessage) {
    //           // ?? RUN ANY ACTION WHEN APPLICATION IS IN BACKGROUND
    //         }
    //         completion({alert: true, sound: true, badge: true});
    //       },
    //     );
    //   });

    //   //APP OPENED FROM BACKGROUND
    //   messaging().onNotificationOpenedApp(async remoteMessage => {
    //     console.warn('NOTIFICATIONS OPENED');
    //     if (remoteMessage) {
    //       // ?? RUN ANY ACTION WHEN APPLICATION IS IN KILL STATE
    //     }
    //   });

    //   //APP IN QUITE STATE
    //   Notifications.getInitialNotification()
    //     .then(remoteMessage => {
    //       if (remoteMessage) notificationAction(remoteMessage);
    //     })
    //     .catch(err => {
    //       console.warn('ERRROR NOTIFICATION GET NOTI');
    //     });

    //   return messageSub;
    // }, []);

    return (
      <>
        <AppNavigation />
        <Toast config={toastConfig} />
      </>
    );
  };

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NativeBaseProvider theme={extendedTheme}>
          <SafeAreaView style={{flex: 1}}>
            <I18nextProvider i18n={i18n}>
              <AppWrapper />
            </I18nextProvider>
          </SafeAreaView>
        </NativeBaseProvider>
      </PersistGate>
    </Provider>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
