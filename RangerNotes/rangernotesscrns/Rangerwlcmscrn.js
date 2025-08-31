import {
  ImageBackground as RangerNotesBackground,
  ScrollView,
  Text,
  View,
} from 'react-native';
import { useState } from 'react';
import Rangerbtn from '../rangernotescmps/Rangerbtn';
import { useNavigation } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';

export const rangernoteswlcmdta = [
  {
    rangernotesimage: require('../../assets/images/wlcm.png'),
    rangernotestitle: 'Guide your tiger',
    rangernotesdesc:
      'Swipe across lanes. Catch the targets, dodge hazards, and build your combo',
    rangernotesbtn: 'Next',
  },
  {
    rangernotesimage: require('../../assets/images/wlcmscnd.png'),
    rangernotestitle: 'Read like a ranger. Think like a scientist',
    rangernotesdesc:
      'Field Notes turn tiger ecology into clear stories. Myth Watch checks what’s true and what’s lore',
    rangernotesbtn: 'Start',
  },
];

const Rangerwlcmscrn = () => {
  const [rangerCurrentNmbr, setRangerCurrentNmbr] = useState(0);
  const nav = useNavigation();

  const rangerNextScrn = () => {
    if (rangerCurrentNmbr === 1) {
      nav.navigate('Rangerhmscrn');
    } else {
      setRangerCurrentNmbr(rangerCurrentNmbr + 1);
    }
  };

  return (
    <RangerNotesBackground
      source={rangernoteswlcmdta[rangerCurrentNmbr].rangernotesimage}
      style={{ flex: 1 }}
    >
      <LinearGradient
        colors={['rgba(157, 4, 0, 0)', 'rgba(157, 4, 0, 1)']}
        style={{
          width: '100%',
          height: '40%',
          position: 'absolute',
          bottom: 0,
        }}
      />
      <ScrollView
        contentContainerStyle={{ flexGrow: 1, justifyContent: 'flex-end' }}
        showsVerticalScrollIndicator={false}
      >
        <View
          style={{
            padding: 24,
            paddingBottom: 34,
            alignItems: 'center',
          }}
        >
          <Text
            style={{
              fontSize: 32,
              fontFamily: 'Montserrat-ExtraBold',
              color: '#fff',
              textAlign: 'center',
            }}
          >
            {rangernoteswlcmdta[rangerCurrentNmbr].rangernotestitle}
          </Text>
          <Text
            style={{
              marginTop: 15,
              marginBottom: 30,
              fontSize: 20,
              fontFamily: 'Montserrat-Bold',
              color: '#fff',
              textAlign: 'center',
            }}
          >
            {rangernoteswlcmdta[rangerCurrentNmbr].rangernotestitle}
          </Text>
          <Rangerbtn
            rangerPropsLabel={'Next'}
            buttonWidth={345}
            buttonHeight={65}
            fontSize={24}
            onPress={() => rangerNextScrn()}
            rangerPropsImage={require('../../assets/images/onBtn.png')}
          />
        </View>
      </ScrollView>
    </RangerNotesBackground>
  );
};

export default Rangerwlcmscrn;
