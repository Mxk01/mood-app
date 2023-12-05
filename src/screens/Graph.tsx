import React,{useRef,useEffect,useState} from "react";
import {
    LineChart,
    BarChart,
    PieChart,
    ProgressChart,
    ContributionGraph,
    StackedBarChart
  } from "react-native-chart-kit";
  import { View,Text,Dimensions,Animated,PanResponder} from "react-native";
  function Graph() {
    const data = {
      labels: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday","Sunday"],
      datasets: [
        {
          data: [
            Math.random() * 100,
            Math.random() * 100,
            Math.random() * 100,
            Math.random() * 100,
            Math.random() * 100,
            Math.random() * 100,
          ],
        },
      ],
    };
  
    const [pointX, setPointX] = useState(0);
  
    const panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: (_, gestureState) => {
        // Update the x-value of the point based on the gesture position
        const x = gestureState.moveX;
        const numberOfDataPoints = data.labels.length;
        const chartWidth = Dimensions.get("window").width;
        const updatedX = Math.max(0, Math.min((x / chartWidth) * (numberOfDataPoints - 1), numberOfDataPoints - 1));
        setPointX(updatedX);
      },
      onPanResponderRelease: () => {
        // You can perform any additional actions when the user releases the touch
      },
    });
  
    return (
      <View
        style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#000" }}
        {...panResponder.panHandlers}
      >
        <Text style={{ color: "#fff", marginBottom: 10 }}>Bezier Line Chart</Text>
        <LineChart
          data={{
            labels: data.labels,
            datasets: [
              {
                data: data.datasets[0].data,
              },
            ],
          }}
          width={Dimensions.get("window").width}
          height={500}
          yAxisLabel="m"
          yAxisSuffix="k"
          yAxisInterval={2}
          chartConfig={{
            backgroundColor: "#020024",
            backgroundGradientFrom: "#92ff4c",
            backgroundGradientTo: "#ff007d",
            decimalPlaces: 2,
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            style: {
              borderRadius: 16,
            },
            propsForDots: {
              r: "0", // Set the radius to 0 to hide other points
              strokeWidth: "2",
              stroke: "#ffa726",
            },
          }}
          bezier
          style={{
            marginVertical: 8,
            borderRadius: 16,
            marginLeft: -16, // Adjust to center the graph
          }}
        />
        <View
          style={{
            position: "absolute",
            left: (pointX / (data.labels.length - 1)) * (Dimensions.get("window").width - 32),
            top: 220, // Adjust the vertical position as needed
            zIndex: 10,
          }}
        >
          <View
            style={{
              width: 20,
              height: 20,
              borderRadius: 10,
              backgroundColor: "#fff", // White color
              borderWidth: 2,
              borderColor: "red", // Border color
            }}
          />
        </View>
      </View>
    );
  }
  
  export default Graph;
  
