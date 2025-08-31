import React, { useRef } from 'react';
import {
  Animated,
  View,
  Image,
  StyleSheet,
  useWindowDimensions,
  ImageBackground,
} from 'react-native';
import Rangerbtn from './Rangerbtn';
import Rangerqntcont from './Rangerqntcont';

export default function Rangerctgrcrsl({
  categories = [],
  onSelect = () => {},
  currentIndex,
  setCurrentIndex,
}) {
  const scrollX = useRef(new Animated.Value(0)).current;
  const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = useWindowDimensions();

  const isLandscape = SCREEN_WIDTH > SCREEN_HEIGHT;
  const ITEM_WIDTH = Math.round(SCREEN_WIDTH * (isLandscape ? 0.75 : 0.68));
  const ITEM_SPACING = Math.round((SCREEN_WIDTH - ITEM_WIDTH) / 2.5);

  const handleScrollEnd = event => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(offsetX / ITEM_WIDTH);
    setCurrentIndex(index);
  };

  return (
    <View style={styles.rangernotescnt}>
      <Animated.ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        snapToInterval={ITEM_WIDTH}
        decelerationRate="fast"
        contentContainerStyle={{ paddingHorizontal: ITEM_SPACING }}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: true },
        )}
        onMomentumScrollEnd={handleScrollEnd}
        scrollEventThrottle={16}
      >
        {categories.map((item, index) => {
          const inputRange = [
            (index - 1) * ITEM_WIDTH,
            index * ITEM_WIDTH,
            (index + 1) * ITEM_WIDTH,
          ];

          const scale = scrollX.interpolate({
            inputRange,
            outputRange: [0.8, 1, 0.8],
            extrapolate: 'clamp',
          });

          const opacity = scrollX.interpolate({
            inputRange,
            outputRange: [0, 1, 0],
            extrapolate: 'clamp',
          });

          const translateY = scrollX.interpolate({
            inputRange,
            outputRange: [12, 0, 12],
            extrapolate: 'clamp',
          });

          return (
            <View key={index}>
              <Animated.View
                style={[
                  styles.rangernotescat,
                  {
                    width: ITEM_WIDTH,
                    transform: [{ scale }, { translateY }],
                    opacity,
                  },
                ]}
              >
                <ImageBackground
                  style={styles.rangernotesmd}
                  source={require('../../assets/images/rangernotesoutpt.png')}
                >
                  <Image
                    source={item.image}
                    style={[
                      styles.rangernotesimg,
                      item.unlocked && { marginTop: 35 },
                    ]}
                  />

                  <View
                    style={{ alignItems: 'center', gap: 29, marginTop: 12 }}
                  >
                    {!item.unlocked && (
                      <Rangerqntcont
                        rangerPropsLabel={'20'}
                        rangerPropsImg={require('../../assets/images/rangercoin.png')}
                      />
                    )}
                    <Rangerbtn
                      rangerPropsLabel={[
                        item.unlocked && item.equipped && 'Equipped',
                        !item.unlocked && 'Unlock',
                        item.unlocked && !item.equipped && 'Use',
                      ]}
                      buttonWidth={257}
                      buttonHeight={65}
                      fontSize={20}
                      onPress={() => onSelect(item)}
                      rangerPropsLockIcon={!item.unlocked}
                      rangerPropsImage={require('../../assets/images/rangernotesmdyellbtn.png')}
                    />
                  </View>
                </ImageBackground>
              </Animated.View>
            </View>
          );
        })}
      </Animated.ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  rangernotescnt: {
    justifyContent: 'center',
  },
  rangernotesmd: {
    width: 345,
    height: 369,
    alignItems: 'center',
    paddingTop: 22,
  },
  rangernotesimg: {
    width: 105,
    height: 153,
  },
  rangernotescat: {
    alignItems: 'center',
    marginTop: 20,
  },
});
