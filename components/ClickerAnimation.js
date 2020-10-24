import React from 'react';
import {
  StyleSheet,
  Dimensions,
  Animated,
  Image,
  View,
  Easing,
} from 'react-native';

const ClickerAnimation = React.memo(function () {
  const vaccineAnimation = new Animated.Value(0);
  const vaccineRotation = vaccineAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  Animated.loop(
    Animated.timing(vaccineAnimation, {
      toValue: 1,
      duration: 80000,
      easing: Easing.linear,
      useNativeDriver: true,
    }),
  ).start();

  return (
    <Animated.View
      pointerEvents="none"
      style={[
        styles.ClickerAnimation,
        {transform: [{rotate: vaccineRotation}]},
      ]}>
      <View style={styles.vaccineContaner}>
        <Image
          source={require('../assets/images/vaccine.png')}
          style={{width: windowHeight * 0.22, height: windowHeight * 0.22}}
        />
      </View>
    </Animated.View>
  );
});

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;
const styles = StyleSheet.create({
  ClickerAnimation: {
    position: 'absolute',
    top: windowHeight * 0.42,
    width: windowWidth,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: windowHeight * 0.32,
  },
  vaccineContaner: {
    height: windowHeight * 0.28,
    width: windowHeight * 0.28,
    borderColor: 'rgb(56, 80, 110)',
    borderWidth: 20,
    borderRadius: windowHeight * 0.14,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ClickerAnimation;
