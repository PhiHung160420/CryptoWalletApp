import React from 'react';
import {TouchableOpacity, Text} from 'react-native';
import {COLORS} from '../constants/colors';
import {FONTS} from '../constants/fonts';

const TextButton = ({containerStyle, label, onPress}) => {
  return (
    <TouchableOpacity
      style={{
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 5,
        paddingHorizontal: 20,
        borderRadius: 15,
        backgroundColor: COLORS.gray1,
        ...containerStyle,
      }}
      onPress={onPress}>
      <Text style={{color: COLORS.white, ...FONTS.h3}}>{label}</Text>
    </TouchableOpacity>
  );
};

export default TextButton;
