import {StyleSheet} from 'react-native';
import unit from './Unit';
import color from './Colors';

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
  },
  rowView: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  boxShadow: {
    shadowColor: color.primaryColor1,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  twoItemsRow: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: unit.scale(5),
  },

  divider: {
    backgroundColor: color.black,
    width: '90%',
    marginLeft: unit.scale(12),
    height: 2,
  },
  popUpContainer: {
    width: unit.width(0.6),
    height: '100%',
    borderRadius: unit.scale(8),
    shadowColor: color.blackShade3,
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.36,
    shadowRadius: 6.68,
    elevation: 11,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginVertical: unit.scale(15),
    backgroundColor: color.white,
    overflow: 'hidden',
  },
  cardLayout: {
    width: '100%',
    borderRadius: unit.scale(10),
    paddingHorizontal: unit.scale(10),
    paddingVertical: unit.scale(16),
    backgroundColor: color.white,
    overflow: 'hidden',
    borderColor: color.mainColor,
    borderWidth: unit.scale(0.5),
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  slider: {
    position: 'absolute',
    right: 0,
    height: '100%',
    width: unit.scale(20),
    top: 0,
    zIndex: 999,
    backgroundColor: '#f0b37a',
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    columnGap: unit.scale(-15),
    borderTopWidth: 1,
    borderRightWidth: 1,
    borderBottomWidth: 1,
    borderColor: color.mainColor,
  },
  contentView: {
    marginTop: unit.scale(12),
    paddingHorizontal: unit.scale(10),
    width: '100%',
    // flex: 1,
  },
});

export default styles;
