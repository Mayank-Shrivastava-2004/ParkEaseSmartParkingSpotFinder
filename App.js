import React, { useState, useEffect } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, StyleSheet,
  KeyboardAvoidingView, Platform, Alert, ActivityIndicator,
  SafeAreaView, ScrollView, StatusBar, FlatList, Dimensions, Image
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons, MaterialIcons, FontAwesome5 } from '@expo/vector-icons';

// --- CONDITIONAL MAP IMPORT FOR WEB STABILITY ---
let MapView, Marker, Polyline;
const IsWeb = Platform.OS === 'web';

if (!IsWeb) {
  try {
    const Maps = require('react-native-maps');
    MapView = Maps.default;
    Marker = Maps.Marker;
    Polyline = Maps.Polyline;
  } catch (e) {
    console.warn("Maps module failed to load", e);
  }
}

// --- COLORS & THEME ---
const COLORS = {
  primary: '#4F46E5', // Indigo 600
  secondary: '#7C3AED', // Violet 600
  accent: '#06B6D4', // Cyan 500
  success: '#10B981', // Emerald 500
  warning: '#F59E0B', // Amber 500
  error: '#EF4444', // Red 500
  background: '#F3F4F6', // Gray 100
  card: '#FFFFFF',
  textMain: '#1F2937', // Gray 800
  textSub: '#6B7280', // Gray 500
  textLight: '#FFFFFF',
  gradientStart: '#4F46E5',
  gradientEnd: '#9333EA',
};

const SCREEN_WIDTH = Dimensions.get('window').width;

// --- ALERTS ---
const showError = (title, message) => {
  if (IsWeb) {
    window.alert(`${title}: ${message}`);
  } else {
    Alert.alert(title, message, [{ text: 'OK', style: 'destructive' }]);
  }
};
const showSuccess = (title, message, onPress) => {
  if (IsWeb) {
    window.alert(`${title}: ${message}`);
    if (onPress) onPress();
  } else {
    Alert.alert(title, message, [{ text: 'OK', onPress }]);
  }
};

// --- SHARED COMPONENTS ---
const GradientButton = ({ onPress, text, icon, style, loading }) => (
  <TouchableOpacity onPress={onPress} activeOpacity={0.8} style={[styles.gradBtnContainer, style]} disabled={loading}>
    <LinearGradient
      colors={[COLORS.gradientStart, COLORS.gradientEnd]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      style={styles.gradBtn}
    >
      {loading ? (
        <ActivityIndicator color="#fff" />
      ) : (
        <>
          {icon && <Text style={{ marginRight: 8 }}>{icon}</Text>}
          <Text style={styles.gradBtnText}>{text}</Text>
        </>
      )}
    </LinearGradient>
  </TouchableOpacity>
);

const SectionHeader = ({ title }) => (
  <View style={styles.sectionHeader}>
    <Text style={styles.sectionTitle}>{title}</Text>
    <View style={styles.sectionLine} />
  </View>
);

// --- PANEL SELECTION ---
function PanelSelectionScreen({ navigation }) {
  const panels = [
    { id: 'Admin', icon: 'shield-alt', title: 'Admin Panel', desc: 'Manage Drivers & Providers', nav: 'AdminLogin', color: ['#2563EB', '#1D4ED8'] },
    { id: 'Driver', icon: 'car', title: 'Driver Panel', desc: 'Find Spots & Navigate', nav: 'DriverLogin', color: ['#059669', '#047857'] },
    { id: 'Provider', icon: 'parking', title: 'Parking Provider', desc: 'Manage Lots & EV', nav: 'ProviderLogin', color: ['#D97706', '#B45309'] },
  ];

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <LinearGradient colors={['#1e1b4b', '#312e81']} style={styles.bgGradient}>
        <SafeAreaView style={styles.safeArea}>
          <ScrollView contentContainerStyle={styles.scrollCenter}>
            <View style={styles.headerBox}>
              <Text style={styles.appTitle}>Smart<Text style={{ color: COLORS.accent }}>Parking</Text></Text>
              <Text style={styles.appSubtitle}>Choose your role to continue</Text>
            </View>

            {panels.map((p) => (
              <TouchableOpacity
                key={p.id}
                style={styles.panelCard}
                onPress={() => navigation.navigate(p.nav)}
                activeOpacity={0.9}
              >
                <LinearGradient colors={p.color} style={styles.panelCardGradient} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}>
                  <View style={styles.panelIconCircle}>
                    <FontAwesome5 name={p.icon} size={28} color={p.color[1]} />
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.panelCardTitle}>{p.title}</Text>
                    <Text style={styles.panelCardDesc}>{p.desc}</Text>
                  </View>
                  <MaterialIcons name="arrow-forward-ios" size={20} color="rgba(255,255,255,0.8)" />
                </LinearGradient>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </SafeAreaView>
      </LinearGradient>
    </View>
  );
}

// --- LOGIN & REGISTER (Enhanced) ---
const AuthLayout = ({ children, title, subtitle }) => (
  <View style={styles.container}>
    <StatusBar barStyle="light-content" />
    <LinearGradient colors={[COLORS.gradientStart, COLORS.gradientEnd]} style={styles.headerGradient}>
      <SafeAreaView>
        <View style={styles.authHeader}>
          <Text style={styles.authTitle}>{title}</Text>
          <Text style={styles.authSubtitle}>{subtitle}</Text>
        </View>
      </SafeAreaView>
    </LinearGradient>
    <View style={styles.authContent}>
      <ScrollView contentContainerStyle={{ padding: 24, paddingBottom: 100 }}>
        {children}
      </ScrollView>
    </View>
  </View>
);

const LoginScreen = ({ navigation, title, panel, dashboardScreen }) => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);

  const handleLogin = () => {
    if (!form.email || !form.password) return showError('Error', 'Please enter email & password');
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigation.replace(dashboardScreen);
    }, 1000);
  };

  return (
    <AuthLayout title={`Login`} subtitle={`Welcome to ${panel}`}>
      <View style={styles.inputGroup}>
        <Text style={styles.inputLabel}>Email Address</Text>
        <TextInput
          style={styles.textInput}
          placeholder="user@example.com"
          value={form.email}
          onChangeText={t => setForm({ ...form, email: t })}
          autoCapitalize="none"
          keyboardType="email-address"
        />
      </View>
      <View style={styles.inputGroup}>
        <Text style={styles.inputLabel}>Password</Text>
        <TextInput
          style={styles.textInput}
          placeholder="••••••••"
          secureTextEntry
          value={form.password}
          onChangeText={t => setForm({ ...form, password: t })}
        />
      </View>

      <GradientButton text="LOGIN" onPress={handleLogin} loading={loading} style={{ marginTop: 20 }} />

      <TouchableOpacity onPress={() => navigation.navigate(title + 'Register')} style={{ marginTop: 20, alignItems: 'center' }}>
        <Text style={{ color: COLORS.textSub }}>New here? <Text style={{ color: COLORS.primary, fontWeight: 'bold' }}>Create Account</Text></Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginTop: 30, alignItems: 'center' }}>
        <Text style={{ color: COLORS.textSub }}>Go Back</Text>
      </TouchableOpacity>
    </AuthLayout>
  );
};

const RegisterScreen = ({ navigation, title, panel }) => {
  const [form, setForm] = useState({ name: '', email: '', password: '' });

  return (
    <AuthLayout title="Register" subtitle={`Join as a ${title}`}>
      <View style={styles.inputGroup}>
        <Text style={styles.inputLabel}>Full Name</Text>
        <TextInput style={styles.textInput} placeholder="John Doe" value={form.name} onChangeText={t => setForm({ ...form, name: t })} />
      </View>
      <View style={styles.inputGroup}>
        <Text style={styles.inputLabel}>Email</Text>
        <TextInput style={styles.textInput} placeholder="john@example.com" value={form.email} onChangeText={t => setForm({ ...form, email: t })} />
      </View>
      <View style={styles.inputGroup}>
        <Text style={styles.inputLabel}>Password</Text>
        <TextInput style={styles.textInput} placeholder="••••••••" secureTextEntry value={form.password} onChangeText={t => setForm({ ...form, password: t })} />
      </View>

      <GradientButton text="CREATE ACCOUNT" onPress={() => showSuccess('Success', 'Account Created!', () => navigation.goBack())} style={{ marginTop: 20 }} />
      <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginTop: 20, alignItems: 'center' }}>
        <Text style={{ color: COLORS.textSub }}>Already have an account? <Text style={{ color: COLORS.primary, fontWeight: 'bold' }}>Login</Text></Text>
      </TouchableOpacity>
    </AuthLayout>
  );
};

// --- DRIVER DASHBOARD (MAPS) ---
const DriverDashboardScreen = ({ navigation }) => {
  const [source, setSource] = useState('');
  const [dest, setDest] = useState('');
  // Default region: San Francisco purely as example
  const [region, setRegion] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  return (
    <View style={styles.container}>
      {IsWeb || !MapView ? (
        <View style={[styles.container, { justifyContent: 'center', alignItems: 'center', backgroundColor: '#E0E7FF' }]}>
          <FontAwesome5 name="map-marked-alt" size={64} color={COLORS.primary} style={{ opacity: 0.5 }} />
          <Text style={{ marginTop: 20, color: COLORS.textMain, fontSize: 18, fontWeight: '600' }}>Interactive Map Unavailable on Web</Text>
          <Text style={{ marginTop: 8, color: COLORS.textSub, textAlign: 'center', maxWidth: 300 }}>Please use the mobile app (Android/iOS) to view the live tracking map.</Text>
        </View>
      ) : (
        <MapView style={StyleSheet.absoluteFillObject} region={region}>
          <Marker coordinate={{ latitude: 37.78825, longitude: -122.4324 }} title="You are here" pinColor={COLORS.primary} />
          {/* Mock Destination Marker */}
          <Marker coordinate={{ latitude: 37.75825, longitude: -122.4624 }} title="Parking Spot A" pinColor={COLORS.success} />
        </MapView>
      )}

      <SafeAreaView pointerEvents="box-none" style={{ flex: 1 }}>
        <View style={styles.mapOverlayCard}>
          <Text style={styles.cardTitle}>Find Parking</Text>
          <View style={styles.inputWithIcon}>
            <MaterialIcons name="my-location" size={20} color={COLORS.primary} style={styles.inputIcon} />
            <TextInput
              style={styles.mapInput}
              placeholder="Your Location"
              value={source}
              onChangeText={setSource}
            />
          </View>
          <View style={styles.inputWithIcon}>
            <MaterialIcons name="location-on" size={20} color={COLORS.secondary} style={styles.inputIcon} />
            <TextInput
              style={styles.mapInput}
              placeholder="Destination"
              value={dest}
              onChangeText={setDest}
            />
          </View>
          <GradientButton text="FIND ROUTE" onPress={() => showSuccess('Searching', 'Finding best parking spots...')} style={{ marginTop: 10 }} />
        </View>
      </SafeAreaView>

      <TouchableOpacity style={styles.fab} onPress={() => navigation.goBack()}>
        <MaterialIcons name="exit-to-app" size={24} color="#fff" />
      </TouchableOpacity>
    </View>
  );
};

// --- ADMIN DASHBOARD (LISTS) ---
const AdminDashboardScreen = ({ navigation }) => {
  const [activeTab, setActiveTab] = useState('drivers'); // 'drivers' | 'providers'

  const drivers = [
    { id: '1', name: 'Alex Johnson', car: 'Tesla Model 3', lic: 'DL-8823', status: 'Active' },
    { id: '2', name: 'Maria Garcia', car: 'Toyota Camry', lic: 'DL-9912', status: 'Offline' },
    { id: '3', name: 'James Smith', car: 'Ford F-150', lic: 'DL-1123', status: 'Active' },
  ];

  const providers = [
    { id: '1', name: 'City Center Garage', spots: 120, address: '123 Main St', status: 'Open' },
    { id: '2', name: 'Airport Parking', spots: 500, address: 'Terminal 1', status: 'Full' },
    { id: '3', name: 'Westside Lot', spots: 45, address: '45 West Ave', status: 'Open' },
  ];

  const renderDriver = ({ item }) => (
    <View style={styles.listItem}>
      <View style={[styles.avatar, { backgroundColor: '#E0E7FF' }]}>
        <FontAwesome5 name="user" size={20} color={COLORS.primary} />
      </View>
      <View style={{ flex: 1, marginLeft: 12 }}>
        <Text style={styles.listTitle}>{item.name}</Text>
        <Text style={styles.listSub}>{item.car} • {item.lic}</Text>
      </View>
      <View style={[styles.statusBadge, { backgroundColor: item.status === 'Active' ? '#D1FAE5' : '#F3F4F6' }]}>
        <Text style={{ color: item.status === 'Active' ? '#065F46' : '#6B7280', fontSize: 12, fontWeight: '700' }}>{item.status}</Text>
      </View>
    </View>
  );

  const renderProvider = ({ item }) => (
    <View style={styles.listItem}>
      <View style={[styles.avatar, { backgroundColor: '#FFF7ED' }]}>
        <FontAwesome5 name="parking" size={20} color={COLORS.warning} />
      </View>
      <View style={{ flex: 1, marginLeft: 12 }}>
        <Text style={styles.listTitle}>{item.name}</Text>
        <Text style={styles.listSub}>{item.address} • {item.spots} spots</Text>
      </View>
      <View style={[styles.statusBadge, { backgroundColor: item.status === 'Open' ? '#D1FAE5' : '#FEE2E2' }]}>
        <Text style={{ color: item.status === 'Open' ? '#065F46' : '#991B1B', fontSize: 12, fontWeight: '700' }}>{item.status}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <LinearGradient colors={[COLORS.gradientStart, COLORS.gradientEnd]} style={styles.headerGeneric}>
        <SafeAreaView>
          <View style={styles.headerContent}>
            <Text style={styles.screenTitle}>Admin Dashboard</Text>
            <TouchableOpacity onPress={() => navigation.goBack()}><MaterialIcons name="logout" size={24} color="#fff" /></TouchableOpacity>
          </View>
        </SafeAreaView>
      </LinearGradient>

      <View style={styles.tabContainer}>
        <TouchableOpacity style={[styles.tab, activeTab === 'drivers' && styles.activeTab]} onPress={() => setActiveTab('drivers')}>
          <Text style={[styles.tabText, activeTab === 'drivers' && styles.activeTabText]}>Drivers</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.tab, activeTab === 'providers' && styles.activeTab]} onPress={() => setActiveTab('providers')}>
          <Text style={[styles.tabText, activeTab === 'providers' && styles.activeTabText]}>Providers</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={activeTab === 'drivers' ? drivers : providers}
        renderItem={activeTab === 'drivers' ? renderDriver : renderProvider}
        keyExtractor={item => item.id}
        contentContainerStyle={{ padding: 16 }}
        ListHeaderComponent={<Text style={styles.listHeader}>{activeTab === 'drivers' ? 'All Registered Drivers' : 'Parking Providers'}</Text>}
      />
    </View>
  );
};

// --- PROVIDER DASHBOARD (EV & VEHICLES) ---
const ProviderDashboardScreen = ({ navigation }) => {
  // Vehicle Stats
  const vehicles = [
    { type: 'Car', count: 45, icon: 'car', color: '#3B82F6' },
    { type: 'Bike', count: 12, icon: 'motorcycle', color: '#10B981' },
    { type: 'Truck', count: 5, icon: 'truck', color: '#F59E0B' },
    { type: 'Lorry', count: 2, icon: 'shuttle-van', color: '#EF4444' },
  ];

  // EV Charging Slots
  const evSlots = [
    { id: 'EV-01', status: 'Charging', time: '45m left', car: 'Tesla X' },
    { id: 'EV-02', status: 'Available', time: '-', car: '-' },
    { id: 'EV-03', status: 'Charging', time: '12m left', car: 'Nissan Leaf' },
    { id: 'EV-04', status: 'Maintenance', time: 'Indefinite', car: '-' },
  ];

  return (
    <View style={styles.container}>
      <LinearGradient colors={[COLORS.secondary, '#db2777']} style={styles.headerGeneric}>
        <SafeAreaView>
          <View style={styles.headerContent}>
            <Text style={styles.screenTitle}>Provider Panel</Text>
            <TouchableOpacity onPress={() => navigation.goBack()}><MaterialIcons name="logout" size={24} color="#fff" /></TouchableOpacity>
          </View>
        </SafeAreaView>
      </LinearGradient>

      <ScrollView contentContainerStyle={{ padding: 16 }}>
        <SectionHeader title="Vehicle Overview" />
        <View style={styles.gridContainer}>
          {vehicles.map((v, i) => (
            <View key={i} style={styles.statCard}>
              <View style={[styles.iconBox, { backgroundColor: v.color + '20' }]}>
                <FontAwesome5 name={v.icon} size={24} color={v.color} />
              </View>
              <Text style={styles.statCount}>{v.count}</Text>
              <Text style={styles.statLabel}>{v.type}</Text>
            </View>
          ))}
        </View>

        <SectionHeader title="EV Charging Status" />
        {evSlots.map((slot, i) => (
          <View key={i} style={styles.evCard}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <MaterialIcons name="ev-station" size={28} color={slot.status === 'Available' ? COLORS.success : COLORS.textSub} />
              <View style={{ marginLeft: 12 }}>
                <Text style={styles.evTitle}>{slot.id}</Text>
                <Text style={styles.evSub}>{slot.car !== '-' ? slot.car : 'No Vehicle'}</Text>
              </View>
            </View>
            <View style={{ alignItems: 'flex-end' }}>
              <View style={[styles.statusChip, {
                backgroundColor: slot.status === 'Charging' ? '#DBEAFE' : slot.status === 'Available' ? '#D1FAE5' : '#F3F4F6'
              }]}>
                <Text style={{
                  color: slot.status === 'Charging' ? '#1E40AF' : slot.status === 'Available' ? '#065F46' : '#6B7280',
                  fontSize: 11, fontWeight: '700'
                }}>
                  {slot.status}
                </Text>
              </View>
              <Text style={styles.evTime}>{slot.time}</Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

// --- NAVIGATION WRAPPER ---
const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false, cardStyle: { backgroundColor: '#F3F4F6' } }}>
        <Stack.Screen name="PanelSelection" component={PanelSelectionScreen} />

        {/* Admin */}
        <Stack.Screen name="AdminLogin">{props => <LoginScreen {...props} title="Admin" panel="Admin Panel" dashboardScreen="AdminDashboard" />}</Stack.Screen>
        <Stack.Screen name="AdminRegister">{props => <RegisterScreen {...props} title="Admin" panel="Admin Panel" />}</Stack.Screen>
        <Stack.Screen name="AdminDashboard" component={AdminDashboardScreen} />

        {/* Driver */}
        <Stack.Screen name="DriverLogin">{props => <LoginScreen {...props} title="Driver" panel="Driver Panel" dashboardScreen="DriverDashboard" />}</Stack.Screen>
        <Stack.Screen name="DriverRegister">{props => <RegisterScreen {...props} title="Driver" panel="Driver Panel" />}</Stack.Screen>
        <Stack.Screen name="DriverDashboard" component={DriverDashboardScreen} />

        {/* Provider */}
        <Stack.Screen name="ProviderLogin">{props => <LoginScreen {...props} title="Provider" panel="Provider Panel" dashboardScreen="ProviderDashboard" />}</Stack.Screen>
        <Stack.Screen name="ProviderRegister">{props => <RegisterScreen {...props} title="Provider" panel="Provider Panel" />}</Stack.Screen>
        <Stack.Screen name="ProviderDashboard" component={ProviderDashboardScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

// --- STYLES ---
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  safeArea: { flex: 1 },
  bgGradient: { flex: 1 },
  scrollCenter: { padding: 24, paddingBottom: 50 },

  // Header
  headerBox: { marginBottom: 40, marginTop: 20, alignItems: 'center' },
  appTitle: { fontSize: 36, fontWeight: '900', color: '#fff' },
  appSubtitle: { fontSize: 16, color: 'rgba(255,255,255,0.7)', marginTop: 8 },

  // Panel Cards
  panelCard: { marginBottom: 20, borderRadius: 20, shadowColor: "#000", shadowOffset: { width: 0, height: 10 }, shadowOpacity: 0.2, shadowRadius: 20, elevation: 10 },
  panelCardGradient: { padding: 24, borderRadius: 20, flexDirection: 'row', alignItems: 'center' },
  panelIconCircle: { width: 60, height: 60, borderRadius: 30, backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center', marginRight: 16 },
  panelCardTitle: { fontSize: 20, fontWeight: 'bold', color: '#fff' },
  panelCardDesc: { fontSize: 13, color: 'rgba(255,255,255,0.8)', marginTop: 2 },

  // Auth
  headerGradient: { height: 200, justifyContent: 'center', paddingHorizontal: 24, paddingBottom: 30, borderBottomLeftRadius: 30, borderBottomRightRadius: 30 },
  authHeader: { marginTop: 40 },
  authTitle: { fontSize: 32, fontWeight: '800', color: '#fff' },
  authSubtitle: { fontSize: 16, color: 'rgba(255,255,255,0.8)', marginTop: 5 },
  authContent: { flex: 1, marginTop: -30, backgroundColor: COLORS.background, borderTopLeftRadius: 30, borderTopRightRadius: 30 },
  inputGroup: { marginBottom: 20 },
  inputLabel: { fontSize: 14, fontWeight: '600', color: COLORS.textMain, marginBottom: 8, marginLeft: 4 },
  textInput: { backgroundColor: '#fff', borderRadius: 12, padding: 16, fontSize: 16, color: COLORS.textMain, borderWidth: 1, borderColor: '#E5E7EB' },

  // Gradient Button
  gradBtnContainer: { shadowColor: COLORS.primary, shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 8, elevation: 6 },
  gradBtn: { paddingVertical: 16, borderRadius: 12, alignItems: 'center', flexDirection: 'row', justifyContent: 'center' },
  gradBtnText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },

  // Map Overlay
  mapOverlayCard: { position: 'absolute', top: 50, left: 20, right: 20, backgroundColor: 'white', borderRadius: 20, padding: 20, shadowColor: "#000", shadowOpacity: 0.15, shadowRadius: 10, elevation: 5 },
  cardTitle: { fontSize: 18, fontWeight: 'Bold', marginBottom: 15, color: COLORS.textMain },
  inputWithIcon: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#F3F4F6', borderRadius: 10, marginBottom: 10, paddingHorizontal: 12 },
  mapInput: { flex: 1, paddingVertical: 12, fontSize: 15 },
  inputIcon: { marginRight: 10 },
  fab: { position: 'absolute', bottom: 30, right: 30, backgroundColor: COLORS.error, width: 56, height: 56, borderRadius: 28, alignItems: 'center', justifyContent: 'center', elevation: 5, shadowColor: "#000", shadowOpacity: 0.3, shadowRadius: 5 },

  // Generic Header
  headerGeneric: { paddingBottom: 20, paddingHorizontal: 24, paddingTop: Platform.OS === 'android' ? 40 : 10 },
  headerContent: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  screenTitle: { fontSize: 24, fontWeight: '700', color: '#fff' },

  // Admin Lists
  tabContainer: { flexDirection: 'row', padding: 16, backgroundColor: '#fff' },
  tab: { flex: 1, alignItems: 'center', paddingVertical: 12, borderBottomWidth: 2, borderBottomColor: 'transparent' },
  activeTab: { borderBottomColor: COLORS.primary },
  tabText: { fontSize: 15, color: COLORS.textSub, fontWeight: '600' },
  activeTabText: { color: COLORS.primary },
  listHeader: { fontSize: 18, fontWeight: '700', color: COLORS.textMain, marginBottom: 12, marginTop: 8 },
  listItem: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', padding: 16, borderRadius: 14, marginBottom: 12, shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 5, elevation: 2 },
  avatar: { width: 44, height: 44, borderRadius: 22, alignItems: 'center', justifyContent: 'center' },
  listTitle: { fontSize: 16, fontWeight: '600', color: COLORS.textMain },
  listSub: { fontSize: 13, color: COLORS.textSub, marginTop: 2 },
  statusBadge: { paddingHorizontal: 8, paddingVertical: 4, borderRadius: 6 },

  // grid
  sectionHeader: { marginBottom: 16, marginTop: 8 },
  sectionTitle: { fontSize: 18, fontWeight: '700', color: COLORS.textMain },
  sectionLine: { marginTop: 4, width: 30, height: 3, backgroundColor: COLORS.primary, borderRadius: 2 },
  gridContainer: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', marginBottom: 24 },
  statCard: { width: '48%', backgroundColor: '#fff', borderRadius: 16, padding: 16, marginBottom: 16, alignItems: 'center', shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 5, elevation: 2 },
  iconBox: { width: 50, height: 50, borderRadius: 25, alignItems: 'center', justifyContent: 'center', marginBottom: 12 },
  statCount: { fontSize: 24, fontWeight: '800', color: COLORS.textMain },
  statLabel: { fontSize: 14, color: COLORS.textSub },

  // EV cards
  evCard: { backgroundColor: '#fff', borderRadius: 16, padding: 16, marginBottom: 12, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 5, elevation: 2 },
  evTitle: { fontSize: 16, fontWeight: '700', color: COLORS.textMain },
  evSub: { fontSize: 13, color: COLORS.textSub },
  statusChip: { paddingHorizontal: 8, paddingVertical: 4, borderRadius: 6, marginBottom: 4, alignSelf: 'flex-end' },
  evTime: { fontSize: 12, color: COLORS.textSub, fontWeight: '600' },
});
