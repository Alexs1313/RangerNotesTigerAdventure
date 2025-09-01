import { useNavigation } from '@react-navigation/native';
import { Image, TouchableOpacity } from 'react-native';
import { useRangerNotesStore } from '../../RangerNotes/rangernotesstr/rangercntx';
import SoundPlayer from 'react-native-sound-player';

const Rangernotesbckbtn = () => {
  const nav = useNavigation();
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
        nav.goBack();
        if (isEnbldRangerNotesSnd) {
          rangerNotesSnd();
        }
      }}
      activeOpacity={0.6}
    >
      <Image source={require('../../assets/images/rangerbackbtn.png')} />
    </TouchableOpacity>
  );
};

export default Rangernotesbckbtn;
