import React, {
  createRef,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import {View, Text, Animated, FlatList, Image} from 'react-native';
import {MainLayout} from './';
import {FONTS} from '../constants/fonts';
import {SIZES} from '../constants/sizes';
import {COLORS} from '../constants/colors';
import icons from '../constants/icons';
import {getHoldings, getCoinMarket} from '../stores/market/market.action';
import HeaderBar from '../components/HeaderBar';
import {connect} from 'react-redux';
import constants from '../constants/constants';
import Tab from '../components/Tab';
import TextButton from '../components/TextButton';
import TabIndicator from '../components/TabIndicator';
import {LineChart} from 'react-native-chart-kit';

const marketTabs = constants.marketTabs.map(marketTab => {
  return {
    ...marketTab,
    ref: createRef(),
  };
});

const Tabs = ({scrollX, onMarketTabPress}) => {
  const [measureLayout, setMeasureLayout] = useState([]);
  const containerRef = useRef();

  useEffect(() => {
    let ml = [];
    marketTabs.forEach(marketTab => {
      marketTab?.ref?.current?.measureLayout(
        containerRef?.current,
        (x, y, width, height) => {
          ml.push({x, y, width, height});
          if (ml.length === marketTabs.length) {
            setMeasureLayout(ml);
          }
        },
      );
    });
  }, [containerRef.current]);

  return (
    <View ref={containerRef} style={{flexDirection: 'row'}}>
      {/* Tab Indicator */}
      {measureLayout.length > 0 && (
        <TabIndicator
          measureLayout={measureLayout}
          scrollX={scrollX}
          marketTabs={marketTabs}
        />
      )}
      {marketTabs.map((item, index) => (
        <Tab
          key={index}
          item={item}
          index={index}
          onMarketTabPress={onMarketTabPress}
        />
      ))}
    </View>
  );
};

const Market = ({getCoinMarket, coins}) => {
  useEffect(() => {
    getCoinMarket();
  }, []);

  const scrollX = useRef(new Animated.Value(0)).current;
  const marketTabScrollViewRef = useRef();

  const onMarketTabPress = useCallback(marketTabIndex => {
    marketTabScrollViewRef?.current?.scrollToOffset({
      offset: marketTabIndex * SIZES.width,
    });
  });

  const renderTabbars = () => {
    return (
      <View
        style={{
          marginTop: SIZES.radius,
          marginHorizontal: SIZES.radius,
          borderRadius: SIZES.radius,
          backgroundColor: COLORS.gray,
        }}>
        <Tabs scrollX={scrollX} onMarketTabPress={onMarketTabPress} />
      </View>
    );
  };

  const renderButtons = () => {
    return (
      <View
        style={{
          flexDirection: 'row',
          marginTop: SIZES.padding,
          marginHorizontal: SIZES.radius,
        }}>
        <TextButton label="USD" />
        <TextButton label="% (7d)" containerStyle={{marginLeft: SIZES.base}} />
        <TextButton label="Top" containerStyle={{marginLeft: SIZES.base}} />
      </View>
    );
  };

  const renderListItem = ({item, index}) => {
    return (
      <View style={{flex: 1, width: SIZES.width}}>
        <FlatList
          data={coins}
          keyExtractor={item => item.id}
          renderItem={({item, index}) => {
            let priceColor =
              item.price_change_percentage_7d_in_currency == 0
                ? COLORS.lightGray3
                : item.price_change_percentage_7d_in_currency > 0
                ? COLORS.lightGreen
                : COLORS.red;

            return (
              <View
                style={{
                  flexDirection: 'row',
                  paddingHorizontal: SIZES.padding,
                  marginBottom: SIZES.radius,
                }}>
                {/* Coins */}
                <View
                  style={{
                    flex: 1.5,
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                  <Image
                    source={{uri: item.image}}
                    style={{height: 20, width: 20}}
                  />
                  <Text
                    style={{
                      marginLeft: SIZES.radius,
                      color: COLORS.white,
                      ...FONTS.h3,
                    }}>
                    {item.name}
                  </Text>
                </View>
                {/* Coins */}

                {/* Line Chart */}
                <View style={{flex: 1, alignItems: 'center'}}>
                  <LineChart
                    withHorizontalLabels={false}
                    withVerticalLabels={false}
                    withDots={false}
                    withInnerLines={false}
                    withVerticalLines={false}
                    withOuterLines={false}
                    data={{
                      datasets: [
                        {
                          data: item.sparkline_in_7d.price,
                        },
                      ],
                    }}
                    width={100}
                    height={60}
                    chartConfig={{
                      color: () => priceColor,
                    }}
                    bezier
                    style={{paddingRight: 0}}
                  />
                </View>
                {/* Line Chart */}

                {/* Figures */}
                <View
                  style={{
                    flex: 1,
                    alignItems: 'flex-end',
                    justifyContent: 'center',
                  }}>
                  <Text
                    style={{
                      textAlign: 'center',
                      color: COLORS.white,
                      ...FONTS.h4,
                    }}>
                    $ {item.current_price}
                  </Text>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'flex-end',
                    }}>
                    {item.price_change_percentage_7d_in_currency !== 0 && (
                      <Image
                        source={icons.upArrow}
                        style={{
                          height: 10,
                          width: 10,
                          tintColor: priceColor,
                          transform:
                            item.price_change_percentage_7d_in_currency > 0
                              ? [{rotate: '45deg'}]
                              : [{rotate: '125deg'}],
                        }}
                      />
                    )}
                    <Text
                      style={{
                        marginLeft: 5,
                        color: priceColor,
                        ...FONTS.body5,
                      }}>
                      {item.price_change_percentage_7d_in_currency.toFixed(2)}%
                    </Text>
                  </View>
                </View>
                {/* Figures */}
              </View>
            );
          }}
        />
      </View>
    );
  };

  const renderList = () => {
    return (
      <Animated.FlatList
        ref={marketTabScrollViewRef}
        data={marketTabs}
        contentContainerStyle={{marginTop: SIZES.padding}}
        horizontal
        pagingEnabled
        scrollEventThrottle={16}
        snapToAlignment="center"
        showsHorizontalScrollIndicator={false}
        keyExtractor={item => item.id}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {x: scrollX}}}],
          {useNativeDriver: false},
        )}
        renderItem={renderListItem}
      />
    );
  };

  return (
    <MainLayout>
      <View style={{flex: 1, backgroundColor: COLORS.black}}>
        {/* Header */}
        <HeaderBar title="Market" />
        {/* Tab Bar */}
        {renderTabbars()}
        {/* Buttons */}
        {renderButtons()}
        {/* Market List */}
        {renderList()}
      </View>
    </MainLayout>
  );
};

const mapStateToProps = state => {
  return {
    coins: state.MarketReducer.coins,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getCoinMarket: (
      currency,
      coinList,
      orderBy,
      sparkline,
      priceChangePerc,
      perPage,
      page,
    ) => {
      return dispatch(
        getCoinMarket(
          currency,
          orderBy,
          sparkline,
          priceChangePerc,
          perPage,
          page,
        ),
      );
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Market);
