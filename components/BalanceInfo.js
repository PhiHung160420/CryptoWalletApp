import React from 'react';
import {View, Text, Image} from 'react-native';
import {COLORS} from '../constants/colors';
import {SIZES} from '../constants/sizes';
import {FONTS} from '../constants/fonts';
import icons from '../constants/icons';

const BalanceInfo = ({title, displayAmount, changePtc, containerStyle}) => {
  return (
    <View style={{...containerStyle}}>
      {/* Title */}
      <Text style={{color: COLORS.lightGreen, ...FONTS.h3}}>{title}</Text>

      {/* Figures */}
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Text style={{...FONTS.h3, color: COLORS.lightGray3}}>$</Text>
        <Text
          style={{...FONTS.h2, color: COLORS.white, marginLeft: SIZES.base}}>
          {displayAmount.toLocaleString()}
        </Text>
        <Text style={{color: COLORS.lightGray3, ...FONTS.h3}}> USD</Text>
      </View>

      {/* Change Percentage */}
      <View style={{flexDirection: 'row', marginTop: 5}}>
        {changePtc !== 0 && (
          <Image
            source={icons.upArrow}
            style={{
              width: 10,
              height: 10,
              alignSelf: 'center',
              tintColor: changePtc > 0 ? COLORS.lightGreen : COLORS.red,
              transform:
                changePtc > 0 ? [{rotate: '45deg'}] : [{rotate: '125deg'}],
            }}
          />
        )}

        <Text
          style={{
            marginLeft: SIZES.base,
            alignSelf: 'center',
            color:
              changePtc == 0
                ? COLORS.lightGray3
                : changePtc > 0
                ? COLORS.lightGreen
                : COLORS.red,
          }}>
          {changePtc.toFixed(2)}%
        </Text>

        <Text
          style={{
            marginLeft: SIZES.radius,
            color: COLORS.lightGray3,
            marginTop: -3,
            ...FONTS.h3,
          }}>
          7d Change
        </Text>
      </View>
    </View>
  );
};

export default BalanceInfo;
