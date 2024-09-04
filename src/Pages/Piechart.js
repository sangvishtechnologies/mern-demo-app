import * as React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import { PieChart } from '@mui/x-charts/PieChart';
import { LineChart } from '@mui/x-charts/LineChart';
import { Grid, Paper, Typography } from '@mui/material';

const users = [
  {
    "_id": { "$oid": "66960056c2e4380d06508a4b" },
    "username": "Mohamed_Siraj_786",
    "email": "mohamedsiraj237@gmail.com",
    "role": "Test Engineer",
    "batch": "july",
    "location": "Coimbatore",
    "createdAt": { "$date": "2024-07-16T05:08:38.574Z" }
  },
  {
    "_id": { "$oid": "66960056c2e4380d06508a4c" },
    "username": "John_Doe_123",
    "email": "johndoe123@example.com",
    "role": "Software Engineer",
    "batch": "august",
    "location": "Chennai",
    "createdAt": { "$date": "2024-08-01T10:20:30.574Z" }
  },
  {
    "_id": { "$oid": "66960056c2e4380d06508a4d" },
    "username": "Jane_Smith_456",
    "email": "janesmith456@example.com",
    "role": "Software Engineer",
    "batch": "september",
    "location": "Chennai",
    "createdAt": { "$date": "2024-09-05T14:15:40.574Z" }
  },
  {
    "_id": { "$oid": "66960056c2e4380d06508a4e" },
    "username": "Alice_Wonder_789",
    "email": "alicewonder789@example.com",
    "role": "Data Scientist",
    "batch": "november",
    "location": "Chennai",
    "createdAt": { "$date": "2024-10-10T08:09:20.574Z" }
  },
  {
    "_id": { "$oid": "66960056c2e4380d06508a4f" },
    "username": "Bob_Marley_101",
    "email": "bobmarley101@example.com",
    "role": "Data Scientist",
    "batch": "november",
    "location": "Ahmedabad",
    "createdAt": { "$date": "2024-12-15T12:10:15.574Z" }
  },
  {
    "_id": { "$oid": "66960056c2e4380d06508a50" },
    "username": "Eve_Adams_102",
    "email": "eveadams102@example.com",
    "role": "Frontend Developer",
    "batch": "december",
    "location": "Ahmedabad",
    "createdAt": { "$date": "2024-12-20T16:18:10.574Z" }
  },
  {
    "_id": { "$oid": "66960056c2e4380d06508a51" },
    "username": "David_Blake_103",
    "email": "davidblake103@example.com",
    "role": "Frontend Developer",
    "batch": "january",
    "location": "Delhi",
    "createdAt": { "$date": "2025-01-05T09:11:05.574Z" }
  },
  {
    "_id": { "$oid": "66960056c2e4380d06508a52" },
    "username": "Charlie_Brown_104",
    "email": "charliebrown104@example.com",
    "role": "Backend Developer",
    "batch": "january",
    "location": "Delhi",
    "createdAt": { "$date": "2025-02-10T11:12:00.574Z" }
  },
  {
    "_id": { "$oid": "66960056c2e4380d06508a53" },
    "username": "Diana_Prince_105",
    "email": "dianaprince105@example.com",
    "role": "Product Manager",
    "batch": "Delhi",
    "location": "Ahmedabad",
    "createdAt": { "$date": "2025-03-15T14:16:55.574Z" }
  }
];

// Function to count users by location
const countUsersByLocation = (data) => {
  return data.reduce((acc, user) => {
    acc[user.location] = (acc[user.location] || 0) + 1;
    return acc;
  }, {});
};

// Function to aggregate users by month
const aggregateByMonth = (data) => {
  const monthCounts = {};

  data.forEach(user => {
    const date = new Date(user.createdAt.$date);
    const monthYear = `${date.getFullYear()}-${date.getMonth() + 1}`; // Format as "YYYY-M"

    console.log(monthYear, "date obj", date, "date ")

    if (!monthCounts[monthYear]) {
      monthCounts[monthYear] = 0;
    }
    monthCounts[monthYear]++;
  });
   
  console.log(monthCounts, "month counts")

  return Object.entries(monthCounts).map(([month, count]) => ({
    month,
    count
  }));
};

// Prepare data for the charts
const locationCounts = countUsersByLocation(users);

const locationChartData = Object.keys(locationCounts).map(location => ({
  location,
  count: locationCounts[location]
}));

const aggregatedData = aggregateByMonth(users);

console.log(aggregatedData, "aggdata")

// Data for role-based chart
const roleCounts = users.reduce((acc, user) => {
  acc[user.role] = (acc[user.role] || 0) + 1;
  return acc;
}, {});

const roleChartData = Object.keys(roleCounts).map(role => ({
  role,
  count: roleCounts[role]
}));

export default function CombinedCharts() {
  return (
    <Paper
      elevation={4}
      sx={{
        backgroundColor: '#f5f5f5',
        padding: 4,
        width: "85vw",
        borderRadius: 3,
        maxWidth: '100%',
        margin: 'auto',
        overflowY: 'auto', // Enable vertical scrolling
        maxHeight: '90vh', // Make sure container doesn't take up more than 90% of the viewport height
      }}
    >
      <Typography variant="h4" align="center" gutterBottom sx={{ fontWeight: 'bold', color: '#333' }}>
        User Data Overview
      </Typography>
      <Grid container spacing={4} direction="column" alignItems="center">
        
        <Grid item xs={12}>
          <Paper 
            elevation={2} 
            sx={{ 
              padding: 2, 
              borderRadius: 2, 
              backgroundColor: '#ffffff', 
              display: 'flex', 
              flexDirection: 'column',
              alignItems: 'center',
              width: '100%'
            }}
          >
            <Typography variant="h6" align="center" gutterBottom sx={{ fontWeight: 'medium', color: '#444', marginBottom: 2 }}>
              User Registrations by Location
            </Typography>
            <BarChart
              xAxis={[{ scaleType: 'band', data: locationChartData.map(d => d.location) }]}
              series={[{ data: locationChartData.map(d => d.count) }]}
              width={1000}
              height={350}
            />
          </Paper>
        </Grid>

        <Grid item xs={12}>
          <Paper 
            elevation={2} 
            sx={{ 
              padding: 2, 
              borderRadius: 2, 
              backgroundColor: '#ffffff', 
              display: 'flex', 
              flexDirection: 'column',
              alignItems: 'center',
              width: '100%'
            }}
          >
            <Typography variant="h6" align="center" gutterBottom sx={{ fontWeight: 'medium', color: '#444', marginBottom: 2 }}>
              User Registrations by Month
            </Typography>
            <PieChart
              series={[
                {
                  data: aggregatedData.map(({ month, count }) => ({
                    id: month,
                    label: month,
                    value: count
                  }))
                }
              ]}
              width={1000}
              height={350}
            />
          </Paper>
        </Grid>

        <Grid item xs={12}>
          <Paper 
            elevation={2} 
            sx={{ 
              padding: 2, 
              borderRadius: 2, 
              backgroundColor: '#ffffff', 
              display: 'flex', 
              flexDirection: 'column',
              alignItems: 'center',
              width: '100%'
            }}
          >
            <Typography variant="h6" align="center" gutterBottom sx={{ fontWeight: 'medium', color: '#444', marginBottom: 2 }}>
              User Roles Distribution
            </Typography>
            <LineChart
              width={1000}
              height={350}
              series={[{ data: roleChartData.map(({ count }) => count), label: 'Role Count', area: true, showMark: true }]}
              xAxis={[{ scaleType: 'point', data: roleChartData.map(({ role }) => role) }]}
            />
          </Paper>
        </Grid>
        
      </Grid>
    </Paper>
  );
}
