import React from 'react';
import {View, Text} from 'react-native';
import {
  ChartDot,
  ChartPath,
  ChartPathProvider,
  ChartXLabel,
  ChartYLabel,
  monotoneCubicInterpolation,
} from '@rainbow-me/animated-charts';
import moment from 'moment';
import {SIZES} from '../constants/sizes';
import {COLORS} from '../constants/colors';
import {FONTS} from '../constants/fonts';

const Chart = ({containerStyle, chartPrices}) => {
  // Points
  let startUnixTimeStamp = moment().subtract(7, 'day');

  let data = chartPrices
    ? chartPrices?.map((item, index) => {
        return {
          x: startUnixTimeStamp + (index + 1) * 3600,
          y: item,
        };
      })
    : [];

  const points = monotoneCubicInterpolation({data, range: 40});

  const formatUSD = value => {
    'worklet';

    if (value === '') {
      return '';
    }

    return `${Number(value).toFixed(2)}`;
  };

  const formatDateTime = value => {
    'worklet';

    if (value === '') {
      return '';
    }

    var selectedDate = new Date(value * 1000);

    let date = `0${selectedDate.getDate()}`.slice(-2);

    let month = `0${selectedDate.getMonth() + 1}`.slice(-2);

    let dateTime = `${date} / ${month}`;

    return dateTime;
  };

  const formatNumber = (value, roundingPoint) => {
    if (value > 1e9) {
      return `${(value / 1e9).toFixed(roundingPoint)}B`;
    } else if (value > 1e6) {
      return `${(value / 1e6).toFixed(roundingPoint)}M`;
    } else if (value > 1e3) {
      return `${(value / 1e3).toFixed(roundingPoint)}K`;
    } else {
      return `${value.toFixed(roundingPoint)}`;
    }
  };

  const getYLabelValues = () => {
    if (chartPrices !== undefined) {
      let minValue = Math.min(...chartPrices);
      let maxValue = Math.max(...chartPrices);

      let midValue = (minValue + maxValue) / 2;
      let lowerMidValue = (minValue + midValue) / 2;
      let higherMidValue = (maxValue + midValue) / 2;

      let roundingPoint = 2;

      return [
        formatNumber(maxValue, roundingPoint),
        formatNumber(minValue, roundingPoint),
        formatNumber(higherMidValue, roundingPoint),
        formatNumber(lowerMidValue, roundingPoint),
      ];
    } else {
      return [];
    }
  };

  return (
    <View style={{...containerStyle}}>
      {/* Y label */}
      <View
        style={{
          position: 'absolute',
          left: SIZES.padding,
          top: 0,
          bottom: 0,
          justifyContent: 'space-between',
        }}>
        {/* get y label values */}

        {getYLabelValues().map((item, index) => {
          return (
            <Text
              key={index}
              style={{color: COLORS.lightGray3, ...FONTS.body4}}>
              {item}
            </Text>
          );
        })}
      </View>

      {/* Chart */}
      {data.length > 0 && (
        <ChartPathProvider data={{points, smoothingStrategy: 'bezier'}}>
          <ChartPath
            height={150}
            stroke={COLORS.lightGreen}
            width={SIZES.width}
            strokeWidth={2}
          />
          <ChartDot>
            <View
              style={{
                position: 'absolute',
                left: -35,
                width: 80,
                alignItems: 'center',
                backgroundColor: COLORS.transparentBlack1,
              }}>
              <View
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: 25,
                  height: 25,
                  borderRadius: 15,
                  backgroundColor: COLORS.white,
                }}>
                <View
                  style={{
                    width: 15,
                    height: 15,
                    borderRadius: 10,
                    backgroundColor: COLORS.lightGreen,
                  }}
                />
              </View>

              {/* Y-label */}
              <ChartYLabel
                format={formatUSD}
                style={{color: COLORS.white, ...FONTS.body5}}
              />

              {/* X-label */}
              <ChartXLabel
                format={formatDateTime}
                style={{marginTop: 3, color: COLORS.lightGray3, ...FONTS.body5}}
              />
            </View>
          </ChartDot>
        </ChartPathProvider>
      )}
    </View>
  );
};

export default Chart;
