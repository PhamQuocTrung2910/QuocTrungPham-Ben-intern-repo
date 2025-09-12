import { StyleSheet } from 'react-native';
import { Link } from 'expo-router';
import ThemedView from '../components/ThemedView';
import ThemedText from '../components/ThemedText';
import Spacer from '../components/Spacer';

const About = () => {
  return (
    <ThemedView style={styles.container}>
      <ThemedText style={styles.title}>About Page</ThemedText>

      <Spacer />

      <Link href={'/'} style={styles.link}>
        <ThemedText>Back Home</ThemedText>
      </Link>
    </ThemedView>
  );
};

export default About;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  link: {
    marginVertical: 10,
    borderBottomWidth: 1,
  },
});
