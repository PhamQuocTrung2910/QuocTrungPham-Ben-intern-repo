import { StyleSheet, Text, View, Image } from 'react-native';
import { Link } from 'expo-router';
import Dragon from '../assets/img/dragon.png';

const Home = () => {
  return (
    <View style={styles.container}>
      <Image source={Dragon} style={styles.img} />
      <Text style={styles.text}>Chicken</Text>
      <Text style={{ marginTop: 10, marginBottom: 30 }}>Wing</Text>

      <Link href={'/about'} style={styles.link}>
        {' '}
        About Page
      </Link>
      <Link href={'/contact'} style={styles.link}>
        {' '}
        Contact Page
      </Link>
      <Link href={'/intern'} style={styles.link}>
        {' '}
        Intern Page
      </Link>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffffff',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },

  img: {
    marginVertical: 50,
  },
  link: {
    marginVertical: 10,
    borderBottomWidth: 1,
  },
});
