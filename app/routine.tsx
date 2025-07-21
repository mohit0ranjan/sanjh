import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';
import { ArrowLeft, Clock, Pill, Coffee, Sun, Moon, Bell, Plus, X, Check } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import AddTaskModal from '@/components/AddTaskModal';

export default function RoutineScreen() {
  const router = useRouter();
  const [selectedTime, setSelectedTime] = React.useState('morning');
  const [isAddModalVisible, setIsAddModalVisible] = React.useState(false);
  const [routineData, setRoutineData] = React.useState({

    morning: [
      { id: 1, time: '6:00 AM', activity: 'उठना', subtitle: 'Wake up', icon: Sun, completed: true },
      { id: 2, time: '6:30 AM', activity: 'योग/प्रार्थना', subtitle: 'Yoga/Prayer', icon: Sun, completed: true },
      { id: 3, time: '7:00 AM', activity: 'चाय', subtitle: 'Morning Tea', icon: Coffee, completed: false },
      { id: 4, time: '8:00 AM', activity: 'दवाई', subtitle: 'Medicine', icon: Pill, completed: false },
      { id: 5, time: '9:00 AM', activity: 'नाश्ता', subtitle: 'Breakfast', icon: Coffee, completed: false },
    ],
    afternoon: [
      { id: 6, time: '12:00 PM', activity: 'दोपहर का खाना', subtitle: 'Lunch', icon: Coffee, completed: false },
      { id: 7, time: '1:00 PM', activity: 'दवाई', subtitle: 'Medicine', icon: Pill, completed: false },
      { id: 8, time: '2:00 PM', activity: 'आराम', subtitle: 'Rest', icon: Moon, completed: false },
      { id: 9, time: '4:00 PM', activity: 'चाय', subtitle: 'Evening Tea', icon: Coffee, completed: false },
    ],
    evening: [
      { id: 10, time: '6:00 PM', activity: 'टहलना', subtitle: 'Walk', icon: Sun, completed: false },
      { id: 11, time: '8:00 PM', activity: 'रात का खाना', subtitle: 'Dinner', icon: Coffee, completed: false },
      { id: 12, time: '9:00 PM', activity: 'दवाई', subtitle: 'Medicine', icon: Pill, completed: false },
      { id: 13, time: '10:00 PM', activity: 'सोना', subtitle: 'Sleep', icon: Moon, completed: false },
    ]
  });

  const timeSlots = [
    { id: 'morning', label: 'सुबह', subtitle: 'Morning', color: '#F59E0B' },
    { id: 'afternoon', label: 'दोपहर', subtitle: 'Afternoon', color: '#EF4444' },
    { id: 'evening', label: 'शाम', subtitle: 'Evening', color: '#8B5CF6' }
  ];

  const handleAddTask = () => {
    setIsAddModalVisible(true);
  };

  const handleSaveTask = (newTask) => {
    const taskWithId = {
      ...newTask,
      id: Date.now(), // Simple ID generation
      completed: false
    };
    
    setRoutineData(prev => ({
      ...prev,
      [selectedTime]: [...prev[selectedTime], taskWithId].sort((a, b) => {
        // Sort by time
        const timeA = convertTimeToMinutes(a.time);
        const timeB = convertTimeToMinutes(b.time);
        return timeA - timeB;
      })
    }));
    
    setIsAddModalVisible(false);
  };

  const convertTimeToMinutes = (timeStr) => {
    const [time, period] = timeStr.split(' ');
    const [hours, minutes] = time.split(':').map(Number);
    let totalMinutes = hours * 60 + minutes;
    
    if (period === 'PM' && hours !== 12) {
      totalMinutes += 12 * 60;
    } else if (period === 'AM' && hours === 12) {
      totalMinutes = minutes;
    }
    
    return totalMinutes;
  };

  const handleToggleComplete = (taskId) => {
    setRoutineData(prev => ({
      ...prev,
      [selectedTime]: prev[selectedTime].map(task =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    }));
  };

  const handleDeleteTask = (taskId) => {
    setRoutineData(prev => ({
      ...prev,
      [selectedTime]: prev[selectedTime].filter(task => task.id !== taskId)
    }));
  };
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
            <ArrowLeft size={24} color="#1F2937" strokeWidth={2} />
          </TouchableOpacity>
          <View style={styles.headerCenter}>
            <Text style={styles.headerTitle}>दिनचर्या</Text>
            <Text style={styles.headerSubtitle}>Daily Routine</Text>
          </View>
          <TouchableOpacity style={styles.addButton} onPress={handleAddTask}>
            <Plus size={24} color="#FF6B35" strokeWidth={2} />
          </TouchableOpacity>
        </View>

        {/* Time Selector */}
        <View style={styles.timeSelectorContainer}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.timeSelector}>
            {timeSlots.map((slot) => (
              <TouchableOpacity
                key={slot.id}
                style={[
                  styles.timeSlot,
                  selectedTime === slot.id && styles.activeTimeSlot,
                  { borderColor: slot.color }
                ]}
                onPress={() => setSelectedTime(slot.id)}
              >
                <Text style={[
                  styles.timeSlotLabel,
                  selectedTime === slot.id && { color: slot.color }
                ]}>
                  {slot.label}
                </Text>
                <Text style={[
                  styles.timeSlotSubtitle,
                  selectedTime === slot.id && { color: slot.color }
                ]}>
                  {slot.subtitle}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Routine Items */}
        <View style={styles.routineContainer}>
          {routineData[selectedTime].map((item, index) => (
            <View key={item.id} style={styles.routineItem}>
              <View style={styles.routineLeft}>
                <TouchableOpacity 
                  style={[
                  styles.routineIcon,
                  { backgroundColor: item.completed ? '#10B981' : '#F3F4F6' }
                  ]}
                  onPress={() => handleToggleComplete(item.id)}
                >
                  <item.icon 
                    size={20} 
                    color={item.completed ? '#FFFFFF' : '#6B7280'} 
                    strokeWidth={2} 
                  />
                </TouchableOpacity>
                <View style={styles.routineContent}>
                  <Text style={[
                    styles.routineActivity,
                    item.completed && styles.completedActivity
                  ]}>
                    {item.activity}
                  </Text>
                  <Text style={styles.routineSubtitle}>{item.subtitle}</Text>
                </View>
              </View>
              <View style={styles.routineRight}>
                <Text style={styles.routineTime}>{item.time}</Text>
                <View style={[
                  styles.statusDot,
                  { backgroundColor: item.completed ? '#10B981' : '#F59E0B' }
                ]} />
                <TouchableOpacity 
                  style={styles.deleteButton}
                  onPress={() => handleDeleteTask(item.id)}
                >
                  <X size={14} color="#EF4444" strokeWidth={2} />
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>

        {/* Medicine Reminder Card */}
        <LinearGradient
          colors={['#FFF8F0', '#FFE4CC']}
          style={styles.reminderCard}
        >
          <View style={styles.reminderContent}>
            <Bell size={24} color="#FF6B35" strokeWidth={2} />
            <Text style={styles.reminderTitle}>अगली दवाई का समय</Text>
            <Text style={styles.reminderSubtitle}>Next Medicine Time</Text>
            <Text style={styles.reminderTime}>8:00 AM में</Text>
            <TouchableOpacity style={styles.reminderButton}>
              <Text style={styles.reminderButtonText}>रिमाइंडर सेट करें</Text>
            </TouchableOpacity>
          </View>
        </LinearGradient>

        <View style={styles.bottomSpacing} />
      </ScrollView>
      
      <AddTaskModal
        visible={isAddModalVisible}
        onClose={() => setIsAddModalVisible(false)}
        onSave={handleSaveTask}
        selectedTimeSlot={selectedTime}
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
  addButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFF8F0',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#FFE4CC',
  },
  timeSelectorContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  timeSelector: {
    flexDirection: 'row',
  },
  timeSlot: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    marginRight: 12,
    borderWidth: 2,
    borderColor: '#E5E7EB',
    alignItems: 'center',
    minWidth: 100,
  },
  activeTimeSlot: {
    backgroundColor: '#FFF8F0',
  },
  timeSlotLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
  },
  timeSlotSubtitle: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 2,
  },
  routineContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  routineItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 16,
    marginBottom: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  routineLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  routineIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  routineContent: {
    flex: 1,
  },
  routineActivity: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 2,
  },
  completedActivity: {
    textDecorationLine: 'line-through',
    color: '#6B7280',
  },
  routineSubtitle: {
    fontSize: 14,
    color: '#6B7280',
  },
  routineRight: {
    alignItems: 'flex-end',
  },
  routineTime: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 4,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginBottom: 4,
  },
  deleteButton: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#FEE2E2',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 4,
  },
  reminderCard: {
    margin: 20,
    borderRadius: 20,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  reminderContent: {
    padding: 24,
    alignItems: 'center',
  },
  reminderTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FF6B35',
    marginTop: 8,
  },
  reminderSubtitle: {
    fontSize: 14,
    color: '#D97706',
    marginTop: 2,
  },
  reminderTime: {
    fontSize: 20,
    fontWeight: '700',
    color: '#92400E',
    marginTop: 8,
  },
  reminderButton: {
    backgroundColor: '#FF6B35',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    marginTop: 12,
  },
  reminderButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  bottomSpacing: {
    height: 20,
  },
});