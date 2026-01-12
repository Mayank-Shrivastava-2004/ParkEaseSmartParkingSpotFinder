import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, Platform, Linking } from 'react-native';
import { MaterialIcons, FontAwesome5 } from '@expo/vector-icons';
import GradientButton from '../components/GradientButton';
import { showSuccess } from '../utils/alerts';
import { COLORS } from '../constants/theme';

import MapView, { Marker, Polyline } from 'react-native-maps';

const IsWeb = Platform.OS === 'web';

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

    const handleFindRoute = () => {
        if (!source || !dest) {
            showError('Error', 'Please enter source and destination');
            return;
        }

        const url = `https://www.google.com/maps/dir/?api=1&origin=${encodeURIComponent(source)}&destination=${encodeURIComponent(dest)}`;

        Linking.canOpenURL(url).then(supported => {
            if (supported) {
                Linking.openURL(url);
            } else {
                showError('Error', 'Cannot open map application');
            }
        }).catch(err => console.error("An error occurred", err));
    };

    return (
        <View style={styles.container}>
            {/* Same MapView logic as before, just updated imports */}
            {IsWeb ? (
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
                    <GradientButton text="FIND ROUTE" onPress={handleFindRoute} style={{ marginTop: 10 }} />
                </View>
            </SafeAreaView>

            <TouchableOpacity style={styles.fab} onPress={() => navigation.goBack()}>
                <MaterialIcons name="exit-to-app" size={24} color="#fff" />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: COLORS.background },
    mapOverlayCard: { position: 'absolute', top: 50, left: 20, right: 20, backgroundColor: 'white', borderRadius: 20, padding: 20, shadowColor: "#000", shadowOpacity: 0.15, shadowRadius: 10, elevation: 5 },
    cardTitle: { fontSize: 18, fontWeight: 'Bold', marginBottom: 15, color: COLORS.textMain },
    inputWithIcon: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#F3F4F6', borderRadius: 10, marginBottom: 10, paddingHorizontal: 12 },
    mapInput: { flex: 1, paddingVertical: 12, fontSize: 15 },
    inputIcon: { marginRight: 10 },
    fab: { position: 'absolute', bottom: 30, right: 30, backgroundColor: COLORS.error, width: 56, height: 56, borderRadius: 28, alignItems: 'center', justifyContent: 'center', elevation: 5, shadowColor: "#000", shadowOpacity: 0.3, shadowRadius: 5 },
});

export default DriverDashboardScreen;
