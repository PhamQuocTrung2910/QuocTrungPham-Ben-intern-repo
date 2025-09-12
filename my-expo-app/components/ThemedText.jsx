import { Text, useColorScheme } from 'react-native';
import { Colors } from '../constants/Colors';

const ThemedText = ({ style, tittle = false, ...props }) => {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme] ?? Colors.light;

  const textColor = tittle ? theme.title : theme.text;

  return <Text style={[{ color: textColor }, style]} {...props} />;
};

export default ThemedText;
