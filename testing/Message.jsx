import { useState } from 'react';

export default function Message() {
  const [message, setMessage] = useState('Hello, world!');

  return (
    <div>
      <p data-testid="message">{message}</p>
      <button onClick={() => setMessage('Button clicked!')}>Click Me</button>
    </div>
  );
}
