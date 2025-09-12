import { Text, StyleSheet } from 'react-native';
import { Link } from 'expo-router';
import ThemedView from '../../components/ThemedView';
import Spacer from '../../components/Spacer';
import ThemedText from '../../components/ThemedText';
import ThemedButton from '../../components/ThemedButton';

const Register = () => {
  const handleSubmit = () => {
    console.log('Register Form submitted');
  };
  return (
    <ThemedView style={styles.container}>
      <Spacer />
      <ThemedText title={true} style={styles.title}>
        Register for an Account
      </ThemedText>

      <ThemedButton onPress={handleSubmit}>
        <Text style={{ color: '#f2f2f2' }}> Register </Text>
      </ThemedButton>

      <Spacer height={100} />

      <Link href={'/login'} style={styles.link}>
        <ThemedText style={{ textAlign: 'center' }}>Login Instead</ThemedText>
      </Link>
    </ThemedView>
  );
};

export default Register;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    marginBottom: 30,
    textAlign: 'center',
  },

  link: {
    marginVertical: 10,
    borderBottomWidth: 1,
  },
});
