import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Platform, Alert } from 'react-native';
import { BarChart } from 'react-native-gifted-charts';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Button } from 'react-native-elements/dist/buttons/Button';

const Graph = () => {
  const [selectedMood, setSelectedMood] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const barData = [
    { day: '2022-01-01', mood: 'happy', value: 40, frontColor: 'orange' },
    { day: '2022-01-01', mood: 'sad', value: 20, frontColor: '#ED6665' },
    { day: '2022-01-01', mood: 'sad', value: 20, frontColor: '#ED6665' },
    { day: '2022-01-01', mood: 'sad', value: 20, frontColor: '#ED6665' },
    { day: '2022-01-02', mood: 'happy', value: 50, frontColor: 'orange' },
    { day: '2022-01-02', mood: 'sad', value: 40, frontColor: '#ED6665' },
    { day: '2022-01-03', mood: 'happy', value: 75, frontColor: 'orange' },
    { day: '2022-01-03', mood: 'sad', value: 25, frontColor: '#ED6665' },
    { day: '2022-01-04', mood: 'happy', value: 30, frontColor: 'orange' },
    { day: '2022-01-04', mood: 'sad', value: 20, frontColor: '#ED6665' },
    { day: '2022-01-05', mood: 'happy', value: 60, frontColor: 'orange' },
    { day: '2022-01-05', mood: 'sad', value: 40, frontColor: '#ED6665' },
    { day: '2022-01-06', mood: 'happy', value: 65, frontColor: 'orange' },
    { day: '2022-01-06', mood: 'sad', value: 30, frontColor: '#ED6665' },
  ];

  let filteredData = barData.filter(
    (item) =>
      (selectedMood === '' || item.mood === selectedMood) &&
      item.day === selectedDate.toISOString().split('T')[0]
  );

  if (!selectedDate || filteredData.length === 0) {
    // If no date is selected or selected date is not in the array, show all bars
    filteredData = barData.filter((item) => selectedMood === '' || item.mood === selectedMood);
  }

  const renderTitle = () => {
    return (
      <View style={{ marginVertical: 30, paddingHorizontal: 16, paddingVertical: 20 }}>
        <Text
          style={{
            color: 'white',
            fontSize: 20,
            fontWeight: 'bold',
            textAlign: 'center',
            marginBottom: 16,
          }}
          testID='graph-header'
        >
          Your mood this month
        </Text>

        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 16 }}>
          {renderMoodButton('', 'All Moods')}
          {renderMoodButton('happy', 'Happy')}
          {renderMoodButton('sad', 'Sad')}
        </View>

        {renderDatePickerButton()}

        {showDatePicker && (
          <DateTimePicker
            value={selectedDate}
            mode="date"
            display="default"
            onChange={onDateChange}
          />
        )}
      </View>
    );
  };

  const renderMoodButton = (mood: string, label: string) => (
    <TouchableOpacity onPress={() => handleMoodSelection(mood)}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <View
          style={{
            height: 12,
            width: 12,
            borderRadius: 6,
            backgroundColor: mood ? (mood === 'happy' ? 'orange' : '#ED6665') : '#177AD5',
            marginRight: 8,
          }}
        />
        <Text
          style={{
            width: 60,
            height: 16,
            color: selectedMood === mood ? 'white' : 'lightgray',
          }}
          testID={`${mood || 'all'}-moods-button`}
        >
          {label}
        </Text>
      </View>
    </TouchableOpacity>
  );

  const handleMoodSelection = (mood: string) => {
    setSelectedMood(mood);
  };

  const renderDatePickerButton = () => (
    <TouchableOpacity style={{ backgroundColor: 'orange', padding: 10, borderRadius: 50 }} onPress={() => setShowDatePicker(true)}>
      <View style={{ flexDirection: 'row', alignItems: 'center',justifyContent:'center' }}>
        <Text style={{ color: 'black', marginRight: 8 }}>Select Date</Text>
        <Text style={{ color: 'black' }}>{formatDate(selectedDate)}</Text>
      </View>
    </TouchableOpacity>
  );

  const onDateChange = (event: any, selected: any) => {
    if (Platform.OS === 'android') {
      setShowDatePicker(false);
    }
    if (selected) {
      setSelectedDate(selected);
      // You can perform any action when the date changes
      // For example, fetch data for the selected date
    }
  };

  const formatDate = (date: any) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  };

  return (
    <View style={{ flex: 1, backgroundColor: 'black' }}>
      {renderTitle()}
      <BarChart data={filteredData} />
    </View>
  );
};

export default Graph;
