import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { StatusBar } from "expo-status-bar"
import { Home, Users, User, MessageCircle, Calendar, UserPlus } from "lucide-react-native"

// Import screens
import FeedScreen from "./src/screens/FeedScreen"
import TreeScreen from "./src/screens/TreeScreen"
import ProfileScreen from "./src/screens/ProfileScreen"
import AuthScreen from "./src/screens/AuthScreen"
import MessagesScreen from "./src/screens/MessagesScreen"
import ChatScreen from "./src/screens/ChatScreen"
import SettingsScreen from "./src/screens/SettingsScreen"
import EventsScreen from "./src/screens/EventsScreen"
import DiscoverScreen from "./src/screens/DiscoverScreen"

const Tab = createBottomTabNavigator()
const Stack = createNativeStackNavigator()

// Performance optimization: Configure screen options once
const screenOptions = {
  tabBarStyle: {
    backgroundColor: "#0f172a",
    borderTopColor: "rgba(212, 175, 55, 0.2)",
    borderTopWidth: 1,
    paddingBottom: 5,
    paddingTop: 5,
    height: 60,
  },
  tabBarActiveTintColor: "#d4af37",
  tabBarInactiveTintColor: "#94a3b8",
  headerStyle: {
    backgroundColor: "#0f172a",
    borderBottomColor: "rgba(212, 175, 55, 0.2)",
    borderBottomWidth: 1,
  },
  headerTintColor: "#d4af37",
  headerTitleStyle: {
    fontWeight: "bold",
    fontSize: 18,
  },
  // Enable optimizations
  lazy: true,
  unmountOnBlur: false,
  freezeOnBlur: true,
}

// Stack screen options with animations
const stackScreenOptions = {
  headerShown: false,
  animation: "slide_from_right" as const,
  animationDuration: 200,
}

function TabNavigator() {
  return (
    <Tab.Navigator screenOptions={screenOptions}>
      <Tab.Screen
        name="Feed"
        component={FeedScreen}
        options={{
          tabBarIcon: ({ color, size }) => <Home color={color} size={size} />,
          headerTitle: "Family Stories",
        }}
      />
      <Tab.Screen
        name="Discover"
        component={DiscoverScreen}
        options={{
          tabBarIcon: ({ color, size }) => <UserPlus color={color} size={size} />,
          headerTitle: "Connect",
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Messages"
        component={MessagesScreen}
        options={{
          tabBarIcon: ({ color, size }) => <MessageCircle color={color} size={size} />,
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Events"
        component={EventsScreen}
        options={{
          tabBarIcon: ({ color, size }) => <Calendar color={color} size={size} />,
          headerTitle: "Family Calendar",
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Tree"
        component={TreeScreen}
        options={{
          tabBarIcon: ({ color, size }) => <Users color={color} size={size} />,
          headerTitle: "Your Family Tree",
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ color, size }) => <User color={color} size={size} />,
          headerTitle: "Your Profile",
        }}
      />
    </Tab.Navigator>
  )
}

export default function App() {
  return (
    <>
      <StatusBar style="light" />
      <NavigationContainer>
        <Stack.Navigator screenOptions={stackScreenOptions}>
          <Stack.Screen name="Main" component={TabNavigator} />
          <Stack.Screen
            name="Auth"
            component={AuthScreen}
            options={{
              presentation: "modal",
              headerShown: true,
              headerTitle: "Join New Family Tree",
              headerStyle: { backgroundColor: "#0f172a" },
              headerTintColor: "#d4af37",
            }}
          />
          <Stack.Screen
            name="Chat"
            component={ChatScreen}
            options={({ route }: any) => ({
              headerShown: true,
              headerTitle: route.params?.userName || "Chat",
              headerStyle: { backgroundColor: "#0f172a" },
              headerTintColor: "#d4af37",
            })}
          />
          <Stack.Screen
            name="Settings"
            component={SettingsScreen}
            options={{
              headerShown: true,
              headerTitle: "Settings",
              headerStyle: { backgroundColor: "#0f172a" },
              headerTintColor: "#d4af37",
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  )
}
