import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';

const MetricCard = ({ title, value, icon, color }) => (
  <Card sx={{ minWidth: 180, background: color, color: '#fff', boxShadow: 3 }}>
    <CardContent>
      {icon && <span style={{ fontSize: 32, marginRight: 8 }}>{icon}</span>}
      <Typography variant="h6" component="div">{title}</Typography>
      <Typography variant="h4" component="div" sx={{ fontWeight: 'bold' }}>{value}</Typography>
    </CardContent>
  </Card>
);

export default MetricCard;
