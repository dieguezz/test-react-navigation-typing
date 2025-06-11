import * as React from 'react';
import { Text, View, Button, StyleSheet } from 'react-native';
import {
  NavigationContainer,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as Linking from 'expo-linking';

// -- 1. Screens --

function HomeScreen() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Home Screen</Text>
      <Button
        title="Go to Profile"
        onPress={() =>
          // Corrected: Pass params as a flat object, not nested.
          navigation.navigate('Profile', { foo: true })
        }
      />
    </View>
  );
}

function ProfileScreen() {
  const route = useRoute();
  
  // Safely access the parameter. It will be `undefined` on first render
  // if accessed before navigation is ready, so the `|| {}` is a good practice.
  const { foo } = route.params || {};

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile Screen</Text>
      <View style={styles.resultsBox}>
        <Text style={styles.paragraph}>
          The value of <Text style={styles.code}>foo</Text> is:
        </Text>
        <Text style={styles.value}>{String(foo)}</Text>

        <Text style={styles.paragraph}>
          The type of <Text style={styles.code}>foo</Text> is:
        </Text>
        <Text style={styles.value}>{typeof foo}</Text>
      </View>
      <Text style={[styles.paragraph, styles.instructions]}>
         Now, reload the page in your web browser. You will stay on this screen, but the type of 'foo' will change from 'boolean' to 'string'.
      </Text>
    </View>
  );
}

// -- 2. Linking Configuration --
// Using expo-linking makes it easy to test in Snack.
const prefix = Linking.createURL('/');

const linking = {
  prefixes: [prefix],
  config: {
    // This configures the URL structure.
    screens: {
      Home: 'home',
      Profile: 'profile', // Navigating to Profile will create the URL: /profile?foo=true
    },
  },
};

// -- 3. Navigator Setup --
const Stack = createStackNavigator();

export default function App() {
  return (
    // Use NavigationContainer and pass the linking config to it.
    <NavigationContainer linking={linking} fallback={<Text>Loading...</Text>}>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

// -- 4. Styles (for better presentation) --
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#333',
  },
  paragraph: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 12,
    lineHeight: 22,
    color: '#555',
  },
  instructions: {
    marginTop: 20,
    fontStyle: 'italic',
    maxWidth: 500,
    color: '#e67e22',
    fontWeight: 'bold'
  },
  resultsBox: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    width: '100%',
    maxWidth: 400,
  },
  value: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#27ae60',
    backgroundColor: '#e8f5e9',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 6,
    marginBottom: 20,
    fontFamily: 'monospace',
  },
  code: {
    fontFamily: 'monospace',
    backgroundColor: '#e0e0e0',
    paddingHorizontal: 4,
    borderRadius: 4,
  }
});
