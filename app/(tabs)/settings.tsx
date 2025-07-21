import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView, Switch, Alert, Modal, TextInput, Linking } from 'react-native';
import { Bell, Moon, Type, Volume2, Shield, Info, CircleHelp as HelpCircle, LogOut, User, Mail, Phone, MapPin, X, Check, Volume1, VolumeX } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useSettings } from '@/contexts/SettingsContext';

export default function SettingsScreen() {
  const {
    notifications,
    darkMode,
    largeText,
    soundEnabled,
    userProfile,
    setNotifications,
    setDarkMode,
    setLargeText,
    setSoundEnabled,
    setUserProfile,
    getTextSize,
    getColors,
    playSound
  } = useSettings();

  const colors = getColors();
  const [isProfileModalVisible, setIsProfileModalVisible] = React.useState(false);
  const [isAboutModalVisible, setIsAboutModalVisible] = React.useState(false);
  const [isHelpModalVisible, setIsHelpModalVisible] = React.useState(false);
  const [isPrivacyModalVisible, setIsPrivacyModalVisible] = React.useState(false);
  const [tempProfile, setTempProfile] = React.useState(userProfile);

  React.useEffect(() => {
    setTempProfile(userProfile);
  }, [userProfile]);

  const handleNotificationToggle = async (value: boolean) => {
    playSound();
    await setNotifications(value);
    
    Alert.alert(
      value ? 'सूचनाएं चालू / Notifications On' : 'सूचनाएं बंद / Notifications Off',
      value 
        ? 'आपको अब सभी महत्वपूर्ण सूचनाएं मिलेंगी\nYou will now receive all important notifications'
        : 'सूचनाएं बंद कर दी गई हैं\nNotifications have been turned off'
    );
  };

  const handleDarkModeToggle = async (value: boolean) => {
    playSound();
    await setDarkMode(value);
    
    Alert.alert(
      'डार्क मोड / Dark Mode',
      value 
        ? 'डार्क मोड चालू किया गया\nDark mode enabled'
        : 'लाइट मोड चालू किया गया\nLight mode enabled'
    );
  };

  const handleLargeTextToggle = async (value: boolean) => {
    playSound();
    await setLargeText(value);
    
    Alert.alert(
      'टेक्स्ट साइज़ / Text Size',
      value 
        ? 'बड़ा टेक्स्ट चालू किया गया\nLarge text enabled'
        : 'सामान्य टेक्स्ट साइज़\nNormal text size'
    );
  };

  const handleSoundToggle = async (value: boolean) => {
    if (value) playSound(); // Play sound when enabling
    await setSoundEnabled(value);
    
    Alert.alert(
      value ? 'आवाज़ चालू / Sound On' : 'आवाज़ बंद / Sound Off',
      value 
        ? 'सिस्टम साउंड चालू किया गया\nSystem sounds enabled'
        : 'सिस्टम साउंड बंद किया गया\nSystem sounds disabled'
    );
  };

  const handleProfilePress = () => {
    playSound();
    setTempProfile(userProfile);
    setIsProfileModalVisible(true);
  };

  const handleSaveProfile = async () => {
    if (!tempProfile.name.trim() || !tempProfile.phone.trim()) {
      Alert.alert(
        'अधूरी जानकारी / Incomplete Information',
        'कृपया नाम और फोन नंबर दर्ज करें\nPlease enter name and phone number'
      );
      return;
    }

    playSound();
    await setUserProfile(tempProfile);
    setIsProfileModalVisible(false);
    
    Alert.alert(
      'प्रोफाइल अपडेट / Profile Updated',
      'आपकी प्रोफाइल सफलतापूर्वक अपडेट हो गई\nYour profile has been updated successfully'
    );
  };

  const handlePrivacyPress = () => {
    playSound();
    setIsPrivacyModalVisible(true);
  };

  const handleHelpPress = () => {
    playSound();
    setIsHelpModalVisible(true);
  };

  const handleAboutPress = () => {
    playSound();
    setIsAboutModalVisible(true);
  };

  const handleLogout = () => {
    playSound();
    Alert.alert(
      'लॉग आउट / Logout',
      'क्या आप वाकई लॉग आउट करना चाहते हैं?\nAre you sure you want to logout?',
      [
        { text: 'रद्द करें / Cancel', style: 'cancel' },
        { 
          text: 'लॉग आउट / Logout', 
          style: 'destructive',
          onPress: async () => {
            try {
              // Reset all settings to default
              await setNotifications(true);
              await setDarkMode(false);
              await setLargeText(false);
              await setSoundEnabled(true);
              
              Alert.alert(
                'लॉग आउट सफल / Logout Successful',
                'आप सफलतापूर्वक लॉग आउट हो गए हैं\nYou have been logged out successfully'
              );
            } catch (error) {
              Alert.alert('Error', 'लॉग आउट में समस्या\nError during logout');
            }
          }
        }
      ]
    );
  };

  const handleContactSupport = () => {
    playSound();
    Alert.alert(
      'सहायता संपर्क / Contact Support',
      'सहायता के लिए संपर्क करें:\nContact for support:',
      [
        { text: 'रद्द करें / Cancel', style: 'cancel' },
        { 
          text: 'कॉल करें / Call', 
          onPress: () => Linking.openURL('tel:+911234567890')
        },
        { 
          text: 'ईमेल / Email', 
          onPress: () => Linking.openURL('mailto:support@saanjh.app')
        }
      ]
    );
  };

  const handleResetSettings = () => {
    playSound();
    Alert.alert(
      'सेटिंग्स रीसेट / Reset Settings',
      'क्या आप सभी सेटिंग्स को डिफ़ॉल्ट पर रीसेट करना चाहते हैं?\nDo you want to reset all settings to default?',
      [
        { text: 'रद्द करें / Cancel', style: 'cancel' },
        { 
          text: 'रीसेट / Reset', 
          style: 'destructive',
          onPress: async () => {
            await setNotifications(true);
            await setDarkMode(false);
            await setLargeText(false);
            await setSoundEnabled(true);
            
            Alert.alert(
              'रीसेट सफल / Reset Successful',
              'सभी सेटिंग्स डिफ़ॉल्ट पर रीसेट हो गईं\nAll settings have been reset to default'
            );
          }
        }
      ]
    );
  };

  const settingsGroups = [
    {
      title: 'व्यक्तिगत / Personal',
      items: [
        {
          id: 'profile',
          title: 'प्रोफाइल',
          subtitle: 'Profile',
          icon: User,
          type: 'button',
          onPress: handleProfilePress
        }
      ]
    },
    {
      title: 'सामान्य / General',
      items: [
        {
          id: 'notifications',
          title: 'सूचनाएं',
          subtitle: 'Notifications',
          icon: Bell,
          type: 'switch',
          value: notifications,
          onToggle: handleNotificationToggle
        },
        {
          id: 'sound',
          title: 'आवाज़',
          subtitle: 'Sound',
          icon: soundEnabled ? Volume2 : VolumeX,
          type: 'switch',
          value: soundEnabled,
          onToggle: handleSoundToggle
        }
      ]
    },
    {
      title: 'प्रदर्शन / Display',
      items: [
        {
          id: 'darkMode',
          title: 'डार्क मोड',
          subtitle: 'Dark Mode',
          icon: Moon,
          type: 'switch',
          value: darkMode,
          onToggle: handleDarkModeToggle
        },
        {
          id: 'largeText',
          title: 'बड़ा टेक्स्ट',
          subtitle: 'Large Text',
          icon: Type,
          type: 'switch',
          value: largeText,
          onToggle: handleLargeTextToggle
        }
      ]
    },
    {
      title: 'सहायता / Support',
      items: [
        {
          id: 'privacy',
          title: 'गोपनीयता',
          subtitle: 'Privacy',
          icon: Shield,
          type: 'button',
          onPress: handlePrivacyPress
        },
        {
          id: 'help',
          title: 'सहायता',
          subtitle: 'Help',
          icon: HelpCircle,
          type: 'button',
          onPress: handleHelpPress
        },
        {
          id: 'about',
          title: 'ऐप के बारे में',
          subtitle: 'About App',
          icon: Info,
          type: 'button',
          onPress: handleAboutPress
        }
      ]
    },
    {
      title: 'खाता / Account',
      items: [
        {
          id: 'logout',
          title: 'लॉग आउट',
          subtitle: 'Logout',
          icon: LogOut,
          type: 'button',
          onPress: handleLogout,
          isDestructive: true
        }
      ]
    }
  ];

  const ProfileModal = () => (
    <Modal
      visible={isProfileModalVisible}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={() => setIsProfileModalVisible(false)}
    >
      <View style={[styles.modalContainer, { backgroundColor: colors.background }]}>
        <LinearGradient
          colors={['#FF6B35', '#FF8A50']}
          style={styles.modalHeader}
        >
          <TouchableOpacity 
            style={styles.modalCloseButton} 
            onPress={() => {
              playSound();
              setIsProfileModalVisible(false);
            }}
          >
            <X size={24} color="#FFFFFF" strokeWidth={2} />
          </TouchableOpacity>
          <Text style={[styles.modalTitle, { fontSize: getTextSize(18) }]}>
            प्रोफाइल संपादित करें / Edit Profile
          </Text>
          <TouchableOpacity style={styles.modalSaveButton} onPress={handleSaveProfile}>
            <Check size={24} color="#FFFFFF" strokeWidth={2} />
          </TouchableOpacity>
        </LinearGradient>

        <ScrollView style={styles.modalContent}>
          <View style={styles.inputGroup}>
            <Text style={[styles.inputLabel, { color: colors.text, fontSize: getTextSize(16) }]}>
              नाम / Name
            </Text>
            <TextInput
              style={[styles.textInput, { 
                backgroundColor: colors.surface, 
                color: colors.text,
                borderColor: colors.border,
                fontSize: getTextSize(16)
              }]}
              value={tempProfile.name}
              onChangeText={(text) => setTempProfile({...tempProfile, name: text})}
              placeholder="अपना नाम दर्ज करें"
              placeholderTextColor={colors.textTertiary}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={[styles.inputLabel, { color: colors.text, fontSize: getTextSize(16) }]}>
              English Name
            </Text>
            <TextInput
              style={[styles.textInput, { 
                backgroundColor: colors.surface, 
                color: colors.text,
                borderColor: colors.border,
                fontSize: getTextSize(16)
              }]}
              value={tempProfile.nameEn}
              onChangeText={(text) => setTempProfile({...tempProfile, nameEn: text})}
              placeholder="Enter your name in English"
              placeholderTextColor={colors.textTertiary}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={[styles.inputLabel, { color: colors.text, fontSize: getTextSize(16) }]}>
              ईमेल / Email
            </Text>
            <TextInput
              style={[styles.textInput, { 
                backgroundColor: colors.surface, 
                color: colors.text,
                borderColor: colors.border,
                fontSize: getTextSize(16)
              }]}
              value={tempProfile.email}
              onChangeText={(text) => setTempProfile({...tempProfile, email: text})}
              placeholder="your.email@example.com"
              placeholderTextColor={colors.textTertiary}
              keyboardType="email-address"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={[styles.inputLabel, { color: colors.text, fontSize: getTextSize(16) }]}>
              फोन नंबर / Phone Number
            </Text>
            <TextInput
              style={[styles.textInput, { 
                backgroundColor: colors.surface, 
                color: colors.text,
                borderColor: colors.border,
                fontSize: getTextSize(16)
              }]}
              value={tempProfile.phone}
              onChangeText={(text) => setTempProfile({...tempProfile, phone: text})}
              placeholder="+91 XXXXX XXXXX"
              placeholderTextColor={colors.textTertiary}
              keyboardType="phone-pad"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={[styles.inputLabel, { color: colors.text, fontSize: getTextSize(16) }]}>
              पता / Address
            </Text>
            <TextInput
              style={[styles.textInput, styles.multilineInput, { 
                backgroundColor: colors.surface, 
                color: colors.text,
                borderColor: colors.border,
                fontSize: getTextSize(16)
              }]}
              value={tempProfile.address}
              onChangeText={(text) => setTempProfile({...tempProfile, address: text})}
              placeholder="अपना पता दर्ज करें"
              placeholderTextColor={colors.textTertiary}
              multiline={true}
              numberOfLines={3}
            />
          </View>
        </ScrollView>
      </View>
    </Modal>
  );

  const AboutModal = () => (
    <Modal
      visible={isAboutModalVisible}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={() => setIsAboutModalVisible(false)}
    >
      <View style={[styles.modalContainer, { backgroundColor: colors.background }]}>
        <LinearGradient
          colors={['#3B82F6', '#1E40AF']}
          style={styles.modalHeader}
        >
          <TouchableOpacity 
            style={styles.modalCloseButton} 
            onPress={() => {
              playSound();
              setIsAboutModalVisible(false);
            }}
          >
            <X size={24} color="#FFFFFF" strokeWidth={2} />
          </TouchableOpacity>
          <Text style={[styles.modalTitle, { fontSize: getTextSize(18) }]}>
            ऐप के बारे में / About App
          </Text>
          <View style={styles.modalSpacer} />
        </LinearGradient>

        <ScrollView style={styles.modalContent}>
          <View style={styles.aboutContent}>
            <Text style={[styles.appLogo, { fontSize: getTextSize(48) }]}>Saanjh ☀️</Text>
            <Text style={[styles.appVersion, { 
              color: colors.textSecondary, 
              fontSize: getTextSize(14) 
            }]}>
              संस्करण 1.0.0 / Version 1.0.0
            </Text>
            
            <View style={styles.aboutSection}>
              <Text style={[styles.aboutSectionTitle, { 
                color: colors.text, 
                fontSize: getTextSize(18) 
              }]}>
                उद्देश्य / Purpose
              </Text>
              <Text style={[styles.aboutText, { 
                color: colors.textSecondary, 
                fontSize: getTextSize(14) 
              }]}>
                Saanjh एक विशेष ऐप है जो वरिष्ठ नागरिकों के लिए बनाया गया है। यह ऐप दैनिक जीवन को आसान बनाने और डिजिटल तकनीक का सरल उपयोग सिखाने के लिए डिज़ाइन किया गया है।
              </Text>
              <Text style={[styles.aboutTextEn, { 
                color: colors.textTertiary, 
                fontSize: getTextSize(13) 
              }]}>
                Saanjh is a special app designed for senior citizens. This app is designed to make daily life easier and teach simple use of digital technology.
              </Text>
            </View>

            <View style={styles.aboutSection}>
              <Text style={[styles.aboutSectionTitle, { 
                color: colors.text, 
                fontSize: getTextSize(18) 
              }]}>
                विशेषताएं / Features
              </Text>
              <View style={styles.featureList}>
                <Text style={[styles.featureItem, { 
                  color: colors.textSecondary, 
                  fontSize: getTextSize(14) 
                }]}>
                  • दैनिक दिनचर्या प्रबंधन / Daily routine management
                </Text>
                <Text style={[styles.featureItem, { 
                  color: colors.textSecondary, 
                  fontSize: getTextSize(14) 
                }]}>
                  • आपातकालीन संपर्क / Emergency contacts
                </Text>
                <Text style={[styles.featureItem, { 
                  color: colors.textSecondary, 
                  fontSize: getTextSize(14) 
                }]}>
                  • मनोरंजन सामग्री / Entertainment content
                </Text>
                <Text style={[styles.featureItem, { 
                  color: colors.textSecondary, 
                  fontSize: getTextSize(14) 
                }]}>
                  • फोन सीखने के ट्यूटोरियल / Phone learning tutorials
                </Text>
                <Text style={[styles.featureItem, { 
                  color: colors.textSecondary, 
                  fontSize: getTextSize(14) 
                }]}>
                  • सरल और बड़े बटन / Simple and large buttons
                </Text>
              </View>
            </View>

            <View style={styles.aboutSection}>
              <Text style={[styles.aboutSectionTitle, { 
                color: colors.text, 
                fontSize: getTextSize(18) 
              }]}>
                संपर्क / Contact
              </Text>
              <TouchableOpacity 
                style={[styles.contactButton, { backgroundColor: colors.card }]} 
                onPress={() => {
                  playSound();
                  handleContactSupport();
                }}
              >
                <Mail size={20} color="#3B82F6" strokeWidth={2} />
                <Text style={[styles.contactButtonText, { fontSize: getTextSize(14) }]}>
                  support@saanjh.app
                </Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.contactButton, { backgroundColor: colors.card }]} 
                onPress={() => {
                  playSound();
                  Linking.openURL('tel:+911234567890');
                }}
              >
                <Phone size={20} color="#3B82F6" strokeWidth={2} />
                <Text style={[styles.contactButtonText, { fontSize: getTextSize(14) }]}>
                  +91 123 456 7890
                </Text>
              </TouchableOpacity>
            </View>

            <View style={styles.aboutSection}>
              <Text style={[styles.copyrightText, { 
                color: colors.textTertiary, 
                fontSize: getTextSize(12) 
              }]}>
                © 2024 Saanjh App. सभी अधिकार सुरक्षित।
              </Text>
              <Text style={[styles.copyrightTextEn, { 
                color: colors.textTertiary, 
                fontSize: getTextSize(11) 
              }]}>
                All rights reserved.
              </Text>
            </View>
          </View>
        </ScrollView>
      </View>
    </Modal>
  );

  const HelpModal = () => (
    <Modal
      visible={isHelpModalVisible}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={() => setIsHelpModalVisible(false)}
    >
      <View style={[styles.modalContainer, { backgroundColor: colors.background }]}>
        <LinearGradient
          colors={['#10B981', '#059669']}
          style={styles.modalHeader}
        >
          <TouchableOpacity 
            style={styles.modalCloseButton} 
            onPress={() => {
              playSound();
              setIsHelpModalVisible(false);
            }}
          >
            <X size={24} color="#FFFFFF" strokeWidth={2} />
          </TouchableOpacity>
          <Text style={[styles.modalTitle, { fontSize: getTextSize(18) }]}>
            सहायता / Help
          </Text>
          <View style={styles.modalSpacer} />
        </LinearGradient>

        <ScrollView style={styles.modalContent}>
          <View style={styles.helpContent}>
            <View style={styles.helpSection}>
              <Text style={[styles.helpSectionTitle, { 
                color: colors.text, 
                fontSize: getTextSize(18) 
              }]}>
                सामान्य प्रश्न / FAQ
              </Text>
              
              <View style={[styles.faqItem, { backgroundColor: colors.card }]}>
                <Text style={[styles.faqQuestion, { 
                  color: colors.text, 
                  fontSize: getTextSize(16) 
                }]}>
                  ऐप कैसे उपयोग करें? / How to use the app?
                </Text>
                <Text style={[styles.faqAnswer, { 
                  color: colors.textSecondary, 
                  fontSize: getTextSize(14) 
                }]}>
                  होम स्क्रीन से विभिन्न सेक्शन चुनें। प्रत्येक सेक्शन में सरल निर्देश दिए गए हैं।
                </Text>
                <Text style={[styles.faqAnswerEn, { 
                  color: colors.textTertiary, 
                  fontSize: getTextSize(13) 
                }]}>
                  Select different sections from the home screen. Simple instructions are provided in each section.
                </Text>
              </View>

              <View style={[styles.faqItem, { backgroundColor: colors.card }]}>
                <Text style={[styles.faqQuestion, { 
                  color: colors.text, 
                  fontSize: getTextSize(16) 
                }]}>
                  आपातकालीन संपर्क कैसे जोड़ें? / How to add emergency contacts?
                </Text>
                <Text style={[styles.faqAnswer, { 
                  color: colors.textSecondary, 
                  fontSize: getTextSize(14) 
                }]}>
                  आपातकाल सेक्शन में जाकर '+' बटन दबाएं और संपर्क की जानकारी भरें।
                </Text>
                <Text style={[styles.faqAnswerEn, { 
                  color: colors.textTertiary, 
                  fontSize: getTextSize(13) 
                }]}>
                  Go to Emergency section, press '+' button and fill contact information.
                </Text>
              </View>

              <View style={[styles.faqItem, { backgroundColor: colors.card }]}>
                <Text style={[styles.faqQuestion, { 
                  color: colors.text, 
                  fontSize: getTextSize(16) 
                }]}>
                  टेक्स्ट साइज़ कैसे बढ़ाएं? / How to increase text size?
                </Text>
                <Text style={[styles.faqAnswer, { 
                  color: colors.textSecondary, 
                  fontSize: getTextSize(14) 
                }]}>
                  सेटिंग्स में जाकर 'बड़ा टेक्स्ट' विकल्प को चालू करें।
                </Text>
                <Text style={[styles.faqAnswerEn, { 
                  color: colors.textTertiary, 
                  fontSize: getTextSize(13) 
                }]}>
                  Go to Settings and turn on 'Large Text' option.
                </Text>
              </View>
            </View>

            <View style={styles.helpSection}>
              <Text style={[styles.helpSectionTitle, { 
                color: colors.text, 
                fontSize: getTextSize(18) 
              }]}>
                सहायता संपर्क / Support Contact
              </Text>
              <Text style={[styles.helpText, { 
                color: colors.textSecondary, 
                fontSize: getTextSize(14) 
              }]}>
                यदि आपको कोई समस्या है या सहायता चाहिए, तो कृपया हमसे संपर्क करें:
              </Text>
              <Text style={[styles.helpTextEn, { 
                color: colors.textTertiary, 
                fontSize: getTextSize(13) 
              }]}>
                If you have any problems or need help, please contact us:
              </Text>
              
              <TouchableOpacity 
                style={styles.helpContactButton} 
                onPress={() => {
                  playSound();
                  handleContactSupport();
                }}
              >
                <Text style={[styles.helpContactButtonText, { fontSize: getTextSize(16) }]}>
                  सहायता केंद्र से संपर्क करें
                </Text>
                <Text style={[styles.helpContactButtonTextEn, { fontSize: getTextSize(14) }]}>
                  Contact Support Center
                </Text>
              </TouchableOpacity>
            </View>

            <View style={styles.helpSection}>
              <Text style={[styles.helpSectionTitle, { 
                color: colors.text, 
                fontSize: getTextSize(18) 
              }]}>
                ट्यूटोरियल / Tutorials
              </Text>
              <Text style={[styles.helpText, { 
                color: colors.textSecondary, 
                fontSize: getTextSize(14) 
              }]}>
                फोन का उपयोग सीखने के लिए 'सीखें' सेक्शन में जाएं।
              </Text>
              <Text style={[styles.helpTextEn, { 
                color: colors.textTertiary, 
                fontSize: getTextSize(13) 
              }]}>
                Go to 'Learning' section to learn how to use the phone.
              </Text>
            </View>
          </View>
        </ScrollView>
      </View>
    </Modal>
  );

  const PrivacyModal = () => (
    <Modal
      visible={isPrivacyModalVisible}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={() => setIsPrivacyModalVisible(false)}
    >
      <View style={[styles.modalContainer, { backgroundColor: colors.background }]}>
        <LinearGradient
          colors={['#EF4444', '#DC2626']}
          style={styles.modalHeader}
        >
          <TouchableOpacity 
            style={styles.modalCloseButton} 
            onPress={() => {
              playSound();
              setIsPrivacyModalVisible(false);
            }}
          >
            <X size={24} color="#FFFFFF" strokeWidth={2} />
          </TouchableOpacity>
          <Text style={[styles.modalTitle, { fontSize: getTextSize(18) }]}>
            गोपनीयता नीति / Privacy Policy
          </Text>
          <View style={styles.modalSpacer} />
        </LinearGradient>

        <ScrollView style={styles.modalContent}>
          <View style={styles.privacyContent}>
            <View style={styles.privacySection}>
              <Text style={[styles.privacySectionTitle, { 
                color: colors.text, 
                fontSize: getTextSize(18) 
              }]}>
                डेटा संग्रह / Data Collection
              </Text>
              <Text style={[styles.privacyText, { 
                color: colors.textSecondary, 
                fontSize: getTextSize(14) 
              }]}>
                हम केवल आवश्यक जानकारी एकत्र करते हैं जो ऐप की कार्यक्षमता के लिए आवश्यक है।
              </Text>
              <Text style={[styles.privacyTextEn, { 
                color: colors.textTertiary, 
                fontSize: getTextSize(13) 
              }]}>
                We only collect necessary information required for app functionality.
              </Text>
            </View>

            <View style={styles.privacySection}>
              <Text style={[styles.privacySectionTitle, { 
                color: colors.text, 
                fontSize: getTextSize(18) 
              }]}>
                डेटा उपयोग / Data Usage
              </Text>
              <Text style={[styles.privacyText, { 
                color: colors.textSecondary, 
                fontSize: getTextSize(14) 
              }]}>
                आपकी व्यक्तिगत जानकारी का उपयोग केवल ऐप की सेवाओं को बेहतर बनाने के लिए किया जाता है।
              </Text>
              <Text style={[styles.privacyTextEn, { 
                color: colors.textTertiary, 
                fontSize: getTextSize(13) 
              }]}>
                Your personal information is used only to improve app services.
              </Text>
            </View>

            <View style={styles.privacySection}>
              <Text style={[styles.privacySectionTitle, { 
                color: colors.text, 
                fontSize: getTextSize(18) 
              }]}>
                डेटा सुरक्षा / Data Security
              </Text>
              <Text style={[styles.privacyText, { 
                color: colors.textSecondary, 
                fontSize: getTextSize(14) 
              }]}>
                आपका डेटा सुरक्षित रूप से संग्रहीत किया जाता है और तीसरे पक्ष के साथ साझा नहीं किया जाता।
              </Text>
              <Text style={[styles.privacyTextEn, { 
                color: colors.textTertiary, 
                fontSize: getTextSize(13) 
              }]}>
                Your data is stored securely and not shared with third parties.
              </Text>
            </View>

            <View style={styles.privacySection}>
              <Text style={[styles.privacySectionTitle, { 
                color: colors.text, 
                fontSize: getTextSize(18) 
              }]}>
                संपर्क अनुमतियां / Contact Permissions
              </Text>
              <Text style={[styles.privacyText, { 
                color: colors.textSecondary, 
                fontSize: getTextSize(14) 
              }]}>
                संपर्क सूची की अनुमति केवल आपातकालीन संपर्क जोड़ने के लिए उपयोग की जाती है।
              </Text>
              <Text style={[styles.privacyTextEn, { 
                color: colors.textTertiary, 
                fontSize: getTextSize(13) 
              }]}>
                Contact list permission is used only for adding emergency contacts.
              </Text>
            </View>

            <TouchableOpacity style={styles.resetDataButton} onPress={handleResetSettings}>
              <Text style={[styles.resetDataButtonText, { fontSize: getTextSize(16) }]}>
                सभी डेटा रीसेट करें
              </Text>
              <Text style={[styles.resetDataButtonTextEn, { fontSize: getTextSize(14) }]}>
                Reset All Data
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </Modal>
  );

  function getIconColor(IconComponent: any) {
    const iconColors: { [key: string]: string } = {
      Bell: '#F59E0B',
      Volume2: '#10B981',
      VolumeX: '#EF4444',
      Moon: '#6366F1',
      Type: '#8B5CF6',
      Shield: '#EF4444',
      HelpCircle: '#06B6D4',
      Info: '#3B82F6',
      User: '#FF6B35',
      LogOut: '#EF4444'
    };
    
    return iconColors[IconComponent.name] || '#6B7280';
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={[styles.header, { backgroundColor: colors.surface }]}>
          <Text style={[styles.headerTitle, { 
            color: colors.text, 
            fontSize: getTextSize(28) 
          }]}>
            सेटिंग्स
          </Text>
          <Text style={[styles.headerSubtitle, { 
            color: colors.textSecondary, 
            fontSize: getTextSize(18) 
          }]}>
            Settings
          </Text>
        </View>

        {/* User Profile Card */}
        <TouchableOpacity style={styles.profileCard} onPress={handleProfilePress}>
          <LinearGradient
            colors={['#FFF8F0', '#FFE4CC']}
            style={styles.profileGradient}
          >
            <View style={styles.profileAvatar}>
              <Text style={[styles.profileAvatarText, { fontSize: getTextSize(24) }]}>
                {userProfile.name.charAt(0)}
              </Text>
            </View>
            <View style={styles.profileInfo}>
              <Text style={[styles.profileName, { fontSize: getTextSize(18) }]}>
                {userProfile.name}
              </Text>
              <Text style={[styles.profileNameEn, { fontSize: getTextSize(14) }]}>
                {userProfile.nameEn}
              </Text>
              <Text style={[styles.profileEmail, { fontSize: getTextSize(12) }]}>
                {userProfile.email}
              </Text>
            </View>
            <View style={styles.profileEditIcon}>
              <User size={20} color="#FF6B35" strokeWidth={2} />
            </View>
          </LinearGradient>
        </TouchableOpacity>

        {/* Settings Groups */}
        {settingsGroups.map((group, groupIndex) => (
          <View key={groupIndex} style={styles.settingsGroup}>
            <Text style={[styles.groupTitle, { 
              color: colors.text, 
              fontSize: getTextSize(16) 
            }]}>
              {group.title}
            </Text>
            
            <View style={[styles.groupContainer, { backgroundColor: colors.surface }]}>
              {group.items.map((item, itemIndex) => (
                <TouchableOpacity
                  key={item.id}
                  style={[
                    styles.settingItem,
                    { borderBottomColor: colors.border },
                    itemIndex === group.items.length - 1 && styles.lastItem,
                    item.isDestructive && styles.destructiveItem
                  ]}
                  activeOpacity={item.type === 'switch' ? 1 : 0.7}
                  onPress={item.type === 'button' ? item.onPress : undefined}
                >
                  <View style={styles.settingLeft}>
                    <View style={[
                      styles.settingIcon, 
                      { backgroundColor: `${getIconColor(item.icon)}20` },
                      item.isDestructive && { backgroundColor: '#FEE2E2' }
                    ]}>
                      <item.icon 
                        size={20} 
                        color={item.isDestructive ? '#EF4444' : getIconColor(item.icon)} 
                        strokeWidth={2} 
                      />
                    </View>
                    <View style={styles.settingText}>
                      <Text style={[
                        styles.settingTitle,
                        { 
                          color: item.isDestructive ? '#EF4444' : colors.text,
                          fontSize: getTextSize(16)
                        }
                      ]}>
                        {item.title}
                      </Text>
                      <Text style={[
                        styles.settingSubtitle,
                        { 
                          color: item.isDestructive ? '#F87171' : colors.textSecondary,
                          fontSize: getTextSize(14)
                        }
                      ]}>
                        {item.subtitle}
                      </Text>
                    </View>
                  </View>
                  
                  {item.type === 'switch' ? (
                    <Switch
                      value={item.value}
                      onValueChange={item.onToggle}
                      trackColor={{ false: colors.border, true: '#FF6B35' }}
                      thumbColor={item.value ? '#FFFFFF' : '#FFFFFF'}
                    />
                  ) : (
                    <View style={styles.arrowContainer}>
                      <Text style={[
                        styles.arrow,
                        { color: item.isDestructive ? '#EF4444' : colors.textTertiary }
                      ]}>›</Text>
                    </View>
                  )}
                </TouchableOpacity>
              ))}
            </View>
          </View>
        ))}

        {/* App Info */}
        <View style={styles.appInfo}>
          <LinearGradient
            colors={['#FFF8F0', '#FFE4CC']}
            style={styles.appInfoGradient}
          >
            <Text style={[styles.appName, { fontSize: getTextSize(24) }]}>Saanjh ☀️</Text>
            <Text style={[styles.appVersion, { fontSize: getTextSize(14) }]}>
              संस्करण 1.0.0 / Version 1.0.0
            </Text>
            <Text style={[styles.appDescription, { fontSize: getTextSize(16) }]}>
              वरिष्ठ नागरिकों के लिए बनाया गया
            </Text>
            <Text style={[styles.appDescriptionEn, { fontSize: getTextSize(14) }]}>
              Made for Senior Citizens
            </Text>
            <TouchableOpacity style={styles.resetButton} onPress={handleResetSettings}>
              <Text style={[styles.resetButtonText, { fontSize: getTextSize(14) }]}>
                सेटिंग्स रीसेट करें
              </Text>
            </TouchableOpacity>
          </LinearGradient>
        </View>
      </ScrollView>

      {/* Modals */}
      <ProfileModal />
      <AboutModal />
      <HelpModal />
      <PrivacyModal />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  header: {
    padding: 24,
    paddingTop: 50,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    marginBottom: 24,
    alignItems: 'center',
  },
  headerTitle: {
    fontWeight: '700',
    textAlign: 'center',
  },
  headerSubtitle: {
    textAlign: 'center',
    marginTop: 4,
  },
  profileCard: {
    marginHorizontal: 20,
    marginBottom: 24,
    borderRadius: 20,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  profileGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    borderRadius: 20,
  },
  profileAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#FF6B35',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  profileAvatarText: {
    fontWeight: '700',
    color: '#FFFFFF',
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontWeight: '700',
    color: '#92400E',
    marginBottom: 2,
  },
  profileNameEn: {
    color: '#A16207',
    marginBottom: 4,
  },
  profileEmail: {
    color: '#D97706',
  },
  profileEditIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  settingsGroup: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  groupTitle: {
    fontWeight: '600',
    marginBottom: 12,
    paddingHorizontal: 4,
  },
  groupContainer: {
    borderRadius: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
  },
  lastItem: {
    borderBottomWidth: 0,
  },
  destructiveItem: {
    backgroundColor: '#FEF2F2',
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  settingIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  settingText: {
    flex: 1,
  },
  settingTitle: {
    fontWeight: '600',
    marginBottom: 2,
  },
  settingSubtitle: {
    // fontSize handled by getTextSize
  },
  arrowContainer: {
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  arrow: {
    fontSize: 18,
    fontWeight: '300',
  },
  appInfo: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  appInfoGradient: {
    borderRadius: 20,
    padding: 24,
    alignItems: 'center',
  },
  appName: {
    fontWeight: '700',
    color: '#FF6B35',
    marginBottom: 8,
  },
  appVersion: {
    color: '#D97706',
    marginBottom: 12,
    textAlign: 'center',
  },
  appDescription: {
    fontWeight: '600',
    color: '#92400E',
    textAlign: 'center',
    marginBottom: 4,
  },
  appDescriptionEn: {
    color: '#A16207',
    textAlign: 'center',
    marginBottom: 16,
  },
  resetButton: {
    backgroundColor: '#EF4444',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
  },
  resetButtonText: {
    color: '#FFFFFF',
    fontWeight: '600',
  },

  // Modal Styles
  modalContainer: {
    flex: 1,
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 20,
  },
  modalCloseButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalTitle: {
    flex: 1,
    fontWeight: '700',
    color: '#FFFFFF',
    textAlign: 'center',
  },
  modalSaveButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalSpacer: {
    width: 40,
  },
  modalContent: {
    flex: 1,
    padding: 20,
  },
  inputGroup: {
    marginBottom: 24,
  },
  inputLabel: {
    fontWeight: '600',
    marginBottom: 8,
  },
  textInput: {
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  multilineInput: {
    height: 80,
    textAlignVertical: 'top',
  },

  // About Modal Styles
  aboutContent: {
    alignItems: 'center',
  },
  appLogo: {
    marginBottom: 16,
  },
  aboutSection: {
    width: '100%',
    marginBottom: 24,
  },
  aboutSectionTitle: {
    fontWeight: '700',
    marginBottom: 12,
  },
  aboutText: {
    lineHeight: 20,
    marginBottom: 8,
  },
  aboutTextEn: {
    lineHeight: 18,
  },
  featureList: {
    marginTop: 8,
  },
  featureItem: {
    lineHeight: 22,
    marginBottom: 4,
  },
  contactButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 12,
    marginBottom: 8,
    gap: 8,
  },
  contactButtonText: {
    color: '#3B82F6',
    fontWeight: '500',
  },
  copyrightText: {
    textAlign: 'center',
    marginBottom: 4,
  },
  copyrightTextEn: {
    textAlign: 'center',
  },

  // Help Modal Styles
  helpContent: {
    flex: 1,
  },
  helpSection: {
    marginBottom: 24,
  },
  helpSectionTitle: {
    fontWeight: '700',
    marginBottom: 16,
  },
  faqItem: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  faqQuestion: {
    fontWeight: '600',
    marginBottom: 8,
  },
  faqAnswer: {
    lineHeight: 20,
    marginBottom: 4,
  },
  faqAnswerEn: {
    lineHeight: 18,
  },
  helpText: {
    lineHeight: 20,
    marginBottom: 4,
  },
  helpTextEn: {
    lineHeight: 18,
    marginBottom: 16,
  },
  helpContactButton: {
    backgroundColor: '#10B981',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  helpContactButtonText: {
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 2,
  },
  helpContactButtonTextEn: {
    color: '#FFFFFF',
    opacity: 0.9,
  },

  // Privacy Modal Styles
  privacyContent: {
    flex: 1,
  },
  privacySection: {
    marginBottom: 24,
  },
  privacySectionTitle: {
    fontWeight: '700',
    marginBottom: 12,
  },
  privacyText: {
    lineHeight: 20,
    marginBottom: 4,
  },
  privacyTextEn: {
    lineHeight: 18,
  },
  resetDataButton: {
    backgroundColor: '#EF4444',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 16,
  },
  resetDataButtonText: {
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 2,
  },
  resetDataButtonTextEn: {
    color: '#FFFFFF',
    opacity: 0.9,
  },
});