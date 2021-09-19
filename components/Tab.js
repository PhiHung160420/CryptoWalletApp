import React from 'react';
import {View, TouchableOpacity, Text} from 'react-native';
import {COLORS} from '../constants/colors';
import {FONTS} from '../constants/fonts';

const Tab = ({containerStyle, item, index, onMarketTabPress}) => {
  return (
    <TouchableOpacity
      style={{flex: 1}}
      key={`MarketTab-${index}`}
      onPress={() => onMarketTabPress(index)}>
      <View
        style={{
          height: 40,
          alignItems: 'center',
          justifyContent: 'center',
          paddingHorizontal: 15,
        }}
        ref={item.ref}>
        <Text style={{color: COLORS.white, ...FONTS.h3}}>{item.title}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default Tab;
