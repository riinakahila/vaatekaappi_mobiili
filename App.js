import { PaperProvider} from 'react-native-paper';
import { StatusBar } from 'expo-status-bar';
import Navigation from './Navigation';

export default function App() {

  return (
    <PaperProvider>
      <Navigation />
      <StatusBar style="auto" />
    </PaperProvider>
  );
}