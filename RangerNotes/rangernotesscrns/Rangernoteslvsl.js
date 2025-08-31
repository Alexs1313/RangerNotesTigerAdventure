import { useCallback } from 'react';
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
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { useRangerNotesStore } from '../rangernotesstr/rangercntx';

const { width } = Dimensions.get('window');

const Rangernoteslvsl = () => {
  const { rangerNotesLvls, rangerNotesUnlckdStore, loadProgress } =
    useRangerNotesStore();
  const nav = useNavigation();

  useFocusEffect(
    useCallback(() => {
      loadProgress();
    }, []),
  );

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
            <Text style={styles.rangerttl}>Levels</Text>
          </View>

          <View style={{ alignItems: 'center', gap: 16, marginTop: 14 }}>
            {rangerNotesLvls.map((_, i) => (
              <TouchableOpacity
                key={i}
                disabled={!rangerNotesUnlckdStore[i]}
                activeOpacity={0.6}
                onPress={() => {
                  nav.navigate('Rangerpatrolrunscr', i);
                }}
              >
                <RangerNotesBackground
                  source={require('../../assets/images/rangernoteslvlfrm.png')}
                  style={[
                    i === 0 && { alignItems: 'center' },
                    {
                      width: 350,
                      height: 69,
                      justifyContent: 'center',
                      paddingHorizontal: 44,
                    },
                  ]}
                >
                  {rangerNotesUnlckdStore[i] ? (
                    <Text style={styles.rangernoteslvltxt}>Level {i + 1}</Text>
                  ) : (
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                      }}
                    >
                      <Text style={styles.rangernoteslvltxt}>
                        Level {i + 1}
                      </Text>
                      <Image
                        style={{ width: 20, height: 20 }}
                        source={require('../../assets/images/rangernoteslck.png')}
                      />
                    </View>
                  )}
                </RangerNotesBackground>
              </TouchableOpacity>
            ))}
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
  },
  rangercontainer: { padding: 24, paddingTop: 60, paddingBottom: 34 },
  rangerheader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: width * 0.05,
    marginBottom: 14,
  },
  rangernoteslvltxt: {
    fontFamily: 'Montserrat-Bold',
    color: '#FFEAA5',
    fontSize: 24,
  },
});

export default Rangernoteslvsl;
