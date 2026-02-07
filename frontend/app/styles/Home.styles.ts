import { StyleSheet } from 'react-native';

// Facebook-inspired Color Palette
const colors = {
  // Primary Facebook Blue
  facebookBlue: '#1877F2',
  facebookBlueDark: '#166FE5',
  facebookBlueLight: '#4A90E2',
  
  // Secondary Colors
  messengerBlue: '#0084FF',
  likeBlue: '#4267B2',
  activeGreen: '#42B72A',
  
  // Neutral Colors
  backgroundGray: '#F0F2F5',
  cardWhite: '#FFFFFF',
  borderGray: '#E4E6EB',
  dividerGray: '#CED0D4',
  
  // Text Colors
  textPrimary: '#050505',
  textSecondary: '#65676B',
  textTertiary: '#8A8D91',
  textWhite: '#FFFFFF',
  
  // Status Colors
  successGreen: '#31A24C',
  warningOrange: '#F7B500',
  errorRed: '#E41E3F',
  
  // Hover/Active States
  hoverGray: '#F2F3F5',
  activeBlue: '#E7F3FF',
  
  // Shadow
  shadowColor: '#000000',
};

import { useResponsive } from '../utils/platform';
const { isWeb, isSmallScreen, isMediumScreen, isLargeScreen, width } = useResponsive();

// Responsive sizing helpers
const scale = (size: number) => {
  if (isWeb && isLargeScreen) return size;
  if (isSmallScreen) return size * 0.9;
  return size;
};

const verticalScale = (size: number) => {
  if (isWeb && isLargeScreen) return size;
  if (isSmallScreen) return size * 0.85;
  return size;
};

const styles = StyleSheet.create({
  // ========== MAIN CONTAINER ==========
  container: {
    flex: 1,
    backgroundColor: colors.backgroundGray,
  },

  contentContainer: {
    flexGrow: 1,
    paddingBottom: verticalScale(24),
  },

  // ========== WELCOME SECTION ==========
  welcomeSection: {
    backgroundColor: colors.cardWhite,
    paddingHorizontal: isSmallScreen ? 16 : isWeb && isLargeScreen ? 24 : 20,
    paddingVertical: isSmallScreen ? 20 : 24,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderGray,
    elevation: 2,
    shadowColor: colors.shadowColor,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },

  welcomeTitle: {
    fontSize: isSmallScreen ? 20 : isWeb && isLargeScreen ? 28 : 24,
    fontWeight: '700',
    color: colors.textPrimary,
    marginBottom: 6,
    letterSpacing: -0.5,
  },

  welcomeSubtitle: {
    fontSize: isSmallScreen ? 14 : 15,
    color: colors.textSecondary,
    lineHeight: isSmallScreen ? 20 : 22,
    fontWeight: '400',
  },

  // ========== MAIN CONTENT ==========
  mainContent: {
    paddingHorizontal: isSmallScreen ? 0 : isWeb && isLargeScreen ? 16 : 12,
    paddingTop: isSmallScreen ? 8 : 12,
  },

  forumEmbed: {
    marginTop: 12,
  },

  // ========== CARD STYLES ==========
  card: {
    backgroundColor: colors.cardWhite,
    borderRadius: isWeb && isLargeScreen ? 12 : 8,
    marginHorizontal: isSmallScreen ? 0 : 0,
    marginBottom: 12,
    padding: isSmallScreen ? 16 : isWeb && isLargeScreen ? 20 : 18,
    elevation: 1,
    shadowColor: colors.shadowColor,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 2,
    borderWidth: 1,
    borderColor: colors.borderGray,
  },

  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderGray,
  },

  cardTitle: {
    fontSize: isSmallScreen ? 17 : 18,
    fontWeight: '600',
    color: colors.textPrimary,
    flex: 1,
  },

  cardSubtitle: {
    fontSize: isSmallScreen ? 13 : 14,
    color: colors.textSecondary,
    marginTop: 4,
    fontWeight: '400',
  },

  // ========== SECTION STYLES ==========
  sectionContainer: {
    backgroundColor: colors.cardWhite,
    borderRadius: isWeb && isLargeScreen ? 12 : 8,
    marginHorizontal: isSmallScreen ? 0 : 0,
    marginBottom: 12,
    overflow: 'hidden',
    elevation: 1,
    shadowColor: colors.shadowColor,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 2,
    borderWidth: 1,
    borderColor: colors.borderGray,
  },

  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: isSmallScreen ? 16 : isWeb && isLargeScreen ? 20 : 18,
    paddingVertical: isSmallScreen ? 14 : 16,
    backgroundColor: colors.cardWhite,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderGray,
  },

  sectionTitle: {
    fontSize: isSmallScreen ? 17 : 18,
    fontWeight: '600',
    color: colors.textPrimary,
    letterSpacing: -0.3,
  },

  sectionContent: {
    padding: isSmallScreen ? 16 : isWeb && isLargeScreen ? 20 : 18,
  },

  // ========== BUTTON STYLES ==========
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: isSmallScreen ? 10 : 11,
    paddingHorizontal: isSmallScreen ? 16 : 20,
    borderRadius: 6,
    gap: 8,
  },

  primaryButton: {
    backgroundColor: colors.facebookBlue,
    elevation: 0,
    shadowOpacity: 0,
  },

  secondaryButton: {
    backgroundColor: colors.hoverGray,
    borderWidth: 0,
  },

  outlineButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: colors.borderGray,
  },

  buttonText: {
    fontSize: isSmallScreen ? 14 : 15,
    fontWeight: '600',
  },

  primaryButtonText: {
    color: colors.textWhite,
  },

  secondaryButtonText: {
    color: colors.textPrimary,
  },

  outlineButtonText: {
    color: colors.textSecondary,
  },

  // ========== MAP TOGGLE STYLES ==========
  mapToggleContainer: {
    flexDirection: 'row',
    backgroundColor: colors.hoverGray,
    borderRadius: 6,
    padding: 2,
    alignSelf: 'flex-start',
  },

  mapToggleButton: {
    paddingVertical: 8,
    paddingHorizontal: isSmallScreen ? 14 : 16,
    borderRadius: 5,
    minWidth: isSmallScreen ? 80 : 90,
    alignItems: 'center',
  },

  mapToggleButtonActive: {
    backgroundColor: colors.cardWhite,
    elevation: 1,
    shadowColor: colors.shadowColor,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },

  mapToggleText: {
    fontSize: isSmallScreen ? 13 : 14,
    fontWeight: '500',
    color: colors.textSecondary,
  },

  mapToggleTextActive: {
    color: colors.facebookBlue,
    fontWeight: '600',
  },

  // ========== REGION DETAIL STYLES ==========
  regionDetailContainer: {
    backgroundColor: colors.cardWhite,
    borderRadius: isWeb && isLargeScreen ? 12 : 8,
    marginHorizontal: isSmallScreen ? 0 : 0,
    marginBottom: 12,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: colors.shadowColor,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    borderWidth: 1,
    borderColor: colors.borderGray,
  },

  regionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: isSmallScreen ? 16 : isWeb && isLargeScreen ? 20 : 18,
    backgroundColor: colors.activeBlue,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderGray,
  },

  regionTitle: {
    fontSize: isSmallScreen ? 18 : 20,
    fontWeight: '700',
    color: colors.facebookBlue,
    flex: 1,
  },

  closeButton: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: colors.cardWhite,
  },

  closeButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.textPrimary,
  },

  regionContent: {
    padding: isSmallScreen ? 16 : isWeb && isLargeScreen ? 20 : 18,
  },

  regionStats: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginTop: 12,
  },

  statItem: {
    flex: 1,
    minWidth: isSmallScreen ? '45%' : 140,
    backgroundColor: colors.backgroundGray,
    padding: isSmallScreen ? 12 : 14,
    borderRadius: 8,
    borderLeftWidth: 3,
    borderLeftColor: colors.facebookBlue,
  },

  statLabel: {
    fontSize: isSmallScreen ? 12 : 13,
    color: colors.textSecondary,
    marginBottom: 4,
    fontWeight: '500',
  },

  statValue: {
    fontSize: isSmallScreen ? 18 : 20,
    fontWeight: '700',
    color: colors.textPrimary,
  },

  statUnit: {
    fontSize: isSmallScreen ? 12 : 13,
    color: colors.textSecondary,
    fontWeight: '400',
  },

  // ========== TOP PRODUCERS STYLES ==========
  producersContainer: {
    backgroundColor: colors.cardWhite,
    borderRadius: isWeb && isLargeScreen ? 12 : 8,
    marginHorizontal: isSmallScreen ? 0 : 0,
    marginBottom: 12,
    overflow: 'hidden',
    elevation: 1,
    shadowColor: colors.shadowColor,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 2,
    borderWidth: 1,
    borderColor: colors.borderGray,
  },

  producerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: isSmallScreen ? 14 : 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderGray,
    gap: 12,
  },

  producerRank: {
    width: isSmallScreen ? 28 : 32,
    height: isSmallScreen ? 28 : 32,
    borderRadius: isSmallScreen ? 14 : 16,
    backgroundColor: colors.activeBlue,
    justifyContent: 'center',
    alignItems: 'center',
  },

  producerRankText: {
    fontSize: isSmallScreen ? 14 : 15,
    fontWeight: '700',
    color: colors.facebookBlue,
  },

  producerInfo: {
    flex: 1,
  },

  producerName: {
    fontSize: isSmallScreen ? 15 : 16,
    fontWeight: '600',
    color: colors.textPrimary,
    marginBottom: 2,
  },

  producerValue: {
    fontSize: isSmallScreen ? 13 : 14,
    color: colors.textSecondary,
    fontWeight: '500',
  },

  producerChevron: {
    padding: 4,
  },

  // ========== PROFILE STYLES ==========
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: isSmallScreen ? 12 : 14,
    backgroundColor: colors.cardWhite,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.borderGray,
  },

  profileImage: {
    width: isSmallScreen ? 48 : 52,
    height: isSmallScreen ? 48 : 52,
    borderRadius: isSmallScreen ? 24 : 26,
    borderWidth: 2,
    borderColor: colors.facebookBlue,
  },

  profileInfo: {
    flex: 1,
  },

  profileName: {
    fontSize: isSmallScreen ? 16 : 17,
    fontWeight: '600',
    color: colors.textPrimary,
    marginBottom: 2,
  },

  profileRole: {
    fontSize: isSmallScreen ? 13 : 14,
    color: colors.textSecondary,
    fontWeight: '400',
  },

  // ========== LOADING STATE ==========
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
    backgroundColor: colors.backgroundGray,
  },

  loadingText: {
    marginTop: 16,
    fontSize: isSmallScreen ? 14 : 15,
    color: colors.textSecondary,
    fontWeight: '500',
  },

  // ========== EMPTY STATE ==========
  emptyContainer: {
    padding: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },

  emptyText: {
    fontSize: isSmallScreen ? 15 : 16,
    color: colors.textSecondary,
    textAlign: 'center',
    marginTop: 12,
    fontWeight: '400',
  },

  // ========== DIVIDER ==========
  divider: {
    height: 1,
    backgroundColor: colors.dividerGray,
    marginVertical: 12,
  },

  // ========== BADGE ==========
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    backgroundColor: colors.activeBlue,
  },

  badgeText: {
    fontSize: isSmallScreen ? 12 : 13,
    fontWeight: '600',
    color: colors.facebookBlue,
  },

  // ========== MAP CONTAINER ==========
  mapContainer: {
    backgroundColor: colors.cardWhite,
    borderRadius: isWeb && isLargeScreen ? 12 : 8,
    overflow: 'hidden',
    marginBottom: 12,
    elevation: 1,
    shadowColor: colors.shadowColor,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 2,
    borderWidth: 1,
    borderColor: colors.borderGray,
  },

  mapCard: {
    backgroundColor: colors.cardWhite,
    borderRadius: isWeb && isLargeScreen ? 12 : 8,
    overflow: 'hidden',
    marginBottom: 12,
    elevation: 1,
    shadowColor: colors.shadowColor,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 2,
    borderWidth: 1,
    borderColor: colors.borderGray,
  },

  mapViewport: {
    width: '100%',
    aspectRatio: 1,
    alignSelf: 'center',
    maxWidth: isWeb && isLargeScreen ? 520 : isMediumScreen ? 420 : 320,
    backgroundColor: colors.backgroundGray,
  },

  mapHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: isSmallScreen ? 16 : isWeb && isLargeScreen ? 20 : 18,
    backgroundColor: colors.cardWhite,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderGray,
  },

  mapTitle: {
    fontSize: isSmallScreen ? 17 : 18,
    fontWeight: '600',
    color: colors.textPrimary,
  },

  mapContent: {
    minHeight: isSmallScreen ? 300 : isWeb && isLargeScreen ? 500 : 400,
    backgroundColor: colors.backgroundGray,
  },

  // ========== INFO BOX ==========
  infoBox: {
    backgroundColor: colors.activeBlue,
    padding: isSmallScreen ? 14 : 16,
    borderRadius: 8,
    marginBottom: 12,
    borderLeftWidth: 3,
    borderLeftColor: colors.facebookBlue,
  },

  infoText: {
    fontSize: isSmallScreen ? 13 : 14,
    color: colors.textPrimary,
    lineHeight: isSmallScreen ? 19 : 20,
    fontWeight: '400',
  },

  // ========== METRIC CARD ==========
  metricCard: {
    backgroundColor: colors.backgroundGray,
    padding: isSmallScreen ? 16 : 18,
    borderRadius: 8,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: colors.borderGray,
  },

  metricLabel: {
    fontSize: isSmallScreen ? 13 : 14,
    color: colors.textSecondary,
    marginBottom: 6,
    fontWeight: '500',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },

  metricValue: {
    fontSize: isSmallScreen ? 24 : 28,
    fontWeight: '700',
    color: colors.textPrimary,
  },

  metricChange: {
    fontSize: isSmallScreen ? 12 : 13,
    color: colors.successGreen,
    marginTop: 4,
    fontWeight: '600',
  },

  // ========== RESPONSIVE GRID ==========
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginTop: 12,
  },

  gridItem: {
    flex: 1,
    minWidth: isSmallScreen ? '100%' : isWeb && isLargeScreen ? '30%' : '45%',
  },

  // ========== ACTION BUTTON ==========
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.facebookBlue,
    paddingVertical: isSmallScreen ? 12 : 14,
    paddingHorizontal: isSmallScreen ? 20 : 24,
    borderRadius: 8,
    gap: 8,
    elevation: 2,
    shadowColor: colors.facebookBlue,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },

  actionButtonText: {
    fontSize: isSmallScreen ? 15 : 16,
    fontWeight: '600',
    color: colors.textWhite,
  },

  // ========== TAB BAR (if needed) ==========
  tabBar: {
    flexDirection: 'row',
    backgroundColor: colors.cardWhite,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderGray,
    paddingHorizontal: isSmallScreen ? 0 : 8,
  },

  tab: {
    flex: 1,
    paddingVertical: 14,
    alignItems: 'center',
    borderBottomWidth: 3,
    borderBottomColor: 'transparent',
  },

  tabActive: {
    borderBottomColor: colors.facebookBlue,
  },

  tabText: {
    fontSize: isSmallScreen ? 14 : 15,
    fontWeight: '500',
    color: colors.textSecondary,
  },

  tabTextActive: {
    color: colors.facebookBlue,
    fontWeight: '600',
  },
});

export default styles;