import { StyleSheet } from 'react-native'

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    topBar: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#88141c',
        padding: 16,
        paddingTop: 40,
    },
    centerContainer: {
        flex: 1,
        alignItems: 'center',
    },
    title: {
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold'
    },
    iconContainer: {
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
    },
    content: {
        flex: 1,
        padding: 16,
    },
    profileHeader: {
        alignItems: 'center',
        marginBottom: 24,
    },
    userName: {
        fontSize: 24,
        fontWeight: 'bold',
        marginTop: 12,
        color: '#333',
    },
    userEmail: {
        fontSize: 16,
        color: '#666',
        marginTop: 4,
    },
    roleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFF8E1',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 20,
        marginTop: 8,
    },
    roleText: {
        color: '#333',
        fontWeight: 'bold',
        marginLeft: 4,
        fontSize: 14,
    },
    menuContainer: {
        backgroundColor: '#fff',
        borderRadius: 12,
        overflow: 'hidden',
        elevation: 2,
    },
    menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    menuText: {
        marginLeft: 12,
        fontSize: 16,
        color: '#333',
    },
    eventFormContainer: {
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 16,
        elevation: 2,
    },
    formTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 16,
        textAlign: 'center',
    },
    input: {
        backgroundColor: '#f5f5f5',
        borderRadius: 8,
        padding: 12,
        marginBottom: 12,
        fontSize: 16,
    },
    textArea: {
        height: 100,
        textAlignVertical: 'top',
    },
    imagePickerButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#88141c',
        padding: 12,
        borderRadius: 8,
        marginBottom: 12,
    },
    imagePickerText: {
        color: '#fff',
        fontSize: 16,
        marginLeft: 8,
    },
    selectedImage: {
        width: '100%',
        height: 200,
        borderRadius: 8,
        marginBottom: 12,
    },
    formButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    formButton: {
        flex: 1,
        padding: 12,
        borderRadius: 8,
        alignItems: 'center',
        marginHorizontal: 6,
    },
    cancelButton: {
        backgroundColor: '#f5f5f5',
    },
    submitButton: {
        backgroundColor: '#88141c',
    },
    buttonText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#fff',
    },
}); 