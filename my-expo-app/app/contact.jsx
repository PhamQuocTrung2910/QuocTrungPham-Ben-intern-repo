import { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { Link } from 'expo-router';
import ThemedView from '../components/ThemedView';
import ThemedText from '../components/ThemedText';
import Spacer from '../components/Spacer';
import { getUsers } from '../constants/api';

const Contact = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await getUsers();
        setUsers(data);
      } catch (error) {
        console.error('Failed to fetch users:', error);
      }
    };
    fetchUsers();
  }, []);

  return (
    <ThemedView style={styles.container}>
      <ThemedText style={styles.title}>Contact Page</ThemedText>

      <Spacer />

      <Link href={'/'} style={styles.link}>
        <ThemedText>Back Home</ThemedText>
      </Link>

      <Spacer />

      {users.length > 0 ? (
        users.slice(0, 3).map(
          (
            user // show just 3 users for demo
          ) => <ThemedText key={user.id}>{user.name}</ThemedText>
        )
      ) : (
        <ThemedText>No users loaded</ThemedText>
      )}
    </ThemedView>
  );
};

export default Contact;

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 18, fontWeight: 'bold' },
  link: { marginVertical: 10, borderBottomWidth: 1 },
});
