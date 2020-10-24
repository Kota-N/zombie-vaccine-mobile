import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Dimensions,
  View,
  Text,
  TouchableWithoutFeedback,
  Image,
  Animated,
} from 'react-native';

const Tutorial = ({money, vaccine, soldVaccine, gameOver, showWin}) => {
  const [currentMessage, setCurrentMessage] = useState(0);
  const [currentHint, setCurrentHint] = useState(0);
  const [showOverlay, setShowOverlay] = useState(true);
  const [showHint, setShowHint] = useState(false);

  const messageData = [
    'ZOMBIE-19 has changed some people into zombies!',
    'Make vaccines to save them!',
  ];
  const hintData = [
    'Click to make a vaccine',
    'Sell vaccines to earn coins',
    'Use vaccines you have sold',
  ];

  const topPosition = {
    top: -windowHeight * 0.37,
  };

  const hintAnimation = new Animated.Value(0);
  const hintPosition = hintAnimation.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [windowHeight * 0.37, 0, -windowHeight * 0.15],
  });

  useEffect(() => {
    if (gameOver || showWin) {
      setCurrentMessage(0);
      setCurrentHint(0);

      setShowHint(false);
    }
  }, [gameOver, showWin]);

  useEffect(() => {
    if (currentHint < hintData.length) {
      if (vaccine) {
        setCurrentHint(1);
      }
      if (money) {
        setCurrentHint(2);
        if (soldVaccine === 0) {
          setShowHint(false);
        }
      }
    }
  }, [money, vaccine, soldVaccine, currentHint, hintData]);

  useEffect(() => {
    switch (currentHint) {
      case 1:
        hintAnimation.setValue(0.5);
        break;
      case 2:
        hintAnimation.setValue(1);
        break;
      default:
        hintAnimation.setValue(0);
    }
  }, [currentHint]);

  useEffect(() => {}, [showHint]);

  const nextMessage = () => {
    if (currentMessage < messageData.length - 1) {
      setCurrentMessage((prev) => prev + 1);
    } else {
      setShowOverlay(false);
      setShowHint(true);
    }
  };

  const nextHint = () => {
    if (currentHint < hintData.length - 1) {
      setCurrentHint((prev) => prev + 1);
    } else {
      setShowHint(false);
    }
  };

  return (
    <View style={styles.Tutorial}>
      {showOverlay && (
        <View style={[styles.overlay, topPosition]}>
          <View style={styles.messageContainer}>
            <Text style={styles.tutorialText}>
              {messageData[currentMessage]}
            </Text>
            <TouchableWithoutFeedback onPress={nextMessage}>
              <View style={styles.tutorialBtn}>
                <Text style={styles.btnText}>NEXT</Text>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </View>
      )}

      {showHint && (
        <Animated.View style={[styles.hint, {top: hintPosition}]}>
          <Text style={styles.tutorialText}>
            {hintData[currentHint]}
            {'   '}
            <View style={{paddingBottom: 5}}>
              <Image
                source={require('../assets/images/arrow.png')}
                style={{
                  width: windowHeight * 0.02,
                  height: windowHeight * 0.02,
                  backgroundColor: 'white',
                }}
              />
            </View>
          </Text>
          <TouchableWithoutFeedback onPress={nextHint}>
            <View style={styles.tutorialBtn}>
              <Text style={styles.btnText}>NEXT</Text>
            </View>
          </TouchableWithoutFeedback>
        </Animated.View>
      )}
    </View>
  );
};

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const styles = StyleSheet.create({
  Tutorial: {},
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: windowWidth,
    height: windowHeight,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 10,
  },
  messageContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: windowHeight / 2,
    left: windowWidth / 2,
    width: windowWidth * 0.7,
    transform: [{translateX: -windowWidth * 0.35}],
    backgroundColor: 'rgb(35, 50, 68)',
    borderRadius: 5,
    padding: 10,
  },
  tutorialText: {
    lineHeight: 40,
    textAlign: 'center',
    color: 'white',
    fontSize: 20,
    fontWeight: '200',
  },
  tutorialBtn: {
    padding: 10,
    marginTop: 20,
    width: windowWidth * 0.7 + 30,
    borderRadius: 2,
    backgroundColor: 'whitesmoke',
    color: 'rgb(56, 80, 110)',
    fontSize: 20,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 10},
    shadowRadius: 10,
    shadowOpacity: 0.5,
    fontWeight: '400',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 10},
    shadowRadius: 10,
    shadowOpacity: 0.5,
  },
  btnText: {
    textAlign: 'center',
    color: 'rgb(56, 80, 110)',
    fontSize: 20,
  },

  hintContainer: {},
  hint: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    left: '40%',
    width: windowWidth * 0.7,
    transform: [{translateX: -windowWidth * 0.35}],
    backgroundColor: 'rgba(35, 50, 68, 0.9)',
    borderRadius: 5,
    padding: 10,
  },
});

export default Tutorial;
