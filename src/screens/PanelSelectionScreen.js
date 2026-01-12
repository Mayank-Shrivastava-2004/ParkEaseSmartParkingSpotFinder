import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView, StatusBar } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { FontAwesome5, MaterialIcons } from '@expo/vector-icons';
import { COLORS } from '../constants/theme';

export default function PanelSelectionScreen({ navigation }) {
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
});
