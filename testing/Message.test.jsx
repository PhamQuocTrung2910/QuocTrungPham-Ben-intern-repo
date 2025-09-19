import { render, screen, fireEvent } from '@testing-library/react';
import Message from './Message';

test('renders the message correctly', () => {
  render(<Message />);
  const messageElement = screen.getByTestId('message');
  expect(messageElement).toHaveTextContent('Hello, world!');
});

test('updates the message when the button is clicked', () => {
  render(<Message />);
  const button = screen.getByText('Click Me');
  fireEvent.click(button);
  const messageElement = screen.getByTestId('message');
  expect(messageElement).toHaveTextContent('Button clicked!');
});
