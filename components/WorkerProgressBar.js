import React, {useEffect, useState} from 'react';
import {StyleSheet, Dimensions, View} from 'react-native';

const WorkerProgressBar = ({setVaccine, workerVps}) => {
  const [currentProgress, setCurrentProgress] = useState(100);

  let animationStyle = {width: ((windowWidth * 0.22) / 100) * currentProgress};

  useEffect(() => {
    const interval = setInterval(() => {
      if (workerVps) {
        if (currentProgress < 100) {
          setCurrentProgress((prev) => (prev += 2.5));
        } else {
          setVaccine((prev) => (prev += workerVps));
          setCurrentProgress(0);
        }
        animationStyle = {
          width: ((windowWidth * 0.22) / 100) * currentProgress,
        };
      } else clearInterval(interval);
    }, 20);
    return () => clearInterval(interval);
  }, [setVaccine, workerVps, currentProgress]);

  return (
    <View style={styles.WorkerProgressBar}>
      <View style={styles.emptyBar}>
        <View style={[styles.progressBar, animationStyle]}></View>
      </View>
    </View>
  );
};

const windowWidth = Dimensions.get('window').width;
const styles = StyleSheet.create({
  WorkerProgressBar: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: windowWidth * 0.27,
    height: windowWidth * 0.27,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  emptyBar: {
    position: 'relative',
    height: 10,
    width: windowWidth * 0.22,
    backgroundColor: 'black',
    borderRadius: 10,
    marginBottom: 3,
  },
  progressBar: {
    position: 'absolute',
    height: 10,
    width: windowWidth * 0.22,
    backgroundColor: 'rgb(56, 80, 110)',
    borderRadius: 4,
  },
});

export default WorkerProgressBar;
