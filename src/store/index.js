import {configureStore, combineReducers} from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';

//REDUCERS
import authReducer from './auth/authSlice';
import userReducer from './user/userSlice';
import socketReducer from './socket/socketSlice';
import commonReducer from './common/commonSlice';

//SERVICES
import {serviceApi} from './services';
import {setupListeners} from '@reduxjs/toolkit/dist/query';

const rootReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
  socket: socketReducer,
  common: commonReducer,
  [serviceApi.reducerPath]: serviceApi.reducer,
});

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['auth', 'user', 'socket', 'common'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(serviceApi.middleware),
});

setupListeners(store.dispatch); // NOTE this addition

export default store;
