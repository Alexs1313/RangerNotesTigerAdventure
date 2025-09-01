import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, useContext, useState } from 'react';

export const RangerStoreContext = createContext();

export const useRangerNotesStore = () => {
  return useContext(RangerStoreContext);
};

const RANGER_NOTES_LEVELS = [
  { drop: 6, leaf: 0, check: 0 },
  { drop: 0, leaf: 8, check: 0 },
  { drop: 0, leaf: 0, check: 10 },
  { drop: 0, leaf: 5, check: 3 },
  { drop: 6, leaf: 4, check: 0 },
  { drop: 4, leaf: 0, check: 5 },
  { drop: 4, leaf: 4, check: 2 },
  { drop: 3, leaf: 8, check: 5 },
  { drop: 5, leaf: 4, check: 10 },
];

const RANGER_NOTES_TIGERS = [
  {
    id: 1,
    image: require('../../assets/images/rangernotestgrskin1.png'),
    equipped: true,
    unlocked: true,
  },
  {
    id: 2,
    image: require('../../assets/images/rangernotestgrskin2.png'),
    equipped: false,
    unlocked: false,
  },
  {
    id: 3,
    image: require('../../assets/images/rangernotestgrskin3.png'),
    equipped: false,
    unlocked: false,
  },
  {
    id: 4,
    image: require('../../assets/images/rangernotestgrskin4.png'),
    equipped: false,
    unlocked: false,
  },
];

const RANGER_NOTES_BGC = [
  {
    id: 1,
    image: require('../../assets/images/rangernotesbg1.png'),
    equipped: true,
    unlocked: true,
  },
  {
    id: 2,
    image: require('../../assets/images/rangernotesbg2.png'),
    equipped: false,
    unlocked: false,
  },
  {
    id: 3,
    image: require('../../assets/images/rangernotesbg3.png'),
    equipped: false,
    unlocked: false,
  },
  {
    id: 4,
    image: require('../../assets/images/rangernotesbg4.png'),
    equipped: false,
    unlocked: false,
  },
];

const ASYNC_LEVEL_KEY = 'tiger_game_level_progress';
const ASYNC_COINS_KEY = 'tiger_game_coins';

export const RangerNotesContextProvider = ({ children }) => {
  const [rangerOutputsTigers, setRangerOutputsTigers] =
    useState(RANGER_NOTES_TIGERS);
  const [rangerOutputsBgc, setRangerOutputsBgc] = useState(RANGER_NOTES_BGC);
  const [rangerNotesLvls, setRangerNotesLvls] = useState(RANGER_NOTES_LEVELS);
  const [rangerNotesUnlckdStore, setRangerNotesUnlckdStore] = useState([
    true,
    false,
    false,
    false,
    false,
    false,
    false,
  ]);
  const [rangerNotesLvl, setRangerNotesLvl] = useState(0);
  const [coinsStore, setCoinsStore] = useState(0);
  const [isEnbldRangerNotesNotf, setIsEnbldRangerNotesNotf] = useState(false);
  const [isEnbldRangerNotesSnd, setIsEnbldRangerNotesSnd] = useState(false);
  const [isEnbldRangerNotesMsc, setIsEnbldRangerNotesMsc] = useState(false);

  const loadProgress = async () => {
    try {
      const unlockedStr = await AsyncStorage.getItem(ASYNC_LEVEL_KEY);
      const coinsStr = await AsyncStorage.getItem(ASYNC_COINS_KEY);

      if (unlockedStr) {
        const arr = JSON.parse(unlockedStr);

        setRangerNotesUnlckdStore(arr);
      }
      if (coinsStr) setCoinsStore(Number(coinsStr));
    } catch (e) {}
  };

  const saveRangerOutpost = async (key, rangerDta) => {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(rangerDta));
    } catch (e) {
      console.error('Failed', e);
    }
  };

  const getRangerOutpost = async key => {
    try {
      const savedData = await AsyncStorage.getItem(key);
      const parsed = JSON.parse(savedData);

      if (parsed != null) {
        key === 'rangerOutpost'
          ? setRangerOutputsTigers(parsed)
          : setRangerOutputsBgc(parsed);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const value = {
    rangerNotesLvls,
    rangerNotesUnlckdStore,
    setRangerNotesUnlckdStore,
    rangerNotesLvl,
    setRangerNotesLvl,
    coinsStore,
    loadProgress,
    setCoinsStore,
    rangerOutputsTigers,
    setRangerOutputsTigers,
    setRangerOutputsBgc,
    rangerOutputsBgc,
    getRangerOutpost,
    saveRangerOutpost,
    isEnbldRangerNotesNotf,
    setIsEnbldRangerNotesNotf,
    isEnbldRangerNotesSnd,
    setIsEnbldRangerNotesSnd,
    isEnbldRangerNotesMsc,
    setIsEnbldRangerNotesMsc,
  };

  return (
    <RangerStoreContext.Provider value={value}>
      {children}
    </RangerStoreContext.Provider>
  );
};
