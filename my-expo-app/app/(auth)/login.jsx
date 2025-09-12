import { StyleSheet, Text } from 'react-native';
import { Link } from 'expo-router';
import ThemedView from '../../components/ThemedView';
import Spacer from '../../components/Spacer';
import ThemedText from '../../components/ThemedText';
import ThemedButton from '../../components/ThemedButton';

const Login = () => {
  const handleSubmit = () => {
    console.log('Login Form submitted');
  };
  return (
    <ThemedView style={styles.container}>
      <Spacer />
      <ThemedText title={true} style={styles.title}>
        login to your Account
      </ThemedText>

      <ThemedButton onPress={handleSubmit}>
        <Text style={{ color: '#f2f2f2' }}> Login </Text>
      </ThemedButton>

      <Spacer height={100} />

      <Link href={'/register'} style={styles.link}>
        <ThemedText style={{ textAlign: 'center' }}>
          Register Instead
        </ThemedText>
      </Link>
    </ThemedView>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    textAlign: 'center',
    fontSize: 18,
    marginBottom: 30,
  },

  link: {
    marginVertical: 10,
    borderBottomWidth: 1,
  },
});
