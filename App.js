/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Button,
  TouchableHighlight,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import Zombies from './components/Zombies';
import Parameters from './components/Parameters';
import Clicker from './components/Clicker';
import HireNav from './components/HireNav';
import StartMessage from './components/StartMessage';
import Tutorial from './components/Tutorial';
import ClickerAnimation from './components/ClickerAnimation';
import HireTutorial from './components/HireTutorial';
import GameOver from './components/GameOver';
import Win from './components/Win';

const App: () => React$Node = () => {
  const [money, setMoney] = useState(0);
  const [vaccine, setVaccine] = useState(0);
  const [soldVaccine, setSoldVaccine] = useState(0);

  // Total vps of each helper
  const [workerVps, setWorkerVps] = useState(0);
  const [feministVps, setFeministVps] = useState(0);
  const [animalVps, setAnimalVps] = useState(0);
  const [totalVps, setTotalVps] = useState(0);

  const [isTutorial, setIsTutorial] = useState(true);
  const [showHireHint, setShowHireHint] = useState(true);
  const [startMessage, setStartMessage] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [showWin, setShowWin] = useState(false);
  const [resetBtn, setResetBtn] = useState(false);

  useEffect(() => {
    setTotalVps(workerVps + feministVps + animalVps);
  }, [workerVps, feministVps, animalVps]);

  const resetGame = () => {
    setMoney(0);
    setVaccine(0);
    setSoldVaccine(0);
    setWorkerVps(0);
    setFeministVps(0);
    setAnimalVps(0);
    setTotalVps(0);
    setIsTutorial(true);
    setShowHireHint(true);
    setStartMessage(false);
    setGameOver(false);
    setShowWin(false);
    setResetBtn(true);
  };

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <Zombies
          soldVaccine={soldVaccine}
          setSoldVaccine={setSoldVaccine}
          isTutorial={isTutorial}
          setStartMessage={setStartMessage}
          setGameOver={setGameOver}
          resetBtn={resetBtn}
          setResetBtn={setResetBtn}
          showWin={showWin}
          setShowWin={setShowWin}
        />
        <Parameters
          money={money}
          setMoney={setMoney}
          vaccine={vaccine}
          setVaccine={setVaccine}
          setSoldVaccine={setSoldVaccine}
          totalVps={totalVps}
        />
        <ClickerAnimation />
        <Clicker
          setVaccine={setVaccine}
          isTutorial={isTutorial}
          gameOver={gameOver}
          showWin={showWin}
        />

        {!isTutorial && (
          <HireNav
            money={money}
            setMoney={setMoney}
            setVaccine={setVaccine}
            workerVps={workerVps}
            setWorkerVps={setWorkerVps}
            feministVps={feministVps}
            setFeministVps={setFeministVps}
            animalVps={animalVps}
            setAnimalVps={setAnimalVps}
            gameOver={gameOver}
            showWin={showWin}
          />
        )}
        {isTutorial && (
          <Tutorial
            money={money}
            vaccine={vaccine}
            soldVaccine={soldVaccine}
            gameOver={gameOver}
            showWin={showWin}
          />
        )}
        {!isTutorial && showHireHint ? (
          <HireTutorial setShowHireHint={setShowHireHint} />
        ) : null}
        <StartMessage
          setIsTutorial={setIsTutorial}
          startMessage={startMessage}
          setStartMessage={setStartMessage}
          gameOver={gameOver}
          showWin={showWin}
        />
        {gameOver && <GameOver resetGame={resetGame} />}
        {showWin && <Win resetGame={resetGame} />}
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});

export default App;
