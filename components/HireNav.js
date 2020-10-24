import React, {useState} from 'react';
import {
  StyleSheet,
  Dimensions,
  View,
  Text,
  Button,
  Image,
  TouchableWithoutFeedback,
} from 'react-native';

import workerBtn from '../assets/images/worker-btn.png';
import feministBtn from '../assets/images/feminist-btn.png';
import animalBtn from '../assets/images/animal-btn.png';

import WorkerProgressBar from './WorkerProgressBar';
import FeministProgressBar from './FeministProgressBar';
import AnimalProgressBar from './AnimalProgressBar';
import WorkerMenu from './WorkerMenu';
import FeministMenu from './FeministMenu';
import AnimalMenu from './AnimalMenu';

const HireNav = ({
  money,
  setMoney,
  setVaccine,
  workerVps,
  setWorkerVps,
  feministVps,
  setFeministVps,
  animalVps,
  setAnimalVps,
  gameOver,
  showWin,
}) => {
  const [clickWorker, setClickWorker] = useState(false);
  const [clickFeminist, setClickFeminist] = useState(false);
  const [clickAnimal, setClickAnimal] = useState(false);

  return (
    <View style={styles.HireNav}>
      <View style={styles.helperContainer}>
        <TouchableWithoutFeedback onPress={() => setClickWorker(true)}>
          <View style={styles.helper}>
            <Image
              source={workerBtn}
              style={{width: windowWidth * 0.21, height: windowWidth * 0.21}}
            />
            <WorkerProgressBar setVaccine={setVaccine} workerVps={workerVps} />
          </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={() => setClickFeminist(true)}>
          <View style={styles.helper}>
            <Image
              source={feministBtn}
              style={{width: windowWidth * 0.21, height: windowWidth * 0.21}}
            />
            <FeministProgressBar
              setVaccine={setVaccine}
              feministVps={feministVps}
            />
          </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={() => setClickAnimal(true)}>
          <View style={styles.helper}>
            <Image
              source={animalBtn}
              style={{width: windowWidth * 0.21, height: windowWidth * 0.21}}
            />
            <AnimalProgressBar setVaccine={setVaccine} animalVps={animalVps} />
          </View>
        </TouchableWithoutFeedback>
      </View>

      <WorkerMenu
        money={money}
        setMoney={setMoney}
        clickWorker={clickWorker}
        setClickWorker={setClickWorker}
        setWorkerVps={setWorkerVps}
        gameOver={gameOver}
        showWin={showWin}
      />
      <FeministMenu
        money={money}
        setMoney={setMoney}
        clickFeminist={clickFeminist}
        setClickFeminist={setClickFeminist}
        setFeministVps={setFeministVps}
        gameOver={gameOver}
        showWin={showWin}
      />
      <AnimalMenu
        money={money}
        setMoney={setMoney}
        clickAnimal={clickAnimal}
        setClickAnimal={setClickAnimal}
        setAnimalVps={setAnimalVps}
        gameOver={gameOver}
        showWin={showWin}
      />
    </View>
  );
};

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  HireNav: {
    position: 'absolute',
    top: windowHeight * 0.77,
    width: windowWidth,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: windowHeight * 0.2,
  },
  helperContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  helper: {
    position: 'relative',
    width: windowWidth * 0.27,
    height: windowWidth * 0.27,
    backgroundColor: 'rgb(56, 80, 110)',
    borderRadius: 4,
    margin: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default HireNav;
