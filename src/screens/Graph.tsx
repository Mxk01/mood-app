import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { BarChart } from 'react-native-gifted-charts';

export default function Graph() {
  const [selectedMood, setSelectedMood] = useState<string>(''); // Initial state is null, showing all moods

  const barData = [
    { day: '1', mood: 'happy', value: 40, frontColor: 'orange' },
    { day: '1', mood: 'sad', value: 20, frontColor: '#ED6665' },
    { day: '2', mood: 'happy', value: 50, frontColor: 'orange'},
    { day: '2', mood: 'sad', value: 40, frontColor: '#ED6665' },
    { day: '3', mood: 'happy', value: 75, frontColor: 'orange'},
    { day: '3', mood: 'sad', value: 25, frontColor: '#ED6665' },
    { day: '4', mood: 'happy', value: 30, frontColor: 'orange'},
    { day: '4', mood: 'sad', value: 20, frontColor: '#ED6665' },
    { day: '5', mood: 'happy', value: 60, frontColor: 'orange'},
    { day: '5', mood: 'sad', value: 40, frontColor: '#ED6665' },
    { day: '6', mood: 'happy', value: 65, frontColor: 'orange'},
    { day: '6', mood: 'sad', value: 30, frontColor: '#ED6665' },
  ];

  const renderTitle = () => {
    return (
      <View style={{ marginVertical: 30 }}>
 
        <Text
          style={{
            color: 'white',
            fontSize: 20,
            fontWeight: 'bold',
            padding:50,
            textTransform:'uppercase',
            textAlign: 'center',
          }}
        >
          Your mood this month
        </Text>

        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            marginTop: 24,
            backgroundColor: 'yellow',
          }}
        >
          <TouchableOpacity onPress={() => setSelectedMood('')}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <View
                style={{
                  height: 12,
                  width: 12,
                  borderRadius: 6,
                  backgroundColor: '#177AD5',
                  marginRight: 8,
                }}
              />
              <Text
                style={{
                  width: 60,
                  height: 16,
                  color: selectedMood === '' ? 'white' : 'lightgray',
                }}
              >
                All Moods
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => setSelectedMood('happy')}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <View
                style={{
                  height: 12,
                  width: 12,
                  borderRadius: 6,
                  backgroundColor: '#177AD5',
                  marginRight: 8,
                }}
              />
              <Text
                style={{
                  width: 60,
                  height: 16,
                  color: selectedMood === 'happy' ? 'white' : 'lightgray',
                }}
              >
                Happy
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => setSelectedMood('sad')}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <View
                style={{
                  height: 12,
                  width: 12,
                  borderRadius: 6,
                  backgroundColor: '#ED6665',
                  marginRight: 8,
                }}
              />
              <Text
                style={{
                  width: 60,
                  height: 16,
                  color: selectedMood === 'sad' ? 'white' : 'lightgray',
                }}
              >
                Sad
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <View
      style={{
        backgroundColor: 'black',
        paddingBottom: 40,
        borderRadius: 10,
        flex:1
      }}
    >
      {renderTitle()}
      <BarChart
        data={selectedMood ? barData.filter((bar) => bar.mood === selectedMood) : barData}
        barWidth={8}
        spacing={24}
        roundedTop
        roundedBottom
        hideRules
        xAxisThickness={0}
        yAxisThickness={0}
        yAxisTextStyle={{ color: 'gray' }}
        noOfSections={3}
        maxValue={75}
      />
    </View>
  );
}
