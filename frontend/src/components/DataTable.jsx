/**
 * DataTable Component
 *
 * Features:
 * - Displays campaign analytics in a sortable, paginated table
 * - Supports light/dark mode via MUI ThemeProvider
 * - Filter campaigns by name
 * - Export filtered/sorted data as CSV
 * - Responsive layout for mobile and desktop
 * - Tooltips for column headers and export button
 * - Loading spinner and empty state message
 *
 * Props:
 * - darkMode (boolean): If true, enables dark theme
 *
 * Usage:
 * <DataTable darkMode={true} />
 *
 * Testing:
 * See DataTable.test.jsx for basic render and filter tests
 */
import React, { useState, useMemo } from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead,
  TableRow, TableSortLabel, TablePagination, Paper, TextField, Tooltip
} from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';

const mockRows = [
  { id: 1, name: 'Campaign A', revenue: 1200, users: 340, conversions: 45 },
  { id: 2, name: 'Campaign B', revenue: 980, users: 290, conversions: 38 },
  { id: 3, name: 'Campaign C', revenue: 1500, users: 410, conversions: 52 },
  { id: 4, name: 'Campaign D', revenue: 800, users: 210, conversions: 29 },
  { id: 5, name: 'Campaign E', revenue: 1100, users: 320, conversions: 41 },
];

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) return -1;
  if (b[orderBy] > a[orderBy]) return 1;
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

const DataTable = ({ darkMode }) => {
  // CSV export utility
  const handleExportCSV = () => {
    const headers = ['Name', 'Revenue', 'Users', 'Conversions'];
    const rows = sortedRows.map(row => [row.name, row.revenue, row.users, row.conversions]);
    let csvContent = [headers.join(',')].concat(rows.map(r => r.join(','))).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'campaigns.csv';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('revenue');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(3);
  const [filter, setFilter] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const filteredRows = useMemo(() =>
    mockRows.filter((row) =>
      row.name.toLowerCase().includes(filter.toLowerCase())
    ), [filter]
  );

  const sortedRows = useMemo(() =>
    filteredRows.sort(getComparator(order, orderBy)), [filteredRows, order, orderBy]
  );

  const paginatedRows = sortedRows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  const theme = useMemo(() => createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
      background: {
        paper: darkMode ? '#292A3E' : '#fff',
      },
      text: {
        primary: darkMode ? '#fff' : '#222',
      },
    },
    components: {
      MuiTableCell: {
        styleOverrides: {
          root: {
            color: darkMode ? '#fff' : '#222',
          },
        },
      },
    },
  }), [darkMode]);

  return (
    <ThemeProvider theme={theme}>
      <Paper
        sx={{
          width: '100%',
          overflow: 'auto',
          mt: 3,
          backgroundColor: theme.palette.background.paper,
          color: theme.palette.text.primary,
          boxSizing: 'border-box',
          '@media (max-width: 600px)': {
            p: 1,
          },
        }}
        elevation={3}
      >
        <TextField
          label="Filter by Campaign"
          variant="outlined"
          size="small"
          sx={{
            m: { xs: 1, sm: 2 },
            width: { xs: '100%', sm: 220 },
            input: { color: theme.palette.text.primary },
            label: { color: theme.palette.text.primary }
          }}
          InputLabelProps={{ style: { color: theme.palette.text.primary } }}
          value={filter}
          onChange={e => setFilter(e.target.value)}
          inputProps={{ 'aria-label': 'Filter campaigns by name' }}
        />
        {loading ? (
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 180 }}>
            <span className="animate-spin mr-2" style={{ fontSize: 32, color: theme.palette.text.primary }}>⏳</span>
            <span style={{ color: theme.palette.text.primary, fontWeight: 500 }}>Loading campaigns...</span>
          </div>
        ) : (
          <>
            <TableContainer sx={{ backgroundColor: theme.palette.background.paper, minWidth: 400 }}>
              <Table>
                <TableHead>
                  <TableRow>
                    {['name', 'revenue', 'users', 'conversions'].map((headCell) => {
                      const tooltips = {
                        name: 'Campaign name',
                        revenue: 'Total revenue generated',
                        users: 'Number of users',
                        conversions: 'Number of conversions',
                      };
                      return (
                        <Tooltip key={headCell} title={tooltips[headCell]} arrow>
                          <TableCell sx={{ color: theme.palette.text.primary, fontWeight: 600 }}>
                            <TableSortLabel
                              active={orderBy === headCell}
                              direction={orderBy === headCell ? order : 'asc'}
                              onClick={() => handleRequestSort(headCell)}
                              sx={{ color: theme.palette.text.primary }}
                            >
                              {headCell.charAt(0).toUpperCase() + headCell.slice(1)}
                            </TableSortLabel>
                          </TableCell>
                        </Tooltip>
                      );
                    })}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {paginatedRows.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={4} align="center" sx={{ color: theme.palette.text.primary, fontWeight: 500, py: 6 }}>
                        No campaigns found.
                      </TableCell>
                    </TableRow>
                  ) : (
                    paginatedRows.map((row) => (
                      <TableRow key={row.id} hover>
                        <TableCell sx={{ color: theme.palette.text.primary }}>{row.name}</TableCell>
                        <TableCell sx={{ color: theme.palette.text.primary }}>{row.revenue}</TableCell>
                        <TableCell sx={{ color: theme.palette.text.primary }}>{row.users}</TableCell>
                        <TableCell sx={{ color: theme.palette.text.primary }}>{row.conversions}</TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </TableContainer>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', width: '100%' }}>
              <Tooltip title="Download table data as CSV" arrow>
                <button
                  type="button"
                  onClick={handleExportCSV}
                  style={{
                    padding: '8px 20px',
                    borderRadius: 6,
                    background: darkMode ? '#2563eb' : '#1976d2',
                    color: '#fff',
                    fontWeight: 600,
                    border: 'none',
                    cursor: 'pointer',
                    boxShadow: '0 2px 6px rgba(0,0,0,0.08)',
                    marginLeft: 12,
                    marginBottom: 12,
                    marginTop: 8,
                    transition: 'background 0.2s',
                  }}
                  aria-label="Export campaigns as CSV"
                >
                  Export CSV
                </button>
              </Tooltip>
              <TablePagination
                rowsPerPageOptions={[3, 5, 10]}
                component="div"
                count={sortedRows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                sx={{
                  color: theme.palette.text.primary,
                  '.MuiTablePagination-selectLabel, .MuiTablePagination-displayedRows, .MuiTablePagination-actions': {
                    color: theme.palette.text.primary
                  },
                  '.MuiTablePagination-root': {
                    flexWrap: 'wrap',
                    gap: 1,
                    '@media (max-width: 600px)': {
                      fontSize: '0.95rem',
                      px: 0.5,
                    },
                  },
                }}
              />
            </div>
          </>
        )}
      </Paper>
    </ThemeProvider>
  );
};

export default React.memo(DataTable);
