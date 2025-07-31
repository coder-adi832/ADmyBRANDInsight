import React, { useState } from 'react';
import Button from '@mui/material/Button';
import {
  LineChart, Line,
  BarChart, Bar,
  PieChart, Pie, Cell,
  XAxis, YAxis, Tooltip, Legend,
  ResponsiveContainer
} from 'recharts';

const BASE_COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
const DARK_MIXED_COLORS = [
  '#60A5FA', // blue-400
  '#34D399', // green-400
  '#FBBF24', // yellow-400
  '#F87171', // red-400
];

const lineData = [
  { name: 'Jan', Revenue: 4000 },
  { name: 'Feb', Revenue: 3000 },
  { name: 'Mar', Revenue: 5000 },
  { name: 'Apr', Revenue: 4780 },
  { name: 'May', Revenue: 5890 },
];

const barData = [
  { name: 'Users', uv: 400, pv: 240 },
  { name: 'Conversions', uv: 300, pv: 139 },
  { name: 'Growth', uv: 200, pv: 980 },
];

const pieData = [
  { name: 'Organic', value: 400 },
  { name: 'Paid', value: 300 },
  { name: 'Social', value: 200 },
];

const DashboardCharts = ({ isLg, zoomedChart, setZoomedChart, zoomMode, darkMode }) => {
  const [hoveredPieIndex, setHoveredPieIndex] = useState(null);

  // Choose colors based on darkMode
  const COLORS = darkMode ? DARK_MIXED_COLORS : BASE_COLORS;
  // Use #292A3E for dark mode chart backgrounds
  const chartBgStyle = darkMode ? { backgroundColor: '#292A3E' } : { backgroundColor: '#fff' };
  const chartText = darkMode ? 'text-white' : 'text-gray-900';
  const legendStyle = darkMode ? { color: '#F3F4F6', fontWeight: 600 } : { color: '#222', fontWeight: 600 };
  const axisColor = darkMode ? '#F3F4F6' : '#222';
  const tooltipBg = darkMode ? '#1F2937' : '#fff';
  // Tooltip text should be black on hover in dark mode
  const tooltipText = darkMode ? '#222' : '#222';

  if (zoomMode && zoomedChart) {
    if (zoomedChart === 'line') {
      return (
        <div className={`w-full rounded-lg shadow p-6 ${chartText}`} style={chartBgStyle}>
          <h2 className="text-xl font-semibold mb-4">Revenue Trend</h2>
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={lineData}>
              <XAxis dataKey="name" stroke={axisColor} />
              <YAxis stroke={axisColor} />
              <Tooltip wrapperStyle={{ background: tooltipBg, color: tooltipText, fontWeight: 600 }} labelStyle={{ color: tooltipText }} itemStyle={{ color: tooltipText }} />
              <Legend wrapperStyle={legendStyle} />
              <Line type="monotone" dataKey="Revenue" stroke={COLORS[0]} strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      );
    }
    if (zoomedChart === 'bar') {
      return (
        <div className={`w-full rounded-lg shadow p-6 ${chartText}`} style={chartBgStyle}>
          <h2 className="text-xl font-semibold mb-4">User & Conversion</h2>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={barData}>
              <XAxis dataKey="name" stroke={axisColor} />
              <YAxis stroke={axisColor} />
              <Tooltip wrapperStyle={{ background: tooltipBg, color: tooltipText, fontWeight: 600 }} labelStyle={{ color: tooltipText }} itemStyle={{ color: tooltipText }} />
              <Legend wrapperStyle={legendStyle} />
              <Bar dataKey="uv" fill={COLORS[1]} radius={[6, 6, 0, 0]} />
              <Bar dataKey="pv" fill={COLORS[2]} radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      );
    }
    if (zoomedChart === 'pie') {
      return (
        <div className={`w-full rounded-lg shadow p-6 ${chartText}`} style={chartBgStyle}>
          <h2 className="text-xl font-semibold mb-4">Traffic Sources</h2>
          <ResponsiveContainer width="100%" height={400}>
            <PieChart>
              <Pie
                data={pieData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={120}
                label
                onMouseEnter={(_, index) => setHoveredPieIndex(index)}
                onMouseLeave={() => setHoveredPieIndex(null)}
              >
                {pieData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                    stroke={hoveredPieIndex === index ? '#F3F4F6' : undefined}
                    strokeWidth={hoveredPieIndex === index ? 4 : 1}
                  />
                ))}
              </Pie>
              <Tooltip wrapperStyle={{ background: tooltipBg, color: tooltipText, fontWeight: 600 }} labelStyle={{ color: tooltipText }} itemStyle={{ color: tooltipText }} />
              <Legend wrapperStyle={legendStyle} />
            </PieChart>
          </ResponsiveContainer>
          <div className={`flex flex-wrap justify-center gap-4 mt-6 ${darkMode ? 'bg-gray-800' : ''}`}>
            {pieData.map((entry, idx) => (
              <div
                key={entry.name}
                className={`flex items-center gap-2 px-4 py-2 rounded shadow ${darkMode ? 'bg-gray-800 text-white' : 'bg-gray-100 text-gray-900'}`}
                style={{ borderLeft: `6px solid ${COLORS[idx % COLORS.length]}` }}
              >
                <span className="font-bold" style={{ color: COLORS[idx % COLORS.length] }}>{entry.name}:</span>
                <span className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-700'}`}>{entry.value}</span>
              </div>
            ))}
          </div>
        </div>
      );
    }
    return null;
  }

  return (
    <div className="flex flex-wrap gap-6 justify-center mt-2">
      <div
        className={`rounded-lg shadow p-4 flex-1 min-w-[320px] relative group cursor-pointer ${chartText}`}
        style={chartBgStyle}
        onClick={() => !isLg && setZoomedChart('line')}
      >
        <h2 className="text-lg font-semibold mb-2">Revenue Trend</h2>
        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={lineData}>
            <XAxis dataKey="name" stroke={axisColor} />
            <YAxis stroke={axisColor} />
            <Tooltip wrapperStyle={{ background: tooltipBg, color: tooltipText, fontWeight: 600 }} labelStyle={{ color: tooltipText }} itemStyle={{ color: tooltipText }} />
            <Legend wrapperStyle={legendStyle} />
            <Line type="monotone" dataKey="Revenue" stroke={COLORS[0]} strokeWidth={3} />
          </LineChart>
        </ResponsiveContainer>
        {isLg && (
          <Button
            variant="contained"
            color="primary"
            size="small"
            sx={{
              position: 'absolute',
              top: 16,
              right: 16,
              px: 1.5,
              py: 0.5,
              borderRadius: 1,
              boxShadow: 2,
              opacity: 0,
              transition: 'opacity 0.2s',
              pointerEvents: 'auto',
              fontWeight: 600,
              fontSize: '1rem',
              '&.MuiButton-root': {
                backgroundColor: '#2563eb',
                color: '#fff',
                '&:hover': { backgroundColor: '#1d4ed8' },
              },
              '.group:hover &': { opacity: 1 },
            }}
            onClick={e => { e.stopPropagation(); setZoomedChart('line'); }}
          >
            View
          </Button>
        )}
      </div>

      <div
        className={`rounded-lg shadow p-4 flex-1 min-w-[320px] relative group cursor-pointer ${chartText}`}
        style={chartBgStyle}
        onClick={() => !isLg && setZoomedChart('bar')}
      >
        <h2 className="text-lg font-semibold mb-2">User & Conversion</h2>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={barData}>
            <XAxis dataKey="name" stroke={axisColor} />
            <YAxis stroke={axisColor} />
            <Tooltip wrapperStyle={{ background: tooltipBg, color: tooltipText, fontWeight: 600 }} labelStyle={{ color: tooltipText }} itemStyle={{ color: tooltipText }} />
            <Legend wrapperStyle={legendStyle} />
            <Bar dataKey="uv" fill={COLORS[1]} radius={[6, 6, 0, 0]} />
            <Bar dataKey="pv" fill={COLORS[2]} radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
        {isLg && (
          <Button
            variant="contained"
            color="primary"
            size="small"
            sx={{
              position: 'absolute',
              top: 16,
              right: 16,
              px: 1.5,
              py: 0.5,
              borderRadius: 1,
              boxShadow: 2,
              opacity: 0,
              transition: 'opacity 0.2s',
              pointerEvents: 'auto',
              fontWeight: 600,
              fontSize: 'inherit',
              '&.MuiButton-root': {
                backgroundColor: '#2563eb',
                color: '#fff',
                '&:hover': { backgroundColor: '#1d4ed8' },
              },
              '.group:hover &': { opacity: 1 },
            }}
            onClick={e => { e.stopPropagation(); setZoomedChart('bar'); }}
          >
            View
          </Button>
        )}
      </div>

      <div
        className={`rounded-lg shadow p-4 flex-1 min-w-[320px] relative group cursor-pointer ${chartText}`}
        style={chartBgStyle}
        onClick={() => !isLg && setZoomedChart('pie')}
      >
        <h2 className="text-lg font-semibold mb-2">Traffic Sources</h2>
        <ResponsiveContainer width="100%" height={200}>
          <PieChart>
            <Pie
              data={pieData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={60}
              label
              onMouseEnter={(_, index) => setHoveredPieIndex(index)}
              onMouseLeave={() => setHoveredPieIndex(null)}
            >
              {pieData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                  stroke={hoveredPieIndex === index ? '#F3F4F6' : undefined}
                  strokeWidth={hoveredPieIndex === index ? 4 : 1}
                />
              ))}
            </Pie>
            <Tooltip wrapperStyle={{ background: tooltipBg, color: tooltipText, fontWeight: 600 }} labelStyle={{ color: tooltipText }} itemStyle={{ color: tooltipText }} />
            <Legend wrapperStyle={legendStyle} />
          </PieChart>
        </ResponsiveContainer>
        {isLg && (
          <Button
            variant="contained"
            color="primary"
            size="small"
            sx={{
              position: 'absolute',
              top: 16,
              right: 16,
              px: 1.5,
              py: 0.5,
              borderRadius: 1,
              boxShadow: 2,
              opacity: 0,
              transition: 'opacity 0.2s',
              pointerEvents: 'auto',
              fontWeight: 600,
              fontSize: '1rem',
              '&.MuiButton-root': {
                backgroundColor: '#2563eb',
                color: '#fff',
                '&:hover': { backgroundColor: '#1d4ed8' },
              },
              '.group:hover &': { opacity: 1 },
            }}
            onClick={e => { e.stopPropagation(); setZoomedChart('pie'); }}
          >
            View
          </Button>
        )}
      </div>
    </div>
  );
};

export default DashboardCharts;
