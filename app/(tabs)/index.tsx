import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView, Dimensions } from 'react-native';
import { Calendar, Shield, Music, BookOpen, Sun, User } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { useSettings } from '@/contexts/SettingsContext';

const { width } = Dimensions.get('window');

export default function HomeScreen() {
  const router = useRouter();
  const { getTextSize, getColors, playSound } = useSettings();
  const colors = getColors();
  const [currentSlide, setCurrentSlide] = React.useState(0);

  const bannerData = [
    {
      id: 1,
      title: 'स्वास्थ्य की देखभाल',
      subtitle: 'Health Care',
      description: 'अपनी सेहत का ख्याल रखें',
      gradient: ['#4F46E5', '#7C3AED'],
      image: 'https://images.pexels.com/photos/5473298/pexels-photo-5473298.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      id: 2,
      title: 'परिवार से जुड़ाव',
      subtitle: 'Family Connection',
      description: 'अपने प्रियजनों के साथ समय बिताएं',
      gradient: ['#059669', '#0D9488'],
      image: 'https://images.pexels.com/photos/1128318/pexels-photo-1128318.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      id: 3,
      title: 'मानसिक शांति',
      subtitle: 'Mental Peace',
      description: 'ध्यान और योग के साथ शांति पाएं',
      gradient: ['#DC2626', '#EF4444'],
      image: 'https://images.pexels.com/photos/3822622/pexels-photo-3822622.jpeg?auto=compress&cs=tinysrgb&w=400'
    }
  ];

  const menuItems = [
    {
      id: 'routine',
      title: 'दिनचर्या',
      subtitle: 'Daily Routine',
      description: 'Medicine & schedule',
      icon: Calendar,
      backgroundColor: '#FFF8E1',
      iconColor: '#F57C00',
      borderColor: '#FFE082',
    },
    {
      id: 'emergency',
      title: 'आपातकाल',
      subtitle: 'Emergency',
      description: 'SOS & contacts',
      icon: Shield,
      backgroundColor: '#FFEBEE',
      iconColor: '#D32F2F',
      borderColor: '#FFCDD2',
    },
    {
      id: 'entertainment',
      title: 'मनोरंजन',
      subtitle: 'Entertainment',
      description: 'Music & videos',
      icon: Music,
      backgroundColor: '#F3E5F5',
      iconColor: '#7B1FA2',
      borderColor: '#E1BEE7',
    },
    {
      id: 'learning',
      title: 'सीखें',
      subtitle: 'Learning',
      description: 'Phone tutorials',
      icon: BookOpen,
      backgroundColor: '#E3F2FD',
      iconColor: '#1976D2',
      borderColor: '#BBDEFB',
    },
   
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % bannerData.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + bannerData.length) % bannerData.length);
  };

  React.useEffect(() => {
    const interval = setInterval(nextSlide, 4000);
    return () => clearInterval(interval);
  }, []);

  const handleCardPress = (cardId: string) => {
    playSound();
    switch (cardId) {
      case 'routine':
        router.push('/routine');
        break;
      case 'emergency':
        router.push('/emergency');
        break;
      case 'entertainment':
        router.push('/entertainment');
        break;
      case 'learning':
        router.push('/learning');
        break;
      default:
        router.push('/');
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <SafeAreaView style={[styles.headerSafeArea, { backgroundColor: colors.surface }]}>
          <View style={styles.header}>
            <TouchableOpacity style={styles.headerIcon}>
              <Sun size={22} color="#FF6B35" strokeWidth={2.5} />
            </TouchableOpacity>
            <View style={styles.headerCenter}>
              <Text style={[styles.appTitle, { fontSize: getTextSize(24) }]}>Saanjh ☀️</Text>
            </View>
            <TouchableOpacity style={styles.headerIcon}>
              <User size={22} color="#FF6B35" strokeWidth={2.5} />
            </TouchableOpacity>
          </View>
        </SafeAreaView>

        {/* Greeting Section */}
        <View style={[styles.greetingContainer, { backgroundColor: colors.surface }]}>
          <Text style={[styles.mainGreeting, { 
            color: colors.text, 
            fontSize: getTextSize(26) 
          }]}>
            नमस्ते, आपका दिन शुभ हो!
          </Text>
          <Text style={[styles.subGreeting, { 
            color: colors.textSecondary, 
            fontSize: getTextSize(16) 
          }]}>
            सुविधान के लिए सुंदर सुबह
          </Text>
        </View>

        {/* Banner Slider */}
        <View style={styles.bannerContainer}>
          {bannerData.map((banner, index) => (
            <TouchableOpacity
              key={banner.id}
              style={[styles.bannerCard, { display: index === currentSlide ? 'flex' : 'none' }]}
              activeOpacity={0.9}
            >
              <LinearGradient
                colors={banner.gradient}
                style={styles.bannerGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              >
                <View style={styles.bannerImageContainer}>
                  <View style={styles.bannerImageWrapper}>
                    <Text style={styles.bannerImagePlaceholder}>👴🏻</Text>
                  </View>
                </View>
                <View style={styles.bannerContent}>
                  <Text style={styles.bannerTitle}>{banner.title}</Text>
                  <Text style={styles.bannerSubtitle}>{banner.subtitle}</Text>
                  <Text style={styles.bannerDescription}>{banner.description}</Text>
                  <TouchableOpacity style={styles.bannerButton} onPress={playSound}>
                    <Text style={[styles.bannerButtonText, { fontSize: getTextSize(14) }]}>
                      और जानें
                    </Text>
                  </TouchableOpacity>
                </View>
              </LinearGradient>
            </TouchableOpacity>
          ))}
          
          {/* Dots Indicator */}
          <View style={styles.dotsContainer}>
            {bannerData.map((_, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.dot,
                  { 
                    backgroundColor: index === currentSlide ? '#FF6B35' : '#D1D5DB',
                    width: index === currentSlide ? 24 : 8,
                  }
                ]}
                onPress={() => setCurrentSlide(index)}
              />
            ))}
          </View>
        </View>

        {/* Professional Grid Menu */}
        <View style={styles.gridContainer}>
          {menuItems.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={[
                styles.gridItem, 
                { 
                  backgroundColor: item.backgroundColor,
                  borderColor: item.borderColor,
                }
              ]}
              activeOpacity={0.7}
              onPress={() => handleCardPress(item.id)}
            >
              <View style={styles.cardHeader}>
                <View style={[styles.iconWrapper, { backgroundColor: `${item.iconColor}15` }]}>
                  <item.icon size={32} color={item.iconColor} strokeWidth={2.5} />
                </View>
                <View style={styles.cardBadge}>
                  <View style={[styles.badgeDot, { backgroundColor: item.iconColor }]} />
                </View>
              </View>
              
              <View style={styles.cardContent}>
                <Text style={[styles.itemTitle, { 
                  color: item.iconColor, 
                  fontSize: getTextSize(20) 
                }]}>
                  {item.title}
                </Text>
                <Text style={[styles.itemSubtitle, { 
                  color: colors.textSecondary, 
                  fontSize: getTextSize(14) 
                }]}>
                  {item.subtitle}
                </Text>
                <Text style={[styles.itemDescription, { 
                  color: colors.textTertiary, 
                  fontSize: getTextSize(12) 
                }]}>
                  {item.description}
                </Text>
              </View>

              <View style={styles.cardFooter}>
                <View style={[styles.progressBar, { backgroundColor: `${item.iconColor}20` }]}>
                  <View style={[styles.progressFill, { backgroundColor: item.iconColor }]} />
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Bottom Spacing */}
        <View style={styles.bottomSpacing} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  headerSafeArea: {
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
  },
  headerIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#FFF8F0',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#FFE4CC',
  },
  headerCenter: {
    flex: 1,
    alignItems: 'center',
  },
  appTitle: {
    fontWeight: '700',
    color: '#FF6B35',
    textAlign: 'center',
    letterSpacing: 0.5,
  },
  greetingContainer: {
    paddingHorizontal: 24,
    paddingVertical: 28,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    marginBottom: 24,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
  },
  mainGreeting: {
    fontWeight: '700',
    textAlign: 'center',
    lineHeight: 34,
    marginBottom: 6,
  },
  subGreeting: {
    textAlign: 'center',
    lineHeight: 22,
    fontWeight: '500',
  },
  bannerContainer: {
    marginBottom: 24,
    paddingHorizontal: 20,
    height: 200,
  },
  bannerCard: {
    flex: 1,
    borderRadius: 20,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    overflow: 'hidden',
    marginBottom: 12,
  },
  bannerGradient: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 24,
  },
  bannerImageContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bannerImageWrapper: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  bannerImagePlaceholder: {
    fontSize: 40,
  },
  bannerContent: {
    flex: 1.5,
    paddingLeft: 20,
  },
  bannerTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 4,
    lineHeight: 28,
  },
  bannerSubtitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#FFFFFF',
    opacity: 0.8,
    marginBottom: 8,
  },
  bannerDescription: {
    fontSize: 14,
    color: '#FFFFFF',
    opacity: 0.7,
    lineHeight: 18,
    marginBottom: 12,
  },
  bannerButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 25,
    alignSelf: 'flex-start',
    backdropFilter: 'blur(10px)',
  },
  bannerButtonText: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    marginTop: 12,
  },
  dot: {
    height: 8,
    borderRadius: 4,
  },
  gridContainer: {
    paddingHorizontal: 20,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 16,
  },
  gridItem: {
    width: '47%',
    borderRadius: 20,
    padding: 20,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    marginBottom: 16,
    borderWidth: 1,
    minHeight: 160,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  iconWrapper: {
    width: 56,
    height: 56,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardBadge: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  badgeDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  cardContent: {
    flex: 1,
    marginBottom: 16,
  },
  itemTitle: {
    fontWeight: '700',
    marginBottom: 4,
    lineHeight: 26,
  },
  itemSubtitle: {
    fontWeight: '600',
    marginBottom: 6,
    lineHeight: 18,
  },
  itemDescription: {
    fontWeight: '500',
    lineHeight: 16,
  },
  cardFooter: {
    marginTop: 'auto',
  },
  progressBar: {
    height: 4,
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    width: '70%',
    borderRadius: 2,
  },
  bottomSpacing: {
    height: 20,
  },
});