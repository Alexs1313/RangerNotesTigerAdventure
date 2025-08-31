import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Rangerwlcmscrn from './RangerNotes/rangernotesscrns/Rangerwlcmscrn';
import Rangerhmscrn from './RangerNotes/rangernotesscrns/Rangerhmscrn';
import Rangerfieldnotesscrn from './RangerNotes/rangernotesscrns/Rangerfieldnotesscrn';
import Rangerfieldnotesdetails from './RangerNotes/rangernotesscrns/Rangerfieldnotesdetails';
import Rangermythwatchscrn from './RangerNotes/rangernotesscrns/Rangermythwatchscrn';
import Rangermythqstnsscrn from './RangerNotes/rangernotesscrns/Rangermythqstnsscrn';
import Rangerpatrolrunscr from './RangerNotes/rangernotesscrns/Rangerpatrolrunscr';
import { RangerNotesContextProvider } from './RangerNotes/rangernotesstr/rangercntx';
import Rangernoteslvsl from './RangerNotes/rangernotesscrns/Rangernoteslvsl';
import Rangeroutpstscrn from './RangerNotes/rangernotesscrns/Rangeroutpstscrn';
import Rangernotesettgsscrn from './RangerNotes/rangernotesscrns/Rangernotesettgsscrn';
import Rangernoteswlcldr from './RangerNotes/rangernotescmps/Rangernoteswlcldr';
import { useEffect, useState } from 'react';

const Stack = createStackNavigator();

const App = () => {
  const [isLoadingRangerNotesScr, setIsLoadingRangerNotesScr] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setIsLoadingRangerNotesScr(true);
    }, 5000);
  }, []);

  return (
    <NavigationContainer>
      <RangerNotesContextProvider>
        {isLoadingRangerNotesScr ? (
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Rangerwlcmscrn" component={Rangerwlcmscrn} />
            <Stack.Screen name="Rangerhmscrn" component={Rangerhmscrn} />
            <Stack.Screen
              name="Rangerfieldnotesscrn"
              component={Rangerfieldnotesscrn}
            />
            <Stack.Screen
              name="Rangerfieldnotesdetails"
              component={Rangerfieldnotesdetails}
            />
            <Stack.Screen
              name="Rangermythwatchscrn"
              component={Rangermythwatchscrn}
            />
            <Stack.Screen
              name="Rangermythqstnsscrn"
              component={Rangermythqstnsscrn}
            />

            <Stack.Screen
              name="Rangerpatrolrunscr"
              component={Rangerpatrolrunscr}
            />
            <Stack.Screen name="Rangernoteslvsl" component={Rangernoteslvsl} />
            <Stack.Screen
              name="Rangeroutpstscrn"
              component={Rangeroutpstscrn}
            />
            <Stack.Screen
              name="Rangernotesettgsscrn"
              component={Rangernotesettgsscrn}
            />
          </Stack.Navigator>
        ) : (
          <Rangernoteswlcldr />
        )}
      </RangerNotesContextProvider>
    </NavigationContainer>
  );
};

export default App;
