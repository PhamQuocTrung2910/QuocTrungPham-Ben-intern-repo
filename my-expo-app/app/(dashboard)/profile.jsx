import { StyleSheet, Button } from 'react-native';
import { useRouter } from 'expo-router';
import ThemedView from '../../components/ThemedView';
import Spacer from '../../components/Spacer';
import ThemedText from '../../components/ThemedText';

const Profile = () => {
  const router = useRouter();

  return (
    <ThemedView style={styles.container}>
      <ThemedText title={true} style={styles.heading}>
        Your Email
      </ThemedText>

      <ThemedText> Time to cook some food.... </ThemedText>

      <Spacer />

      <Button title="Back to Home" onPress={() => router.replace('/')} />
    </ThemedView>
  );
};
export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  heading: {
    fontWeight: 'bold',
    fontSize: 18,
    textAlign: 'center',
  },
});
