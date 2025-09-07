import React, { useState } from 'react';
import { Image, View, ActivityIndicator, StyleSheet } from 'react-native';

const ShowImage = ({
  source, // {uri: 'https://example.com/img.jpg'} or require('../assets/local.png')
  width = 100, // default width
  height = 100, // default height
  resizeMode = 'cover', // cover | contain | stretch | center
  borderRadius = 0,
  tintColor = '#fff',
  style,
  fallbackSource, // optional: local image on error
  showLoader = true, // show loader while loading
}) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  return (
    <View style={[{ width, height }, styles.container, style]}>
      <Image
        source={error && fallbackSource ? fallbackSource : source}
        style={{ width, height, borderRadius, tintColor }}
        resizeMode={resizeMode}
        onLoadEnd={() => setLoading(false)}
        onError={() => {
          setError(true);
          setLoading(false);
        }}
      />
      {loading && showLoader && (
        <View style={styles.loader}>
          <ActivityIndicator size="small" color="#555" />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loader: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ShowImage;
