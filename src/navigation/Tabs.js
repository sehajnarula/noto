import React from 'react';
import {View,SafeAreaView, Text, StyleSheet,TouchableOpacity } from 'react-native';
import { CurvedBottomBar } from 'react-native-curved-bottom-bar';
import HomeIcon from '../../assets/images/bottomhomeicon.svg';
import FinishedIcon from '../../assets/images/bottomfinishedclipboard.svg';
import SearchIcon from '../../assets/images/bottomnavigationsearch.svg';
import SettingsIcon from '../../assets/images/bottomsettings.svg';
import AddNoteButtonIcon from '../../assets/images/actionbuttonadd.svg';
import HomeScreen from '../screens/HomeScreen';
import FinishedScreen from '../screens/FinishedScreen';
import SearchScreen from '../screens/SearchScreen';
import SettingsScreen from '../screens/SettingsScreen';

const Tabs = () => {
  return (

    <SafeAreaView style = {{flex:1}}>

    <CurvedBottomBar.Navigator
      type="DOWN"
      height={65}
      screenOptions={{headerShown:false}}
      bgColor="#FFFFFF"
      initialRouteName="Home"
      renderCircle={({navigate}) => (
        <View style={styles.btnCircle}>
          <TouchableOpacity
          activeOpacity={0.9}
          onPress={()=>navigate("NewNoteScreen")}>
            <AddNoteButtonIcon width={28} height={28}/>
          </TouchableOpacity>
        </View>
      )}
      tabBar={({ routeName, selectedTab, navigate }) => {
        const fillColor = selectedTab === routeName ? '#6A3EA1' : '#827D89';
        let label="";
        let IconComponent;

  switch (routeName) {
    case 'Home':
      label = 'Home';
      IconComponent = <HomeIcon width={24} height={24} fill={fillColor} />;
      break;
    case 'Finished':
      label = 'Finished';
      IconComponent = <FinishedIcon width={24} height={24} fill={fillColor} />;
      break;
    case 'Search':
      label = 'Search';
      IconComponent = <SearchIcon width={24} height={24} fill={fillColor} />;
      break;
    case 'Settings':
      label = 'Settings';
      IconComponent = <SettingsIcon width={24} height={24} fill={fillColor} />;
      break;
  }

        return (
          <View style={styles.tabIconContainer} onTouchEnd={() => navigate(routeName)}>
            {IconComponent}
            <Text style={[styles.label, { color: fillColor }]}>{label}</Text>
          </View>
        );
      }}
    >
      <CurvedBottomBar.Screen name="Home" position="LEFT" component={HomeScreen} />
      <CurvedBottomBar.Screen name="Finished" position="LEFT" component={FinishedScreen} />
      <CurvedBottomBar.Screen name="Search" position="RIGHT" component={SearchScreen} />
      <CurvedBottomBar.Screen name="Settings" position="RIGHT" component={SettingsScreen} />
    </CurvedBottomBar.Navigator>

    </SafeAreaView>

  );
};

const styles = StyleSheet.create({
  btnCircle: {
    width: 55,
    height: 55,
    borderRadius: 27.5,
    backgroundColor: '#6A3EA1',
    alignItems: 'center',
    justifyContent: 'center',
    bottom: 20,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 4 },
    elevation: 6,
  },
  tabIconContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding:10,
  },
});

export default Tabs;