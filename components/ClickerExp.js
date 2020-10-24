import React, {useEffect, useState} from 'react';
import {StyleSheet, Dimensions, View, Text} from 'react-native';

const ClickerExp = ({
  clickCount,
  setClickCount,
  incrementAmount,
  setIncrementAmount,
}) => {
  const [showLevelup, setShowLevelup] = useState(false);

  const addCommasToNumber = (number) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  let progressStyle = {width: ((windowHeight * 0.12) / 100) * clickCount};

  useEffect(() => {
    if (clickCount < 100) {
      progressStyle = {width: ((windowHeight * 0.12) / 100) * clickCount};
    } else {
      setClickCount(0);
      progressStyle = {width: ((windowHeight * 0.12) / 100) * clickCount};
      setIncrementAmount((prev) => prev * 2);

      // Level Up Animation
      setShowLevelup(true);

      setTimeout(() => {
        setShowLevelup(false);
      }, 2000);
    }
  }, [
    clickCount,
    setClickCount,
    incrementAmount,
    setIncrementAmount,
    setShowLevelup,
  ]);

  return (
    <View style={styles.ClickerExp} pointerEvents="none">
      <View style={styles.emptyBar}>
        <View style={[styles.progressBar, progressStyle]}></View>
      </View>
      {showLevelup && (
        <View style={styles.levelup}>
          <Text style={styles.levelupText}>
            LEVEL UP! (+{addCommasToNumber(incrementAmount)})
          </Text>
        </View>
      )}
    </View>
  );
};

const windowHeight = Dimensions.get('window').height;
const styles = StyleSheet.create({
  ClickerExp: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.5,
    shadowOffset: {width: 0, height: 0},
    shadowRadius: 10,
  },
  emptyBar: {
    position: 'relative',
    height: 15,
    width: windowHeight * 0.12,
    backgroundColor: 'black',
    borderRadius: 2,
  },
  progressBar: {
    position: 'absolute',
    height: 15,
    width: '0%',
    backgroundColor: 'rgb(56, 80, 110)',
    borderRadius: 2,
  },
  levelup: {
    position: 'absolute',
    backgroundColor: 'rgba(240, 128, 128, 0.9)',
    borderRadius: 5,
  },
  levelupText: {
    color: 'white',
    fontSize: 30,
    fontWeight: '400',
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 30,
    paddingRight: 30,
    textAlign: 'center',
  },
});

export default ClickerExp;
