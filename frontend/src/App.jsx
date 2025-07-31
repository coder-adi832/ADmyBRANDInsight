import React, { useState, Suspense, lazy, useRef, useEffect } from 'react';
import Button from '@mui/material/Button';
import { gsap } from 'gsap';
import MetricCard from './components/MetricCard';
import ThemeToggle from './components/ThemeToggle';
import { metrics } from './mockMetrics';

const DashboardCharts = lazy(() => import('./components/DashboardCharts'));
const DataTable = lazy(() => import('./components/DataTable'));


const App = () => {
  // Persist dark mode in localStorage
  const [darkMode, setDarkMode] = useState(() => {
    const stored = localStorage.getItem('admybrand_dark_mode');
    return stored === 'true';
  });
  const [chartZoomed, setChartZoomed] = useState(false);
  const [isLg, setIsLg] = useState(window.innerWidth >= 1024);

  // Refs for GSAP animation targets
  const headerRef = useRef(null);
  const metricsRef = useRef(null);
  const chartsRef = useRef(null);
  const tableRef = useRef(null);

  useEffect(() => {
    const handleResize = () => setIsLg(window.innerWidth >= 1024);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Update localStorage when darkMode changes
  useEffect(() => {
    localStorage.setItem('admybrand_dark_mode', darkMode);
  }, [darkMode]);

  useEffect(() => {
    // Animate all main sections scaling up on mount
    gsap.fromTo(
      headerRef.current,
      { scale: 0.8, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.7, ease: 'power3.out' }
    );
    gsap.fromTo(
      metricsRef.current,
      { scale: 0.8, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.7, ease: 'power3.out', delay: 0.2 }
    );
    gsap.fromTo(
      chartsRef.current,
      { scale: 0.8, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.7, ease: 'power3.out', delay: 0.4 }
    );
    gsap.fromTo(
      tableRef.current,
      { scale: 0.8, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.7, ease: 'power3.out', delay: 0.6 }
    );
  }, []);

  return (
    <div className={darkMode ? 'bg-[#0F0F11] text-white min-h-screen' : 'bg-gray-50 text-gray-900 min-h-screen'}>
      <div className="max-w-7xl mx-auto py-8 px-4">
        <div ref={headerRef} className="flex justify-between items-center mb-8">
          <div className="flex flex-col items-start">
            <span className="text-3xl font-bold tracking-tight" style={{
              background: 'linear-gradient(90deg, #00B4D8 0%, #6C63FF 35%, #FF3CAC 70%, #FF6E7F 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              color: 'transparent',
              fontFamily: 'Montserrat, Inter, Arial, sans-serif',
              letterSpacing: '0.05em',
            }}>
              AD <span style={{ fontWeight: 900 }}>MY</span> <span style={{ fontWeight: 900 }}>BRAND</span>
            </span>
            <span
              className="text-lg font-bold mt-1 tracking-tight"
              style={{
                fontFamily: 'Montserrat, Inter, Arial, sans-serif',
                letterSpacing: '0.05em',
                background: 'linear-gradient(90deg, #6C63FF 0%, #FF3CAC 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                color: 'transparent',
              }}
            >
              Insights
            </span>
          </div>
          <ThemeToggle darkMode={darkMode} toggleDarkMode={() => setDarkMode((prev) => !prev)} />
        </div>
        <div ref={metricsRef} className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div style={darkMode ? { backgroundColor: '#292A3E', borderRadius: '0.75rem' } : {}}>
            <MetricCard {...metrics[0]} />
          </div>
          <div style={darkMode ? { backgroundColor: '#292A3E', borderRadius: '0.75rem' } : {}}>
            <MetricCard {...metrics[1]} />
          </div>
          <div style={darkMode ? { backgroundColor: '#292A3E', borderRadius: '0.75rem' } : {}}>
            <MetricCard {...metrics[2]} />
          </div>
          <div style={darkMode ? { backgroundColor: '#292A3E', borderRadius: '0.75rem' } : {}}>
            <MetricCard {...metrics[3]} />
          </div>
        </div>
        <Suspense fallback={<div className={darkMode ? 'w-full my-6 animate-pulse h-56 rounded' : 'w-full my-6 animate-pulse bg-gray-300 h-56 rounded'} style={darkMode ? { backgroundColor: '#0F0F11' } : {}} /> }>
          <div ref={chartsRef}>
            <div style={darkMode ? { backgroundColor: '#0F0F11', borderRadius: '0.75rem' } : {}}>
              <DashboardCharts
                isLg={isLg}
                zoomedChart={chartZoomed}
                setZoomedChart={setChartZoomed}
                zoomMode={!!chartZoomed && (!isLg || (isLg && chartZoomed !== 'table'))}
                darkMode={darkMode}
              />
            </div>
            {chartZoomed && (
              <div className={`fixed inset-0 z-50 flex items-center justify-center ${darkMode ? 'bg-black bg-opacity-60' : 'bg-gray-200 bg-opacity-80'}`}>
                <div
                  className={`relative w-5/6 max-w-5xl rounded-lg shadow-lg p-8 ${darkMode ? 'text-white' : 'text-gray-900'}`}
                  style={darkMode ? { backgroundColor: '#292A3E' } : { backgroundColor: '#fff' }}
                >
                  <DashboardCharts
                    isLg={isLg}
                    zoomedChart={chartZoomed}
                    setZoomedChart={setChartZoomed}
                    zoomMode
                    darkMode={darkMode}
                  />
                  <button
                    className="absolute top-4 right-4 px-4 py-2 bg-red-600 text-white rounded shadow hover:bg-red-700 transition"
                    onClick={() => setChartZoomed(null)}
                  >
                    Close
                  </button>
                </div>
              </div>
            )}
          </div>
        </Suspense>
        <Suspense fallback={<div className={darkMode ? 'w-full my-6 animate-pulse h-80 rounded' : 'w-full my-6 animate-pulse bg-gray-300 h-80 rounded'} style={darkMode ? { backgroundColor: '#292A3E' } : {}} /> }>
          {!chartZoomed && (
            <div
              ref={tableRef}
              className="relative group"
              style={darkMode ? { backgroundColor: '#292A3E', borderRadius: '0.75rem' } : {}}
              // Only allow zoom on small screens
              onClick={() => !isLg && setChartZoomed('table')}
            >
              <div style={darkMode ? { backgroundColor: '#292A3E', borderRadius: '0.75rem' } : {}}>
                <DataTable darkMode={darkMode} />
              </div>
              {isLg && (
                <Button
                  variant="contained"
                  color="primary"
                  size="medium"
                  sx={{
                    position: 'absolute',
                    top: 16,
                    right: 16,
                    px: 2,
                    py: 1,
                    borderRadius: 2,
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
                  onClick={() => setChartZoomed('table')}
                >
                  View
                </Button>
              )}
            </div>
          )}
          {chartZoomed === 'table' && isLg && (
            <div className={`fixed inset-0 z-50 flex items-center justify-center ${darkMode ? 'bg-black bg-opacity-60' : 'bg-gray-200 bg-opacity-80'}`}>
              <div
                className={`relative w-5/6 max-w-5xl rounded-lg shadow-lg p-8 ${darkMode ? 'text-white' : 'text-gray-900'}`}
                style={darkMode ? { backgroundColor: '#292A3E' } : { backgroundColor: '#fff' }}
              >
                <DataTable darkMode={darkMode} />
                <Button
                  variant="contained"
                  color="error"
                  size="medium"
                  sx={{
                    position: 'absolute',
                    top: 16,
                    right: 16,
                    px: 2,
                    py: 1,
                    borderRadius: 2,
                    boxShadow: 2,
                    fontWeight: 600,
                    fontSize: 'inherit',
                    backgroundColor: '#dc2626',
                    color: '#fff',
                    '&:hover': { backgroundColor: '#b91c1c' },
                  }}
                  onClick={() => setChartZoomed(null)}
                >
                  Close
                </Button>
              </div>
            </div>
          )}
          {chartZoomed === 'table' && !isLg && (
            <div className={`fixed inset-0 z-50 flex items-center justify-center ${darkMode ? 'bg-black bg-opacity-60' : 'bg-gray-200 bg-opacity-80'}`}>
              <div
                className="relative w-11/12 max-w-2xl rounded-lg shadow-lg p-4"
                style={{ backgroundColor: darkMode ? '#292A3E' : '#fff', color: darkMode ? '#fff' : '#222' }}
              >
                <DataTable darkMode={darkMode} />
                <Button
                  variant="contained"
                  color="error"
                  size="medium"
                  sx={{
                    position: 'absolute',
                    top: 16,
                    right: 16,
                    px: 2,
                    py: 1,
                    borderRadius: 2,
                    boxShadow: 2,
                    fontWeight: 600,
                    fontSize: 'inherit',
                    backgroundColor: '#dc2626',
                    color: '#fff',
                    '&:hover': { backgroundColor: '#b91c1c' },
                  }}
                  onClick={() => setChartZoomed(null)}
                >
                  Close
                </Button>
              </div>
            </div>
          )}
        </Suspense>
      </div>
    </div>
  );
};

export default App;