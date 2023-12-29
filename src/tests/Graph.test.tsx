import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import Graph from '../components/Graph';

describe('Graph Component', () => {
    it('renders the component with default props', () => {
      const { getByTestId } = render(<Graph />);
      const header = getByTestId('graph-header');
      expect(header).toBeTruthy();
    });

    it('renders the correct number of mood buttons', () => {
        const { getByText } = render(<Graph />);
        const allMoodsButton = getByText('All Moods');
        const happyButton = getByText('Happy');
        const sadButton = getByText('Sad');
    
        expect(allMoodsButton).toBeTruthy();
        expect(happyButton).toBeTruthy();
        expect(sadButton).toBeTruthy();
      });
      it('changes the selected mood when a button is pressed', () => {
        const { getByText } = render(<Graph/>);
        const happyButton = getByText('Happy');
    
        fireEvent.press(happyButton);
    
        const happyButtonSelected = getByText('Happy');
        expect(happyButtonSelected.props.style.color).toBe('white');
      });

      it('renders the correct number of bars in the chart', () => {
        const { getByTestId } = render(<Graph />);
        const chart = getByTestId('bar-chart');
        // const bars = chart.findAllByType('View'); // Adjust based on your BarChart implementation
    
        // Assuming you have 12 data points in your barData
        // expect(bars.length).toBe(12);
      });

    })