import React from 'react';
import {FONTS} from '../constants/fonts';
import {COLORS} from '../constants/colors';
import {Image, Text, View} from 'react-native';

const TabIcon = ({focused, icon, label, isTrade, iconStyle}) => {
  return (
    <>
      {isTrade ? (
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            width: 60,
            height: 60,
            borderRadius: 30,
            backgroundColor: COLORS.black,
          }}>
          <Image
            source={icon}
            resizeMode="contain"
            style={{
              width: 25,
              height: 25,
              tintColor: COLORS.white,
              ...iconStyle,
            }}
          />
          <Text style={{color: COLORS.white, ...FONTS.h4}}>{label}</Text>
        </View>
      ) : (
        <View style={{alignItems: 'center', justifyContent: 'center'}}>
          <Image
            source={icon}
            resizeMode="contain"
            style={{
              width: 30,
              height: 30,
              tintColor: focused ? COLORS.white : COLORS.secondary,
            }}
          />
          <Text
            style={{
              color: focused ? COLORS.white : COLORS.secondary,
              marginTop: 5,
              ...FONTS.h4,
            }}>
            {label}
          </Text>
        </View>
      )}
    </>
  );
};

export default TabIcon;
