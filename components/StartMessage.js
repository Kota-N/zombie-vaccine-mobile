import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Dimensions,
  View,
  Text,
  TouchableWithoutFeedback,
} from 'react-native';

const StartMessage = ({
  setIsTutorial,
  startMessage,
  setStartMessage,
  gameOver,
  showWin,
}) => {
  const [currentMessage, setCurrentMessage] = useState(0);
  const messageData = [
    'Wow, you did it!',
    'There are no more zombies!',
    'Wait a second... What is that!?',
    'Dr.Zombie is rapidly disseminating ZOMBIE-19 in the US!',
  ];

  const topPosition = {
    top: -windowHeight * 0.37,
  };

  const nextMessage = () => {
    if (currentMessage < messageData.length - 1) {
      setCurrentMessage((prev) => prev + 1);
    } else {
      setCurrentMessage((prev) => prev + 1);
      setIsTutorial(false);
      setStartMessage(false);
    }
  };

  useEffect(() => {
    if (gameOver || showWin) setCurrentMessage(0);
  }, [gameOver, showWin]);

  useEffect(() => {}, [startMessage]);
  return (
    <View style={styles.StartMessage}>
      {startMessage && (
        <View style={[styles.overlay, topPosition]}>
          <View style={styles.messageContainer}>
            <Text style={styles.startMessageText}>
              {messageData[currentMessage]}
            </Text>
            <TouchableWithoutFeedback onPress={nextMessage}>
              <View style={styles.startMessageBtn}>
                <Text style={styles.btnText}>NEXT</Text>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </View>
      )}
    </View>
  );
};

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const styles = StyleSheet.create({
  StartMessage: {},
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
  startMessageText: {
    lineHeight: 40,
    textAlign: 'center',
    color: 'white',
    fontSize: 20,
    fontWeight: '200',
  },
  startMessageBtn: {
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
  },
  btnText: {
    textAlign: 'center',
    color: 'rgb(56, 80, 110)',
    fontSize: 20,
  },
});

export default StartMessage;
