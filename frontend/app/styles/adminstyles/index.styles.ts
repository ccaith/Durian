import { StyleSheet, Platform } from 'react-native';
import { useResponsive } from '../../utils/platform';
const { isWeb, isSmallScreen, isMediumScreen, isLargeScreen } = useResponsive();

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f9f9f9',
  },

  centeredContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
  },

  // Header Section
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 30,
    marginTop: isWeb ? 20 : 40,
    ...Platform.select({
      web: {
        maxWidth: 1200,
        width: '100%',
        alignSelf: 'center',
      },
    }),
  },

  title: {
    fontSize: isWeb ? 32 : 26,
    fontWeight: 'bold',
    color: '#1b5e20',
    ...Platform.select({
      web: {
        fontFamily: 'system-ui, -apple-system, sans-serif',
      },
    }),
  },

  logoutBtn: {
    backgroundColor: '#e53935',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    ...Platform.select({
      web: {
        cursor: 'pointer',
        transition: 'all 0.2s ease',
      },
    }),
  },

  logoutBtnText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },

  // Card Styles
  card: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 12,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    marginBottom: 20,
    ...Platform.select({
      web: {
        maxWidth: 1200,
        width: '100%',
        alignSelf: 'center',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
      },
    }),
  },

  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 15,
    color: '#333',
    ...Platform.select({
      web: {
        fontSize: 20,
      },
    }),
  },

  // Status Section
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  },

  statusIndicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 10,
  },

  statusText: {
    fontSize: 16,
    color: '#666',
  },

  retryBtn: {
    marginTop: 15,
    backgroundColor: '#1b5e20',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    ...Platform.select({
      web: {
        cursor: 'pointer',
        transition: 'background-color 0.2s ease',
      },
    }),
  },

  retryBtnText: {
    color: '#fff',
    fontWeight: '500',
    fontSize: 14,
  },

  // Welcome Text
  welcomeText: {
    marginTop: 10,
    marginBottom: 20,
    fontSize: 16,
    color: '#888',
    fontStyle: 'italic',
    textAlign: 'center',
    ...Platform.select({
      web: {
        maxWidth: 1200,
        width: '100%',
        alignSelf: 'center',
      },
    }),
  },

  // User Management Section
  userRow: {
    flexDirection: Platform.OS === 'web' ? 'row' : 'column',
    justifyContent: 'space-between',
    alignItems: Platform.OS === 'web' ? 'center' : 'flex-start',
    paddingVertical: 15,
    paddingHorizontal: Platform.OS === 'web' ? 10 : 0,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    gap: Platform.OS === 'web' ? 0 : 10,
    ...Platform.select({
      web: {
        transition: 'background-color 0.2s ease',
      },
    }),
  },

  userInfo: {
    flex: 1,
    marginBottom: Platform.OS === 'web' ? 0 : 10,
  },

  userName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },

  userEmail: {
    fontSize: 13,
    color: '#777',
  },

  userActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    ...Platform.select({
      web: {
        minWidth: 280,
        justifyContent: 'flex-end',
      },
      default: {
        width: '100%',
        justifyContent: 'space-between',
      },
    }),
  },

  pickerWrapper: {
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    marginRight: 10,
    width: Platform.OS === 'web' ? 140 : 150,
    height: 40,
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    overflow: 'hidden',
    ...Platform.select({
      web: {
        cursor: 'pointer',
      },
    }),
  },

  picker: {
    width: '100%',
    height: '100%',
    color: '#333',
    ...Platform.select({
      android: {
        marginTop: -6,
      },
      ios: {
        height: 40,
      },
      web: {
        border: 'none',
        outline: 'none',
        backgroundColor: 'transparent',
        cursor: 'pointer',
      },
    }),
  },

  deleteBtn: {
    backgroundColor: '#ffebee',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e53935',
    elevation: 1,
    shadowColor: '#e53935',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    ...Platform.select({
      web: {
        cursor: 'pointer',
        transition: 'all 0.2s ease',
        minWidth: 80,
        alignItems: 'center',
      },
    }),
  },

  deleteBtnText: {
    color: '#e53935',
    fontWeight: 'bold',
    fontSize: 13,
    textAlign: 'center',
  },

  emptyText: {
    textAlign: 'center',
    color: '#999',
    padding: 20,
    fontSize: 15,
    fontStyle: 'italic',
  },

  // Loading State
  loadingText: {
    marginTop: 10,
    fontSize: 14,
    color: '#666',
  },

  // Responsive Web Styles
  ...(Platform.OS === 'web' && {
    container: {
      flex: 1,
      padding: 20,
      backgroundColor: '#f9f9f9',
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 30,
      marginTop: 20,
      maxWidth: 1200,
      width: '100%',
      alignSelf: 'center',
    },
    title: {
      fontSize: 32,
      fontWeight: 'bold',
      color: '#1b5e20',
      fontFamily: 'system-ui, -apple-system, sans-serif',
    },
    userRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingVertical: 15,
      paddingHorizontal: 10,
      borderBottomWidth: 1,
      borderBottomColor: '#eee',
    },
    userActions: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 10,
      minWidth: 280,
      justifyContent: 'flex-end',
    },
  }),
});

export default styles;