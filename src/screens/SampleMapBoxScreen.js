import { useIsFocused } from '@react-navigation/native';
import MapboxGL from '@rnmapbox/maps';
import { useEffect, useState } from 'react';
import { Platform, SafeAreaView, ScrollView, View } from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import { check, PERMISSIONS, request, RESULTS } from 'react-native-permissions';

const SampleMapBoxScreen = () => {
  const isFocused = useIsFocused();
  const [deviceLocation, setDeviceLocation] = useState({
    latitude: null,
    longitude: null,
  });

  const fetchLocationPermission = async () => {
    try {
      if (Platform.OS === 'android') {
        let fineStatus = await check(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
        if (fineStatus !== RESULTS.GRANTED) {
          fineStatus = await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
        }

        if (fineStatus === RESULTS.GRANTED) {
          let backgroundStatus = await check(
            PERMISSIONS.ANDROID.ACCESS_BACKGROUND_LOCATION,
          );
          if (backgroundStatus !== RESULTS.GRANTED) {
            backgroundStatus = await request(
              PERMISSIONS.ANDROID.ACCESS_BACKGROUND_LOCATION,
            );
          }

          Geolocation.getCurrentPosition(
            position => {
              setDeviceLocation({
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
              });

              console.log('showlatlong', position.coords.latitude);
              console.log('showlatlong', position.coords.longitude);
            },
            error => {
              console.warn('Location error:', error);
            },
            { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
          );

          return {
            fine: fineStatus,
            background: backgroundStatus,
          };
        } else {
          return {
            fine: fineStatus,
            background: RESULTS.DENIED,
          };
        }
      } else if (Platform.OS === 'ios') {
        let whenInUse = await check(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
        if (whenInUse !== RESULTS.GRANTED) {
          whenInUse = await request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
        }

        let always = RESULTS.DENIED;
        if (whenInUse === RESULTS.GRANTED) {
          always = await check(PERMISSIONS.IOS.LOCATION_ALWAYS);
          if (always !== RESULTS.GRANTED) {
            always = await request(PERMISSIONS.IOS.LOCATION_ALWAYS);
          }

          Geolocation.getCurrentPosition(
            position => {
              setDeviceLocation({
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
              });
            },
            error => {
              console.warn('Location error:', error);
            },
            { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
          );
        }

        return {
          whenInUse,
          always,
        };
      }
    } catch (error) {
      console.log('Permission check/request error:', error);
      return null;
    }
  };

  useEffect(() => {
    fetchLocationPermission();
    MapboxGL.setAccessToken(
      'pk.eyJ1Ijoic2VoYWpuYXJ1bGEtMTA4IiwiYSI6ImNtZmt2ZnNvMDAxM2QybHB5Nm9jNm9keG8ifQ.IJ4uHtm6Hi7N67ij19fTxg',
    );
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'red' }}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        {deviceLocation.latitude && deviceLocation.longitude ? (
          <MapboxGL.MapView style={{ flex: 1 }}>
            <MapboxGL.Camera
              zoomLevel={14}
              centerCoordinate={[
                deviceLocation.longitude,
                deviceLocation.latitude,
              ]}
            />
            <MapboxGL.PointAnnotation
              id="currentLocation"
              coordinate={[deviceLocation.longitude, deviceLocation.latitude]}
            />
          </MapboxGL.MapView>
        ) : (
          <View
            style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
          >
            <Text>{`Loading Maps`}</Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default SampleMapBoxScreen;
