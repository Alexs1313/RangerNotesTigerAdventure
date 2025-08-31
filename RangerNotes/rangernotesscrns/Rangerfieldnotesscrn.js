import Rangerbtn from '../rangernotescmps/Rangerbtn';
import { useNavigation } from '@react-navigation/native';
import { rangernotesartdta } from '../rangernotescnsts/rangernotesartdta';
import {
  Dimensions,
  Image,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

const { width } = Dimensions.get('window');

const Rangerfieldnotesscrn = () => {
  const nav = useNavigation();

  return (
    <ImageBackground
      source={require('../../assets/images/rangermainbg.png')}
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
            <Text style={styles.rangerttl}>Field Notes</Text>
          </View>

          <View style={{ alignItems: 'center' }}>
            {rangernotesartdta.map((rangerItem, index) => (
              <View key={index}>
                <Rangerbtn
                  rangerPropsLabel={rangerItem.rangernotestitle}
                  buttonWidth={345}
                  buttonHeight={92}
                  fontSize={16}
                  rangerPropsIcon
                  rangerPropsImage={require('../../assets/images/rangerartbg.png')}
                  onPress={() =>
                    nav.navigate('Rangerfieldnotesdetails', rangerItem)
                  }
                />
              </View>
            ))}
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
  rangercontainer: { padding: 24, paddingTop: 60, paddingBottom: 34 },
  rangerheader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: width * 0.05,
    marginBottom: 14,
  },
});

export default Rangerfieldnotesscrn;
