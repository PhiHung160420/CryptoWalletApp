import React, {useCallback, useState} from 'react';
import {useFocusEffect} from '@react-navigation/native';
import {View, Text, FlatList, TouchableOpacity, Image} from 'react-native';
import {MainLayout} from './';
import {getHoldings} from '../stores/market/market.action';
import {connect} from 'react-redux';
import BalanceInfo from '../components/BalanceInfo';
import Chart from '../components/Chart';
import {COLORS} from '../constants/colors';
import {SIZES} from '../constants/sizes';
import {FONTS} from '../constants/fonts';
import dummyData from '../constants/dummy';
import icons from '../constants/icons';

const Portfolio = ({myHoldings, getHoldings}) => {
  const [selectedCoin, setSelectedCoin] = useState(null);

  useFocusEffect(
    useCallback(() => {
      getHoldings((holdings = dummyData.holdings));
    }, []),
  );

  let totalWallet = myHoldings.reduce((a, b) => a + (b.total || 0), 0);

  let valueChange = myHoldings.reduce(
    (a, b) => a + (b.holding_value_change_7d || 0),
    0,
  );

  let perChange = (valueChange / (totalWallet - valueChange)) * 100;

  const renderCurrentBalanceSession = () => {
    return (
      <View
        style={{
          paddingHorizontal: SIZES.padding,
          borderBottomLeftRadius: 25,
          borderBottomRightRadius: 25,
          backgroundColor: COLORS.gray,
        }}>
        <Text style={{marginTop: 50, color: COLORS.white, ...FONTS.largeTitle}}>
          Portfolio
        </Text>

        <BalanceInfo
          title="Current Balance"
          displayAmount={totalWallet}
          changePtc={perChange}
          containerStyle={{
            marginTop: SIZES.radius,
            marginBottom: SIZES.padding,
          }}
        />
      </View>
    );
  };

  const renderYourAssets = ({item, index}) => {
    let priceColor =
      item.price_change_percentage_7d_in_currency == 0
        ? COLORS.lightGray3
        : item.price_change_percentage_7d_in_currency > 0
        ? COLORS.lightGreen
        : COLORS.red;

    return (
      <TouchableOpacity
        style={{
          height: 55,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
        }}
        onPress={() => setSelectedCoin(item)}>
        {/* Assets */}
        <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
          <Image source={{uri: item.image}} style={{width: 25, height: 25}} />
          <Text
            style={{
              marginLeft: SIZES.radius,
              color: COLORS.white,
              ...FONTS.h4,
            }}>
            {item.name}
          </Text>
        </View>

        {/* Price */}
        <View style={{flex: 1, justifyContent: 'center'}}>
          <Text
            style={{
              color: COLORS.white,
              textAlign: 'right',
              ...FONTS.h4,
              lineHeight: 15,
            }}>
            $ {item.current_price.toLocaleString()}
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
                lineHeight: 15,
              }}>
              {item.price_change_percentage_7d_in_currency.toFixed(2)}%
            </Text>
          </View>
        </View>
        {/* Holdings */}
        <View style={{flex: 1}}>
          <Text style={{textAlign: 'right', color: COLORS.white}}>
            $ {item.total.toLocaleString()}
          </Text>
          <Text
            style={{
              textAlign: 'right',
              color: COLORS.lightGray3,
              ...FONTS.body3,
            }}>
            {item.qty} {item.symbol}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <MainLayout>
      <View style={{flex: 1, backgroundColor: COLORS.black}}>
        {/* Header - Current Balance */}
        {renderCurrentBalanceSession()}
        {/* Chart */}
        <Chart
          containerStyle={{marginTop: SIZES.radius}}
          chartPrices={
            selectedCoin
              ? selectedCoin?.sparkline_in_7d?.value
              : myHoldings[0]?.sparkline_in_7d?.value
          }
        />

        {/* Your Asset */}
        <FlatList
          data={myHoldings}
          keyExtractor={item => item.id}
          contentContainerStyle={{
            marginTop: SIZES.padding,
            paddingHorizontal: SIZES.padding,
          }}
          ListHeaderComponent={
            <View style={{marginBottom: SIZES.radius}}>
              {/* Section Title */}
              <Text style={{color: COLORS.white, ...FONTS.h2}}>
                Your Assets
              </Text>

              {/* Header Label */}
              <View style={{flexDirection: 'row', marginTop: SIZES.radius}}>
                <Text style={{flex: 1, color: COLORS.lightGray3}}>Assets</Text>
                <Text
                  style={{
                    flex: 1,
                    color: COLORS.lightGray3,
                    textAlign: 'right',
                  }}>
                  Price
                </Text>
                <Text
                  style={{
                    flex: 1,
                    color: COLORS.lightGray3,
                    textAlign: 'right',
                  }}>
                  Holdings
                </Text>
              </View>
            </View>
          }
          renderItem={renderYourAssets}
          ListFooterComponent={<View style={{paddingBottom: 30}} />}
        />
      </View>
    </MainLayout>
  );
};

const mapStateToProps = state => {
  return {
    myHoldings: state.MarketReducer.myHoldings,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getHoldings: (
      holdings,
      currency,
      coinList,
      orderBy,
      sparkline,
      priceChangePerc,
      perPage,
      page,
    ) => {
      return dispatch(
        getHoldings(
          holdings,
          currency,
          coinList,
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

export default connect(mapStateToProps, mapDispatchToProps)(Portfolio);
