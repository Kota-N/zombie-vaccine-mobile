import React from 'react';
import {
  StyleSheet,
  Dimensions,
  View,
  Text,
  TouchableWithoutFeedback,
} from 'react-native';

const GameOver = ({resetGame}) => {
  return (
    <View style={styles.GameOver}>
      <View style={styles.overlay}>
        <View style={styles.messageContainer}>
          <Text style={styles.GameOverText}>Hey, look at all the zombies!</Text>
          <TouchableWithoutFeedback onPress={resetGame}>
            <View style={styles.GameOverBtn}>
              <Text style={styles.btnText}>RESTART</Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </View>
    </View>
  );
};

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const styles = StyleSheet.create({
  GameOver: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: windowWidth,
    height: windowHeight,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 10,
  },
  overlay: {},
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
  GameOverText: {
    lineHeight: 40,
    textAlign: 'center',
    color: 'white',
    fontSize: 20,
    fontWeight: '200',
  },
  GameOverBtn: {
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

export default GameOver;
