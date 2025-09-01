import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ImageBackground,
  Dimensions,
  Image,
} from 'react-native';
import SoundPlayer from 'react-native-sound-player';
import { useRangerNotesStore } from '../rangernotesstr/rangercntx';

const { width } = Dimensions.get('window');

const Rangerbtn = ({
  rangerPropsLabel,
  onPress,
  buttonWidth = width * 0.8,
  buttonHeight = width * 0.65,
  fontSize = 24,
  rangerPropsImage,
  rangerPropsIcon,
  rangerPropsLockIcon,
  isDisabled,
}) => {
  const { isEnbldRangerNotesSnd } = useRangerNotesStore();

  const rangerNotesSnd = () => {
    try {
      SoundPlayer.playSoundFile('correct_beep', 'wav');
    } catch (e) {
      console.log('cannot play the sound file', e);
    }
  };

  return (
    <TouchableOpacity
      onPress={() => {
        onPress();
        if (isEnbldRangerNotesSnd) {
          rangerNotesSnd();
        }
      }}
      activeOpacity={0.8}
      style={styles.rangernotesbtnctn}
      disabled={isDisabled}
    >
      <ImageBackground
        source={rangerPropsImage}
        style={[
          styles.rangernotesbtn,
          { width: buttonWidth, height: buttonHeight },
          rangerPropsLockIcon && { alignItems: 'flex-start' },
        ]}
        resizeMode="stretch"
      >
        {rangerPropsIcon && (
          <Image
            source={require('../../assets/images/rangertiger.png')}
            style={{ position: 'absolute', left: 17, top: 13 }}
          />
        )}
        <Text
          style={[
            styles.rangernotesbtntxt,
            { fontSize },
            rangerPropsIcon && {
              marginLeft: 65,
              width: 245,
              textAlign: 'left',
              top: -4,
            },
          ]}
        >
          {rangerPropsLabel}
        </Text>

        {rangerPropsLockIcon && (
          <Image
            source={require('../../assets/images/rangernoteswlck.png')}
            style={{ position: 'absolute', right: 17, top: 20 }}
          />
        )}
      </ImageBackground>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  rangernotesbtnctn: {
    margin: 8,
  },
  rangernotesbtn: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 12,
  },
  rangernotesbtntxt: {
    fontFamily: 'Montserrat-Bold',
    textAlign: 'center',
    color: '#fff',
    fontSize: 24,
  },
});

export default Rangerbtn;
