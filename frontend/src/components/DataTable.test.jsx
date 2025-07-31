import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import DataTable from './DataTable';

describe('DataTable', () => {
  it('renders table and CSV button', () => {
    render(<DataTable darkMode={false} />);
    expect(screen.getByLabelText(/Filter campaigns by name/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Export campaigns as CSV/i })).toBeInTheDocument();
    expect(screen.getByText(/Campaign A/i)).toBeInTheDocument();
  });

  it('filters campaigns by name', () => {
    render(<DataTable darkMode={false} />);
    const input = screen.getByLabelText(/Filter campaigns by name/i);
    fireEvent.change(input, { target: { value: 'B' } });
    expect(screen.getByText(/Campaign B/i)).toBeInTheDocument();
    expect(screen.queryByText(/Campaign A/i)).not.toBeInTheDocument();
  });

  it('shows no campaigns found for unmatched filter', () => {
    render(<DataTable darkMode={false} />);
    const input = screen.getByLabelText(/Filter campaigns by name/i);
    fireEvent.change(input, { target: { value: 'ZZZ' } });
    expect(screen.getByText(/No campaigns found/i)).toBeInTheDocument();
  });
});
