import React from 'react';
import {Icon as Iconc} from 'native-base';
import R from '@components/utils/R';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Octicons from 'react-native-vector-icons/Octicons';
import Zocial from 'react-native-vector-icons/Zocial';
import Foundation from 'react-native-vector-icons/Foundation';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const Icon = props => {
  const {name, type, size, color = 'black', iconStyles, onPress} = props;

  const iconTypes = {
    Ionicons: Ionicons,
    MaterialIcons: MaterialIcons,
    FontAwesome: FontAwesome,
    Entypo: Entypo,
    AntDesign: AntDesign,
    Feather: Feather,
    EvilIcons: EvilIcons,
    MaterialCommunityIcons: MaterialCommunityIcons,
    SimpleLineIcons: SimpleLineIcons,
    Octicons: Octicons,
    Zocial: Zocial,
    Foundation: Foundation,
    FontAwesome5: FontAwesome5,
    Fontisto: Fontisto,
  };

  return (
    <Iconc
      name={name}
      as={iconTypes[type]}
      onPress={onPress}
      size={R.unit.scale(size)}
      style={[{color: color}, iconStyles]}
    />
  );
};
export default Icon;
