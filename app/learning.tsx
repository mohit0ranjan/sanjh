import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView, Modal, Alert, Dimensions } from 'react-native';
import { ArrowLeft, Play, BookOpen, Smartphone, Wifi, Camera, MessageCircle, Video, CircleCheck as CheckCircle, Lock, Star, Trophy, Target, Clock, X, RotateCcw } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

export default function LearningScreen() {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = React.useState(null);
  const [selectedLesson, setSelectedLesson] = React.useState(null);
  const [isLessonModalVisible, setIsLessonModalVisible] = React.useState(false);
  const [currentStep, setCurrentStep] = React.useState(0);
  const [completedLessons, setCompletedLessons] = React.useState(new Set([1, 2, 3])); // Demo completed lessons
  const [userProgress, setUserProgress] = React.useState({
    totalLessons: 33,
    completedLessons: 12,
    currentStreak: 5,
    totalPoints: 240
  });

  const tutorialCategories = [
    {
      id: 1,
      title: 'फोन की मूल बातें',
      subtitle: 'Phone Basics',
      description: 'कॉल करना, मैसेज भेजना',
      icon: Smartphone,
      color: '#3B82F6',
      gradient: ['#EBF8FF', '#DBEAFE'],
      lessons: [
        {
          id: 1,
          title: 'फोन को चालू/बंद करना',
          subtitle: 'Turn Phone On/Off',
          duration: '3 मिनट',
          difficulty: 'आसान',
          steps: [
            'पावर बटन को 3 सेकंड तक दबाएं',
            'स्क्रीन पर लाइट आने का इंतजार करें',
            'बंद करने के लिए फिर से पावर बटन दबाएं'
          ]
        },
        {
          id: 2,
          title: 'कॉल करना',
          subtitle: 'Making Calls',
          duration: '5 मिनट',
          difficulty: 'आसान',
          steps: [
            'फोन ऐप खोलें',
            'नंबर डायल करें',
            'हरे बटन को दबाएं',
            'बात खत्म होने पर लाल बटन दबाएं'
          ]
        },
        {
          id: 3,
          title: 'कॉल रिसीव करना',
          subtitle: 'Receiving Calls',
          duration: '4 मिनट',
          difficulty: 'आसान',
          steps: [
            'फोन की रिंग सुनें',
            'हरे बटन को स्वाइप करें',
            'फोन को कान के पास रखें',
            'बात खत्म होने पर लाल बटन दबाएं'
          ]
        }
      ]
    },
    {
      id: 2,
      title: 'इंटरनेट का उपयोग',
      subtitle: 'Using Internet',
      description: 'वेब ब्राउज़िंग, सर्च करना',
      icon: Wifi,
      color: '#10B981',
      gradient: ['#ECFDF5', '#D1FAE5'],
      lessons: [
        {
          id: 4,
          title: 'WiFi से जुड़ना',
          subtitle: 'Connect to WiFi',
          duration: '6 मिनट',
          difficulty: 'मध्यम',
          steps: [
            'सेटिंग्स खोलें',
            'WiFi ऑप्शन पर टैप करें',
            'अपना नेटवर्क चुनें',
            'पासवर्ड डालें',
            'Connect बटन दबाएं'
          ]
        },
        {
          id: 5,
          title: 'गूगल पर सर्च करना',
          subtitle: 'Google Search',
          duration: '8 मिनट',
          difficulty: 'मध्यम',
          steps: [
            'Chrome ब्राउज़र खोलें',
            'सर्च बार पर टैप करें',
            'अपना सवाल टाइप करें',
            'Enter दबाएं',
            'परिणाम देखें'
          ]
        }
      ]
    },
    {
      id: 3,
      title: 'फोटो और वीडियो',
      subtitle: 'Photos & Videos',
      description: 'तस्वीरें लेना, देखना',
      icon: Camera,
      color: '#F59E0B',
      gradient: ['#FFFBEB', '#FEF3C7'],
      lessons: [
        {
          id: 6,
          title: 'फोटो खींचना',
          subtitle: 'Taking Photos',
          duration: '5 मिनट',
          difficulty: 'आसान',
          steps: [
            'कैमरा ऐप खोलें',
            'फोटो मोड चुनें',
            'सब्जेक्ट पर फोकस करें',
            'शटर बटन दबाएं'
          ]
        },
        {
          id: 7,
          title: 'गैलरी में फोटो देखना',
          subtitle: 'View Photos in Gallery',
          duration: '4 मिनट',
          difficulty: 'आसान',
          steps: [
            'गैलरी ऐप खोलें',
            'फोटो पर टैप करें',
            'स्वाइप करके अन्य फोटो देखें',
            'ज़ूम करने के लिए पिंच करें'
          ]
        }
      ]
    },
    {
      id: 4,
      title: 'व्हाट्सऐप सीखें',
      subtitle: 'Learn WhatsApp',
      description: 'मैसेज, कॉल, ग्रुप चैट',
      icon: MessageCircle,
      color: '#8B5CF6',
      gradient: ['#F5F3FF', '#EDE9FE'],
      lessons: [
        {
          id: 8,
          title: 'व्हाट्सऐप इंस्टॉल करना',
          subtitle: 'Install WhatsApp',
          duration: '10 मिनट',
          difficulty: 'मध्यम',
          steps: [
            'Play Store खोलें',
            'WhatsApp सर्च करें',
            'Install बटन दबाएं',
            'ऐप डाउनलोड होने का इंतजार करें',
            'Open बटन दबाएं'
          ]
        },
        {
          id: 9,
          title: 'मैसेज भेजना',
          subtitle: 'Send Messages',
          duration: '7 मिनट',
          difficulty: 'आसान',
          steps: [
            'व्हाट्सऐप खोलें',
            'संपर्क चुनें',
            'मैसेज बॉक्स में टाइप करें',
            'Send बटन दबाएं'
          ]
        },
        {
          id: 10,
          title: 'वॉयस मैसेज भेजना',
          subtitle: 'Send Voice Messages',
          duration: '6 मिनट',
          difficulty: 'मध्यम',
          steps: [
            'चैट खोलें',
            'माइक बटन दबाकर रखें',
            'अपना मैसेज बोलें',
            'बटन छोड़ें'
          ]
        }
      ]
    },
    {
      id: 5,
      title: 'वीडियो कॉल',
      subtitle: 'Video Calling',
      description: 'परिवार से बात करें',
      icon: Video,
      color: '#EF4444',
      gradient: ['#FEF2F2', '#FECACA'],
      lessons: [
        {
          id: 11,
          title: 'व्हाट्सऐप वीडियो कॉल',
          subtitle: 'WhatsApp Video Call',
          duration: '8 मिनट',
          difficulty: 'मध्यम',
          steps: [
            'व्हाट्सऐप में संपर्क खोलें',
            'वीडियो कॉल आइकन दबाएं',
            'कॉल कनेक्ट होने का इंतजार करें',
            'कैमरा ऑन/ऑफ करें',
            'कॉल खत्म करने के लिए लाल बटन दबाएं'
          ]
        }
      ]
    }
  ];

  const quickTips = [
    {
      id: 1,
      tip: 'फोन को धीरे से पकड़ें',
      subtitle: 'Hold phone gently',
      icon: '📱',
      completed: true
    },
    {
      id: 2,
      tip: 'स्क्रीन को साफ रखें',
      subtitle: 'Keep screen clean',
      icon: '✨',
      completed: true
    },
    {
      id: 3,
      tip: 'बैटरी चार्ज करना न भूलें',
      subtitle: 'Remember to charge',
      icon: '🔋',
      completed: false
    },
    {
      id: 4,
      tip: 'आवाज़ तेज़ करने के लिए साइड बटन दबाएं',
      subtitle: 'Use side buttons for volume',
      icon: '🔊',
      completed: false
    }
  ];

  const achievements = [
    { id: 1, title: 'पहला कदम', subtitle: 'First Step', icon: '🎯', unlocked: true },
    { id: 2, title: 'कॉल मास्टर', subtitle: 'Call Master', icon: '📞', unlocked: true },
    { id: 3, title: 'फोटो एक्सपर्ट', subtitle: 'Photo Expert', icon: '📸', unlocked: false },
    { id: 4, title: 'व्हाट्सऐप प्रो', subtitle: 'WhatsApp Pro', icon: '💬', unlocked: false }
  ];

  const handleCategoryPress = (category) => {
    setSelectedCategory(category);
  };

  const handleLessonPress = (lesson) => {
    setSelectedLesson(lesson);
    setCurrentStep(0);
    setIsLessonModalVisible(true);
  };

  const handleNextStep = () => {
    if (currentStep < selectedLesson.steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleCompleteLesson();
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleCompleteLesson = () => {
    const newCompletedLessons = new Set(completedLessons);
    newCompletedLessons.add(selectedLesson.id);
    setCompletedLessons(newCompletedLessons);
    
    setUserProgress(prev => ({
      ...prev,
      completedLessons: prev.completedLessons + 1,
      totalPoints: prev.totalPoints + 20,
      currentStreak: prev.currentStreak + 1
    }));

    Alert.alert(
      'बधाई हो! / Congratulations!',
      `आपने "${selectedLesson.title}" पूरा किया!\nYou completed "${selectedLesson.subtitle}"!\n\n+20 अंक मिले / +20 Points Earned`,
      [
        {
          text: 'अगला पाठ / Next Lesson',
          onPress: () => {
            setIsLessonModalVisible(false);
            // Find next lesson
            const allLessons = tutorialCategories.flatMap(cat => cat.lessons);
            const currentIndex = allLessons.findIndex(l => l.id === selectedLesson.id);
            if (currentIndex < allLessons.length - 1) {
              handleLessonPress(allLessons[currentIndex + 1]);
            }
          }
        },
        {
          text: 'वापस जाएं / Go Back',
          onPress: () => setIsLessonModalVisible(false)
        }
      ]
    );
  };

  const handleRestartLesson = () => {
    setCurrentStep(0);
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'आसान': return '#10B981';
      case 'मध्यम': return '#F59E0B';
      case 'कठिन': return '#EF4444';
      default: return '#6B7280';
    }
  };

  const LessonModal = () => (
    <Modal
      visible={isLessonModalVisible}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={() => setIsLessonModalVisible(false)}
    >
      <View style={styles.lessonModalContainer}>
        {/* Header */}
        <LinearGradient
          colors={selectedCategory ? selectedCategory.gradient : ['#EBF8FF', '#DBEAFE']}
          style={styles.lessonHeader}
        >
          <TouchableOpacity 
            style={styles.lessonCloseButton} 
            onPress={() => setIsLessonModalVisible(false)}
          >
            <X size={24} color={selectedCategory?.color || '#3B82F6'} strokeWidth={2} />
          </TouchableOpacity>
          
          <View style={styles.lessonHeaderContent}>
            <Text style={[styles.lessonTitle, { color: selectedCategory?.color || '#3B82F6' }]}>
              {selectedLesson?.title}
            </Text>
            <Text style={styles.lessonSubtitle}>{selectedLesson?.subtitle}</Text>
            
            <View style={styles.lessonMeta}>
              <View style={styles.metaItem}>
                <Clock size={16} color="#6B7280" strokeWidth={2} />
                <Text style={styles.metaText}>{selectedLesson?.duration}</Text>
              </View>
              <View style={styles.metaItem}>
                <Target size={16} color={getDifficultyColor(selectedLesson?.difficulty)} strokeWidth={2} />
                <Text style={[styles.metaText, { color: getDifficultyColor(selectedLesson?.difficulty) }]}>
                  {selectedLesson?.difficulty}
                </Text>
              </View>
            </View>
          </View>

          <TouchableOpacity style={styles.restartButton} onPress={handleRestartLesson}>
            <RotateCcw size={20} color={selectedCategory?.color || '#3B82F6'} strokeWidth={2} />
          </TouchableOpacity>
        </LinearGradient>

        {/* Progress Bar */}
        <View style={styles.progressContainer}>
          <View style={styles.progressBar}>
            <View 
              style={[
                styles.progressFill, 
                { 
                  width: `${((currentStep + 1) / (selectedLesson?.steps.length || 1)) * 100}%`,
                  backgroundColor: selectedCategory?.color || '#3B82F6'
                }
              ]} 
            />
          </View>
          <Text style={styles.progressText}>
            {currentStep + 1} / {selectedLesson?.steps.length || 0}
          </Text>
        </View>

        {/* Step Content */}
        <ScrollView style={styles.stepContent}>
          <View style={styles.stepContainer}>
            <View style={[styles.stepNumber, { backgroundColor: selectedCategory?.color || '#3B82F6' }]}>
              <Text style={styles.stepNumberText}>{currentStep + 1}</Text>
            </View>
            
            <Text style={styles.stepTitle}>चरण {currentStep + 1}</Text>
            <Text style={styles.stepTitleEn}>Step {currentStep + 1}</Text>
            
            <View style={styles.stepInstructionCard}>
              <Text style={styles.stepInstruction}>
                {selectedLesson?.steps[currentStep]}
              </Text>
            </View>

            {/* Visual Aid Placeholder */}
            <View style={styles.visualAid}>
              <Text style={styles.visualAidEmoji}>📱</Text>
              <Text style={styles.visualAidText}>
                यहाँ एक तस्वीर या वीडियो होगी
              </Text>
              <Text style={styles.visualAidTextEn}>
                Visual guide will appear here
              </Text>
            </View>

            {/* Tips */}
            <View style={styles.tipCard}>
              <Text style={styles.tipTitle}>💡 सुझाव / Tip</Text>
              <Text style={styles.tipText}>
                धीरे-धीरे करें और जल्दबाजी न करें। अभ्यास से सब कुछ आसान हो जाता है।
              </Text>
              <Text style={styles.tipTextEn}>
                Take your time and don't rush. Practice makes everything easier.
              </Text>
            </View>
          </View>
        </ScrollView>

        {/* Navigation Buttons */}
        <View style={styles.navigationContainer}>
          <TouchableOpacity 
            style={[styles.navButton, styles.prevButton, currentStep === 0 && styles.disabledButton]}
            onPress={handlePrevStep}
            disabled={currentStep === 0}
          >
            <Text style={[styles.navButtonText, currentStep === 0 && styles.disabledButtonText]}>
              पिछला / Previous
            </Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.navButton, styles.nextButton, { backgroundColor: selectedCategory?.color || '#3B82F6' }]}
            onPress={handleNextStep}
          >
            <Text style={styles.nextButtonText}>
              {currentStep === (selectedLesson?.steps.length || 1) - 1 ? 'पूरा करें / Complete' : 'अगला / Next'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );

  if (selectedCategory) {
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
          {/* Category Header */}
          <View style={styles.categoryHeader}>
            <TouchableOpacity style={styles.backButton} onPress={() => setSelectedCategory(null)}>
              <ArrowLeft size={24} color="#1F2937" strokeWidth={2} />
            </TouchableOpacity>
            <View style={styles.categoryHeaderContent}>
              <Text style={styles.categoryTitle}>{selectedCategory.title}</Text>
              <Text style={styles.categorySubtitle}>{selectedCategory.subtitle}</Text>
            </View>
          </View>

          {/* Lessons List */}
          <View style={styles.lessonsContainer}>
            {selectedCategory.lessons.map((lesson, index) => {
              const isCompleted = completedLessons.has(lesson.id);
              const isLocked = index > 0 && !completedLessons.has(selectedCategory.lessons[index - 1].id);
              
              return (
                <TouchableOpacity
                  key={lesson.id}
                  style={[
                    styles.lessonCard,
                    isCompleted && styles.completedLessonCard,
                    isLocked && styles.lockedLessonCard
                  ]}
                  onPress={() => !isLocked && handleLessonPress(lesson)}
                  disabled={isLocked}
                >
                  <View style={styles.lessonCardContent}>
                    <View style={styles.lessonLeft}>
                      <View style={[
                        styles.lessonIcon,
                        { backgroundColor: isCompleted ? '#10B981' : isLocked ? '#9CA3AF' : selectedCategory.color }
                      ]}>
                        {isCompleted ? (
                          <CheckCircle size={24} color="#FFFFFF" strokeWidth={2} />
                        ) : isLocked ? (
                          <Lock size={24} color="#FFFFFF" strokeWidth={2} />
                        ) : (
                          <Play size={24} color="#FFFFFF" strokeWidth={2} />
                        )}
                      </View>
                      <View style={styles.lessonInfo}>
                        <Text style={[styles.lessonCardTitle, isLocked && styles.lockedText]}>
                          {lesson.title}
                        </Text>
                        <Text style={[styles.lessonCardSubtitle, isLocked && styles.lockedText]}>
                          {lesson.subtitle}
                        </Text>
                        <View style={styles.lessonMeta}>
                          <Text style={[styles.lessonDuration, isLocked && styles.lockedText]}>
                            {lesson.duration}
                          </Text>
                          <View style={styles.metaDivider} />
                          <Text style={[
                            styles.lessonDifficulty,
                            { color: isLocked ? '#9CA3AF' : getDifficultyColor(lesson.difficulty) }
                          ]}>
                            {lesson.difficulty}
                          </Text>
                        </View>
                      </View>
                    </View>
                    {isCompleted && (
                      <View style={styles.completedBadge}>
                        <Star size={16} color="#F59E0B" fill="#F59E0B" strokeWidth={2} />
                      </View>
                    )}
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
        </ScrollView>
        <LessonModal />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
            <ArrowLeft size={24} color="#1F2937" strokeWidth={2} />
          </TouchableOpacity>
          <View style={styles.headerCenter}>
            <Text style={styles.headerTitle}>सीखें</Text>
            <Text style={styles.headerSubtitle}>Learning</Text>
          </View>
          <View style={styles.headerSpacer} />
        </View>

        {/* Progress Card */}
        <LinearGradient
          colors={['#FFF8F0', '#FFE4CC']}
          style={styles.progressCard}
        >
          <View style={styles.progressContent}>
            <Trophy size={24} color="#FF6B35" strokeWidth={2} />
            <Text style={styles.progressTitle}>आपकी प्रगति</Text>
            <Text style={styles.progressSubtitle}>Your Progress</Text>
            
            <View style={styles.progressStats}>
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>{userProgress.completedLessons}</Text>
                <Text style={styles.statLabel}>पूरे किए</Text>
              </View>
              <View style={styles.statDivider} />
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>{userProgress.totalLessons}</Text>
                <Text style={styles.statLabel}>कुल पाठ</Text>
              </View>
              <View style={styles.statDivider} />
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>{userProgress.totalPoints}</Text>
                <Text style={styles.statLabel}>अंक</Text>
              </View>
            </View>
            
            <View style={styles.progressBar}>
              <View 
                style={[
                  styles.progressFill, 
                  { width: `${(userProgress.completedLessons / userProgress.totalLessons) * 100}%` }
                ]} 
              />
            </View>
            
            <Text style={styles.progressPercentage}>
              {Math.round((userProgress.completedLessons / userProgress.totalLessons) * 100)}% पूरा
            </Text>
          </View>
        </LinearGradient>

        {/* Achievements */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>उपलब्धियां</Text>
          <Text style={styles.sectionSubtitle}>Achievements</Text>
          
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.achievementsScroll}>
            <View style={styles.achievementsContainer}>
              {achievements.map((achievement) => (
                <View 
                  key={achievement.id} 
                  style={[
                    styles.achievementCard,
                    !achievement.unlocked && styles.lockedAchievement
                  ]}
                >
                  <Text style={styles.achievementEmoji}>{achievement.icon}</Text>
                  <Text style={[
                    styles.achievementTitle,
                    !achievement.unlocked && styles.lockedText
                  ]}>
                    {achievement.title}
                  </Text>
                  <Text style={[
                    styles.achievementSubtitle,
                    !achievement.unlocked && styles.lockedText
                  ]}>
                    {achievement.subtitle}
                  </Text>
                  {!achievement.unlocked && (
                    <View style={styles.lockOverlay}>
                      <Lock size={20} color="#9CA3AF" strokeWidth={2} />
                    </View>
                  )}
                </View>
              ))}
            </View>
          </ScrollView>
        </View>

        {/* Tutorial Categories */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>ट्यूटोरियल श्रेणियां</Text>
          <Text style={styles.sectionSubtitle}>Tutorial Categories</Text>
          
          <View style={styles.categoriesContainer}>
            {tutorialCategories.map((category) => {
              const completedCount = category.lessons.filter(lesson => completedLessons.has(lesson.id)).length;
              const progressPercentage = (completedCount / category.lessons.length) * 100;
              
              return (
                <TouchableOpacity 
                  key={category.id} 
                  style={styles.categoryCard}
                  onPress={() => handleCategoryPress(category)}
                >
                  <LinearGradient
                    colors={category.gradient}
                    style={styles.categoryGradient}
                  >
                    <View style={styles.categoryHeader}>
                      <View style={[styles.categoryIcon, { backgroundColor: `${category.color}20` }]}>
                        <category.icon size={24} color={category.color} strokeWidth={2} />
                      </View>
                      <View style={styles.categoryProgress}>
                        <Text style={styles.categoryProgressText}>
                          {completedCount}/{category.lessons.length}
                        </Text>
                      </View>
                    </View>
                    
                    <View style={styles.categoryContent}>
                      <Text style={[styles.categoryTitle, { color: category.color }]}>
                        {category.title}
                      </Text>
                      <Text style={styles.categorySubtitle}>{category.subtitle}</Text>
                      <Text style={styles.categoryDescription}>{category.description}</Text>
                      
                      <View style={styles.categoryFooter}>
                        <View style={[styles.categoryProgressBar, { backgroundColor: `${category.color}20` }]}>
                          <View 
                            style={[
                              styles.categoryProgressFill, 
                              { 
                                width: `${progressPercentage}%`,
                                backgroundColor: category.color 
                              }
                            ]} 
                          />
                        </View>
                        <Text style={styles.categoryProgressPercentage}>
                          {Math.round(progressPercentage)}% पूरा
                        </Text>
                      </View>
                    </View>
                  </LinearGradient>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* Quick Tips */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>त्वरित सुझाव</Text>
          <Text style={styles.sectionSubtitle}>Quick Tips</Text>
          
          <View style={styles.tipsContainer}>
            {quickTips.map((tip) => (
              <TouchableOpacity 
                key={tip.id} 
                style={[styles.tipCard, tip.completed && styles.completedTipCard]}
              >
                <View style={styles.tipIcon}>
                  <Text style={styles.tipEmoji}>{tip.icon}</Text>
                  {tip.completed && (
                    <View style={styles.tipCompletedBadge}>
                      <CheckCircle size={16} color="#10B981" strokeWidth={2} />
                    </View>
                  )}
                </View>
                <View style={styles.tipContent}>
                  <Text style={[styles.tipText, tip.completed && styles.completedTipText]}>
                    {tip.tip}
                  </Text>
                  <Text style={styles.tipSubtitle}>{tip.subtitle}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Help Section */}
        <LinearGradient
          colors={['#EBF8FF', '#DBEAFE']}
          style={styles.helpCard}
        >
          <View style={styles.helpContent}>
            <Text style={styles.helpEmoji}>🤝</Text>
            <Text style={styles.helpTitle}>सहायता चाहिए?</Text>
            <Text style={styles.helpSubtitle}>Need Help?</Text>
            <Text style={styles.helpDescription}>
              यदि आपको कोई समस्या है तो हमसे संपर्क करें
            </Text>
            <TouchableOpacity style={styles.helpButton}>
              <Text style={styles.helpButtonText}>सहायता केंद्र</Text>
            </TouchableOpacity>
          </View>
        </LinearGradient>

        <View style={styles.bottomSpacing} />
      </ScrollView>
      
      <LessonModal />
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
    flexDirection: 'row',
    alignItems: 'center',
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
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerCenter: {
    flex: 1,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1F2937',
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#6B7280',
    marginTop: 2,
  },
  headerSpacer: {
    width: 40,
  },
  progressCard: {
    margin: 20,
    borderRadius: 20,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  progressContent: {
    padding: 24,
    alignItems: 'center',
  },
  progressTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FF6B35',
    marginTop: 8,
  },
  progressSubtitle: {
    fontSize: 14,
    color: '#D97706',
    marginTop: 2,
  },
  progressStats: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
    marginBottom: 16,
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: '700',
    color: '#92400E',
  },
  statLabel: {
    fontSize: 12,
    color: '#A16207',
    marginTop: 2,
  },
  statDivider: {
    width: 1,
    height: 30,
    backgroundColor: '#D97706',
    opacity: 0.3,
  },
  progressBar: {
    width: '100%',
    height: 8,
    backgroundColor: '#FDE68A',
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 8,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#FF6B35',
    borderRadius: 4,
  },
  progressPercentage: {
    fontSize: 14,
    fontWeight: '600',
    color: '#92400E',
  },
  section: {
    paddingHorizontal: 20,
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 4,
  },
  sectionSubtitle: {
    fontSize: 16,
    color: '#6B7280',
    marginBottom: 16,
  },
  achievementsScroll: {
    marginLeft: -20,
    paddingLeft: 20,
  },
  achievementsContainer: {
    flexDirection: 'row',
    gap: 16,
    paddingRight: 20,
  },
  achievementCard: {
    width: 120,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    position: 'relative',
  },
  lockedAchievement: {
    backgroundColor: '#F9FAFB',
    opacity: 0.6,
  },
  achievementEmoji: {
    fontSize: 32,
    marginBottom: 8,
  },
  achievementTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1F2937',
    textAlign: 'center',
    marginBottom: 2,
  },
  achievementSubtitle: {
    fontSize: 12,
    color: '#6B7280',
    textAlign: 'center',
  },
  lockOverlay: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  categoriesContainer: {
    gap: 16,
  },
  categoryCard: {
    borderRadius: 16,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  categoryGradient: {
    borderRadius: 16,
    padding: 20,
  },
  categoryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  categoryIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  categoryProgress: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  categoryProgressText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#374151',
  },
  categoryContent: {
    flex: 1,
  },
  categoryTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 4,
  },
  categorySubtitle: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 6,
  },
  categoryDescription: {
    fontSize: 14,
    color: '#374151',
    marginBottom: 16,
    lineHeight: 20,
  },
  categoryFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  categoryProgressBar: {
    flex: 1,
    height: 6,
    borderRadius: 3,
    overflow: 'hidden',
  },
  categoryProgressFill: {
    height: '100%',
    borderRadius: 3,
  },
  categoryProgressPercentage: {
    fontSize: 12,
    fontWeight: '600',
    color: '#374151',
  },
  tipsContainer: {
    gap: 12,
  },
  tipCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  completedTipCard: {
    backgroundColor: '#F0FDF4',
    borderWidth: 1,
    borderColor: '#BBF7D0',
  },
  tipIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#FFF8F0',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
    position: 'relative',
  },
  tipEmoji: {
    fontSize: 24,
  },
  tipCompletedBadge: {
    position: 'absolute',
    top: -4,
    right: -4,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  tipContent: {
    flex: 1,
  },
  tipText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 2,
  },
  completedTipText: {
    textDecorationLine: 'line-through',
    color: '#6B7280',
  },
  tipSubtitle: {
    fontSize: 14,
    color: '#6B7280',
  },
  helpCard: {
    margin: 20,
    borderRadius: 20,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  helpContent: {
    padding: 24,
    alignItems: 'center',
  },
  helpEmoji: {
    fontSize: 32,
    marginBottom: 8,
  },
  helpTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#3B82F6',
  },
  helpSubtitle: {
    fontSize: 14,
    color: '#1E40AF',
    marginTop: 2,
  },
  helpDescription: {
    fontSize: 14,
    color: '#374151',
    textAlign: 'center',
    marginTop: 8,
    lineHeight: 20,
  },
  helpButton: {
    backgroundColor: '#3B82F6',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    marginTop: 12,
  },
  helpButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  bottomSpacing: {
    height: 20,
  },
  lockedText: {
    color: '#9CA3AF',
  },

  // Category View Styles
  categoryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
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
  categoryHeaderContent: {
    flex: 1,
    alignItems: 'center',
  },
  lessonsContainer: {
    paddingHorizontal: 20,
  },
  lessonCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  completedLessonCard: {
    backgroundColor: '#F0FDF4',
    borderWidth: 1,
    borderColor: '#BBF7D0',
  },
  lockedLessonCard: {
    backgroundColor: '#F9FAFB',
    opacity: 0.6,
  },
  lessonCardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  lessonLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  lessonIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  lessonInfo: {
    flex: 1,
  },
  lessonCardTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 4,
  },
  lessonCardSubtitle: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 6,
  },
  lessonMeta: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  lessonDuration: {
    fontSize: 12,
    color: '#9CA3AF',
  },
  metaDivider: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#D1D5DB',
    marginHorizontal: 8,
  },
  lessonDifficulty: {
    fontSize: 12,
    fontWeight: '600',
  },
  completedBadge: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#FEF3C7',
    alignItems: 'center',
    justifyContent: 'center',
  },

  // Lesson Modal Styles
  lessonModalContainer: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  },
  lessonHeader: {
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 20,
  },
  lessonCloseButton: {
    position: 'absolute',
    top: 50,
    left: 20,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
  },
  restartButton: {
    position: 'absolute',
    top: 50,
    right: 20,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
  },
  lessonHeaderContent: {
    alignItems: 'center',
    paddingTop: 20,
  },
  lessonTitle: {
    fontSize: 20,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 4,
  },
  lessonSubtitle: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: 16,
  },
  lessonMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  metaText: {
    fontSize: 14,
    color: '#6B7280',
    fontWeight: '500',
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  progressBar: {
    flex: 1,
    height: 6,
    backgroundColor: '#F3F4F6',
    borderRadius: 3,
    overflow: 'hidden',
    marginRight: 12,
  },
  progressText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
  },
  stepContent: {
    flex: 1,
  },
  stepContainer: {
    padding: 20,
  },
  stepNumber: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginBottom: 16,
  },
  stepNumberText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  stepTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1F2937',
    textAlign: 'center',
    marginBottom: 4,
  },
  stepTitleEn: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: 24,
  },
  stepInstructionCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  stepInstruction: {
    fontSize: 18,
    color: '#1F2937',
    lineHeight: 26,
    textAlign: 'center',
  },
  visualAid: {
    backgroundColor: '#F9FAFB',
    borderRadius: 16,
    padding: 32,
    alignItems: 'center',
    marginBottom: 24,
    borderWidth: 2,
    borderColor: '#E5E7EB',
    borderStyle: 'dashed',
  },
  visualAidEmoji: {
    fontSize: 48,
    marginBottom: 12,
  },
  visualAidText: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: 4,
  },
  visualAidTextEn: {
    fontSize: 14,
    color: '#9CA3AF',
    textAlign: 'center',
  },
  tipCard: {
    backgroundColor: '#FFF8F0',
    borderRadius: 12,
    padding: 16,
    borderLeftWidth: 4,
    borderLeftColor: '#FF6B35',
  },
  tipTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#92400E',
    marginBottom: 8,
  },
  tipText: {
    fontSize: 14,
    color: '#A16207',
    lineHeight: 20,
    marginBottom: 4,
  },
  tipTextEn: {
    fontSize: 13,
    color: '#D97706',
    lineHeight: 18,
  },
  navigationContainer: {
    flexDirection: 'row',
    padding: 20,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
    gap: 12,
  },
  navButton: {
    flex: 1,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  prevButton: {
    backgroundColor: '#F3F4F6',
  },
  nextButton: {
    backgroundColor: '#3B82F6',
  },
  disabledButton: {
    backgroundColor: '#F9FAFB',
    opacity: 0.5,
  },
  navButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
  },
  nextButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  disabledButtonText: {
    color: '#9CA3AF',
  },
});