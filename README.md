website : https://a-dmy-brand-insight.vercel.app/


# ADMYBRAND Analytics Dashboard

Modern analytics dashboard built with React, Vite, MUI, Tailwind CSS, and GSAP.

## Features

- Responsive dashboard layout
- Metric cards with summary stats
- Interactive charts (Recharts)
- Sortable, paginated data table (MUI)
- Filter campaigns by name
- Export table data as CSV
- Light/dark theme toggle (with localStorage persistence)
- GSAP entry animations
- Modal zoom for charts and table
- Tooltips for table headers and export button
- Loading spinner and empty state message
- Accessibility: aria-labels, keyboard navigation
- Basic unit tests (Jest + React Testing Library)

## Tech Stack

- React (functional components, hooks)
- Vite (fast dev/build)
- MUI (Material UI)
- Tailwind CSS
- GSAP (animations)
- Recharts (charts)

## File Structure

- `src/App.jsx` - Main dashboard layout, theme logic, modals, branding
- `src/components/MetricCard.jsx` - Metric card UI
- `src/components/DashboardCharts.jsx` - Chart rendering, zoom logic
- `src/components/DataTable.jsx` - Data table, filtering, sorting, CSV export
- `src/components/DataTable.test.jsx` - Basic tests for DataTable
- `src/components/ThemeToggle.jsx` - Theme switch UI
- `src/mockMetrics.js` - Mock metric data

## Setup & Usage

1. Install dependencies:
   ```bash
   npm install
   ```
2. Start development server:
   ```bash
   npm run dev
   ```
3. Open [http://localhost:5173](http://localhost:5173) in your browser.

## Theming

- Toggle light/dark mode using the switch in the header.
- Theme preference is saved in localStorage and persists across reloads.
- All dashboard elements (cards, charts, table, modals) adapt to theme.

## Data Table

- Sort columns by clicking headers
- Filter campaigns by name
- Paginate results
- Export current view as CSV (button at bottom left)

## Testing

- Run tests:
  ```bash
  npm test
  ```
- See `src/components/DataTable.test.jsx` for sample tests.

## Accessibility

- All interactive elements have aria-labels
- Keyboard navigation supported

## License

MIT
