import React from 'react';
import {Text, View} from 'react-native';
import {COLORS} from '../constants/colors';
import {FONTS} from '../constants/fonts';
import {SIZES} from '../constants/sizes';

const HeaderBar = ({title}) => {
  return (
    <View
      style={{
        height: 100,
        paddingHorizontal: SIZES.radius,
        justifyContent: 'flex-end',
      }}>
      <Text style={{color: COLORS.white, ...FONTS.largeTitle}}>{title}</Text>
    </View>
  );
};

export default HeaderBar;
