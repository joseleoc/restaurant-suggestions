import { Button, Text } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { auth } from '@/firebase';

export default function Home() {
  const handleLogout = async () => {
    await auth.signOut();
  };
  return (
    <SafeAreaView>
      <Text>Home</Text>
      <Button onPress={() => handleLogout()} mode="contained-tonal" buttonColor="#3f9">
        logout
      </Button>
    </SafeAreaView>
  );
}
