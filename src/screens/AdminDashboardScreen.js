import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, FlatList, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons, FontAwesome5 } from '@expo/vector-icons';
import { COLORS } from '../constants/theme';

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

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: COLORS.background },
    headerGeneric: { paddingBottom: 20, paddingHorizontal: 24, paddingTop: Platform.OS === 'android' ? 40 : 10 },
    headerContent: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
    screenTitle: { fontSize: 24, fontWeight: '700', color: '#fff' },

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
});

export default AdminDashboardScreen;
