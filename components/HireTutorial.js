import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Dimensions,
  View,
  Image,
  Text,
  TouchableWithoutFeedback,
} from 'react-native';

const HireTutorial = ({setShowHireHint}) => {
  const hideHint = () => {
    setShowHireHint(false);
  };

  return (
    <View style={styles.HireTutorial}>
      <View style={styles.hireHint}>
        <Image
          source={require('../assets/images/arrow.png')}
          style={{
            width: windowHeight * 0.02,
            height: windowHeight * 0.02,
            backgroundColor: 'white',
            transform: [{rotate: '180deg'}],
          }}
        />
        <Text
          style={{
            color: 'white',
            fontSize: 20,
            fontWeight: '200',
          }}>
          {' '}
          Hire the world's greatest helpers{' '}
        </Text>
        <Image
          source={require('../assets/images/arrow.png')}
          style={{
            width: windowHeight * 0.02,
            height: windowHeight * 0.02,
            backgroundColor: 'white',
            transform: [{rotate: '180deg'}],
          }}
        />
      </View>
      <TouchableWithoutFeedback onPress={hideHint}>
        <View style={styles.btn}>
          <Text style={styles.btnText}>OK</Text>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const styles = StyleSheet.create({
  HireTutorial: {
    position: 'absolute',
    top: windowHeight * 0.7,
    left: 10,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: windowWidth * 0.9,
    backgroundColor: 'rgba(35, 50, 68, 0.9)',
    borderRadius: 5,
    padding: 5,
  },
  hireHint: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  btn: {
    padding: 10,
    marginTop: 20,
    width: windowWidth,
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

export default HireTutorial;
