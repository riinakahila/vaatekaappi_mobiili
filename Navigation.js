import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import CameraScreen from './CameraScreen';
import WardrobeScreen from './WardrobeScreen';
import CustomNavigationBar from './CustomNavigationBar';

const Stack = createNativeStackNavigator();

export default function Navigation() {
    return (
      <NavigationContainer>
      <Stack.Navigator initialRouteName='Wardrobe' screenOptions={{
          header: (props) => <CustomNavigationBar {...props} />,}}>
        <Stack.Screen name="Wardrobe" component={WardrobeScreen} options={{ title: 'Vaatekaappi' }} />
        <Stack.Screen name="Camera" component={CameraScreen} options={{ title: 'Lisää vaate' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}