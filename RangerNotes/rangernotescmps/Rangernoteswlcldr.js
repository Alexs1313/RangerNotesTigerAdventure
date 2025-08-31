import {
  Image,
  ImageBackground as RangerNotesBackground,
  ScrollView,
} from 'react-native';

const Rangernoteswlcldr = () => {
  return (
    <RangerNotesBackground
      source={require('../../assets/images/rangersecbg.png')}
      style={{ flex: 1 }}
    >
      <ScrollView
        contentContainerStyle={{
          justifyContent: 'center',
          alignItems: 'center',
          flex: 1,
        }}
      >
        <Image source={require('../../assets/images/rangerlogo.png')} />
      </ScrollView>
    </RangerNotesBackground>
  );
};

export default Rangernoteswlcldr;
