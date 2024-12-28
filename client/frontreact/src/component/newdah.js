import React from 'react';
import { Grid, Card, CardContent, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import useDemoRouter from './tolpad'; // المسار حسب مكان الملف


function Newdash() {
  const navigate = useNavigate();
  const router = useDemoRouter('/dashboard'); // استخدام الـ router


  return (
    <>
      <h1>Dash Page</h1>
      <Grid container spacing={3}>
        {/* Card for Users */}
        <Grid item xs={12} sm={6} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" component="div">
                Total Users
              </Typography>
              <Typography variant="h4" color="primary">
                300
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Card for Orders */}
        <Grid item xs={12} sm={6} md={4}>
          <Card onClick={() =>navigate('/orders')} style={{ cursor: 'pointer' }}>
            <CardContent>
              <Typography variant="h6" component="div">
                Total Orders
              </Typography>
              <Typography variant="h4" color="secondary">
                700
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Card for Profit */}
        <Grid item xs={12} sm={6} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" component="div">
                Profit
              </Typography>
              <Typography variant="h4" color="secondary">
                1000jd
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  );
}

export default Newdash;