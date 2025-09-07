import React from 'react';
import { Text, StyleSheet } from 'react-native';

const ShowText = ({
  children,
  size = 16, // default font size
  color = '#000', // default black
  weight = 'normal', // 'normal' | 'bold' | number
  align = 'left', // 'left' | 'center' | 'right'
  style, // extra custom styles
  numberOfLines, // optional prop for truncating text
}) => {
  return (
    <Text
      style={[
        styles.base,
        { fontSize: size, color, fontWeight: weight, textAlign: align },
        style,
      ]}
      numberOfLines={numberOfLines}
    >
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  base: {
    // you can add global text styles here
  },
});

export default ShowText;
