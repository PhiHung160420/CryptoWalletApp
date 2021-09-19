import React from 'react';
import {Animated, View} from 'react-native';
import {SIZES} from '../constants/sizes';
import {COLORS} from '../constants/colors';

const TabIndicator = ({measureLayout, scrollX, marketTabs}) => {
  const inputRange = marketTabs.map((_, i) => i * SIZES.width);

  const translateX = scrollX.interpolate({
    inputRange,
    outputRange: measureLayout.map(measure => measure.x),
  });

  return (
    <Animated.View
      style={{
        position: 'absolute',
        left: 0,
        height: '100%',
        width: (SIZES.width - SIZES.radius * 2) / 2,
        borderRadius: SIZES.radius,
        backgroundColor: COLORS.red,
        transform: [{translateX}],
      }}
    />
  );
};

export default TabIndicator;
