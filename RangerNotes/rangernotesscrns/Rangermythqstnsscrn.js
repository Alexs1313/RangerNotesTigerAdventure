import { useState } from 'react';
import {
  Dimensions,
  Image,
  ImageBackground as RangerNotesBackground,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Platform,
} from 'react-native';
import Rangerbtn from '../rangernotescmps/Rangerbtn';
import { useNavigation } from '@react-navigation/native';
import { rangernotesmythdta } from '../rangernotescnsts/rangernotesmythdta';
import { BlurView } from '@react-native-community/blur';

const { height } = Dimensions.get('window');

const Rangermythqstnsscrn = () => {
  const [rangerCurrentQstnNmbr, setRangerCurrentQstnNmbr] = useState(0);
  const [isCorrectRangerAnswr, setIsCorrectRangerAnswr] = useState(false);
  const [selectedRangerNotesOpt, setSelectedRangerNotesOpt] = useState(null);
  const nav = useNavigation();
  const [showRangerQstnCont, setShowRangerQstnCont] = useState(false);
  const [showRangerQstnRes, setShowRangerQstnRes] = useState(false);
  const [rangerQstnResQnt, setRangerQstnResQnt] = useState(0);
  const [isVisRangerNotesNotif, setIsVisRangerNotesNotif] = useState(false);
  const [isDsbldRangerNotesBtn, setIsDsbldRangerNotesBtn] = useState(false);

  const selectCorrRangerNotesAnswr = selRangersOpt => {
    const isCorrectRangerNotesAnswer =
      rangernotesmythdta[rangerCurrentQstnNmbr].rangernotesanswr ===
      selRangersOpt;

    if (isCorrectRangerNotesAnswer) {
      setRangerQstnResQnt(rangerQstnResQnt + 1);
    }

    setIsDsbldRangerNotesBtn(true);
    setIsCorrectRangerAnswr(isCorrectRangerNotesAnswer);
    setSelectedRangerNotesOpt(selRangersOpt);
    setShowRangerQstnCont(true);
  };

  const rangerNotesNextQstn = () => {
    if (rangerCurrentQstnNmbr < rangernotesmythdta.length - 1) {
      setRangerCurrentQstnNmbr(rangerCurrentQstnNmbr + 1);
      setIsCorrectRangerAnswr(false);
      setSelectedRangerNotesOpt(null);
      setShowRangerQstnCont(false);
      setIsDsbldRangerNotesBtn(false);
    } else {
      setShowRangerQstnRes(true);
    }
  };

  const showRangerNotesMdl = () => {
    setIsVisRangerNotesNotif(true);
  };

  const closeRangerNotesMdl = () => {
    nav.goBack();
    setIsVisRangerNotesNotif(false);
  };

  return (
    <RangerNotesBackground
      source={require('../../assets/images/rangermainbg.png')}
      style={[
        { flex: 1 },
        isVisRangerNotesNotif &&
          Platform.OS === 'android' && { filter: 'blur(4px)' },
      ]}
    >
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
      >
        {isVisRangerNotesNotif && Platform.OS === 'ios' && (
          <BlurView
            style={styles.rangernotesblurbg}
            blurType="black"
            blurAmount={5}
          />
        )}
        <View style={styles.rangercontainer}>
          {showRangerQstnRes ? (
            <View style={{ alignItems: 'center' }}>
              <Text style={styles.rangerttl}>Result</Text>
              <RangerNotesBackground
                source={require('../../assets/images/rangerartbg.png')}
                style={[
                  styles.rangerqstnwrpr,
                  {
                    marginTop: 230,
                    marginBottom: 230,
                  },
                ]}
              >
                <Text style={[styles.rangerqstntxt, { top: -5 }]}>
                  You scored {rangerQstnResQnt}/{rangernotesmythdta.length}
                </Text>
              </RangerNotesBackground>

              <Rangerbtn
                rangerPropsLabel={'Home'}
                buttonWidth={345}
                buttonHeight={65}
                fontSize={24}
                rangerPropsImage={require('../../assets/images/rangeryellbtn.png')}
                onPress={() => nav.goBack()}
              />
            </View>
          ) : (
            <>
              <View style={styles.rangerheader}>
                <Text style={styles.rangerttl}>
                  Question {rangerCurrentQstnNmbr + 1}|
                  {rangernotesmythdta.length}
                </Text>

                <TouchableOpacity
                  onPress={() => showRangerNotesMdl()}
                  activeOpacity={0.6}
                >
                  <Image
                    source={require('../../assets/images/rangerpause.png')}
                  />
                </TouchableOpacity>
              </View>
              <View
                style={{
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  height: height * 0.68,
                }}
              >
                <RangerNotesBackground
                  source={require('../../assets/images/rangerartbg.png')}
                  style={styles.rangerqstnwrpr}
                >
                  <Text style={styles.rangerqstntxt}>
                    {rangernotesmythdta[rangerCurrentQstnNmbr].rangernotesfact}
                  </Text>
                </RangerNotesBackground>

                {showRangerQstnCont && (
                  <Text style={styles.rangerqstninftxt}>
                    {rangernotesmythdta[rangerCurrentQstnNmbr].rangernotesinfo}
                  </Text>
                )}

                <View style={{ alignItems: 'center' }}>
                  {showRangerQstnCont && (
                    <>
                      <TouchableOpacity onPress={rangerNotesNextQstn}>
                        <Text style={styles.rangernxtbtntxt}>
                          Tap to next question
                        </Text>
                      </TouchableOpacity>
                    </>
                  )}

                  {rangernotesmythdta[
                    rangerCurrentQstnNmbr
                  ].rangernotesopts.map((rangerItem, index) => (
                    <View key={index} style={{}}>
                      <Rangerbtn
                        rangerPropsLabel={rangerItem}
                        buttonWidth={345}
                        buttonHeight={65}
                        fontSize={24}
                        isDisabled={isDsbldRangerNotesBtn}
                        rangerPropsImage={
                          selectedRangerNotesOpt === rangerItem
                            ? isCorrectRangerAnswr
                              ? require('../../assets/images/rangergrnbtn.png')
                              : require('../../assets/images/hmBtn.png')
                            : require('../../assets/images/rangeryellbtn.png')
                        }
                        onPress={() => selectCorrRangerNotesAnswr(rangerItem)}
                      />
                    </View>
                  ))}
                </View>
              </View>
            </>
          )}
        </View>
        <Modal
          visible={isVisRangerNotesNotif}
          transparent
          animationType="fade"
          onRequestClose={() => setIsVisRangerNotesNotif(false)}
        >
          <View style={styles.rangernotesovrl}>
            <RangerNotesBackground
              style={styles.rangernotesmdlcont}
              source={require('../../assets/images/rangernotesmdl.png')}
            >
              <View style={{ padding: 20, alignItems: 'center' }}>
                <Text style={styles.rangernotesmdlttl}>Paused</Text>

                <TouchableOpacity
                  onPress={() => setIsVisRangerNotesNotif(false)}
                  style={styles.closeBtn}
                >
                  <Text style={styles.rangernotesmdlsbttl}>
                    Your round is on hold. You can resume or quit anytime
                  </Text>
                </TouchableOpacity>

                <View style={{ flexDirection: 'row' }}>
                  <Rangerbtn
                    rangerPropsLabel={'Quit'}
                    buttonWidth={126}
                    buttonHeight={41}
                    fontSize={20}
                    rangerPropsImage={require('../../assets/images/rangernotesmdyellbtn.png')}
                    onPress={() => {
                      closeRangerNotesMdl();
                    }}
                  />
                  <Rangerbtn
                    rangerPropsLabel={'Resume'}
                    buttonWidth={126}
                    buttonHeight={41}
                    fontSize={20}
                    rangerPropsImage={require('../../assets/images/rangernotesmdgrnbtn.png')}
                    onPress={() => setIsVisRangerNotesNotif(false)}
                  />
                </View>
              </View>
            </RangerNotesBackground>
          </View>
        </Modal>
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
  rangernotesovrl: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rangernotesmdlcont: {
    width: 345,
    height: 279,
    alignItems: 'center',
  },
  rangerqstntxt: {
    fontFamily: 'Montserrat-Bold',
    textAlign: 'center',
    color: '#fff',
    fontSize: 20,
    width: 312,
  },
  rangercontainer: {
    padding: 24,
    paddingTop: 60,
    paddingBottom: 34,
  },
  rangerheader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  rangerqstnwrpr: {
    width: 345,
    height: 96,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 90,
  },
  rangerqstninftxt: {
    fontFamily: 'Montserrat-Bold',
    textAlign: 'center',
    color: '#fff',
    fontSize: 17,
    marginTop: 5,
    marginBottom: 15,
  },
  rangernxtbtntxt: {
    fontFamily: 'Montserrat-Bold',
    textAlign: 'center',
    color: '#fff',
    fontSize: 20,
    opacity: 0.5,
    marginBottom: 30,
    marginTop: 20,
  },
  rangernotesblurbg: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    zIndex: 20,
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
});

export default Rangermythqstnsscrn;
