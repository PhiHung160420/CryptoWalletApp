import React, {useEffect, useRef} from 'react';
import {View, Animated} from 'react-native';
import {connect} from 'react-redux';
import {IconTextButton} from '../components/IconTextButton';
import {COLORS} from '../constants/colors';
import icons from '../constants/icons';
import {SIZES} from '../constants/sizes';

const MainLayout = ({children, isTradeModalVisible}) => {
  const modalAnimatedValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (isTradeModalVisible) {
      Animated.timing(modalAnimatedValue, {
        toValue: 1,
        duration: 500,
        useNativeDriver: false,
      }).start();
    } else {
      Animated.timing(modalAnimatedValue, {
        toValue: 0,
        duration: 500,
        useNativeDriver: false,
      }).start();
    }
  }, [isTradeModalVisible]);

  const modalY = modalAnimatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [SIZES.height, SIZES.height / 2 + 180],
  });

  const opacity = modalAnimatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  return (
    <View style={{flex: 1}}>
      {children}

      {/* Dim Background */}
      {isTradeModalVisible && (
        <Animated.View
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: COLORS.transparentBlack,
            opacity,
          }}
        />
      )}
      {/* Dim Background */}

      {/* Modal */}
      <Animated.View
        style={{
          position: 'absolute',
          left: 0,
          top: modalY,
          width: '100%',
          padding: SIZES.padding,
          backgroundColor: COLORS.primary,
        }}>
        <IconTextButton
          label="Transfer"
          icon={icons.send}
          onPress={() => console.log('transfer')}
        />
        <IconTextButton
          label="Withdraw"
          icon={icons.withdraw}
          onPress={() => console.log('transfer')}
          containerStyle={{marginTop: SIZES.base}}
        />
      </Animated.View>
      {/* Modal */}
    </View>
  );
};

const mapStateToProps = state => {
  return {
    isTradeModalVisible: state.TabReducer.isTradeModalVisible,
  };
};

const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(MainLayout);
