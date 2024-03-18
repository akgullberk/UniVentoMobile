import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../screens/Home/Home";
import KulupSecme from "../screens/KulupSecme/KulupSecme";
import GirisKayit from "../screens/GirisKayit/GirisKayit";

const Stack = createNativeStackNavigator();

const Navigation = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="KulupSecme" component={KulupSecme} />
            <Stack.Screen name="GirisKayit" component={GirisKayit} />
        </Stack.Navigator>
    );
}

export default Navigation