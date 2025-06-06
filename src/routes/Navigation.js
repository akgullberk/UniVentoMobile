import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../screens/Home/Home";
import KulupSecme from "../screens/KulupSecme/KulupSecme";
import GirisKayit from "../screens/GirisKayit/GirisKayit";
import Profil from "../screens/Profil/Profil";
import EventDetail from "../screens/EventDetail/EventDetail";
import CreateEvent from "../screens/CreateEvent/CreateEvent";
import ProfileInfo from "../screens/ProfileInfo/ProfileInfo";
import MyEvents from "../screens/MyEvents/MyEvents";
import ParticipationRequests from "../screens/ParticipationRequests/ParticipationRequests";
import MembershipRequests from "../screens/MembershipRequests/MembershipRequests";
import KulupDetay from "../screens/KulupDetay/KulupDetay";
import { useAuth } from "../context/AuthContext";
import { ActivityIndicator, View } from "react-native";

const Stack = createNativeStackNavigator();

const Navigation = () => {
    const { user, loading } = useAuth();

    if (loading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" color="#88141c" />
            </View>
        );
    }

    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="EventDetail" component={EventDetail} />
            {user ? (
                <>
                    <Stack.Screen name="KulupSecme" component={KulupSecme} />
                    <Stack.Screen name="KulupDetay" component={KulupDetay} />
                    <Stack.Screen name="Profil" component={Profil} />
                    <Stack.Screen name="CreateEvent" component={CreateEvent} />
                    <Stack.Screen name="ProfileInfo" component={ProfileInfo} />
                    <Stack.Screen name="Etkinliklerim" component={MyEvents} />
                    <Stack.Screen name="ParticipationRequests" component={ParticipationRequests} />
                    <Stack.Screen name="MembershipRequests" component={MembershipRequests} />
                </>
            ) : (
                <Stack.Screen name="GirisKayit" component={GirisKayit} />
            )}
        </Stack.Navigator>
    );
};

export default Navigation;