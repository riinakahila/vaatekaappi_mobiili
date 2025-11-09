
import { NavigationContainer } from '@react-navigation/native';
import Navigation from './Navigation';
import { PhotosProvider } from './PhotoContext';

export default function App() {

  return (
    <NavigationContainer>
      <PhotosProvider>
      <Navigation />
      </PhotosProvider>
    </NavigationContainer>
  );
}