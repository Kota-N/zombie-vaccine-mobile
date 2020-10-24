import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Dimensions,
  View,
  Text,
  Button,
  Image,
  TouchableWithoutFeedback,
  Animated,
  Easing,
} from 'react-native';
import vaccineIcon from '../assets/images/vaccine.png';
import ClickerExp from './ClickerExp';

const Clicker = ({setVaccine, isTutorial, gameOver, showWin}) => {
  const [clickCount, setClickCount] = useState(0);
  const [incrementAmount, setIncrementAmount] = useState(1);
  const [triggerAnimation, setTriggerAnimation] = useState(true);

  const clickedAnimation = new Animated.Value(1);
  const clickedOpacity = clickedAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  useEffect(() => {
    if (gameOver || showWin) {
      setClickCount(0);
      setIncrementAmount(1);
    }
  });

  useEffect(() => {
    clickedAnimation.setValue(0);
    Animated.timing(clickedAnimation, {
      toValue: 1,
      duration: 200,
      useNativeDriver: true,
    }).start();
  }, [triggerAnimation]);

  const addCommasToNumber = (number) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  const handleClick = () => {
    setTriggerAnimation((prev) => !prev);
    setVaccine((prev) => prev + incrementAmount);

    if (!isTutorial) setClickCount((prev) => prev + 1);
  };

  return (
    <View style={styles.Clicker}>
      <TouchableWithoutFeedback onPress={handleClick}>
        <View style={styles.clickMe}></View>
      </TouchableWithoutFeedback>
      {!isTutorial && (
        <ClickerExp
          clickCount={clickCount}
          setClickCount={setClickCount}
          incrementAmount={incrementAmount}
          setIncrementAmount={setIncrementAmount}
        />
      )}
      <Animated.View
        pointerEvents="none"
        style={[styles.incrementContainer, {opacity: clickedOpacity}]}>
        <Image
          source={vaccineIcon}
          style={{
            width: windowHeight * 0.07,
            height: windowHeight * 0.07,
          }}
        />
        <Text style={{fontSize: 30, fontWeight: '400'}}>
          +{addCommasToNumber(incrementAmount)}
        </Text>
      </Animated.View>
    </View>
  );
};

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  Clicker: {
    position: 'absolute',
    top: windowHeight * 0.42,
    width: windowWidth,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: windowHeight * 0.32,
  },
  clickMe: {
    height: windowHeight * 0.28,
    width: windowHeight * 0.28,
    borderRadius: windowHeight * 0.14,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    transform: [{rotate: '90deg'}],
  },
  incrementContainer: {
    position: 'absolute',
    top: 30,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    minWidth: windowWidth * 0.6,
    opacity: 1,
  },
});

export default Clicker;
