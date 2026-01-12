import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons, FontAwesome5 } from '@expo/vector-icons';
import SectionHeader from '../components/SectionHeader';
import { COLORS } from '../constants/theme';

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

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: COLORS.background },
    headerGeneric: { paddingBottom: 20, paddingHorizontal: 24, paddingTop: Platform.OS === 'android' ? 40 : 10 },
    headerContent: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
    screenTitle: { fontSize: 24, fontWeight: '700', color: '#fff' },

    gridContainer: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', marginBottom: 24 },
    statCard: { width: '48%', backgroundColor: '#fff', borderRadius: 16, padding: 16, marginBottom: 16, alignItems: 'center', shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 5, elevation: 2 },
    iconBox: { width: 50, height: 50, borderRadius: 25, alignItems: 'center', justifyContent: 'center', marginBottom: 12 },
    statCount: { fontSize: 24, fontWeight: '800', color: COLORS.textMain },
    statLabel: { fontSize: 14, color: COLORS.textSub },

    evCard: { backgroundColor: '#fff', borderRadius: 16, padding: 16, marginBottom: 12, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 5, elevation: 2 },
    evTitle: { fontSize: 16, fontWeight: '700', color: COLORS.textMain },
    evSub: { fontSize: 13, color: COLORS.textSub },
    statusChip: { paddingHorizontal: 8, paddingVertical: 4, borderRadius: 6, marginBottom: 4, alignSelf: 'flex-end' },
    evTime: { fontSize: 12, color: COLORS.textSub, fontWeight: '600' },
});

export default ProviderDashboardScreen;
