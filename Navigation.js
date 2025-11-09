
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CameraScreen from './CameraScreen';

const Stack = createNativeStackNavigator();

export default function Navigation() {
    return (
            <Stack.Navigator>
                <Stack.Screen name='Camera' component={CameraScreen}/>
            </Stack.Navigator>
    )
}