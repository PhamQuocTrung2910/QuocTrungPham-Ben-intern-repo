import { render } from '@testing-library/react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Contact from '../contact';
import * as api from '../../constants/api';

// ----------------------
// Mocks
// ----------------------
jest.mock('react-native-safe-area-context', () => ({
  SafeAreaProvider: ({ children }) => children,
  useSafeAreaInsets: () => ({ top: 0, right: 0, bottom: 0, left: 0 }),
}));

jest.mock('react-native/Libraries/Utilities/useColorScheme', () => ({
  __esModule: true,
  default: jest.fn(() => 'light'),
}));

jest.mock('../../constants/Colors', () => ({
  Colors: {
    primary: '#6849a7',
    warning: '#cc475a',
    dark: {
      text: '#d4d4d4',
      title: '#fff',
      background: '#252231',
      navBackground: '#201e2b',
      iconColor: '#9591a5',
      iconColorFocused: '#fff',
      uiBackground: '#2f2b3d',
    },
    light: {
      text: '#625f72',
      title: '#201e2b',
      background: '#e0dee9',
      navBackground: '#e8e7ef',
      iconColor: '#686477',
      iconColorFocused: '#201e2b',
      uiBackground: '#d6d5e1',
    },
  },
}));

// ✅ Fix: require inside the mock
jest.mock('expo-router', () => {
  const { TouchableOpacity } = import('react-native');
  return {
    Link: ({ children, style, ...props }) => (
      <TouchableOpacity style={style} {...props}>
        {children}
      </TouchableOpacity>
    ),
  };
});

jest.spyOn(api, 'getUsers').mockResolvedValue([
  { id: 1, name: 'Mocked User 1' },
  { id: 2, name: 'Mocked User 2' },
  { id: 3, name: 'Mocked User 3' },
]);

// ----------------------
// Custom render helper
// ----------------------
function renderWithProviders(ui) {
  return render(<SafeAreaProvider>{ui}</SafeAreaProvider>);
}

// ----------------------
// Tests
// ----------------------
describe('Contact Screen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders Contact Page text', () => {
    const { getByText } = renderWithProviders(<Contact />);
    expect(getByText('Contact Page')).toBeTruthy();
  });

  it('renders Back Home link', () => {
    const { getByText } = renderWithProviders(<Contact />);
    expect(getByText('Back Home')).toBeTruthy();
  });

  it('renders mocked users from API', async () => {
    const { findByText } = renderWithProviders(<Contact />);
    expect(await findByText('Mocked User 1')).toBeTruthy();
    expect(await findByText('Mocked User 2')).toBeTruthy();
    expect(await findByText('Mocked User 3')).toBeTruthy();
  });

  it('renders "No users loaded" when users array is empty', async () => {
    jest.spyOn(api, 'getUsers').mockResolvedValueOnce([]);

    const { findByText } = renderWithProviders(<Contact />);
    expect(await findByText('No users loaded')).toBeTruthy();
  });

  it('handles API error gracefully', async () => {
    const consoleSpy = jest
      .spyOn(console, 'error')
      .mockImplementation(() => {});
    jest.spyOn(api, 'getUsers').mockRejectedValueOnce(new Error('API Error'));

    const { findByText } = renderWithProviders(<Contact />);
    expect(await findByText('No users loaded')).toBeTruthy();

    expect(consoleSpy).toHaveBeenCalledWith(
      'Failed to fetch users:',
      expect.any(Error)
    );
    consoleSpy.mockRestore();
  });
});
