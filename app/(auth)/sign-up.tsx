import { Text, useTheme } from 'react-native-paper';
import { ImageBackground, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import SignUpForm from '@/components/sign-up-form/sign-up-form';
import { FontStyles } from '@/constants/Styles';

export default function SignUp() {
  const { colors } = useTheme();
  return (
    <SafeAreaView>
      <ImageBackground source={require('../../assets/images/backgrounds/tasty-bg.jpg')}>
        <LinearGradient
          colors={['transparent', 'rgba(0, 0, 0, 0.7)']}
          style={styles.gradient_mask}
        />
        <View style={styles.section}>
          <View>
            {['Únetenos', ':-)'].map((str, ind) => (
              <Text
                key={ind}
                variant="headlineLarge"
                style={[{ color: colors.onPrimary }, FontStyles.headline, styles.title]}
              >
                {str}
              </Text>
            ))}
          </View>
          <SignUpForm />
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
    alignContent: 'space-around',
    justifyContent: 'center',
    gap: 32,
  },
  gradient_mask: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: '100%',
  },
  title: {
    fontWeight: 'bold',
  },
});
