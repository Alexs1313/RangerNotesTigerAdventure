import { useNavigation } from '@react-navigation/native';
import {
  Image,
  ImageBackground,
  ScrollView,
  View,
  StyleSheet,
  Text as RangerTxt,
  TouchableOpacity,
  Share,
} from 'react-native';

const Rangerfieldnotesdetails = ({ route }) => {
  const nav = useNavigation();
  const rangerArtItem = route.params;

  const rangerArtNoteShr = async () => {
    try {
      await Share.share({
        message: `${rangerArtItem.rangernotestitle}
${rangerArtItem.rangernotesscrn}
`,
      });
    } catch (error) {
      alert.Alert(error.message);
    }
  };

  return (
    <ImageBackground
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

            <TouchableOpacity onPress={rangerArtNoteShr} activeOpacity={0.6}>
              <Image source={require('../../assets/images/rangershrbtn.png')} />
            </TouchableOpacity>
          </View>

          <View style={{ alignItems: 'center' }}>
            <Image
              source={require('../../assets/images/rangertigerdet.png')}
              style={{ top: -80 }}
            />

            <View style={{ top: -60 }}>
              <RangerTxt style={styles.rangerttl}>
                {rangerArtItem.rangernotestitle}
              </RangerTxt>
              <RangerTxt style={styles.rangerdesc}>
                {rangerArtItem.rangernotesscrn}
              </RangerTxt>
            </View>
          </View>
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  rangerttl: {
    fontFamily: 'Montserrat-Bold',
    textAlign: 'center',
    color: '#fff',
    fontSize: 32,
  },
  rangercontainer: { padding: 24, paddingTop: 70, paddingBottom: 34 },
  rangerheader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 14,
  },
  rangerdesc: {
    fontFamily: 'Montserrat-Medium',
    color: '#fff',
    fontSize: 16,
    marginTop: 14,
    lineHeight: 24,
  },
});

export default Rangerfieldnotesdetails;
