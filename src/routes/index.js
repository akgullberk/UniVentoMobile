import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import Navigation from './Navigation';
import { AuthProvider } from '../context/AuthContext';

const App = () => {
    return (
        <AuthProvider>
        <NavigationContainer>
            <Navigation />
        </NavigationContainer>
        </AuthProvider>
    );
};

export default App;