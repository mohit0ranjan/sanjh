import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Modal, 
  TouchableOpacity, 
  TextInput, 
  ScrollView,
  Alert 
} from 'react-native';
import { X, Clock, Pill, Coffee, Sun, Moon, Bell, Activity, Book, Heart } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';

interface AddTaskModalProps {
  visible: boolean;
  onClose: () => void;
  onSave: (task: any) => void;
  selectedTimeSlot: string;
}

export default function AddTaskModal({ visible, onClose, onSave, selectedTimeSlot }: AddTaskModalProps) {
  const [taskTitle, setTaskTitle] = React.useState('');
  const [taskSubtitle, setTaskSubtitle] = React.useState('');
  const [selectedTime, setSelectedTime] = React.useState('');
  const [selectedIcon, setSelectedIcon] = React.useState(Clock);

  const timeSlotLabels = {
    morning: { hindi: 'सुबह', english: 'Morning' },
    afternoon: { hindi: 'दोपहर', english: 'Afternoon' },
    evening: { hindi: 'शाम', english: 'Evening' }
  };

  const iconOptions = [
    { icon: Clock, name: 'Clock', color: '#3B82F6' },
    { icon: Pill, name: 'Medicine', color: '#EF4444' },
    { icon: Coffee, name: 'Food/Drink', color: '#F59E0B' },
    { icon: Sun, name: 'Morning Activity', color: '#F59E0B' },
    { icon: Moon, name: 'Evening Activity', color: '#6366F1' },
    { icon: Bell, name: 'Reminder', color: '#8B5CF6' },
    { icon: Activity, name: 'Exercise', color: '#10B981' },
    { icon: Book, name: 'Reading', color: '#059669' },
    { icon: Heart, name: 'Health', color: '#DC2626' }
  ];

  const timeOptions = React.useMemo(() => {
    const times = [];
    for (let hour = 1; hour <= 12; hour++) {
      for (let minute of ['00', '30']) {
        times.push(`${hour}:${minute} AM`);
        times.push(`${hour}:${minute} PM`);
      }
    }
    return times;
  }, []);

  const handleSave = () => {
    if (!taskTitle.trim()) {
      Alert.alert('Error', 'कृपया कार्य का नाम दर्ज करें\nPlease enter task name');
      return;
    }
    
    if (!selectedTime) {
      Alert.alert('Error', 'कृपया समय चुनें\nPlease select time');
      return;
    }

    const newTask = {
      time: selectedTime,
      activity: taskTitle.trim(),
      subtitle: taskSubtitle.trim() || 'Custom Task',
      icon: selectedIcon
    };

    onSave(newTask);
    
    // Reset form
    setTaskTitle('');
    setTaskSubtitle('');
    setSelectedTime('');
    setSelectedIcon(Clock);
  };

  const handleClose = () => {
    // Reset form when closing
    setTaskTitle('');
    setTaskSubtitle('');
    setSelectedTime('');
    setSelectedIcon(Clock);
    onClose();
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={handleClose}
    >
      <View style={styles.container}>
        {/* Header */}
        <LinearGradient
          colors={['#FF6B35', '#FF8A50']}
          style={styles.header}
        >
          <TouchableOpacity style={styles.closeButton} onPress={handleClose}>
            <X size={24} color="#FFFFFF" strokeWidth={2} />
          </TouchableOpacity>
          <View style={styles.headerCenter}>
            <Text style={styles.headerTitle}>नया कार्य जोड़ें</Text>
            <Text style={styles.headerSubtitle}>Add New Task</Text>
            <Text style={styles.timeSlotLabel}>
              {timeSlotLabels[selectedTimeSlot].hindi} / {timeSlotLabels[selectedTimeSlot].english}
            </Text>
          </View>
          <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
            <Text style={styles.saveButtonText}>सेव</Text>
          </TouchableOpacity>
        </LinearGradient>

        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          {/* Task Name Input */}
          <View style={styles.inputSection}>
            <Text style={styles.inputLabel}>कार्य का नाम / Task Name</Text>
            <TextInput
              style={styles.textInput}
              value={taskTitle}
              onChangeText={setTaskTitle}
              placeholder="जैसे: दवाई लेना, चाय पीना..."
              placeholderTextColor="#9CA3AF"
              multiline={false}
            />
          </View>

          {/* Task Subtitle Input */}
          <View style={styles.inputSection}>
            <Text style={styles.inputLabel}>विवरण / Description (वैकल्पिक)</Text>
            <TextInput
              style={styles.textInput}
              value={taskSubtitle}
              onChangeText={setTaskSubtitle}
              placeholder="English description (optional)"
              placeholderTextColor="#9CA3AF"
              multiline={false}
            />
          </View>

          {/* Time Selection */}
          <View style={styles.inputSection}>
            <Text style={styles.inputLabel}>समय चुनें / Select Time</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.timeScroll}>
              <View style={styles.timeOptions}>
                {timeOptions.map((time) => (
                  <TouchableOpacity
                    key={time}
                    style={[
                      styles.timeOption,
                      selectedTime === time && styles.selectedTimeOption
                    ]}
                    onPress={() => setSelectedTime(time)}
                  >
                    <Text style={[
                      styles.timeOptionText,
                      selectedTime === time && styles.selectedTimeOptionText
                    ]}>
                      {time}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </ScrollView>
          </View>

          {/* Icon Selection */}
          <View style={styles.inputSection}>
            <Text style={styles.inputLabel}>आइकन चुनें / Select Icon</Text>
            <View style={styles.iconGrid}>
              {iconOptions.map((option) => (
                <TouchableOpacity
                  key={option.name}
                  style={[
                    styles.iconOption,
                    selectedIcon === option.icon && styles.selectedIconOption,
                    { borderColor: option.color }
                  ]}
                  onPress={() => setSelectedIcon(option.icon)}
                >
                  <option.icon 
                    size={24} 
                    color={selectedIcon === option.icon ? '#FFFFFF' : option.color} 
                    strokeWidth={2} 
                  />
                  <Text style={[
                    styles.iconOptionText,
                    selectedIcon === option.icon && styles.selectedIconOptionText
                  ]}>
                    {option.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Preview */}
          <View style={styles.previewSection}>
            <Text style={styles.previewLabel}>पूर्वावलोकन / Preview</Text>
            <View style={styles.previewCard}>
              <View style={styles.previewLeft}>
                <View style={styles.previewIcon}>
                  <selectedIcon size={20} color="#6B7280" strokeWidth={2} />
                </View>
                <View style={styles.previewContent}>
                  <Text style={styles.previewTitle}>
                    {taskTitle || 'कार्य का नाम'}
                  </Text>
                  <Text style={styles.previewSubtitle}>
                    {taskSubtitle || 'Task Description'}
                  </Text>
                </View>
              </View>
              <View style={styles.previewRight}>
                <Text style={styles.previewTime}>
                  {selectedTime || 'समय'}
                </Text>
                <View style={styles.previewDot} />
              </View>
            </View>
          </View>

          <View style={styles.bottomSpacing} />
        </ScrollView>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 20,
  },
  closeButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerCenter: {
    flex: 1,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#FFFFFF',
    opacity: 0.9,
    marginTop: 2,
  },
  timeSlotLabel: {
    fontSize: 12,
    color: '#FFFFFF',
    opacity: 0.8,
    marginTop: 4,
    fontWeight: '600',
  },
  saveButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 16,
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  inputSection: {
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
  timeScroll: {
    marginTop: 8,
  },
  timeOptions: {
    flexDirection: 'row',
    gap: 8,
    paddingRight: 20,
  },
  timeOption: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    minWidth: 80,
    alignItems: 'center',
  },
  selectedTimeOption: {
    backgroundColor: '#FF6B35',
    borderColor: '#FF6B35',
  },
  timeOptionText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
  },
  selectedTimeOptionText: {
    color: '#FFFFFF',
  },
  iconGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginTop: 8,
  },
  iconOption: {
    width: '30%',
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#E5E7EB',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  selectedIconOption: {
    backgroundColor: '#FF6B35',
  },
  iconOptionText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#6B7280',
    marginTop: 4,
    textAlign: 'center',
  },
  selectedIconOptionText: {
    color: '#FFFFFF',
  },
  previewSection: {
    marginTop: 8,
  },
  previewLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 12,
  },
  previewCard: {
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
  previewLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  previewIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  previewContent: {
    flex: 1,
  },
  previewTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 2,
  },
  previewSubtitle: {
    fontSize: 14,
    color: '#6B7280',
  },
  previewRight: {
    alignItems: 'flex-end',
  },
  previewTime: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 4,
  },
  previewDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#F59E0B',
  },
  bottomSpacing: {
    height: 40,
  },
});