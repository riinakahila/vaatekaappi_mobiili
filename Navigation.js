
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CameraScreen from './CameraScreen';
import WardrobeScreen from './WardrobeScreen';

const Stack = createNativeStackNavigator();

export default function Navigation() {
    return (
            <Stack.Navigator>
                <Stack.Screen name="Wardrobe" component={WardrobeScreen}/>
                <Stack.Screen name='Camera' component={CameraScreen}/>
            </Stack.Navigator>
    )
}