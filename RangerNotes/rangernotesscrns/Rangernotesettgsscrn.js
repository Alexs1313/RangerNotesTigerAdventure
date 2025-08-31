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
import { useRangerNotesStore } from '../rangernotesstr/rangercntx';

const { width } = Dimensions.get('window');

const Rangernotesettgsscrn = () => {
  const nav = useNavigation();
  const { setIsEnbldRangerNotesNotf, isEnbldRangerNotesNotf } =
    useRangerNotesStore();

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
            <Text style={styles.rangerttl}>Settings</Text>
          </View>

          <View style={{ alignItems: 'center' }}>
            <RangerNotesBackground
              source={require('../../assets/images/rangernotesmdl.png')}
              style={{
                width: 355,
                height: 288,
                paddingHorizontal: 50,
                paddingTop: 25,
              }}
            >
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}
              >
                <Text style={[styles.rangerttl, { fontSize: 24 }]}>Notif</Text>
                <TouchableOpacity
                  style={{ justifyContent: 'center' }}
                  onPress={() =>
                    setIsEnbldRangerNotesNotf(!isEnbldRangerNotesNotf)
                  }
                >
                  {isEnbldRangerNotesNotf ? (
                    <Image
                      source={require('../../assets/images/rangernotesonbtn.png')}
                      style={{ width: 84, height: 41 }}
                    />
                  ) : (
                    <Image
                      source={require('../../assets/images/rangernotesoffbtn.png')}
                      style={{ width: 84, height: 41 }}
                    />
                  )}
                  <Text
                    style={[
                      styles.rangerttl,
                      { fontSize: 20, position: 'absolute', left: 21 },
                      isEnbldRangerNotesNotf && { left: 25 },
                    ]}
                  >
                    {isEnbldRangerNotesNotf ? 'ON' : 'OFF'}
                  </Text>
                </TouchableOpacity>
              </View>

              <View style={{ alignSelf: 'center' }}>
                <TouchableOpacity>
                  <Text style={styles.rangernotestermstxt}>Terms of Use</Text>
                </TouchableOpacity>
              </View>
            </RangerNotesBackground>
          </View>
        </View>
      </ScrollView>
    </RangerNotesBackground>
  );
};

const styles = StyleSheet.create({
  rangerttl: {
    fontFamily: 'Montserrat-Bold',
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
  rangernotestermstxt: {
    fontFamily: 'Montserrat-Bold',
    color: '#fff',
    fontSize: 24,
    marginTop: 5,
  },
});

export default Rangernotesettgsscrn;
