import { LinearGradient } from 'expo-linear-gradient';
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native';

const CircleIndicator = ({ totalQuestions, currentQuestion }:{totalQuestions:any,currentQuestion:any}) => {
  const circles = Array.from({ length: totalQuestions }, (_, index) => index + 1);

  return (
    <View style={styles.circleContainer}>
      {circles.map((circleNumber) => (
        <View
          key={circleNumber}
          style={[
            styles.circle,
            {
              backgroundColor:
                circleNumber === currentQuestion
                  ? 'white' // Background for the current question (filled)
                  : circleNumber < currentQuestion
                  ? 'transparent' // Background for the previous questions (empty)
                  : 'transparent',
            },
          ]}
        >
          <Text
            style={[
              styles.circleText,
              {
                color:
                  circleNumber === currentQuestion
                    ? 'black' // Text color for the current question (black)
                    : '#000f', // Text color for the previous questions (white)
              },
            ]}
          >
            {circleNumber}
          </Text>
        </View>
      ))}
    </View>
  );
};

const Quizz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedChoice, setSelectedChoice] = useState<string|null>(null);

  const questions = [
    {
      question: 'What is the capital of France?',
      choices: ['Berlin', 'Madrid', 'Paris', 'Rome'],
      correctAnswer: 'Paris',
    },
    {
      question: 'Which planet is known as the Red Planet?',
      choices: ['Earth', 'Mars', 'Jupiter', 'Saturn'],
      correctAnswer: 'Mars',
    },
    // Add more questions as needed
  ];

  const handleAnswer = (selectedAnswer:any) => {
    const currentQuestionData = questions[currentQuestion];

    if (selectedAnswer === currentQuestionData.correctAnswer) {
      setScore(score + 1);
    }

    // Move to the next question or end the quiz
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedChoice(null); // Reset selected choice for the next question
    } else {
      // End of quiz, display score or navigate to a different screen
      alert(`Quiz completed! Your score: ${score} out of ${questions.length}`);
      // Additional logic to handle the end of the quiz
    }
  };

  return (
 
      <LinearGradient
      colors={['#ff0200', '#f54a03']}
      start={{ x: 0, y: 1 }}
      end={{ x: 1, y: 0 }}
      style={styles.container}
    > 
      <CircleIndicator totalQuestions={questions.length} currentQuestion={currentQuestion + 1} />

      <View style={styles.choicesContainer}>
        <Text style={styles.questionText}>{questions[currentQuestion].question}</Text>
        {questions[currentQuestion].choices.map((choice, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.choiceButton,
              selectedChoice === choice && styles.selectedChoice,
            ]}
            onPress={() => setSelectedChoice(choice)}
          >
            <Text
              style={[
                styles.choiceText,
                selectedChoice === choice && styles.choiceTextSelected,
              ]}
            >
              {choice}
            </Text>
          </TouchableOpacity>
        ))}
        <TouchableOpacity
          
          onPress={() => handleAnswer(selectedChoice)}
          disabled={selectedChoice === null}
        >
          <LinearGradient
      colors={['#FFD710', '#FF4510']} // Light orange to red gradient
      start={{ x: 0, y: 1 }}
      end={{ x: 1, y: 0 }}
        style={styles.submitButton}
    > 
          <Text style={styles.submitButtonText}>Submit</Text>

          </LinearGradient>
        </TouchableOpacity>
      </View>
      </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black', // Purple background color
  },
  circleContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  circle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  circleText: {
    fontSize: 16,
    color:'black'
  },
  questionText: {
    fontSize: 20,
    marginBottom: 20,
    textAlign: 'center',
    color: '#333333', // Light text color
  },
  choicesContainer: {
    width: '82%', // Adjust the width as needed
    backgroundColor: 'white',
    flex: 0.6,
    justifyContent: 'space-evenly',
    padding: 35,
    borderRadius: 15,
    ...Platform.select({
      ios: {
        shadowColor: 'rgba(0, 0, 0, 0.3)',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  choiceButton: {
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
  },
  selectedChoice: {
    backgroundColor: 'orange',
    borderRadius: 15,
    padding: 10,
  },
  choiceText: {
    color: 'black', // Dark text color
    fontSize: 16,
  },
  choiceTextSelected: {
    color: 'white', // Text color when a choice is selected
    fontSize: 16,
  },
  submitButton: {
     padding: 10,
    marginVertical: 10,
    borderRadius: 15,
  },
  submitButtonText: {
    color: 'white', // Light text color
    fontWeight:'bold',
    textTransform:'uppercase',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default Quizz;

