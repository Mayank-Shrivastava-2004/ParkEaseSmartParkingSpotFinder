import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';
import { MaterialIcons, FontAwesome5, Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS } from '../constants/colors';

const ProviderEVManagementScreen = ({ navigation }) => {
    const chargers = [
        { id: 'EV-01', type: 'Fast DC', status: 'In Use', load: '85%', health: 'Good' },
        { id: 'EV-02', type: 'AC Type 2', status: 'Available', load: '0%', health: 'Excellent' },
        { id: 'EV-03', type: 'Fast DC', status: 'Offline', load: '-', health: 'Needs Repair' },
    ];

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
                    <MaterialIcons name="arrow-back" size={24} color={COLORS.textMain} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>EV Management</Text>
                <TouchableOpacity style={styles.addBtn}>
                    <MaterialIcons name="add" size={24} color="#fff" />
                </TouchableOpacity>
            </View>

            <ScrollView contentContainerStyle={styles.content}>
                <View style={styles.summaryCard}>
                    <LinearGradient colors={['#8B5CF6', '#6D28D9']} style={styles.summaryGradient}>
                        <View style={styles.summaryItem}>
                            <Text style={styles.summaryValue}>2 Active</Text>
                            <Text style={styles.summaryLabel}>Total Chargers</Text>
                        </View>
                        <View style={styles.vDivider} />
                        <View style={styles.summaryItem}>
                            <Text style={styles.summaryValue}>142 kWh</Text>
                            <Text style={styles.summaryLabel}>Today's Load</Text>
                        </View>
                    </LinearGradient>
                </View>

                {chargers.map(charger => (
                    <View key={charger.id} style={styles.chargerCard}>
                        <View style={styles.cardHeader}>
                            <View style={styles.idContainer}>
                                <Ionicons name="flash" size={20} color={COLORS.warning} />
                                <Text style={styles.chargerId}>{charger.id}</Text>
                            </View>
                            <View style={[styles.statusBadge, { backgroundColor: charger.status === 'Available' ? '#D1FAE5' : (charger.status === 'In Use' ? '#DBEAFE' : '#FEE2E2') }]}>
                                <Text style={[styles.statusText, { color: charger.status === 'Available' ? COLORS.success : (charger.status === 'In Use' ? '#1E40AF' : COLORS.error) }]}>
                                    {charger.status}
                                </Text>
                            </View>
                        </View>

                        <View style={styles.divider} />

                        <View style={styles.detailsGrid}>
                            <View style={styles.detailItem}>
                                <Text style={styles.detailLabel}>Type</Text>
                                <Text style={styles.detailValue}>{charger.type}</Text>
                            </View>
                            <View style={styles.detailItem}>
                                <Text style={styles.detailLabel}>Current Load</Text>
                                <Text style={styles.detailValue}>{charger.load}</Text>
                            </View>
                            <View style={styles.detailItem}>
                                <Text style={styles.detailLabel}>System Health</Text>
                                <Text style={styles.detailValue}>{charger.health}</Text>
                            </View>
                        </View>

                        <TouchableOpacity style={styles.manageBtn}>
                            <Text style={styles.manageBtnText}>Manage Station</Text>
                            <MaterialIcons name="settings" size={18} color={COLORS.primary} />
                        </TouchableOpacity>
                    </View>
                ))}
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: COLORS.background },
    header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 20, paddingTop: 50, backgroundColor: '#fff' },
    backBtn: { padding: 8 },
    headerTitle: { fontSize: 20, fontWeight: 'bold', color: COLORS.textMain },
    addBtn: { backgroundColor: COLORS.primary, padding: 8, borderRadius: 12 },
    content: { padding: 20 },
    summaryCard: { borderRadius: 24, overflow: 'hidden', marginBottom: 25, elevation: 8 },
    summaryGradient: { flexDirection: 'row', padding: 25, alignItems: 'center' },
    summaryItem: { flex: 1, alignItems: 'center' },
    summaryValue: { color: '#fff', fontSize: 20, fontWeight: 'bold' },
    summaryLabel: { color: 'rgba(255,255,255,0.8)', fontSize: 12, marginTop: 4 },
    vDivider: { width: 1, height: 30, backgroundColor: 'rgba(255,255,255,0.2)' },
    chargerCard: { backgroundColor: '#fff', borderRadius: 24, padding: 20, marginBottom: 20, elevation: 3 },
    cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 15 },
    idContainer: { flexDirection: 'row', alignItems: 'center' },
    chargerId: { fontSize: 18, fontWeight: 'bold', color: COLORS.textMain, marginLeft: 10 },
    statusBadge: { paddingHorizontal: 12, paddingVertical: 6, borderRadius: 10 },
    statusText: { fontSize: 12, fontWeight: '800' },
    divider: { height: 1, backgroundColor: '#F3F4F6', marginBottom: 15 },
    detailsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 20 },
    detailItem: { width: '45%' },
    detailLabel: { fontSize: 12, color: COLORS.textSub, marginBottom: 4 },
    detailValue: { fontSize: 14, fontWeight: 'bold', color: COLORS.textMain },
    manageBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: COLORS.primary + '10', marginTop: 20, padding: 12, borderRadius: 12 },
    manageBtnText: { color: COLORS.primary, fontWeight: 'bold', marginRight: 8 }
});

export default ProviderEVManagementScreen;
