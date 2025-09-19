import { render, screen, waitFor } from '@testing-library/react';
import UserList from './UserList';

window.fetch = jest.fn();

describe('UserList Component', () => {
  beforeEach(() => {
    fetch.mockClear();
  });
  it('renders users after fetching', async () => {
    const mockUsers = [
      { id: 1, name: 'Alice' },
      { id: 2, name: 'Bob' },
    ];
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockUsers,
    });
    render(<UserList />);
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
    await waitFor(() => {
      expect(screen.getAllByTestId('user')).toHaveLength(mockUsers.length);
    });
    expect(screen.getByText('Alice')).toBeInTheDocument();
    expect(screen.getByText('Bob')).toBeInTheDocument();
  });
});
