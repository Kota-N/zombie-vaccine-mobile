import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Dimensions,
  View,
  Text,
  TouchableWithoutFeedback,
} from 'react-native';

const Win = ({resetGame, setShowWin}) => {
  const [currentPage, setCurrentPage] = useState(0);
  const messageData = [
    'Wow!',
    'You finally stopped Dr.Zombie.',
    '...',
    'What?',
    '"Is that it?"',
    'Well, I guess I can congratulate you a little more.',
    'You saved America! You are the hero! Yay!',
    '...',
    'What?',
    "Okay, okay, I'll give you a special secret.",
    'Did you know you can upgrade helpers once you hire a certain amount?',
    'Upgraded helpers are even more powerful.',
    'Oh, you know it already?',
    'Well, the ultimate hint is "Don\'t underestimate your own tapping!"',
    "Let's try it again!",
  ];

  useEffect(() => {}, [currentPage, messageData]);

  const nextBtn = () => {
    setCurrentPage((prev) => prev + 1);

    if (currentPage === messageData.length - 1) {
      setCurrentPage(0);
      resetGame();
    }
  };
  return (
    <View style={styles.Win}>
      <View style={styles.messageContainer}>
        <Text style={styles.WinText}>{messageData[currentPage]}</Text>
        <TouchableWithoutFeedback onPress={nextBtn}>
          <View style={styles.WinBtn}>
            {currentPage === messageData.length - 1 ? (
              <Text style={styles.btnText}>RESTART</Text>
            ) : (
              <Text style={styles.btnText}>NEXT</Text>
            )}
          </View>
        </TouchableWithoutFeedback>
      </View>
    </View>
  );
};

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const styles = StyleSheet.create({
  Win: {
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
  WinText: {
    lineHeight: 40,
    textAlign: 'center',
    color: 'white',
    fontSize: 20,
    fontWeight: '200',
  },
  WinBtn: {
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
});

export default Win;
