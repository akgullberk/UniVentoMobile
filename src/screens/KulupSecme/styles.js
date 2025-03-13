import { StyleSheet } from 'react-native'

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#88141c'
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
        borderRadius: 25,
        margin: 15,
        marginTop: 30,
        paddingHorizontal: 15,
        height: 50,
    },
    searchInput: {
        flex: 1,
        marginLeft: 10,
        fontSize: 18,
        color: '#333',
        textAlignVertical: 'center',
    },
    searchIcon: {
        marginLeft: 10
    },
    overlay: {
        position: 'absolute',
        bottom: 10,
        left: 0,
        right: 0,
        height: 60,
        backgroundColor: '#88141c',
        borderTopWidth: 1,
        borderTopColor: 'rgba(255, 255, 255, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 2,
    },
    closeButton: {
        padding: 10,
        backgroundColor: 'white',
        borderRadius: 25,
        width: '95%',
        alignItems: 'center',
    },
    closeButtonText: {
        color: '#808080',
        fontSize: 16,
        fontWeight: 'bold'
    },
    header: {
        width: '100%',
        height: 60,
        backgroundColor: '#88141c',
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 2,
    },
    headerText: {
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold'
    }
}) 