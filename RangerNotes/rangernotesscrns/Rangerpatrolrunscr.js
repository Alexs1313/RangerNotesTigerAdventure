import {
  Dimensions,
  PanResponder,
  Modal,
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ImageBackground as RangerNotesBackground,
  Platform,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useRangerNotesStore } from '../rangernotesstr/rangercntx';
import Rangerqntcont from '../rangernotescmps/Rangerqntcont';
import Rangerbtn from '../rangernotescmps/Rangerbtn';
import { BlurView } from '@react-native-community/blur';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import Orientation from 'react-native-orientation-locker';

const { width, height } = Dimensions.get('window');

const RANGER_NOTES_IMGS = {
  drop: require('../../assets/images/rangerdrp.png'),
  leaf: require('../../assets/images/rangerlf.png'),
  check: require('../../assets/images/rangerchk.png'),
  bad1: require('../../assets/images/rangerwrfrst.png'),
  bad2: require('../../assets/images/rangerfr.png'),
  bad3: require('../../assets/images/rangerwrscd.png'),
  heart: require('../../assets/images/rangerhrt.png'),
  bg: require('../../assets/images/rangermainbg.png'),
};

const TIGER_WIDTH = 113;
const TIGER_HEIGHT = 170;
const ITEM_SIZE = 50;
const HEART_SIZE = 32;
const LIVES = 3;
const OBJECT_TYPES = ['drop', 'leaf', 'check'];
const BAD_TYPES = ['bad1', 'bad2', 'bad3'];
const SPEED_START = 3;
const SPEED_INCREASE = 0.5;

function randomX() {
  return Math.random() * (width - ITEM_SIZE);
}

function getRndRangerNotesGoodTp(task) {
  const available = OBJECT_TYPES.filter(type => task[type] > 0);
  return available[Math.floor(Math.random() * available.length)];
}

function getRndRangerNotesBadTp() {
  return BAD_TYPES[Math.floor(Math.random() * BAD_TYPES.length)];
}

const ASYNC_LEVEL_KEY = 'tiger_game_level_progress';
const ASYNC_COINS_KEY = 'tiger_game_coins';

export default function Rangerpatrolrunscr({ route }) {
  const [tigerX, setTigerX] = useState(width / 2 - TIGER_WIDTH / 2);
  const [falling, setFalling] = useState([]);
  const {
    rangerNotesLvls,
    rangerNotesUnlckdStore,
    rangerNotesLvl,
    setRangerNotesLvl,
    getRangerOutpost,
    coinsStore,
    loadProgress,
    rangerOutputsTigers,
    rangerOutputsBgc,
  } = useRangerNotesStore();
  const [task, setTask] = useState({ ...rangerNotesLvls[0] });
  const selRangerNotesLvl = route.params;
  const [caught, setCaught] = useState({ drop: 0, leaf: 0, check: 0 });
  const [mistakes, setMistakes] = useState(0);
  const [coins, setCoins] = useState(coinsStore);
  const [rangerNotesUnlckd, setRangerNotesUnlckd] = useState(
    rangerNotesUnlckdStore,
  );
  const [isPausedRangerNotes, setIsPausedRangerNotes] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const nav = useNavigation();
  const [win, setWin] = useState(false);
  const speedRef = useRef(SPEED_START);
  const frameRef = useRef();
  const [eaten, setEaten] = useState([]);

  useEffect(() => {
    loadProgress();
    startLevel(selRangerNotesLvl);
    getRangerOutpost('rangerBgc'), getRangerOutpost('rangerOutpost');
  }, []);

  useFocusEffect(
    useCallback(() => {
      Orientation.lockToPortrait();

      return () => Orientation.unlockAllOrientations();
    }, []),
  );

  const saveRangerNotesGmProgrss = async (newUnlocked, newCoins) => {
    try {
      await AsyncStorage.setItem(ASYNC_LEVEL_KEY, JSON.stringify(newUnlocked));
      await AsyncStorage.setItem(ASYNC_COINS_KEY, JSON.stringify(newCoins));
    } catch (e) {}
  };

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => !isPausedRangerNotes && !gameOver,
      onMoveShouldSetPanResponder: () => !isPausedRangerNotes && !gameOver,
      onPanResponderMove: (_, gesture) => {
        setTigerX(prev => {
          let newX = prev + gesture.dx;
          newX = Math.max(
            0,
            Math.min(width - TIGER_WIDTH, gesture.moveX - TIGER_WIDTH / 2),
          );
          return newX;
        });
      },
      onPanResponderGrant: (_, gesture) => {
        setTigerX(
          Math.max(
            0,
            Math.min(width - TIGER_WIDTH, gesture.x0 - TIGER_WIDTH / 2),
          ),
        );
      },
    }),
  ).current;

  useEffect(() => {
    if (isPausedRangerNotes || gameOver) return;
    frameRef.current = requestAnimationFrame(gameStep);
    return () => cancelAnimationFrame(frameRef.current);
  }, [
    isPausedRangerNotes,
    gameOver,
    falling,
    tigerX,
    caught,
    mistakes,
    rangerNotesLvl,
  ]);

  function gameStep() {
    setFalling(prev => {
      const next = prev
        .map(obj => ({ ...obj, y: obj.y + speedRef.current }))
        .filter(obj => obj.y < height);

      let updatedCaught = { ...caught };
      let newMistakes = mistakes;
      let collected = false;
      let toRemove = [];
      let eatenNow = [];

      next.forEach((obj, idx) => {
        if (
          obj.y + ITEM_SIZE > height - TIGER_HEIGHT - 60 &&
          obj.y < height - 60 &&
          obj.x < tigerX + TIGER_WIDTH &&
          obj.x + ITEM_SIZE > tigerX
        ) {
          eatenNow.push({ ...obj });

          if (OBJECT_TYPES.includes(obj.type)) {
            if (
              task[obj.type] > 0 &&
              updatedCaught[obj.type] < task[obj.type]
            ) {
              updatedCaught[obj.type]++;
              collected = true;
            } else {
              newMistakes++;
            }
          } else {
            newMistakes++;
          }
          toRemove.push(idx);
        }
      });

      const filtered = next.filter((_, idx) => !toRemove.includes(idx));

      while (filtered.length < 3) {
        const r = Math.random();
        let type;
        if (r < 0.7 && Object.values(task).some(v => v > 0)) {
          type = getRndRangerNotesGoodTp(task);
        } else {
          type = getRndRangerNotesBadTp();
        }
        filtered.push({
          id: Math.random().toString(36).substring(2),
          type,
          x: randomX(),
          y: -ITEM_SIZE,
        });
      }

      if (
        updatedCaught.drop === task.drop &&
        updatedCaught.leaf === task.leaf &&
        updatedCaught.check === task.check &&
        task.drop + task.leaf + task.check > 0
      ) {
        setWin(true);
        setIsPausedRangerNotes(true);

        setRangerNotesUnlckd(arr => {
          const copy = [...arr];
          if (
            rangerNotesLvl + 1 < rangerNotesLvls.length &&
            !copy[rangerNotesLvl + 1]
          ) {
            copy[rangerNotesLvl + 1] = true;

            setCoins(c => {
              const newCoins = c + 15;
              saveRangerNotesGmProgrss(copy, newCoins);

              return newCoins;
            });
          } else {
            saveRangerNotesGmProgrss(copy, coins);
          }
          return copy;
        });
      } else if (newMistakes >= LIVES) {
        setGameOver(true);
        setIsPausedRangerNotes(true);
      }

      setCaught(updatedCaught);
      setMistakes(newMistakes);

      if (collected && speedRef.current < 10)
        speedRef.current += SPEED_INCREASE;

      if (eatenNow.length > 0) {
        setEaten(eatenArr => [...eatenArr, ...eatenNow]);
        setTimeout(() => {
          setEaten(eatenArr =>
            eatenArr.filter(e => !eatenNow.find(en => en.id === e.id)),
          );
        }, 200);
      }

      return filtered;
    });

    if (!isPausedRangerNotes && !gameOver && !win)
      frameRef.current = requestAnimationFrame(gameStep);
  }

  const startLevel = lvl => {
    setRangerNotesLvl(lvl);
    setTask({ ...rangerNotesLvls[lvl] });
    setFalling([
      {
        id: 'a',
        type: getRndRangerNotesGoodTp(rangerNotesLvls[lvl]),
        x: randomX(),
        y: -ITEM_SIZE,
      },
      {
        id: 'b',
        type: getRndRangerNotesBadTp(),
        x: randomX(),
        y: -ITEM_SIZE * 2,
      },
      {
        id: 'c',
        type: getRndRangerNotesBadTp(),
        x: randomX(),
        y: -ITEM_SIZE * 3,
      },
    ]);
    setCaught({ drop: 0, leaf: 0, check: 0 });
    setMistakes(0);
    setIsPausedRangerNotes(false);
    setGameOver(false);
    setWin(false);
    speedRef.current = SPEED_START;
    setTigerX(width / 2 - TIGER_WIDTH / 2);
    setEaten([]);
  };

  const selectedRangerTiger = rangerOutputsTigers.find(tiger => tiger.equipped);
  const selectedRangerBg = rangerOutputsBgc.find(bg => bg.equipped);

  return (
    <>
      {win ? (
        <RangerNotesBackground
          style={styles.mainrangernotesbg}
          source={require('../../assets/images/cmpltlvlbg.png')}
        >
          <Modal
            visible={win}
            transparent
            animationType="fade"
            onRequestClose={() => console.log('f')}
          >
            <View
              style={[
                styles.rangernotesovrl,
                { justifyContent: 'flex-end', marginBottom: 80 },
              ]}
            >
              <RangerNotesBackground
                style={styles.modalContent}
                source={require('../../assets/images/rangernotesmdl.png')}
              >
                <View style={{ padding: 20, alignItems: 'center' }}>
                  <Image
                    source={require('../../assets/images/rangernotesstrsgm.png')}
                  />

                  <Text
                    style={[
                      styles.rangernotesmdlttl,
                      { marginTop: 8, marginBottom: 10 },
                    ]}
                  >
                    {`Patrol 
complete!`}
                  </Text>

                  <Rangerqntcont
                    rangerPropsLabel={'15'}
                    rangerPropsImg={require('../../assets/images/rangercoin.png')}
                  />
                  <View style={{ flexDirection: 'row', marginTop: 12 }}>
                    <Rangerbtn
                      rangerPropsLabel={'Home'}
                      buttonWidth={126}
                      buttonHeight={41}
                      fontSize={18}
                      rangerPropsImage={require('../../assets/images/rangernotesmdyellbtn.png')}
                      onPress={() => {
                        {
                          nav.goBack(), setIsPausedRangerNotes(false);
                        }
                      }}
                    />
                    <Rangerbtn
                      rangerPropsLabel={'Next Level'}
                      buttonWidth={126}
                      buttonHeight={41}
                      fontSize={18}
                      rangerPropsImage={require('../../assets/images/rangernotesmdgrnbtn.png')}
                      onPress={() => {
                        if (rangerNotesLvl + 1 < rangerNotesLvls.length)
                          startLevel(rangerNotesLvl + 1);
                        else setWin(false);
                      }}
                    />
                  </View>
                </View>
              </RangerNotesBackground>
            </View>
          </Modal>
        </RangerNotesBackground>
      ) : (
        <RangerNotesBackground
          style={[
            styles.mainrangernotesbg,
            Platform.OS === 'android' &&
              (isPausedRangerNotes || gameOver) && { filter: 'blur(4px)' },
          ]}
          source={selectedRangerBg.image}
        >
          {(isPausedRangerNotes || gameOver) && Platform.OS === 'ios' && (
            <BlurView
              style={styles.rangernotesblurbg}
              blurType="black"
              blurAmount={5}
            />
          )}
          <View style={{ paddingTop: 73, padding: 24 }}>
            <View style={styles.rangernotestskrw}>
              <View style={{ gap: 10, position: 'absolute', left: 30 }}>
                {OBJECT_TYPES.map(type =>
                  task[type] > 0 ? (
                    <View key={type}>
                      <Rangerqntcont
                        rangerPropsLabel={[caught[type], '/', task[type]]}
                        rangerPropsImg={RANGER_NOTES_IMGS[type]}
                        rangerPropsGm
                      />
                    </View>
                  ) : null,
                )}
              </View>

              <View style={styles.rangernoteshrtswrp}>
                {[...Array(LIVES)].map((_, i) => (
                  <Image
                    key={i}
                    source={RANGER_NOTES_IMGS.heart}
                    style={[styles.heart, { opacity: mistakes > i ? 0.2 : 1 }]}
                  />
                ))}
              </View>
              <TouchableOpacity
                style={styles.rangernotespsbtn}
                onPress={() => setIsPausedRangerNotes(p => !p)}
              >
                <Image
                  source={require('../../assets/images/rangerpause.png')}
                  style={{ width: 60, height: 60 }}
                />
              </TouchableOpacity>
            </View>

            <View
              style={[styles.gameArea, { width, height }]}
              {...panResponder.panHandlers}
            >
              {falling.map(obj => (
                <Image
                  key={obj.id}
                  source={RANGER_NOTES_IMGS[obj.type]}
                  style={{
                    position: 'absolute',
                    left: obj.x,
                    top: obj.y,
                    width: ITEM_SIZE,
                    height: ITEM_SIZE,
                  }}
                />
              ))}

              {eaten.map(obj => (
                <Image
                  key={'eaten_' + obj.id}
                  source={RANGER_NOTES_IMGS[obj.type]}
                  style={{
                    position: 'absolute',
                    width: ITEM_SIZE,
                    height: ITEM_SIZE,
                    left: tigerX + TIGER_WIDTH / 2 - ITEM_SIZE / 2,
                    top: height - TIGER_HEIGHT - 60 - 40,
                    opacity: 0.4,
                    zIndex: 10,
                    transform: [{ scale: 1.25 }],
                  }}
                />
              ))}

              <Image
                source={selectedRangerTiger.image}
                style={{
                  position: 'absolute',
                  width: TIGER_WIDTH,
                  height: TIGER_HEIGHT,
                  left: tigerX,
                  top: height - TIGER_HEIGHT - 180,
                  zIndex: 2,
                }}
              />
            </View>

            <Modal
              visible={isPausedRangerNotes && !win && !gameOver}
              transparent
              animationType="fade"
            >
              <View style={styles.rangernotesovrl}>
                <RangerNotesBackground
                  style={styles.modalContent}
                  source={require('../../assets/images/rangernotesmdl.png')}
                >
                  <View style={{ padding: 5, alignItems: 'center' }}>
                    <Text style={styles.rangernotesmdlttl}>Paused</Text>

                    <Text style={styles.rangernotesmdlsbttl}>
                      Your round is on hold. You can resume or quit anytime
                    </Text>

                    <View style={{ flexDirection: 'row' }}>
                      <Rangerbtn
                        rangerPropsLabel={'Home'}
                        buttonWidth={126}
                        buttonHeight={41}
                        fontSize={20}
                        rangerPropsImage={require('../../assets/images/rangernotesmdyellbtn.png')}
                        onPress={() => {
                          {
                            nav.goBack(), setIsPausedRangerNotes(false);
                          }
                        }}
                      />
                      <Rangerbtn
                        rangerPropsLabel={'Resume'}
                        buttonWidth={126}
                        buttonHeight={41}
                        fontSize={20}
                        rangerPropsImage={require('../../assets/images/rangernotesmdgrnbtn.png')}
                        onPress={() => setIsPausedRangerNotes(false)}
                      />
                    </View>
                  </View>
                </RangerNotesBackground>
              </View>
            </Modal>

            <Modal visible={gameOver} transparent animationType="fade">
              <View style={styles.rangernotesovrl}>
                <RangerNotesBackground
                  style={styles.modalContent}
                  source={require('../../assets/images/rangernotesmdl.png')}
                >
                  <View style={{ padding: 5, alignItems: 'center' }}>
                    <Text style={styles.rangernotesmdlttl}>Patrol failed</Text>

                    <Text style={styles.rangernotesmdlsbttl}>
                      Your round is on hold. You can resume or quit anytime
                    </Text>

                    <View style={{ flexDirection: 'row' }}>
                      <Rangerbtn
                        rangerPropsLabel={'Home'}
                        buttonWidth={126}
                        buttonHeight={41}
                        fontSize={20}
                        rangerPropsImage={require('../../assets/images/rangernotesmdyellbtn.png')}
                        onPress={() => {
                          {
                            nav.goBack(), setIsPausedRangerNotes(false);
                          }
                        }}
                      />
                      <Rangerbtn
                        rangerPropsLabel={'Try Again'}
                        buttonWidth={126}
                        buttonHeight={41}
                        fontSize={20}
                        rangerPropsImage={require('../../assets/images/rangernotesmdgrnbtn.png')}
                        onPress={() => startLevel(rangerNotesLvl)}
                      />
                    </View>
                  </View>
                </RangerNotesBackground>
              </View>
            </Modal>
          </View>
        </RangerNotesBackground>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  mainrangernotesbg: { flex: 1 },
  rangernotesovrl: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: 345,
    height: 279,
    alignItems: 'center',
  },
  rangernotesmdlttl: {
    fontFamily: 'Montserrat-Bold',
    textAlign: 'center',
    color: '#FFEAA5',
    fontSize: 32,
    marginTop: 26,
  },
  rangernotesmdlsbttl: {
    fontFamily: 'Montserrat-Bold',
    textAlign: 'center',
    color: '#FFFFFF',
    fontSize: 20,
    marginTop: 12,
    marginBottom: 24,
    width: 247,
  },
  rangernoteshrtswrp: {
    flexDirection: 'row',
    marginBottom: 7,
    marginTop: 3,
    marginLeft: 10,
  },
  heart: { width: HEART_SIZE, height: HEART_SIZE, marginRight: 5 },
  rangernotespsbtn: {
    marginLeft: 16,
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rangernotestskrw: {
    marginTop: 5,
    marginBottom: 7,
    gap: 20,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  rangernotesblurbg: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    zIndex: 20,
  },
});
