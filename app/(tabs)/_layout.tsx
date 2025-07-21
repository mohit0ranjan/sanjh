import { Tabs } from 'expo-router';
import { Chrome as Home, Music, Settings } from 'lucide-react-native';
import { View, Text, StyleSheet } from 'react-native';
import { useSettings } from '@/contexts/SettingsContext';

export default function TabLayout() {
  const { getTextSize, getColors, playSound } = useSettings();
  const colors = getColors();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: [styles.tabBar, { backgroundColor: colors.surface }],
        tabBarActiveTintColor: '#FF6B35',
        tabBarInactiveTintColor: colors.textTertiary,
        tabBarLabelStyle: styles.tabLabel,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarLabel: ({ focused, color }) => (
            <View style={styles.tabLabelContainer} onTouchStart={playSound}>
              <Text style={[styles.tabLabelText, { 
                color, 
                fontSize: getTextSize(12) 
              }]}>घर</Text>
              <Text style={[styles.tabLabelSubText, { 
                color, 
                fontSize: getTextSize(10) 
              }]}>Home</Text>
            </View>
          ),
          tabBarIcon: ({ size, color }) => (
            <Home size={28} color={color} strokeWidth={2} />
          ),
        }}
      />
      <Tabs.Screen
        name="entertainment"
        options={{
          title: 'Entertainment',
          tabBarLabel: ({ focused, color }) => (
            <View style={styles.tabLabelContainer} onTouchStart={playSound}>
              <Text style={[styles.tabLabelText, { 
                color, 
                fontSize: getTextSize(12) 
              }]}>मनोरंजन</Text>
              <Text style={[styles.tabLabelSubText, { 
                color, 
                fontSize: getTextSize(10) 
              }]}>Entertainment</Text>
            </View>
          ),
          tabBarIcon: ({ size, color }) => (
            <Music size={28} color={color} strokeWidth={2} />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Settings',
          tabBarLabel: ({ focused, color }) => (
            <View style={styles.tabLabelContainer} onTouchStart={playSound}>
              <Text style={[styles.tabLabelText, { 
                color, 
                fontSize: getTextSize(12) 
              }]}>सेटिंग्स</Text>
              <Text style={[styles.tabLabelSubText, { 
                color, 
                fontSize: getTextSize(10) 
              }]}>Settings</Text>
            </View>
          ),
          tabBarIcon: ({ size, color }) => (
            <Settings size={28} color={color} strokeWidth={2} />
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    height: 90,
    paddingBottom: 12,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  tabLabel: {
    fontSize: 11,
    fontWeight: '600',
    marginTop: 2,
  },
  tabLabelContainer: {
    alignItems: 'center',
    marginTop: 2,
  },
  tabLabelText: {
    fontWeight: '700',
    textAlign: 'center',
  },
  tabLabelSubText: {
    fontWeight: '500',
    textAlign: 'center',
    marginTop: 1,
  },
});