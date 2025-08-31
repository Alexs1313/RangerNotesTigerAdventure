import { useEffect } from 'react';
import Rangerbtn from '../rangernotescmps/Rangerbtn';
import { useNavigation } from '@react-navigation/native';
import Rangerqntcont from '../rangernotescmps/Rangerqntcont';
import { useRangerNotesStore } from '../rangernotesstr/rangercntx';
import { Image, ImageBackground, ScrollView, View } from 'react-native';

export const rangernotesnavdta = [
  {
    rangernotestitle: 'Patrol Run',
    rangernotesscrn: 'Rangernoteslvsl',
  },
  {
    rangernotestitle: 'Ranger Outpost',
    rangernotesscrn: 'Rangeroutpstscrn',
  },
  {
    rangernotestitle: 'Field Notes',
    rangernotesscrn: 'Rangerfieldnotesscrn',
  },
  {
    rangernotestitle: 'Myth Watch',
    rangernotesscrn: 'Rangermythwatchscrn',
  },
  {
    rangernotestitle: 'Settings',
    rangernotesscrn: 'Rangernotesettgsscrn',
  },
];

const Rangerhmscrn = () => {
  const nav = useNavigation();
  const { coinsStore, loadProgress } = useRangerNotesStore();

  useEffect(() => {
    loadProgress();
  }, []);

  return (
    <ImageBackground
      source={require('../../assets/images/rangermainbg.png')}
      style={{ flex: 1 }}
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={{
            padding: 24,
            paddingTop: 60,
            paddingBottom: 34,
            alignItems: 'center',
          }}
        >
          <Rangerqntcont
            rangerPropsLabel={coinsStore}
            rangerPropsImg={require('../../assets/images/rangercoin.png')}
            rangerQttPos
          />
          <Image source={require('../../assets/images/rangerlogo.png')} />

          {rangernotesnavdta.map((rangerItem, index) => (
            <View key={index}>
              <Rangerbtn
                rangerPropsLabel={rangerItem.rangernotestitle}
                buttonWidth={345}
                buttonHeight={65}
                fontSize={24}
                rangerPropsImage={require('../../assets/images/hmBtn.png')}
                onPress={() => nav.navigate(rangerItem.rangernotesscrn)}
              />
            </View>
          ))}
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

export default Rangerhmscrn;
