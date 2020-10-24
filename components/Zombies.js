import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Dimensions,
  View,
  Text,
  Image,
  Button,
  TouchableOpacity,
} from 'react-native';

const Zombies = ({
  soldVaccine,
  setSoldVaccine,
  isTutorial,
  setStartMessage,
  setGameOver,
  resetBtn,
  setResetBtn,
  showWin,
  setShowWin,
}) => {
  const [zombies, setZombies] = useState(50);
  const [decreasedAmount, setDecreasedAmount] = useState(0);
  const [showDecreasedAmount, setShowDecreasedAmount] = useState(false);

  useEffect(() => {
    if (!isTutorial) {
      const interval = setInterval(() => {
        if (zombies < 300000000) {
          setZombies((prev) => (prev += 12431));
        } else {
          setZombies(300000000);
          clearInterval(interval);
          setGameOver(true);
        }
      }, 20);

      if (showWin) {
        clearInterval(interval);
        setZombies(0);
      }

      return () => clearInterval(interval);
    }
  }, [isTutorial, zombies, showWin]);

  useEffect(() => {
    if (resetBtn) {
      setZombies(50);
      setResetBtn(false);
    }
  }, [resetBtn, setResetBtn]);

  const addCommasToNumber = (number) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  const useVaccine = () => {
    if (zombies - soldVaccine > 0) {
      // Decrease Animation
      setDecreasedAmount(soldVaccine);
      setShowDecreasedAmount(true);
      setTimeout(() => {
        setShowDecreasedAmount(false);
      }, 500);

      setZombies((prev) => (prev -= soldVaccine));
      setSoldVaccine((prev) => (prev -= prev));
    } else {
      // Decrease Animation
      setDecreasedAmount(zombies);
      setShowDecreasedAmount(true);
      setTimeout(() => {
        setShowDecreasedAmount(false);
      }, 500);

      setSoldVaccine((prev) => prev - zombies);
      setZombies(0);
      setStartMessage(true);
    }
    // Win
    if (!isTutorial && zombies - soldVaccine <= 0) setShowWin(true);
  };

  return (
    <View style={styles.Zombies}>
      <View
        style={[
          styles.zombieCountContainer,
          isTutorial && {justifyContent: 'center'},
        ]}>
        <View style={styles.countAndIcon}>
          <Image
            source={require('../assets/images/zombie-icon.png')}
            style={{width: windowHeight * 0.05, height: windowHeight * 0.05}}
          />

          <Text style={{fontSize: 20, fontWeight: '200', paddingLeft: 5}}>
            {addCommasToNumber(zombies)}
          </Text>
        </View>
        {!isTutorial && (
          <Text style={{fontSize: 17, marginRight: 22}}>/300,000,000</Text>
        )}
      </View>
      <TouchableOpacity onPress={useVaccine}>
        <View style={styles.ZombiesBtn}>
          <Text style={styles.ZombiesText}>
            USE VACCINE ({addCommasToNumber(soldVaccine)})
          </Text>
        </View>
      </TouchableOpacity>

      {showDecreasedAmount && (
        <View
          style={{
            position: 'absolute',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
          }}
          pointerEvents="none">
          <Image
            source={require('../assets/images/zombie-icon.png')}
            style={{width: 20, height: 20}}
          />
          <Text style={{color: 'red', fontSize: 20}}>
            {' '}
            -{addCommasToNumber(decreasedAmount)}
          </Text>
        </View>
      )}
    </View>
  );
};

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  Zombies: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: windowHeight * 0.15,
    borderColor: 'rgba(0, 0, 0, 0.1)',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  zombieCountContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: windowWidth,
    margin: 15,
    marginLeft: 20,
  },
  countAndIcon: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 10,
  },
  ZombiesBtn: {
    width: windowWidth * 0.9,
    height: 40,
    margin: 2,
    borderRadius: 2,
    backgroundColor: 'rgb(56, 80, 110)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  ZombiesText: {
    fontSize: 20,
    fontWeight: '200',
    color: 'white',
  },
});

export default Zombies;
