import Rangerbtn from '../rangernotescmps/Rangerbtn';
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
import { useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');

const Rangermythwatchscrn = () => {
  const nav = useNavigation();

  return (
    <RangerNotesBackground
      source={require('../../assets/images/rangersecbg.png')}
      style={{ flex: 1 }}
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.rangercontainer}>
          <View style={styles.rangerheader}>
            <TouchableOpacity onPress={() => nav.goBack()} activeOpacity={0.6}>
              <Image
                source={require('../../assets/images/rangerbackbtn.png')}
              />
            </TouchableOpacity>
            <Text style={styles.rangerttl}>Myth Watch</Text>
          </View>

          <View style={{ alignItems: 'center' }}>
            <Image source={require('../../assets/images/rangerlogo.png')} />
            <Text style={[styles.rangerttl, { fontSize: 20 }]}>
              Quick checks from ranger field notes
            </Text>
            <Rangerbtn
              rangerPropsLabel={'Start'}
              buttonWidth={width * 0.8}
              buttonHeight={height * 0.065}
              fontSize={24}
              rangerPropsImage={require('../../assets/images/hmBtn.png')}
              onPress={() => nav.navigate('Rangermythqstnsscrn')}
            />
          </View>
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
    marginVertical: 26,
  },
  rangercontainer: { padding: 24, paddingTop: 60, paddingBottom: 34 },
  rangerheader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: width * 0.05,
    marginBottom: 14,
  },
});

export default Rangermythwatchscrn;
