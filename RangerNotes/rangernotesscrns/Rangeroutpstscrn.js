import { useCallback, useState } from 'react';
import Rangerbtn from '../rangernotescmps/Rangerbtn';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import Rangerqntcont from '../rangernotescmps/Rangerqntcont';
import { useRangerNotesStore } from '../rangernotesstr/rangercntx';
import Rangerctgrcrsl from '../../RangerNotes/rangernotescmps/Rangerctgrcrsl';
import Rangerbgcrsl from '../../RangerNotes/rangernotescmps/Rangerbgcrsl';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  Dimensions,
  Image,
  ImageBackground as RangerNotesBackground,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Rangernotesbckbtn from '../rangernotescmps/Rangernotesbckbtn';

const { width } = Dimensions.get('window');

const ASYNC_COINS_KEY = 'tiger_game_coins';

const Rangeroutpstscrn = () => {
  const [idx, setIdx] = useState(0);
  const nav = useNavigation();
  const {
    coinsStore,
    loadProgress,
    setRangerOutputsTigers,
    rangerOutputsTigers,
    getRangerOutpost,
    saveRangerOutpost,
    setRangerOutputsBgc,
    rangerOutputsBgc,
    isEnbldRangerNotesNotf,
    setCoinsStore,
  } = useRangerNotesStore();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentBgIndex, setCurrentBgIndex] = useState(0);
  const [showRangerNotesAlert, setShowRangerNotesAlert] = useState(false);

  useFocusEffect(
    useCallback(() => {
      loadProgress();
      getRangerOutpost('rangerBgc'), getRangerOutpost('rangerOutpost');
    }, []),
  );

  const saveCoins = async newCoins => {
    try {
      await AsyncStorage.setItem(ASYNC_COINS_KEY, String(newCoins));
    } catch (e) {}
  };

  const handleUnlckRangerNotesTgr = selTig => {
    if (coinsStore < 20 && !selTig.unlocked && isEnbldRangerNotesNotf) {
      setShowRangerNotesAlert(true);
      setTimeout(() => {
        setShowRangerNotesAlert(false);
      }, 2000);
    }

    if (!selTig.unlocked && coinsStore >= 20) {
      const isUnlockedRangerTiger = rangerOutputsTigers.map((tiger, idx) => {
        if (tiger.id === selTig.id) return { ...tiger, unlocked: true };
        return tiger;
      });
      setRangerOutputsTigers(isUnlockedRangerTiger);
      saveRangerOutpost('rangerOutpost', isUnlockedRangerTiger);
      setCoinsStore(coinsStore - 20);
      saveCoins(coinsStore - 20);
    }

    if (!selTig.equipped && selTig.unlocked) {
      const isEquippedRangerTiger = rangerOutputsTigers.map(tiger => {
        if (tiger.id === selTig.id) return { ...tiger, equipped: true };
        return { ...tiger, equipped: false };
      });

      setRangerOutputsTigers(isEquippedRangerTiger);
      saveRangerOutpost('rangerOutpost', isEquippedRangerTiger);
    }
  };

  const handleUnlckRangerNotesBg = selTig => {
    if (coinsStore < 20 && !selTig.unlocked && isEnbldRangerNotesNotf) {
      setShowRangerNotesAlert(true);
      setTimeout(() => {
        setShowRangerNotesAlert(false);
      }, 2000);
    }

    if (!selTig.unlocked && coinsStore >= 20) {
      const isUnlockedRangerTiger = rangerOutputsBgc.map(bg => {
        if (bg.id === selTig.id) return { ...bg, unlocked: true };
        return bg;
      });
      setRangerOutputsBgc(isUnlockedRangerTiger);
      saveRangerOutpost('rangerBgc', isUnlockedRangerTiger);
      setCoinsStore(coinsStore - 20);
      saveCoins(coinsStore - 20);
    }

    if (!selTig.equipped && selTig.unlocked) {
      const isEquippedRangerTiger = rangerOutputsBgc.map(bg => {
        if (bg.id === selTig.id) return { ...bg, equipped: true };
        return { ...bg, equipped: false };
      });

      setRangerOutputsBgc(isEquippedRangerTiger);
      saveRangerOutpost('rangerBgc', isEquippedRangerTiger);
    }
  };

  console.log('rangerOutputsTigers', rangerOutputsTigers);

  return (
    <RangerNotesBackground
      source={require('../../assets/images/rangermainbg.png')}
      style={{ flex: 1 }}
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.rangercontainer}>
          {showRangerNotesAlert && (
            <View style={{ alignItems: 'center' }}>
              <RangerNotesBackground
                source={require('../../assets/images/hmBtn.png')}
                style={{
                  width: 345,
                  height: 65,
                  position: 'absolute',
                  zIndex: 200,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Text style={styles.rangernotesnottxt}>
                  Not enough Paw Coins
                </Text>
              </RangerNotesBackground>
            </View>
          )}
          <View style={styles.rangerheader}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: width * 0.05,
              }}
            >
              <Rangernotesbckbtn />
              <Text style={styles.rangerttl}>Outpost</Text>
            </View>

            <Rangerqntcont
              rangerPropsLabel={coinsStore}
              rangerPropsImg={require('../../assets/images/rangercoin.png')}
            />
          </View>

          <View
            style={{
              alignItems: 'center',
              flexDirection: 'row',
              justifyContent: 'center',
              marginBottom: 60,
            }}
          >
            <Rangerbtn
              rangerPropsLabel={'Tigers'}
              buttonWidth={170}
              buttonHeight={48}
              fontSize={20}
              rangerPropsImage={require('../../assets/images/rangernotesmdyellbtn.png')}
              onPress={() => {
                {
                  setIdx(0);
                }
              }}
            />
            <Rangerbtn
              rangerPropsLabel={'Scenes'}
              buttonWidth={170}
              buttonHeight={48}
              fontSize={20}
              rangerPropsImage={require('../../assets/images/rangernotesmdgrnbtn.png')}
              onPress={() => {
                {
                  setIdx(1);
                }
              }}
            />
          </View>
          {idx === 0 ? (
            <>
              <Rangerctgrcrsl
                categories={rangerOutputsTigers}
                setCurrentIndex={setCurrentIndex}
                currentIndex={currentIndex}
                onSelect={item => handleUnlckRangerNotesTgr(item)}
              />

              <View
                style={{
                  flexDirection: 'row',
                  gap: 8,
                  justifyContent: 'center',
                  marginTop: 160,
                }}
              >
                {[1, 2, 3, 4].map((rangerNotesItm, idx) => (
                  <View
                    key={idx}
                    style={[
                      styles.rangernotesdts,
                      currentIndex === idx && {
                        backgroundColor: '#FBB83A',
                        opacity: 1,
                      },
                    ]}
                  />
                ))}
              </View>
            </>
          ) : (
            <>
              <Rangerbgcrsl
                categories={rangerOutputsBgc}
                setCurrentBgIndex={setCurrentBgIndex}
                currentBgIndex={currentBgIndex}
                onSelect={item => handleUnlckRangerNotesBg(item)}
              />
              <View
                style={{
                  flexDirection: 'row',
                  gap: 8,
                  justifyContent: 'center',
                  marginTop: 90,
                }}
              >
                {[1, 2, 3, 4].map((rangerNotesItm, idx) => (
                  <View
                    key={idx}
                    style={[
                      styles.rangernotesdts,
                      currentBgIndex === idx && {
                        backgroundColor: '#FBB83A',
                        opacity: 1,
                      },
                    ]}
                  />
                ))}
              </View>
            </>
          )}
        </View>
      </ScrollView>
    </RangerNotesBackground>
  );
};

const styles = StyleSheet.create({
  rangerttl: {
    fontFamily: 'Montserrat-Bold',
    textAlign: 'center',
    color: '#fff',
    fontSize: 32,
  },
  rangercontainer: { padding: 24, paddingTop: 60, paddingBottom: 34 },
  rangerheader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
    justifyContent: 'space-between',
  },
  rangernotesdts: {
    width: 12,
    height: 12,
    borderRadius: 100,
    backgroundColor: '#fff',
    opacity: 0.5,
  },
  rangernotesnottxt: {
    fontFamily: 'Montserrat-Bold',
    textAlign: 'center',
    color: '#fff',
    fontSize: 20,
  },
});

export default Rangeroutpstscrn;
