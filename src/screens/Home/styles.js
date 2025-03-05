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
        justifyContent: 'space-between',
        zIndex: 1,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 2,
    },
    menuIcon: {
        width: 30,
        height: 20,
        justifyContent: 'space-between'
    },
    centerContainer: {
        position: 'absolute',
        left: 0,
        right: 0,
        alignItems: 'center'
    },
    menuLine: {
        width: '100%',
        height: 2,
        backgroundColor: '#fff'
    },
    title: {
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold'
    },
    rightIcon: {
        width: 30,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center'
    },
    searchContainer: {
        position: 'absolute',
        top: 75,
        left: 15,
        right: 15,
        height: 50,
        backgroundColor: 'white',
        borderRadius: 25,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        elevation:15,
        
    },
    searchInput: {
        flex: 1,
        marginLeft: 12,
        fontSize: 18,
        color: '#333'
    }
})