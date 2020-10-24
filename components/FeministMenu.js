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
import feministBtn from '../assets/images/feminist-btn.png';

const FeministMenu = ({
  money,
  setMoney,
  clickFeminist,
  setClickFeminist,
  setFeministVps,
  gameOver,
  showWin,
}) => {
  const [price, setPrice] = useState(3100);
  const [count, setCount] = useState(0);
  const [vps, setVps] = useState(350);
  const [animatedValue, setAnimatedValue] = useState(0);
  const [upgraded, setUpgraded] = useState(false);

  useEffect(() => {
    if (gameOver || showWin) {
      setPrice(3100);
      setCount(0);
      setVps(350);
      setUpgraded(false);
    }
  }, [gameOver, showWin]);

  useEffect(() => {
    setFeministVps(vps * count);
  }, [setFeministVps, vps, count]);

  const modalAnimation = new Animated.Value(animatedValue);
  const modalPosition = modalAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [-windowWidth, 0],
  });
  const transformStyle = {transform: [{translateX: modalPosition}]};

  useEffect(() => {
    if (clickFeminist) {
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
  }, [clickFeminist, animatedValue, setAnimatedValue]);

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
    setVps(1440);
  };

  return (
    <Animated.View
      style={[styles.FeministMenu, styles.hireMenu, transformStyle]}>
      {upgraded ? (
        <Text style={{color: 'white', fontSize: 24, fontWeight: '500'}}>
          Very Expert (x {count})
        </Text>
      ) : (
        <Text style={{color: 'white', fontSize: 24, fontWeight: '500'}}>
          Expert (x {count})
        </Text>
      )}
      <Text style={{color: 'white', fontSize: 20, fontWeight: '200'}}>
        {addCommasToNumber(vps)} vps
      </Text>
      <Image
        source={feministBtn}
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
          A superior being who is very expert at zombies
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
          An expert who is expert at zombies
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
            setClickFeminist(false);
          }}>
          <View style={styles.hireMenuBtn}>
            <Text style={styles.hireMenuText}>EXIT</Text>
          </View>
        </TouchableWithoutFeedback>
      </View>
      {count >= 75 && vps === 350 && (
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
  FeministMenu: {},
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

export default FeministMenu;
