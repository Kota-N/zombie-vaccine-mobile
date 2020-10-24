import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Dimensions,
  View,
  Text,
  Image,
  Button,
  TouchableWithoutFeedback,
  Animated,
  Easing,
} from 'react-native';
import animalBtn from '../assets/images/animal-btn.png';

const AnimalMenu = ({
  money,
  setMoney,
  clickAnimal,
  setClickAnimal,
  setAnimalVps,
  gameOver,
  showWin,
}) => {
  const [price, setPrice] = useState(24500);
  const [count, setCount] = useState(0);
  const [vps, setVps] = useState(2800);
  const [animatedValue, setAnimatedValue] = useState(0);
  const [upgraded, setUpgraded] = useState(false);

  useEffect(() => {
    if (gameOver || showWin) {
      setPrice(24500);
      setCount(0);
      setVps(2800);
      setUpgraded(false);
    }
  }, [gameOver, showWin]);

  useEffect(() => {
    setAnimalVps(vps * count);
  }, [setAnimalVps, vps, count]);

  const modalAnimation = new Animated.Value(animatedValue);
  const modalPosition = modalAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [-windowWidth, 0],
  });
  const transformStyle = {transform: [{translateX: modalPosition}]};

  useEffect(() => {
    if (clickAnimal) {
      if (animatedValue === 0) {
        modalAnimation.setValue(0);
        Animated.timing(modalAnimation, {
          toValue: 1,
          duration: 120,
          useNativeDriver: true,
        }).start();
        setTimeout(() => {
          setAnimatedValue(1);
        }, 200);
      }
    } else {
      if (animatedValue === 1) {
        modalAnimation.setValue(1);
        Animated.timing(modalAnimation, {
          toValue: 0,
          duration: 120,
          easing: Easing.linear,
          useNativeDriver: true,
        }).start();
        setTimeout(() => {
          setAnimatedValue(0);
        }, 200);
      }
    }
  }, [clickAnimal, animatedValue, setAnimatedValue]);

  const purchase = () => {
    if (money >= price) {
      setCount((prev) => (prev += 1));
      setMoney((prev) => prev - price);
      setPrice((prev) => prev + Math.round(prev / 10));
    }
  };

  const addCommasToNumber = (number) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  const upgrade = () => {
    setUpgraded(true);
    setVps(8440);
  };

  return (
    <Animated.View style={[styles.AnimalMenu, styles.hireMenu, transformStyle]}>
      {upgraded ? (
        <Text style={{color: 'white', fontSize: 24, fontWeight: '500'}}>
          Bear (x {count})
        </Text>
      ) : (
        <Text style={{color: 'white', fontSize: 24, fontWeight: '500'}}>
          Doggy (x {count})
        </Text>
      )}
      <Text style={{color: 'white', fontSize: 20, fontWeight: '200'}}>
        {addCommasToNumber(vps)} vps
      </Text>
      <Image
        source={animalBtn}
        style={{
          width: windowWidth * 0.21,
          height: windowWidth * 0.21,
          margin: 12,
        }}
      />
      {upgraded ? (
        <Text
          style={{
            color: 'white',
            fontSize: 20,
            fontWeight: '200',
            textAlign: 'center',
            padding: 10,
          }}>
          A bear is very big and scary
        </Text>
      ) : (
        <Text
          style={{
            color: 'white',
            fontSize: 20,
            fontWeight: '200',
            textAlign: 'center',
            padding: 10,
          }}>
          An animal that eats dog food as well as saves people
        </Text>
      )}
      <View style={styles.btnContainer}>
        <TouchableWithoutFeedback onPress={purchase}>
          <View
            style={[
              styles.hireMenuBtn,
              money < price ? {opacity: 0.4} : {opacity: 1},
            ]}>
            <Text style={styles.hireMenuText}>${addCommasToNumber(price)}</Text>
          </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback
          onPress={() => {
            setClickAnimal(false);
          }}>
          <View style={styles.hireMenuBtn}>
            <Text style={styles.hireMenuText}>EXIT</Text>
          </View>
        </TouchableWithoutFeedback>
      </View>
      {count >= 50 && vps === 2800 && (
        <TouchableWithoutFeedback onPress={upgrade}>
          <View style={styles.upgrade}>
            <Text
              style={{
                color: 'white',
                fontSize: 20,
                padding: 15,
              }}>
              UPGRADE
            </Text>
          </View>
        </TouchableWithoutFeedback>
      )}
    </Animated.View>
  );
};

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  AnimalMenu: {},
  hireMenu: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    position: 'absolute',
    top: -windowHeight * 0.35,
    left: 0,
    height: windowHeight * 0.55,
    width: windowWidth,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  btnContainer: {
    display: 'flex',
    flexDirection: 'row',
  },
  upgrade: {
    position: 'absolute',
    height: 50,
    backgroundColor: 'rgb(35, 50, 68)',
    shadowColor: '#fff',
    shadowOpacity: 0.8,
    shadowOffset: {width: 0, height: 0},
    shadowRadius: 10,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  hireMenuBtn: {
    width: windowWidth * 0.4,
    height: 80,
    padding: 10,
    marginTop: 12,
    marginBottom: 12,
    marginRight: 2,
    marginLeft: 2,
    borderRadius: 2,
    backgroundColor: 'whitesmoke',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  hireMenuText: {
    fontSize: 20,
    fontWeight: '200',
    color: 'rgb(35, 50, 68)',
  },
});

export default AnimalMenu;
