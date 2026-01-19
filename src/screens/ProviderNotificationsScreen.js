import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { COLORS } from '../constants/colors';

const ProviderNotificationsScreen = ({ navigation }) => {
    const notifications = [
        { id: 1, title: 'New Booking', message: 'Slot A1 booked at City Center Garage', time: '5m ago', type: 'booking', read: false },
        { id: 2, title: 'Payment Received', message: '₹50 credited for Slot B2', time: '1h ago', type: 'payment', read: true },
        { id: 3, title: 'EV Alert', message: 'Charger EV-03 requires maintenance', time: '3h ago', type: 'alert', read: true },
    ];

    const getIcon = (type) => {
        switch (type) {
            case 'booking': return 'local-parking';
            case 'payment': return 'account-balance-wallet';
            case 'alert': return 'warning';
            default: return 'notifications';
        }
    };

    const getColor = (type) => {
        switch (type) {
            case 'booking': return COLORS.primary;
            case 'payment': return COLORS.success;
            case 'alert': return COLORS.error;
            default: return COLORS.textSub;
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
                    <MaterialIcons name="arrow-back" size={24} color={COLORS.textMain} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Notifications</Text>
                <TouchableOpacity>
                    <Text style={styles.markRead}>Clear all</Text>
                </TouchableOpacity>
            </View>

            <ScrollView contentContainerStyle={styles.content}>
                {notifications.map(notif => (
                    <TouchableOpacity key={notif.id} style={[styles.notifItem, !notif.read && styles.unreadItem]}>
                        <View style={[styles.iconContainer, { backgroundColor: getColor(notif.type) + '15' }]}>
                            <MaterialIcons name={getIcon(notif.type)} size={24} color={getColor(notif.type)} />
                        </View>
                        <View style={styles.textContainer}>
                            <View style={styles.titleRow}>
                                <Text style={styles.notifTitle}>{notif.title}</Text>
                                <Text style={styles.notifTime}>{notif.time}</Text>
                            </View>
                            <Text style={styles.notifMsg} numberOfLines={2}>{notif.message}</Text>
                        </View>
                        {!notif.read && <View style={styles.unreadDot} />}
                    </TouchableOpacity>
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
    markRead: { color: COLORS.primary, fontWeight: '600' },
    content: { padding: 20 },
    notifItem: { flexDirection: 'row', backgroundColor: '#fff', padding: 15, borderRadius: 20, marginBottom: 15, alignItems: 'center', elevation: 2 },
    unreadItem: { backgroundColor: '#F0F9FF', borderColor: '#BAE6FD', borderWidth: 1 },
    iconContainer: { width: 48, height: 48, borderRadius: 14, alignItems: 'center', justifyContent: 'center', marginRight: 15 },
    textContainer: { flex: 1 },
    titleRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 },
    notifTitle: { fontSize: 16, fontWeight: 'bold', color: COLORS.textMain },
    notifTime: { fontSize: 12, color: COLORS.textSub },
    notifMsg: { fontSize: 14, color: COLORS.textSub, lineHeight: 20 },
    unreadDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: COLORS.primary, marginLeft: 10 }
});

export default ProviderNotificationsScreen;
