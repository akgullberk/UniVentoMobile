import { StyleSheet } from 'react-native'

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
    centerContainer: {
        position: 'absolute',
        left: 0,
        right: 0,
        alignItems: 'center'
    },
    title: {
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold'
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
        elevation: 15,
    },
    searchInput: {
        flex: 1,
        marginLeft: 12,
        fontSize: 18,
        color: '#333'
    },
    content: {
        flex: 1,
        backgroundColor: 'white',
        paddingHorizontal: 20,
        paddingTop: 20
    },
    tabContainer: {
        flexDirection: 'row',
        marginBottom: 20,
        borderRadius: 10,
        overflow: 'hidden',
        backgroundColor: '#f0f0f0'
    },
    tab: {
        flex: 1,
        padding: 15,
        alignItems: 'center'
    },
    activeTab: {
        backgroundColor: '#88141c'
    },
    tabText: {
        fontSize: 16,
        color: '#666',
        fontWeight: 'bold'
    },
    activeTabText: {
        color: '#fff'
    },
    formContainer: {
        marginTop: 20
    },
    inputLabel: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 8,
    },
    input: {
        backgroundColor: '#f5f5f5',
        borderRadius: 10,
        padding: 15,
        marginBottom: 15,
        fontSize: 16
    },
    button: {
        backgroundColor: '#88141c',
        borderRadius: 10,
        padding: 15,
        alignItems: 'center',
        marginTop: 10
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold'
    }
}) 