import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Dimensions,
  View,
  Text,
  Button,
  Image,
  TouchableOpacity,
} from 'react-native';
import vaccineIcon from '../assets/images/vaccine.png';
import moneyIcon from '../assets/images/money.png';

const Parameters = ({
  money,
  setMoney,
  vaccine,
  setVaccine,
  setSoldVaccine,
  totalVps,
}) => {
  const [countingVaccine, setCountingVaccine] = useState(0);
  const [gainedAmount, setGainedAmount] = useState(0);
  const [showGainedAmount, setShowGainedAmount] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      if (vaccine - countingVaccine > 0 && vaccine - countingVaccine < 100) {
        setCountingVaccine((prev) => (prev += 1));
      } else if (vaccine - countingVaccine > 0) {
        setCountingVaccine(
          (prev) => (prev += Math.floor((vaccine - countingVaccine) / 48)),
        );
      } else if (vaccine < countingVaccine) {
        setCountingVaccine(vaccine);
      } else {
        clearInterval(interval);
      }
    }, 10);
    return () => clearInterval(interval);
  }, [vaccine, countingVaccine]);

  const sell = () => {
    // Gain Money Animation
    setGainedAmount(countingVaccine);
    setShowGainedAmount(true);
    setTimeout(() => {
      setShowGainedAmount(false);
    }, 500);

    setSoldVaccine((prev) => prev + countingVaccine);
    setMoney((prev) => prev + countingVaccine);
    setVaccine((prev) => prev - countingVaccine);
    setCountingVaccine((prev) => prev - prev);
  };

  const addCommasToNumber = (number) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  return (
    <View style={styles.Parameters}>
      <View style={styles.moneyCountContainer}>
        <Image
          source={moneyIcon}
          style={{width: windowHeight * 0.05, height: windowHeight * 0.05}}
        />
        <Text style={{fontSize: 20, fontWeight: '200', paddingLeft: 5}}>
          {addCommasToNumber(money)}
        </Text>
      </View>
      <View style={styles.vaccineCountContainer}>
        <View style={styles.countAndIcon}>
          <Image
            source={vaccineIcon}
            style={{width: windowHeight * 0.05, height: windowHeight * 0.05}}
          />
          <Text style={{fontSize: 20, fontWeight: '200', paddingLeft: 5}}>
            {addCommasToNumber(countingVaccine)}
          </Text>
        </View>
        <TouchableOpacity onPress={sell}>
          <View style={styles.ParametersBtn}>
            <Text style={styles.ParametersText}>SELL</Text>
          </View>
        </TouchableOpacity>
      </View>
      <Text>{addCommasToNumber(totalVps)} vps (vaccine per second)</Text>
      {showGainedAmount && (
        <View
          style={{
            position: 'absolute',
            top: 0,
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
          }}
          pointerEvents="none">
          <Image source={moneyIcon} style={{width: 20, height: 20}} />
          <Text style={{color: 'green', fontSize: 20}}>
            {' '}
            +{addCommasToNumber(gainedAmount)}
          </Text>
        </View>
      )}
    </View>
  );
};

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  Parameters: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: windowHeight * 0.22,
    borderColor: 'rgba(0, 0, 0, 0.1)',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  moneyCountContainer: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginBottom: 15,
  },
  vaccineCountContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: windowWidth * 0.9,
    marginBottom: 15,
  },
  countAndIcon: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: windowWidth * 0.5,
  },
  ParametersBtn: {
    width: 120,
    height: 30,
    margin: 10,
    borderRadius: 2,
    backgroundColor: 'rgb(56, 80, 110)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  ParametersText: {
    fontSize: 20,
    fontWeight: '200',
    color: 'white',
  },
});

export default Parameters;
