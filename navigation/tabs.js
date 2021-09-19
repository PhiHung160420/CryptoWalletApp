import React from 'react';
import {TouchableOpacity} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Home, Portfolio, Market, Profile} from '../screens';
import {COLORS} from '../constants/colors';
import TabIcon from '../components/TabIcon';
import icons from '../constants/icons';
import {setTradeModalVisible} from '../stores/tab/tab.action';
import {connect} from 'react-redux';

const Tab = createBottomTabNavigator();

const CustomTabbarButton = ({children, onPress}) => {
  return (
    <TouchableOpacity
      style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}
      onPress={onPress}>
      {children}
    </TouchableOpacity>
  );
};

const Tabs = ({isTradeModalVisible, setTradeModalVisible}) => {
  const tradeTabButtonOnClickHandler = () => {
    setTradeModalVisible(!isTradeModalVisible);
  };

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        headerShown: false,
        tabBarStyle: {
          backgroundColor: COLORS.primary,
          borderTopColor: 'transparent',
          height: 100,
        },
      }}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({focused}) => {
            if (!isTradeModalVisible) {
              return (
                <TabIcon focused={focused} icon={icons.home} label="Home" />
              );
            }
          },
        }}
        listeners={{
          tabPress: e => {
            if (isTradeModalVisible) {
              e.preventDefault();
            }
          },
        }}
      />
      <Tab.Screen
        name="Portfolio"
        component={Portfolio}
        options={{
          tabBarIcon: ({focused}) => {
            if (!isTradeModalVisible) {
              return (
                <TabIcon
                  focused={focused}
                  icon={icons.portfolio}
                  label="Portfolio"
                />
              );
            }
          },
        }}
        listeners={{
          tabPress: e => {
            if (isTradeModalVisible) {
              e.preventDefault();
            }
          },
        }}
      />
      <Tab.Screen
        name="Trade"
        component={Home}
        options={{
          tabBarIcon: ({focused}) => {
            return (
              <TabIcon
                focused={focused}
                icon={isTradeModalVisible ? icons.close : icons.trade}
                iconStyle={isTradeModalVisible ? {width: 20, height: 20} : null}
                label="Trade"
                isTrade={true}
              />
            );
          },
          tabBarButton: props => (
            <CustomTabbarButton
              {...props}
              onPress={() => tradeTabButtonOnClickHandler()}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Market"
        component={Market}
        options={{
          tabBarIcon: ({focused}) => {
            if (!isTradeModalVisible) {
              return (
                <TabIcon focused={focused} icon={icons.market} label="Market" />
              );
            }
          },
        }}
        listeners={{
          tabPress: e => {
            if (isTradeModalVisible) {
              e.preventDefault();
            }
          },
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({focused}) => {
            if (!isTradeModalVisible) {
              return (
                <TabIcon
                  focused={focused}
                  icon={icons.profile}
                  label="Profile"
                />
              );
            }
          },
        }}
        listeners={{
          tabPress: e => {
            if (isTradeModalVisible) {
              e.preventDefault();
            }
          },
        }}
      />
    </Tab.Navigator>
  );
};

const mapStateToProps = state => {
  return {
    isTradeModalVisible: state.TabReducer.isTradeModalVisible,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setTradeModalVisible: isVisible => {
      return dispatch(setTradeModalVisible(isVisible));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Tabs);
