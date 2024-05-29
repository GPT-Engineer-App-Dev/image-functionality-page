import { useState, useRef } from "react";
import { Box, Button, Container, Text, VStack, HStack } from "@chakra-ui/react";

const Index = () => {
  const [time, setTime] = useState({ minutes: 0, seconds: 0, milliseconds: 0 });
  const [isRunning, setIsRunning] = useState(false);
  const [isOn, setIsOn] = useState(true);
  const [splits, setSplits] = useState([]);
  const timerRef = useRef(null);

  const startStopTimer = () => {
    if (isRunning) {
      clearInterval(timerRef.current);
    } else {
      const startTime = Date.now() - (time.minutes * 60000 + time.seconds * 1000 + time.milliseconds);
      timerRef.current = setInterval(() => {
        const elapsedTime = Date.now() - startTime;
        setTime({
          minutes: Math.floor(elapsedTime / 60000),
          seconds: Math.floor((elapsedTime % 60000) / 1000),
          milliseconds: Math.floor((elapsedTime % 1000) / 10),
        });
      }, 10);
    }
    setIsRunning(!isRunning);
  };

  const splitResetTimer = () => {
    if (isRunning) {
      setSplits([...splits, time]);
    } else {
      setTime({ minutes: 0, seconds: 0, milliseconds: 0 });
      setSplits([]);
    }
  };

  const toggleOnOff = () => {
    if (isOn) {
      clearInterval(timerRef.current);
      setTime({ minutes: 0, seconds: 0, milliseconds: 0 });
      setSplits([]);
    }
    setIsOn(!isOn);
  };

  return (
    <Container centerContent maxW="container.md" height="100vh" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
      {isOn ? (
        <VStack spacing={4}>
          <Box borderWidth="1px" borderRadius="lg" p={4} textAlign="center">
            <Text fontSize="4xl">
              {String(time.minutes).padStart(2, "0")}:
              {String(time.seconds).padStart(2, "0")}:
              {String(time.milliseconds).padStart(2, "0")}
            </Text>
          </Box>
          <HStack spacing={4}>
            <Button colorScheme="teal" onClick={startStopTimer}>
              {isRunning ? "Stop" : "Start"}
            </Button>
            <Button colorScheme="teal" onClick={splitResetTimer}>
              {isRunning ? "Split" : "Reset"}
            </Button>
            <Button colorScheme="red" onClick={toggleOnOff}>
              Off
            </Button>
          </HStack>
          {splits.length > 0 && (
            <Box mt={4} w="100%">
              <Text fontSize="xl" mb={2}>Splits:</Text>
              {splits.map((split, index) => (
                <Text key={index}>
                  {String(split.minutes).padStart(2, "0")}:
                  {String(split.seconds).padStart(2, "0")}:
                  {String(split.milliseconds).padStart(2, "0")}
                </Text>
              ))}
            </Box>
          )}
        </VStack>
      ) : (
        <Button colorScheme="green" onClick={toggleOnOff}>
          On
        </Button>
      )}
    </Container>
  );
};

export default Index;