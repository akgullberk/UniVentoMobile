import { Dimensions, StyleSheet, Platform } from 'react-native'

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    topBar: {
        width: '100%',
        height: 100,
        backgroundColor: '#88141c',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 15,
        
    },
    menuIcon: {
        width: 30,
        height: 20,
        justifyContent: 'space-between'
    },
    menuLine: {
        width: '100%',
        height: 2,
        backgroundColor: '#fff'
    },
    title: {
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold',
        marginLeft: 20
    }
})