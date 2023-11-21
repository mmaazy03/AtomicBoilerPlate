import Icon from '@components/atoms/Icon';
import R from './R';
import {View} from 'react-native';
import Text from '@components/atoms/Text';

const emailREX =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,256}))$/;

const numberREX = /^-?\d{2}(\.\d+)?$/;
const alphabetsREX = /^[A-Za-z]+$/;

export default {
  emailREX,
  numberREX,
  alphabetsREX,
};

export const toastConfig = {
  customToast: props => {
    let bgColor =
      props.props.popupType === 'danger'
        ? 'rgba(249, 55, 73,0.05)'
        : props.props.popupType === 'sucess'
        ? 'rgba(75, 181, 67,0.05)'
        : props.props.popupType === 'warning'
        ? 'rgba(255, 204, 0,0.05)'
        : props.props.bgColor;
    let textColor =
      props.props.popupType === 'danger'
        ? 'rgba(249, 55, 73,0.8)'
        : props.props.popupType === 'sucess'
        ? 'rgba(75, 181, 67,0.8)'
        : props.props.popupType === 'warning'
        ? 'rgba(255, 204, 0,0.8)'
        : props.props.bgColor;

    return (
      <View style={R.styles.popUpContainer}>
        <View
          style={{
            width: '5%',
            backgroundColor: textColor,
            height: '100%',
          }}
        />
        <View
          style={{
            ...R.styles.rowView,
            backgroundColor: bgColor,
            height: '100%',
            justifyContent: 'flex-start',
            flex: 1,
            paddingLeft: R.unit.scale(15),
          }}>
          <View
            style={{
              borderRadius: R.unit.scale(80),
              backgroundColor: textColor,
              paddingHorizontal: R.unit.scale(4),
              paddingVertical: R.unit.scale(3),
            }}>
            <Icon
              type={'Ionicons'}
              name={
                props.props.popupType === 'sucess'
                  ? 'md-checkmark'
                  : props.props.popupType === 'danger'
                  ? 'close'
                  : props.props.popupType === 'warning'
                  ? 'alert'
                  : 'md-alert'
              }
              color={R.color.white}
              size={15}
            />
          </View>
          <Text
            variant={'body4'}
            font={'PoppinsRegular'}
            color={textColor}
            align={'left'}
            numberOfLines={5}
            style={{marginLeft: R.unit.scale(8), width: '80%'}}
            transform={'none'}>
            {props.text1}
          </Text>
        </View>
      </View>
    );
  },
};
