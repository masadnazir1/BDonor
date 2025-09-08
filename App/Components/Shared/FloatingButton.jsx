import { TouchableOpacity, StyleSheet, Dimensions, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width, height } = Dimensions.get('screen');

const FloatingButton = ({
  iconName = 'add', // default icon
  iconSize = 28,
  iconColor = '#fff',
  buttonColor = '#d32f2f',
  onPress = () => {},
  style = {},
}) => {
  return (
    <TouchableOpacity
      style={[styles.fab, { backgroundColor: buttonColor }, style]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <Icon name={iconName} size={iconSize} color={iconColor} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    bottom: height * 0.07,
    right: width * 0.05,
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 3,
  },
});

export default FloatingButton;
