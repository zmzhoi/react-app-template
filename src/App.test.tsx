import { render } from '@testing-library/react';

import App from './App';
test('App.tsx', () => {
  const result = render(<App />);

  expect(result.getByText(/React App Template/)).toBeInTheDocument();
});
