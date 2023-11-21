import React from 'react';
import {useSelector} from 'react-redux';
import AppStack from './appStack';
import AuthStack from './authStack';

const AppNavigation = () => {
  const auth = useSelector(state => state.auth);
  const isLogin = auth?.isAuth;
  // return isLogin ? <AppStack /> : <AuthStack />;
  return <AppStack />;
};
export default AppNavigation;
