import React from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from 'recharts';

const Chart = ({ fiveDaysWeather }) => {
  const data = fiveDaysWeather.map((day) => {
    const { dt_txt, main } = day;
    const { temp } = main;
    const dayForcast = { temp, dt_txt };
    return dayForcast;
  });
  return (
    <AreaChart
      width={1200}
      height={400}
      data={data}
      margin={{
        top: 10,
        right: 30,
        left: 0,
        bottom: 0,
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="dt_txt" />
      <YAxis />
      <Tooltip />
      <Area type="monotone" dataKey="temp" stroke="#8884d8" fill="#8884d8" />
    </AreaChart>
  );
};

export default Chart;
