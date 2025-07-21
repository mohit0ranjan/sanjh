import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView, Linking, Alert, Modal, TextInput } from 'react-native';
import { ArrowLeft, Phone, Shield, Heart, Zap, Users, MapPin, TriangleAlert as AlertTriangle, Plus, UserPlus, CreditCard as Edit3, Trash2, X } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import * as Contacts from 'expo-contacts';

export default function EmergencyScreen() {
  const router = useRouter();
  const [familyContacts, setFamilyContacts] = React.useState([
    {
      id: 1,
      name: 'राज कुमार',
      subtitle: 'बेटा / Son',
      number: '+91 98765 43210',
      relation: 'Son'
    },
    {
      id: 2,
      name: 'प्रिया शर्मा',
      subtitle: 'बेटी / Daughter',
      number: '+91 87654 32109',
      relation: 'Daughter'
    },
    {
      id: 3,
      name: 'डॉ. अमित गुप्ता',
      subtitle: 'पारिवारिक डॉक्टर / Family Doctor',
      number: '+91 76543 21098',
      relation: 'Doctor'
    }
  ]);

  const [isAddContactModalVisible, setIsAddContactModalVisible] = React.useState(false);
  const [isEditContactModalVisible, setIsEditContactModalVisible] = React.useState(false);
  const [editingContact, setEditingContact] = React.useState(null);
  const [newContactName, setNewContactName] = React.useState('');
  const [newContactNumber, setNewContactNumber] = React.useState('');
  const [newContactRelation, setNewContactRelation] = React.useState('');

  const emergencyContacts = [
    {
      id: 1,
      name: 'पुलिस',
      subtitle: 'Police',
      number: '100',
      icon: Shield,
      color: '#EF4444',
      gradient: ['#FEE2E2', '#FECACA']
    },
    {
      id: 2,
      name: 'एम्बुलेंस',
      subtitle: 'Ambulance',
      number: '108',
      icon: Heart,
      color: '#DC2626',
      gradient: ['#FEE2E2', '#FECACA']
    },
    {
      id: 3,
      name: 'फायर ब्रिगेड',
      subtitle: 'Fire Brigade',
      number: '101',
      icon: Zap,
      color: '#F59E0B',
      gradient: ['#FEF3C7', '#FDE68A']
    },
    {
      id: 4,
      name: 'महिला हेल्पलाइन',
      subtitle: 'Women Helpline',
      number: '1091',
      icon: Users,
      color: '#8B5CF6',
      gradient: ['#F3E8FF', '#E9D5FF']
    }
  ];

  const relationOptions = [
    { value: 'Son', hindi: 'बेटा', english: 'Son' },
    { value: 'Daughter', hindi: 'बेटी', english: 'Daughter' },
    { value: 'Spouse', hindi: 'पति/पत्नी', english: 'Spouse' },
    { value: 'Brother', hindi: 'भाई', english: 'Brother' },
    { value: 'Sister', hindi: 'बहन', english: 'Sister' },
    { value: 'Doctor', hindi: 'डॉक्टर', english: 'Doctor' },
    { value: 'Neighbor', hindi: 'पड़ोसी', english: 'Neighbor' },
    { value: 'Friend', hindi: 'मित्र', english: 'Friend' },
    { value: 'Other', hindi: 'अन्य', english: 'Other' }
  ];

  const handleEmergencyCall = (number: string) => {
    Alert.alert(
      'Emergency Call / आपातकालीन कॉल',
      `${number} पर कॉल करना चाहते हैं?\nDo you want to call ${number}?`,
      [
        { text: 'Cancel / रद्द करें', style: 'cancel' },
        { 
          text: 'Call / कॉल करें', 
          onPress: () => Linking.openURL(`tel:${number}`),
          style: 'destructive'
        }
      ]
    );
  };

  const handleSOSPress = () => {
    Alert.alert(
      'SOS Alert / SOS अलर्ट',
      'आपातकालीन संदेश सभी संपर्कों को भेजा जाएगा\nEmergency message will be sent to all contacts',
      [
        { text: 'Cancel / रद्द करें', style: 'cancel' },
        { 
          text: 'Send SOS / SOS भेजें', 
          onPress: () => {
            // In a real app, this would send location and alert to emergency contacts
            Alert.alert('SOS Sent / SOS भेजा गया', 'आपातकालीन संदेश भेजा गया\nEmergency message sent');
          },
          style: 'destructive'
        }
      ]
    );
  };

  const requestContactsPermission = async () => {
    const { status } = await Contacts.requestPermissionsAsync();
    return status === 'granted';
  };

  const handleAddFromContacts = async () => {
    try {
      const hasPermission = await requestContactsPermission();
      
      if (!hasPermission) {
        Alert.alert(
          'Permission Required / अनुमति आवश्यक',
          'संपर्क सूची तक पहुंचने के लिए अनुमति दें\nPlease grant permission to access contacts',
          [{ text: 'OK', style: 'default' }]
        );
        return;
      }

      const { data } = await Contacts.getContactsAsync({
        fields: [Contacts.Fields.Name, Contacts.Fields.PhoneNumbers],
      });

      if (data.length > 0) {
        // Show contact picker (simplified - in real app you'd show a proper picker)
        const contactNames = data
          .filter(contact => contact.phoneNumbers && contact.phoneNumbers.length > 0)
          .slice(0, 10) // Limit to first 10 contacts
          .map(contact => ({
            name: contact.name || 'Unknown',
            number: contact.phoneNumbers[0].number
          }));

        if (contactNames.length === 0) {
          Alert.alert(
            'No Contacts / कोई संपर्क नहीं',
            'फोन नंबर वाले संपर्क नहीं मिले\nNo contacts with phone numbers found'
          );
          return;
        }

        // For demo, just pick the first contact
        const selectedContact = contactNames[0];
        setNewContactName(selectedContact.name);
        setNewContactNumber(selectedContact.number);
        setNewContactRelation('Other');
        setIsAddContactModalVisible(true);
      }
    } catch (error) {
      Alert.alert(
        'Error / त्रुटि',
        'संपर्क लोड करने में समस्या\nError loading contacts'
      );
    }
  };

  const handleAddContact = () => {
    if (!newContactName.trim() || !newContactNumber.trim()) {
      Alert.alert(
        'Missing Information / जानकारी अधूरी',
        'कृपया नाम और नंबर दर्ज करें\nPlease enter name and number'
      );
      return;
    }

    const relationData = relationOptions.find(r => r.value === newContactRelation) || relationOptions[8];
    
    const newContact = {
      id: Date.now(),
      name: newContactName.trim(),
      subtitle: `${relationData.hindi} / ${relationData.english}`,
      number: newContactNumber.trim(),
      relation: newContactRelation
    };

    setFamilyContacts(prev => [...prev, newContact]);
    
    // Reset form
    setNewContactName('');
    setNewContactNumber('');
    setNewContactRelation('');
    setIsAddContactModalVisible(false);

    Alert.alert(
      'Contact Added / संपर्क जोड़ा गया',
      'नया संपर्क सफलतापूर्वक जोड़ा गया\nNew contact added successfully'
    );
  };

  const handleEditContact = (contact) => {
    setEditingContact(contact);
    setNewContactName(contact.name);
    setNewContactNumber(contact.number);
    setNewContactRelation(contact.relation);
    setIsEditContactModalVisible(true);
  };

  const handleUpdateContact = () => {
    if (!newContactName.trim() || !newContactNumber.trim()) {
      Alert.alert(
        'Missing Information / जानकारी अधूरी',
        'कृपया नाम और नंबर दर्ज करें\nPlease enter name and number'
      );
      return;
    }

    const relationData = relationOptions.find(r => r.value === newContactRelation) || relationOptions[8];
    
    setFamilyContacts(prev => prev.map(contact => 
      contact.id === editingContact.id 
        ? {
            ...contact,
            name: newContactName.trim(),
            subtitle: `${relationData.hindi} / ${relationData.english}`,
            number: newContactNumber.trim(),
            relation: newContactRelation
          }
        : contact
    ));

    // Reset form
    setNewContactName('');
    setNewContactNumber('');
    setNewContactRelation('');
    setEditingContact(null);
    setIsEditContactModalVisible(false);

    Alert.alert(
      'Contact Updated / संपर्क अपडेट किया गया',
      'संपर्क सफलतापूर्वक अपडेट किया गया\nContact updated successfully'
    );
  };

  const handleDeleteContact = (contactId) => {
    Alert.alert(
      'Delete Contact / संपर्क हटाएं',
      'क्या आप इस संपर्क को हटाना चाहते हैं?\nDo you want to delete this contact?',
      [
        { text: 'Cancel / रद्द करें', style: 'cancel' },
        { 
          text: 'Delete / हटाएं', 
          onPress: () => {
            setFamilyContacts(prev => prev.filter(contact => contact.id !== contactId));
            Alert.alert(
              'Contact Deleted / संपर्क हटाया गया',
              'संपर्क सफलतापूर्वक हटाया गया\nContact deleted successfully'
            );
          },
          style: 'destructive'
        }
      ]
    );
  };

  const handleShareLocation = () => {
    Alert.alert(
      'Share Location / स्थान साझा करें',
      'आपका स्थान सभी आपातकालीन संपर्कों को भेजा जाएगा\nYour location will be sent to all emergency contacts',
      [
        { text: 'Cancel / रद्द करें', style: 'cancel' },
        { 
          text: 'Share / साझा करें', 
          onPress: () => {
            Alert.alert(
              'Location Shared / स्थान साझा किया गया',
              'आपका स्थान सफलतापूर्वक साझा किया गया\nYour location has been shared successfully'
            );
          }
        }
      ]
    );
  };

  const ContactModal = ({ visible, onClose, onSave, title, isEdit = false }) => (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <LinearGradient
          colors={['#FF6B35', '#FF8A50']}
          style={styles.modalHeader}
        >
          <TouchableOpacity style={styles.modalCloseButton} onPress={onClose}>
            <X size={24} color="#FFFFFF" strokeWidth={2} />
          </TouchableOpacity>
          <Text style={styles.modalTitle}>{title}</Text>
          <TouchableOpacity style={styles.modalSaveButton} onPress={onSave}>
            <Text style={styles.modalSaveText}>सेव</Text>
          </TouchableOpacity>
        </LinearGradient>

        <ScrollView style={styles.modalContent}>
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>नाम / Name</Text>
            <TextInput
              style={styles.textInput}
              value={newContactName}
              onChangeText={setNewContactName}
              placeholder="संपर्क का नाम दर्ज करें"
              placeholderTextColor="#9CA3AF"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>फोन नंबर / Phone Number</Text>
            <TextInput
              style={styles.textInput}
              value={newContactNumber}
              onChangeText={setNewContactNumber}
              placeholder="+91 XXXXX XXXXX"
              placeholderTextColor="#9CA3AF"
              keyboardType="phone-pad"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>रिश्ता / Relation</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.relationScroll}>
              <View style={styles.relationOptions}>
                {relationOptions.map((relation) => (
                  <TouchableOpacity
                    key={relation.value}
                    style={[
                      styles.relationOption,
                      newContactRelation === relation.value && styles.selectedRelation
                    ]}
                    onPress={() => setNewContactRelation(relation.value)}
                  >
                    <Text style={[
                      styles.relationText,
                      newContactRelation === relation.value && styles.selectedRelationText
                    ]}>
                      {relation.hindi}
                    </Text>
                    <Text style={[
                      styles.relationTextEn,
                      newContactRelation === relation.value && styles.selectedRelationTextEn
                    ]}>
                      {relation.english}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </ScrollView>
          </View>

          {!isEdit && (
            <TouchableOpacity style={styles.importButton} onPress={handleAddFromContacts}>
              <UserPlus size={20} color="#3B82F6" strokeWidth={2} />
              <Text style={styles.importButtonText}>संपर्क सूची से जोड़ें</Text>
              <Text style={styles.importButtonTextEn}>Import from Contacts</Text>
            </TouchableOpacity>
          )}
        </ScrollView>
      </View>
    </Modal>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
            <ArrowLeft size={24} color="#1F2937" strokeWidth={2} />
          </TouchableOpacity>
          <View style={styles.headerCenter}>
            <Text style={styles.headerTitle}>आपातकाल</Text>
            <Text style={styles.headerSubtitle}>Emergency</Text>
          </View>
          <View style={styles.headerSpacer} />
        </View>

        {/* SOS Button */}
        <View style={styles.sosContainer}>
          <TouchableOpacity style={styles.sosButton} onPress={handleSOSPress}>
            <LinearGradient
              colors={['#DC2626', '#B91C1C']}
              style={styles.sosGradient}
            >
              <AlertTriangle size={40} color="#FFFFFF" strokeWidth={2} />
              <Text style={styles.sosText}>SOS</Text>
              <Text style={styles.sosSubtext}>आपातकालीन सहायता</Text>
              <Text style={styles.sosDescription}>Emergency Help</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>

        {/* Emergency Services */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>आपातकालीन सेवाएं</Text>
          <Text style={styles.sectionSubtitle}>Emergency Services</Text>
          
          <View style={styles.servicesGrid}>
            {emergencyContacts.map((contact) => (
              <TouchableOpacity
                key={contact.id}
                style={styles.serviceCard}
                onPress={() => handleEmergencyCall(contact.number)}
              >
                <LinearGradient
                  colors={contact.gradient}
                  style={styles.serviceGradient}
                >
                  <View style={[styles.serviceIcon, { backgroundColor: `${contact.color}20` }]}>
                    <contact.icon size={28} color={contact.color} strokeWidth={2} />
                  </View>
                  <Text style={[styles.serviceName, { color: contact.color }]}>{contact.name}</Text>
                  <Text style={styles.serviceSubtitle}>{contact.subtitle}</Text>
                  <View style={styles.serviceNumber}>
                    <Phone size={16} color={contact.color} strokeWidth={2} />
                    <Text style={[styles.numberText, { color: contact.color }]}>{contact.number}</Text>
                  </View>
                </LinearGradient>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Family Contacts */}
        <View style={styles.section}>
          <View style={styles.sectionHeaderWithButton}>
            <View>
              <Text style={styles.sectionTitle}>पारिवारिक संपर्क</Text>
              <Text style={styles.sectionSubtitle}>Family Contacts</Text>
            </View>
            <TouchableOpacity 
              style={styles.addContactButton}
              onPress={() => setIsAddContactModalVisible(true)}
            >
              <Plus size={20} color="#FFFFFF" strokeWidth={2} />
            </TouchableOpacity>
          </View>
          
          <View style={styles.contactsList}>
            {familyContacts.map((contact) => (
              <View key={contact.id} style={styles.contactCard}>
                <TouchableOpacity
                  style={styles.contactLeft}
                  onPress={() => handleEmergencyCall(contact.number)}
                >
                  <View style={styles.contactAvatar}>
                    <Text style={styles.avatarText}>{contact.name.charAt(0)}</Text>
                  </View>
                  <View style={styles.contactInfo}>
                    <Text style={styles.contactName}>{contact.name}</Text>
                    <Text style={styles.contactSubtitle}>{contact.subtitle}</Text>
                    <Text style={styles.contactNumber}>{contact.number}</Text>
                  </View>
                </TouchableOpacity>
                <View style={styles.contactActions}>
                  <TouchableOpacity 
                    style={styles.editButton}
                    onPress={() => handleEditContact(contact)}
                  >
                    <Edit3 size={16} color="#6B7280" strokeWidth={2} />
                  </TouchableOpacity>
                  <TouchableOpacity 
                    style={styles.deleteButton}
                    onPress={() => handleDeleteContact(contact.id)}
                  >
                    <Trash2 size={16} color="#EF4444" strokeWidth={2} />
                  </TouchableOpacity>
                  <TouchableOpacity 
                    style={styles.callButton}
                    onPress={() => handleEmergencyCall(contact.number)}
                  >
                    <Phone size={20} color="#FFFFFF" strokeWidth={2} />
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Location Sharing */}
        <LinearGradient
          colors={['#EBF8FF', '#DBEAFE']}
          style={styles.locationCard}
        >
          <View style={styles.locationContent}>
            <MapPin size={24} color="#3B82F6" strokeWidth={2} />
            <Text style={styles.locationTitle}>स्थान साझा करें</Text>
            <Text style={styles.locationSubtitle}>Share Location</Text>
            <Text style={styles.locationDescription}>
              आपातकाल में अपना स्थान परिवार के साथ साझा करें
            </Text>
            <TouchableOpacity style={styles.locationButton} onPress={handleShareLocation}>
              <Text style={styles.locationButtonText}>स्थान भेजें</Text>
            </TouchableOpacity>
          </View>
        </LinearGradient>

        <View style={styles.bottomSpacing} />
      </ScrollView>

      {/* Add Contact Modal */}
      <ContactModal
        visible={isAddContactModalVisible}
        onClose={() => {
          setIsAddContactModalVisible(false);
          setNewContactName('');
          setNewContactNumber('');
          setNewContactRelation('');
        }}
        onSave={handleAddContact}
        title="नया संपर्क जोड़ें / Add New Contact"
      />

      {/* Edit Contact Modal */}
      <ContactModal
        visible={isEditContactModalVisible}
        onClose={() => {
          setIsEditContactModalVisible(false);
          setNewContactName('');
          setNewContactNumber('');
          setNewContactRelation('');
          setEditingContact(null);
        }}
        onSave={handleUpdateContact}
        title="संपर्क संपादित करें / Edit Contact"
        isEdit={true}
      />
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
  sosContainer: {
    paddingHorizontal: 20,
    marginBottom: 32,
  },
  sosButton: {
    borderRadius: 24,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
  },
  sosGradient: {
    borderRadius: 24,
    padding: 32,
    alignItems: 'center',
  },
  sosText: {
    fontSize: 32,
    fontWeight: '900',
    color: '#FFFFFF',
    marginTop: 8,
    letterSpacing: 2,
  },
  sosSubtext: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    marginTop: 4,
  },
  sosDescription: {
    fontSize: 14,
    color: '#FFFFFF',
    opacity: 0.9,
    marginTop: 2,
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
  sectionHeaderWithButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  addContactButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#FF6B35',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  servicesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 12,
  },
  serviceCard: {
    width: '48%',
    borderRadius: 16,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    marginBottom: 12,
  },
  serviceGradient: {
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    minHeight: 140,
    justifyContent: 'center',
  },
  serviceIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  serviceName: {
    fontSize: 16,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 4,
  },
  serviceSubtitle: {
    fontSize: 12,
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: 8,
  },
  serviceNumber: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  numberText: {
    fontSize: 16,
    fontWeight: '700',
  },
  contactsList: {
    gap: 12,
  },
  contactCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  contactLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  contactAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#FF6B35',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  avatarText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  contactInfo: {
    flex: 1,
  },
  contactName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 2,
  },
  contactSubtitle: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 2,
  },
  contactNumber: {
    fontSize: 12,
    color: '#9CA3AF',
  },
  contactActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  editButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  deleteButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#FEE2E2',
    alignItems: 'center',
    justifyContent: 'center',
  },
  callButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#10B981',
    alignItems: 'center',
    justifyContent: 'center',
  },
  locationCard: {
    margin: 20,
    borderRadius: 20,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  locationContent: {
    padding: 24,
    alignItems: 'center',
  },
  locationTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#3B82F6',
    marginTop: 8,
  },
  locationSubtitle: {
    fontSize: 14,
    color: '#1E40AF',
    marginTop: 2,
  },
  locationDescription: {
    fontSize: 14,
    color: '#374151',
    textAlign: 'center',
    marginTop: 8,
    lineHeight: 20,
  },
  locationButton: {
    backgroundColor: '#3B82F6',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    marginTop: 12,
  },
  locationButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  bottomSpacing: {
    height: 20,
  },

  // Modal Styles
  modalContainer: {
    flex: 1,
    backgroundColor: '#FAFAFA',
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
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
    textAlign: 'center',
  },
  modalSaveButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 16,
  },
  modalSaveText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  modalContent: {
    flex: 1,
    padding: 20,
  },
  inputGroup: {
    marginBottom: 24,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 8,
  },
  textInput: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    color: '#1F2937',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  relationScroll: {
    marginTop: 8,
  },
  relationOptions: {
    flexDirection: 'row',
    gap: 8,
    paddingRight: 20,
  },
  relationOption: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    alignItems: 'center',
    minWidth: 80,
  },
  selectedRelation: {
    backgroundColor: '#FF6B35',
    borderColor: '#FF6B35',
  },
  relationText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
  },
  selectedRelationText: {
    color: '#FFFFFF',
  },
  relationTextEn: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 2,
  },
  selectedRelationTextEn: {
    color: '#FFFFFF',
    opacity: 0.9,
  },
  importButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#EBF8FF',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#BFDBFE',
    marginTop: 8,
    gap: 8,
  },
  importButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#3B82F6',
  },
  importButtonTextEn: {
    fontSize: 14,
    color: '#1E40AF',
    marginLeft: 8,
  },
});