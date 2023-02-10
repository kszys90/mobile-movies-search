import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet, StatusBar } from 'react-native';
import { Provider } from 'react-redux';
import BookmarksScreen from './screens/BookmarksScreen';
import SearchScreen from './screens/SearchScreen';
import { store } from './store';
import { RootStackParamList } from './types';


export default function App() {

  const RootStack = createNativeStackNavigator<RootStackParamList>();
  function toSearch() {
    return () => <SearchScreen />
  }
  function toBookmark() {
    return () => <BookmarksScreen />
  }


  return (
    <Provider store={store}>
      <StatusBar />

      <NavigationContainer>
        <RootStack.Navigator
          initialRouteName="Search"
          screenOptions={{
            headerTransparent: true,
            headerTintColor: 'white',
          }}
        >
          <RootStack.Screen name="Search" component={toSearch()}
            options={{
              headerShown: false,
            }}
          />
          <RootStack.Screen
            name="Favorites"
            component={toBookmark()}
            options={{
              headerTitleAlign: 'center',
              headerTransparent: false,
              headerStyle: {
                backgroundColor: 'black',
              },
            }} />
        </RootStack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'scroll'
  },
});
