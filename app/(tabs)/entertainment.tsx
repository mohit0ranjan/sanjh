import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView, Alert, Modal, Dimensions, Image } from 'react-native';
import { ArrowLeft, Play, Heart, Download, Share, Volume2, Pause, SkipForward, SkipBack, X, Maximize, Minimize } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import YoutubePlayer from 'react-native-youtube-iframe';

const { width, height } = Dimensions.get('window');

export default function EntertainmentScreen() {
  const [currentlyPlaying, setCurrentlyPlaying] = React.useState(null);
  const [favorites, setFavorites] = React.useState(new Set());
  const [isVideoModalVisible, setIsVideoModalVisible] = React.useState(false);
  const [selectedVideo, setSelectedVideo] = React.useState(null);
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [isFullscreen, setIsFullscreen] = React.useState(false);

  // YouTube video data with real video IDs
  const bhajansData = [
  {
    id: 1,
    videoId: 'IMPUWuYQM8U', // ✅ Hanuman Chalisa by Hariharan
    title: 'Hanuman Chalisa',
    subtitle: 'हनुमान चालीसा',
    artist: 'Hariharan',
    duration: '9:40',
    backgroundColor: '#8B4513',
    thumbnail: `https://img.youtube.com/vi/IMPUWuYQM8U/maxresdefault.jpg`,
    category: 'bhajan'
  },
  {
    id: 2,
    videoId: '3ucCEjXS9n8', // ✅ Om Jai Jagdish Hare by Anuradha Paudwal
    title: 'Om Jai Jagdish Hare',
    subtitle: 'ॐ जय जगदीश हरे',
    artist: 'Anuradha Paudwal',
    duration: '6:45',
    backgroundColor: '#D2B48C',
    thumbnail: `https://img.youtube.com/vi/3ucCEjXS9n8/maxresdefault.jpg`,
    category: 'bhajan'
  },
  {
    id: 3,
    videoId: 'cFGHAavFIug', // ✅ Shree Krishna Govind by Jagjit Singh
    title: 'Shree Krishna Govind',
    subtitle: 'श्री कृष्ण गोविंद',
    artist: 'Jagjit Singh',
    duration: '7:20',
    backgroundColor: '#228B22',
    thumbnail: `https://img.youtube.com/vi/cFGHAavFIug/maxresdefault.jpg`,
    category: 'bhajan'
  }
];

const ramayanData = [
  {
    id: 4,
    videoId: 'SqQpZEP8-oM', // ⛔ Use only if verified
    title: 'Ramayan Episode 1',
    subtitle: 'रामायण प्रसंग १',
    artist: 'Ramanand Sagar',
    duration: '45:00',
    backgroundColor: '#2E8B57',
    thumbnail: `https://img.youtube.com/vi/SqQpZEP8-oM/maxresdefault.jpg`,
    category: 'ramayan'
  },
  {
    id: 5,
    videoId: 'Nq-bOBvbdmM', // ⛔ Use only if verified
    title: 'Ram Katha',
    subtitle: 'राम कथा',
    artist: 'Morari Bapu',
    duration: '52:30',
    backgroundColor: '#20B2AA',
    thumbnail: `https://img.youtube.com/vi/Nq-bOBvbdmM/maxresdefault.jpg`,
    category: 'ramayan'
  }
];

const classicMoviesData = [
  {
    id: 7,
    videoId: 'Y84_C9sJ-ic', // ✅ Mughal-E-Azam Songs by Naushad
    title: 'Mughal-E-Azam Songs',
    subtitle: 'मुगल-ए-आज़म के गाने',
    artist: 'Naushad',
    duration: '25:40',
    backgroundColor: '#F5F5DC',
    thumbnail: `https://img.youtube.com/vi/Y84_C9sJ-ic/maxresdefault.jpg`,
    category: 'classic'
  },
  {
    id: 8,
    videoId: 'jsF-GjBZBlE', // ⛔ Sholay Dialogues (not exact, you may update)
    title: 'Sholay Dialogues',
    subtitle: 'शोले के संवाद',
    artist: 'Ramesh Sippy',
    duration: '15:30',
    backgroundColor: '#DEB887',
    thumbnail: `https://img.youtube.com/vi/jsF-GjBZBlE/maxresdefault.jpg`,
    category: 'classic'
  }
];

const youtubeData = [
  {
    id: 10,
    videoId: 'l00InLrEb7o', // ✅ Yoga for Seniors by Ramdev
    title: 'Yoga for Seniors',
    subtitle: 'बुजुर्गों के लिए योग',
    artist: 'Baba Ramdev',
    duration: '20:15',
    backgroundColor: '#87CEEB',
    thumbnail: `https://img.youtube.com/vi/l00InLrEb7o/maxresdefault.jpg`,
    category: 'youtube'
  },
  {
    id: 11,
    videoId: 'VVnZOO5GGmw', // ⛔ Use only if verified or update with better match
    title: 'Cooking Recipes',
    subtitle: 'खाना बनाने की विधि',
    artist: 'Nisha Madhulika',
    duration: '12:45',
    backgroundColor: '#F0E68C',
    thumbnail: `https://img.youtube.com/vi/VVnZOO5GGmw/maxresdefault.jpg`,
    category: 'youtube'
  }
];

  const allContent = [...bhajansData, ...ramayanData, ...classicMoviesData, ...youtubeData];

  const handlePlay = (item) => {
    setSelectedVideo(item);
    setCurrentlyPlaying(item.id);
    setIsVideoModalVisible(true);
    setIsPlaying(true);
  };

  const handleCloseVideo = () => {
    setIsVideoModalVisible(false);
    setSelectedVideo(null);
    setCurrentlyPlaying(null);
    setIsPlaying(false);
    setIsFullscreen(false);
  };

  const handleFavorite = (itemId) => {
    const newFavorites = new Set(favorites);
    if (newFavorites.has(itemId)) {
      newFavorites.delete(itemId);
    } else {
      newFavorites.add(itemId);
    }
    setFavorites(newFavorites);
  };

  const handleShare = (item) => {
    Alert.alert(
      'Share / साझा करें',
      `${item.title} को share करें`,
      [
        { text: 'Cancel / रद्द करें', style: 'cancel' },
        { text: 'Share / साझा करें', onPress: () => console.log('Sharing:', item.title) }
      ]
    );
  };

  const handleDownload = (item) => {
    Alert.alert(
      'Download / डाउनलोड',
      'Video download करने के लिए premium subscription की जरूरत है\nPremium subscription required for video download',
      [{ text: 'OK', style: 'default' }]
    );
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  const onStateChange = React.useCallback((state) => {
    if (state === 'ended') {
      setIsPlaying(false);
    }
  }, []);

  const ContentSection = ({ title, data, titleHindi }) => (
    <View style={styles.section}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>{title}</Text>
        {titleHindi && <Text style={styles.sectionTitleHindi}>{titleHindi}</Text>}
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalScroll}>
        <View style={styles.cardContainer}>
          {data.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={styles.contentCard}
              activeOpacity={0.8}
              onPress={() => handlePlay(item)}
            >
              <View style={styles.cardImageContainer}>
                <Image 
                  source={{ uri: item.thumbnail }}
                  style={styles.thumbnailImage}
                  resizeMode="cover"
                />
                <View style={styles.thumbnailOverlay} />
                <TouchableOpacity 
                  style={styles.playButton}
                  onPress={() => handlePlay(item)}
                >
                  <Play size={20} color="#FFFFFF" fill="#FFFFFF" />
                </TouchableOpacity>
                <View style={styles.durationBadge}>
                  <Text style={styles.durationText}>{item.duration}</Text>
                </View>
              </View>
              <View style={styles.cardContent}>
                <Text style={styles.cardTitle} numberOfLines={2}>{item.title}</Text>
                <Text style={styles.cardSubtitle} numberOfLines={1}>{item.subtitle}</Text>
                <Text style={styles.cardArtist} numberOfLines={1}>{item.artist}</Text>
              </View>
              <View style={styles.cardActions}>
                <TouchableOpacity 
                  style={[styles.actionButton, favorites.has(item.id) && styles.favoriteActive]}
                  onPress={() => handleFavorite(item.id)}
                >
                  <Heart 
                    size={16} 
                    color={favorites.has(item.id) ? "#EF4444" : "#666666"} 
                    fill={favorites.has(item.id) ? "#EF4444" : "none"}
                    strokeWidth={2} 
                  />
                </TouchableOpacity>
                <TouchableOpacity 
                  style={styles.actionButton}
                  onPress={() => handleDownload(item)}
                >
                  <Download size={16} color="#666666" strokeWidth={2} />
                </TouchableOpacity>
                <TouchableOpacity 
                  style={styles.actionButton}
                  onPress={() => handleShare(item)}
                >
                  <Share size={16} color="#666666" strokeWidth={2} />
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );

  const VideoModal = () => (
    <Modal
      visible={isVideoModalVisible}
      animationType="slide"
      presentationStyle={isFullscreen ? "fullScreen" : "pageSheet"}
      onRequestClose={handleCloseVideo}
    >
      <View style={[styles.videoModalContainer, isFullscreen && styles.fullscreenContainer]}>
        {/* Video Header */}
        <View style={styles.videoHeader}>
          <TouchableOpacity style={styles.closeButton} onPress={handleCloseVideo}>
            <X size={24} color="#FFFFFF" strokeWidth={2} />
          </TouchableOpacity>
          <View style={styles.videoHeaderInfo}>
            <Text style={styles.videoTitle} numberOfLines={1}>
              {selectedVideo?.title}
            </Text>
            <Text style={styles.videoArtist} numberOfLines={1}>
              {selectedVideo?.artist}
            </Text>
          </View>
          <TouchableOpacity style={styles.fullscreenButton} onPress={toggleFullscreen}>
            {isFullscreen ? (
              <Minimize size={24} color="#FFFFFF" strokeWidth={2} />
            ) : (
              <Maximize size={24} color="#FFFFFF" strokeWidth={2} />
            )}
          </TouchableOpacity>
        </View>

        {/* YouTube Video Player */}
        <View style={[styles.videoContainer, isFullscreen && styles.fullscreenVideo]}>
          {selectedVideo && (
            <View style={styles.youtubePlayerWrapper}>
              <YoutubePlayer
                height={isFullscreen ? height - 100 : (width * 9) / 16}
                width={width}
                play={isPlaying}
                videoId={selectedVideo.videoId}
                onChangeState={onStateChange}
                webViewStyle={styles.youtubePlayer}
                webViewProps={{
                  injectedJavaScript: `
                    const meta = document.createElement('meta'); 
                    meta.setAttribute('content', 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0'); 
                    meta.setAttribute('name', 'viewport'); 
                    document.getElementsByTagName('head')[0].appendChild(meta);
                  `,
                }}
              />
            </View>
          )}
        </View>

        {/* Video Info (only in non-fullscreen) */}
        {!isFullscreen && selectedVideo && (
          <View style={styles.videoInfo}>
            <Text style={styles.videoInfoTitle}>{selectedVideo.title}</Text>
            <Text style={styles.videoInfoSubtitle}>{selectedVideo.subtitle}</Text>
            <Text style={styles.videoInfoArtist}>by {selectedVideo.artist}</Text>
            
            <View style={styles.videoActions}>
              <TouchableOpacity 
                style={[styles.videoActionButton, favorites.has(selectedVideo.id) && styles.favoriteActive]}
                onPress={() => handleFavorite(selectedVideo.id)}
              >
                <Heart 
                  size={20} 
                  color={favorites.has(selectedVideo.id) ? "#EF4444" : "#666666"} 
                  fill={favorites.has(selectedVideo.id) ? "#EF4444" : "none"}
                  strokeWidth={2} 
                />
                <Text style={styles.actionButtonText}>
                  {favorites.has(selectedVideo.id) ? 'पसंदीदा' : 'पसंद करें'}
                </Text>
                <Text style={styles.actionButtonTextEn}>
                  {favorites.has(selectedVideo.id) ? 'Favorite' : 'Like'}
                </Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={styles.videoActionButton}
                onPress={() => handleShare(selectedVideo)}
              >
                <Share size={20} color="#666666" strokeWidth={2} />
                <Text style={styles.actionButtonText}>साझा करें</Text>
                <Text style={styles.actionButtonTextEn}>Share</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={styles.videoActionButton}
                onPress={() => handleDownload(selectedVideo)}
              >
                <Download size={20} color="#666666" strokeWidth={2} />
                <Text style={styles.actionButtonText}>डाउनलोड</Text>
                <Text style={styles.actionButtonTextEn}>Download</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>
    </Modal>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerContent}>
            <Text style={styles.headerTitle}>मनोरंजन</Text>
            <Text style={styles.headerSubtitle}>Entertainment</Text>
          </View>
        </View>

        {/* Featured Content */}
        <LinearGradient
          colors={['#FF6B35', '#FF8A50']}
          style={styles.featuredCard}
        >
          <View style={styles.featuredContent}>
            <View style={styles.featuredText}>
              <Text style={styles.featuredTitle}>आज का विशेष</Text>
              <Text style={styles.featuredSubtitle}>Today's Special</Text>
              <Text style={styles.featuredDescription}>
                हनुमान चालीसा - सुबह की शुरुआत भक्ति के साथ करें
              </Text>
              <Text style={styles.featuredDescriptionEn}>
                Start your morning with devotion
              </Text>
              <TouchableOpacity 
                style={styles.featuredButton}
                onPress={() => handlePlay(bhajansData[0])}
              >
                <Play size={16} color="#FF6B35" fill="#FF6B35" />
                <Text style={styles.featuredButtonText}>अभी देखें / Watch Now</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.featuredImage}>
              <Text style={styles.featuredEmoji}>🕉️</Text>
            </View>
          </View>
        </LinearGradient>

        {/* Content Sections */}
        <ContentSection title="भजन" titleHindi="Bhajans" data={bhajansData} />
        <ContentSection title="रामायण" titleHindi="Ramayan" data={ramayanData} />
        <ContentSection title="पुरानी फिल्में" titleHindi="Classic Movies" data={classicMoviesData} />
        <ContentSection title="यूट्यूब वीडियो" titleHindi="YouTube Videos" data={youtubeData} />

        <View style={styles.bottomSpacing} />
      </ScrollView>

      {/* Video Modal */}
      <VideoModal />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    padding: 20,
    paddingTop: 50,
    backgroundColor: '#FFFFFF',
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    marginBottom: 20,
  },
  headerContent: {
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1F2937',
  },
  headerSubtitle: {
    fontSize: 18,
    color: '#6B7280',
    marginTop: 4,
  },
  featuredCard: {
    margin: 20,
    borderRadius: 20,
    elevation: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    marginBottom: 32,
  },
  featuredContent: {
    flexDirection: 'row',
    padding: 24,
    alignItems: 'center',
  },
  featuredText: {
    flex: 1,
  },
  featuredTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  featuredSubtitle: {
    fontSize: 14,
    color: '#FFFFFF',
    opacity: 0.9,
    marginBottom: 8,
  },
  featuredDescription: {
    fontSize: 14,
    color: '#FFFFFF',
    opacity: 0.8,
    lineHeight: 20,
    marginBottom: 4,
  },
  featuredDescriptionEn: {
    fontSize: 12,
    color: '#FFFFFF',
    opacity: 0.7,
    lineHeight: 16,
    marginBottom: 16,
  },
  featuredButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    gap: 6,
    alignSelf: 'flex-start',
  },
  featuredButtonText: {
    color: '#FF6B35',
    fontSize: 14,
    fontWeight: '600',
  },
  featuredImage: {
    marginLeft: 20,
  },
  featuredEmoji: {
    fontSize: 48,
  },
  section: {
    marginBottom: 32,
  },
  sectionHeader: {
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 4,
  },
  sectionTitleHindi: {
    fontSize: 16,
    fontWeight: '500',
    color: '#6B7280',
  },
  horizontalScroll: {
    paddingLeft: 20,
  },
  cardContainer: {
    flexDirection: 'row',
    gap: 16,
    paddingRight: 20,
  },
  contentCard: {
    width: 200,
    borderRadius: 16,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    overflow: 'hidden',
    backgroundColor: '#FFFFFF',
  },
  cardImageContainer: {
    height: 120,
    position: 'relative',
    overflow: 'hidden',
  },
  thumbnailImage: {
    width: '100%',
    height: '100%',
  },
  thumbnailOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
  },
  playButton: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    alignItems: 'center',
    justifyContent: 'center',
    transform: [{ translateX: -24 }, { translateY: -24 }],
  },
  durationBadge: {
    position: 'absolute',
    bottom: 8,
    right: 8,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  durationText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
  cardContent: {
    padding: 12,
    minHeight: 85,
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 4,
    lineHeight: 20,
  },
  cardSubtitle: {
    fontSize: 13,
    color: '#6B7280',
    lineHeight: 18,
    marginBottom: 4,
  },
  cardArtist: {
    fontSize: 12,
    color: '#9CA3AF',
    lineHeight: 16,
  },
  cardActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 12,
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
  },
  actionButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#F9FAFB',
    alignItems: 'center',
    justifyContent: 'center',
  },
  favoriteActive: {
    backgroundColor: '#FEE2E2',
  },
  bottomSpacing: {
    height: 20,
  },
  
  // Video Modal Styles
  videoModalContainer: {
    flex: 1,
    backgroundColor: '#000000',
  },
  fullscreenContainer: {
    backgroundColor: '#000000',
  },
  videoHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    paddingTop: 50,
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
    zIndex: 1000,
  },
  closeButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  videoHeaderInfo: {
    flex: 1,
    marginHorizontal: 16,
  },
  videoTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 2,
  },
  videoArtist: {
    fontSize: 14,
    color: '#D1D5DB',
  },
  fullscreenButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  videoContainer: {
    backgroundColor: '#000000',
    width: '100%',
  },
  youtubePlayerWrapper: {
    width: '100%',
    height: '100%',
    backgroundColor: '#000000',
  },
  youtubePlayer: {
    backgroundColor: '#000000',
    margin: 0,
    padding: 0,
  },
  videoInfo: {
    backgroundColor: '#FFFFFF',
    padding: 20,
  },
  videoInfoTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 4,
  },
  videoInfoSubtitle: {
    fontSize: 16,
    color: '#6B7280',
    marginBottom: 8,
  },
  videoInfoArtist: {
    fontSize: 14,
    color: '#9CA3AF',
    marginBottom: 20,
  },
  videoActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  videoActionButton: {
    alignItems: 'center',
    padding: 12,
    borderRadius: 12,
    backgroundColor: '#F9FAFB',
    minWidth: 80,
  },
  actionButtonText: {
    fontSize: 12,
    color: '#374151',
    marginTop: 4,
    fontWeight: '600',
    textAlign: 'center',
  },
  actionButtonTextEn: {
    fontSize: 10,
    color: '#6B7280',
    marginTop: 2,
    fontWeight: '500',
    textAlign: 'center',
  },
});