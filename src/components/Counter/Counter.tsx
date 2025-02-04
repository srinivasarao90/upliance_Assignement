import { useState, useEffect } from 'react';
import { useSpring, animated } from '@react-spring/web';
import { Button, Stack, Typography } from '@mui/material';

const CounterComponent = () => {
  // State initialization with error handling for localStorage
  const [count, setCount] = useState<number>(() => {
    try {
      const saved = localStorage.getItem('count');
      return saved ? JSON.parse(saved) : 0; // Default to 0 if no saved count
    } catch (error) {
      console.error('Error reading count from localStorage', error);
      return 0; // Fallback value if there's an error
    }
  });

  // Animate background based on the count value
  const backgroundAnimation = useSpring({
    from: { height: '0%' },
    to: { height: `${Math.min(count, 100)}%` }, // Limit to 100% max
    config: { tension: 120, friction: 14 },
  });

  // Save count to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem('count', JSON.stringify(count));
    } catch (error) {
      console.error('Error saving count to localStorage', error);
    }
  }, [count]);

  return (
    <div style={{ 
      position: 'relative', 
      height: '100vh', 
      overflow: 'hidden', 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      flexDirection: 'column' 
    }}>
      {/* Animated background div based on count */}
      <animated.div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: `${Math.min(count, 100)}%`,
          backgroundColor: '#2196f3',
          zIndex: 1, // Background stays below text
        }}
      />

      {/* Wrapper for count display (ensures visibility) */}
      <div style={{ 
        zIndex: 2, 
        textAlign: 'center', 
        backgroundColor: 'rgba(0, 0, 0, 0.5)', 
        padding: '10px 20px', 
        borderRadius: '8px' 
      }}>
        <Typography
          variant="h2"
          sx={{
            fontSize: { xs: '2.5rem', md: '4rem' },
            color: '#fff',
            textShadow: '2px 2px 10px rgba(0, 0, 0, 0.7)',
          }}
        >
          {count}
        </Typography>
      </div>

      {/* Counter Buttons */}
      <Stack
        spacing={2}
        direction={{ xs: 'column', sm: 'row' }}
        sx={{ zIndex: 2, marginTop: '20px' }}
      >
        <Button variant="contained" onClick={() => setCount(c => c + 1)}>
          Increment
        </Button>
        <Button variant="contained" onClick={() => setCount(c => c - 1)}>
          Decrement
        </Button>
        <Button variant="contained" onClick={() => setCount(0)}>
          Reset
        </Button>
      </Stack>
    </div>
  );
};

export default CounterComponent;
