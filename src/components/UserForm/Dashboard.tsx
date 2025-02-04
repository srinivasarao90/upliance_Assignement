import { useState, useEffect } from 'react';
import { Card, CardContent, Typography, Avatar, Box } from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

// Dashboard Component
const Dashboard = () => {
  const [userData, setUserData] = useState<any>(null);

  useEffect(() => {
    const storedData = localStorage.getItem('userData');
    if (storedData) setUserData(JSON.parse(storedData));
  }, []);

  if (!userData) return <Typography>No data available</Typography>;

  const chartData = [
    { name: 'Users', value: 1 },
  ];

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 4 }}>
      <Card sx={{ width: 300, mb: 3, p: 2, textAlign: 'center' }}>
        <Avatar src={userData.image} sx={{ width: 100, height: 100, mx: 'auto', mb: 2 }} />
        <Typography variant="h6">{userData.name}</Typography>
        <Typography variant="body2">{userData.email}</Typography>
        <Typography variant="body2">{userData.phone}</Typography>
        <Typography variant="body2">{userData.address}</Typography>
      </Card>

      <Card sx={{ width: 500, p: 2 }}>
        <Typography variant="h6" textAlign="center">User Trends</Typography>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={chartData}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" fill="#007bff" />
          </BarChart>
        </ResponsiveContainer>
      </Card>
    </Box>
  );
};

export default Dashboard;
