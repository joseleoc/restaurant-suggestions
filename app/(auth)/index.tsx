import { Image } from 'expo-image';
import { router } from 'expo-router';
import { Text } from 'react-native-paper';
import { StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';
import { useTheme } from 'react-native-paper';
import { View, ImageBackground } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';

import { FontStyles } from '@/constants/Styles';

export default function Welcome() {
  const { colors } = useTheme();
  const handleNavigate = (route: 'sign-in' | 'sign-up') => {
    router.push(`/(auth)/${route}`);
  };
  return (
    <SafeAreaView>
      <ImageBackground source={require('../../assets/images/backgrounds/bell-bg.jpg')}>
        <LinearGradient
          colors={['transparent', 'rgba(0, 0, 0, 0.7)']}
          style={styles.gradient_mask}
        />
        <View style={[styles.section]}>
          <View style={styles.branding_container}>
            <Image source={require('../../assets/images/icon.png')} style={styles.logo} />
            <View style={styles.branding_text_container}>
              {['Healthy', 'Food'].map((str, ind) => (
                <Text
                  key={ind}
                  variant="headlineMedium"
                  style={[{ color: colors.onPrimary }, FontStyles.headline]}
                >
                  {str}
                </Text>
              ))}
            </View>
          </View>

          <View style={styles.title_container}>
            {['Tu', 'app', 'saludable'].map((str, ind) => (
              <Text
                key={ind}
                variant="displayLarge"
                style={[{ color: colors.onPrimary }, FontStyles.headline, styles.title]}
              >
                {str}
              </Text>
            ))}
          </View>

          <View style={styles.actions_container}>
            <Button
              onPress={() => handleNavigate('sign-in')}
              mode="contained"
              textColor={colors.onSecondary}
              buttonColor={colors.secondary}
              style={[styles.button, { backgroundColor: colors.secondary }]}
              contentStyle={[styles.button, { backgroundColor: colors.secondary }]}
              labelStyle={[styles.button_text]}
            >
              Iniciar sesión
            </Button>
            <Button
              onPress={() => handleNavigate('sign-up')}
              mode="contained"
              textColor={colors.onSurface}
              buttonColor={colors.surface}
              style={[styles.button, { backgroundColor: colors.surface }]}
              contentStyle={[styles.button, { backgroundColor: colors.surface }]}
              labelStyle={[styles.button_text]}
            >
              Registrarme
            </Button>
          </View>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  section: {
    width: '100%',
    height: '100%',
    paddingHorizontal: 64,
    alignContent: 'space-between',
    justifyContent: 'center',
    gap: 16,
  },
  gradient_mask: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: '100%',
  },
  branding_container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  logo: {
    width: 75,
    height: 75,
    borderRadius: 15,
  },
  branding_text_container: {
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  title_container: {
    gap: 14,
  },
  title: {
    fontWeight: 'bold',
  },
  actions_container: {
    gap: 16,
    width: '100%',
    marginTop: 92,
  },
  button_text: {
    fontWeight: 'bold',
    fontSize: 20,
  },
  button: {
    height: 64,
    borderRadius: 50,
    width: '100%',
  },
});
