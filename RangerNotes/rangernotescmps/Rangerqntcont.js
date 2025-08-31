import React from 'react';
import { Text, StyleSheet, ImageBackground, Image } from 'react-native';

const Rangerqntcont = ({ rangerPropsLabel, rangerPropsImg, rangerQttPos }) => {
  return (
    <ImageBackground
      source={require('../../assets/images/rangerquantcont.png')}
      style={[styles.rangernotesbg, rangerQttPos && { alignItems: 'center' }]}
      resizeMode="stretch"
    >
      <Image
        source={rangerPropsImg}
        style={[
          { position: 'absolute', left: -10, width: 46, height: 46 },
          rangerQttPos && { left: -22 },
        ]}
      />
      <Text style={[styles.rangernotesbtntxt]}>{rangerPropsLabel}</Text>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  rangernotesbg: {
    width: 84,
    height: 41,
    alignItems: 'flex-end',
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  rangernotesbtntxt: {
    fontFamily: 'Montserrat-Bold',
    textAlign: 'center',
    color: '#fff',
    fontSize: 20,
  },
});

export default Rangerqntcont;
