import React, {useCallback, useState} from 'react';
import {View, Text, FlatList, TouchableOpacity, Image} from 'react-native';
import {connect} from 'react-redux';
import {getHoldings, getCoinMarket} from '../stores/market/market.action';
import {MainLayout} from './';
import {useFocusEffect} from '@react-navigation/native';
import {COLORS} from '../constants/colors';
import {SIZES} from '../constants/sizes';
import {FONTS} from '../constants/fonts';
import dummyData from '../constants/dummy';
import BalanceInfo from '../components/BalanceInfo';
import {IconTextButton} from '../components/IconTextButton';
import icons from '../constants/icons';
import Chart from '../components/Chart';

const Home = ({getHoldings, getCoinMarket, myHoldings, coins}) => {
  const [selectedCoin, setSelectedCoin] = useState(null);

  useFocusEffect(
    useCallback(() => {
      getHoldings((holdings = dummyData.holdings));
      getCoinMarket();
    }, []),
  );

  let totalWallet = myHoldings.reduce((a, b) => a + (b.total || 0), 0);

  let valueChange = myHoldings.reduce(
    (a, b) => a + (b.holding_value_change_7d || 0),
    0,
  );

  let perChange = (valueChange / (totalWallet - valueChange)) * 100;

  const renderWalletInfoSession = () => {
    return (
      <View
        style={{
          paddingHorizontal: SIZES.padding,
          paddingVertical: 10,
          borderBottomLeftRadius: 25,
          borderBottomRightRadius: 25,
          backgroundColor: COLORS.gray,
        }}>
        {/* Balance Info */}
        <BalanceInfo
          title="Your Wallet"
          displayAmount={totalWallet}
          changePtc={perChange}
          containerStyle={{marginTop: 40}}
        />

        {/* Button */}
        <View
          style={{
            flexDirection: 'row',
            marginTop: 20,
            marginBottom: -20,
            paddingHorizontal: SIZES.radius,
          }}>
          <IconTextButton
            label="Transfer"
            icon={icons.send}
            containerStyle={{flex: 1, marginRight: SIZES.radius, height: 40}}
            onPress={() => console.log('')}
          />
          <IconTextButton
            label="Withdraw"
            icon={icons.withdraw}
            containerStyle={{flex: 1, height: 40}}
            onPress={() => console.log('')}
          />
        </View>
      </View>
    );
  };

  const renderTopCryptoCurrency = ({item, index}) => {
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
        {/* Logo */}
        <View style={{width: 35}}>
          <Image source={{uri: item.image}} style={{width: 20, height: 20}} />
        </View>

        {/* Name */}
        <View style={{flex: 1}}>
          <Text style={{color: COLORS.white, ...FONTS.h3}}>{item.name}</Text>
        </View>

        {/* Figure */}
        <View>
          <Text style={{textAlign: 'center', color: COLORS.white, ...FONTS.h4}}>
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
                lineHeight: 15,
              }}>
              {item.price_change_percentage_7d_in_currency.toFixed(2)}%
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <MainLayout>
      <View style={{flex: 1, backgroundColor: COLORS.black}}>
        {/* Header - Wallet Info */}
        {renderWalletInfoSession()}

        {/* Chart */}
        <Chart
          containerStyle={{marginTop: SIZES.padding * 2}}
          chartPrices={
            selectedCoin
              ? selectedCoin?.sparkline_in_7d?.price
              : coins[0]?.sparkline_in_7d?.price
          }
        />

        {/* Top Cryptocurrency */}
        <FlatList
          data={coins}
          keyExtractor={item => item.id}
          contentContainerStyle={{
            marginTop: 30,
            paddingHorizontal: SIZES.padding,
          }}
          ListHeaderComponent={
            <View style={{marginBottom: SIZES.radius}}>
              <Text style={{color: COLORS.white, ...FONTS.h3, fontSize: 18}}>
                Top CryptoCurrency
              </Text>
            </View>
          }
          renderItem={renderTopCryptoCurrency}
          ListFooterComponent={<View style={{paddingBottom: 30}} />}
        />
      </View>
    </MainLayout>
  );
};

const mapStateToProps = state => {
  return {
    myHoldings: state.MarketReducer.myHoldings,
    coins: state.MarketReducer.coins,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getHoldings: (
      holdings,
      currency,
      orderBy,
      sparkline,
      priceChangePerc,
      perPage,
      page,
      coinList,
    ) => {
      return dispatch(
        getHoldings(
          holdings,
          currency,
          orderBy,
          sparkline,
          priceChangePerc,
          perPage,
          page,
          coinList,
        ),
      );
    },
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

export default connect(mapStateToProps, mapDispatchToProps)(Home);
