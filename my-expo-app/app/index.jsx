import { StyleSheet, Text, View } from 'react-native';

const Home = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Chicken</Text>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1, // take up full screen
    justifyContent: 'center', // center vertically
    alignItems: 'center', // center horizontally
    backgroundColor: '#f5f5f5', // light gray background
  },
  text: {
    fontSize: 24, // larger text
    fontWeight: 'bold', // bold text
    color: '#333', // dark gray color
  },
});
