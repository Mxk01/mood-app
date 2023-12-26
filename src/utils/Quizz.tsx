import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { quizzStyles } from './styles/quizz';
type Questions = {
  question: string;
  choices: string[];
  correctAnswer: string;
};

const CircleIndicator = ({
  totalQuestions,
  currentQuestion,
}: {
  totalQuestions: number;
  currentQuestion: number;
}) => {
  const circles = Array.from({ length: totalQuestions }, (_, index) => index + 1);

  return (
    <View style={quizzStyles.circleContainer}>
      {circles.map((circleNumber) => (
        <View
          key={circleNumber}
          style={[
            quizzStyles.circle,
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
              quizzStyles.circleText,
              {
                color:
                  circleNumber === currentQuestion
                    ? 'black' // Text color for the current question (black)
                    : 'white', // Text color for the previous questions (white)
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
  const [selectedChoice, setSelectedChoice] = useState<string | null>(null);

  const questions: Questions[] = [
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

  const handleAnswer = (selectedAnswer: string) => {
    const currentQuestionData = questions[currentQuestion];

    if (selectedAnswer === currentQuestionData.correctAnswer) {
      setScore((prevScore) => prevScore + 1);
    }

    // Move to the next question or end the quiz
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prevQuestion) => prevQuestion + 1);
      setSelectedChoice(null); // Reset selected choice for the next question
    } else {
      // End of quiz, display score or navigate to a different screen
      alert(`Quiz completed! Your score: ${score} out of ${questions.length}`);
      // Additional logic to handle the end of the quiz
    }
  };

  return (
    <View style={quizzStyles.container}>
      <CircleIndicator totalQuestions={questions.length} currentQuestion={currentQuestion + 1} />

      <View style={quizzStyles.choicesContainer}>
        <Text style={quizzStyles.questionText}>
          {currentQuestion < questions.length && questions[currentQuestion].question}
        </Text>
        {questions[currentQuestion]?.choices.map((choice, index) => (
          <TouchableOpacity
            key={index}
            style={[
              quizzStyles.choiceButton,
              selectedChoice === choice && quizzStyles.selectedChoice,
            ]}
            onPress={() => setSelectedChoice(choice)}
          >
            <Text
              style={[
                quizzStyles.choiceText,
                selectedChoice === choice && quizzStyles.choiceTextSelected,
              ]}
            >
              {choice}
            </Text>
          </TouchableOpacity>
        ))}
        <TouchableOpacity
          style={quizzStyles.submitButton}
          onPress={() => handleAnswer(selectedChoice as string)}
          disabled={selectedChoice === null}
        >
          <Text style={quizzStyles.submitButtonText}>Submit</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};


export default Quizz;

 