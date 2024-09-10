import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import LoginModal from './Login';
import store from '../../store'; 

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const renderComponent = (props: LoginModalProps) => {
  return render(
    <Provider store={store}>
      <Router>
        <LoginModal {...props} />
      </Router>
    </Provider>
  );
};

describe('LoginModal', () => {
  beforeEach(() => {
    jest.resetAllMocks();
    global.fetch = jest.fn();
  });

  test('renders login modal', () => {
    renderComponent({ isOpen: true, onClose: jest.fn() });
    expect(screen.getByText('Welcome back!')).toBeInTheDocument();
    expect(screen.getByLabelText('Email Address')).toBeInTheDocument();
    expect(screen.getByLabelText('Password')).toBeInTheDocument();
  });

  test('shows error message on failed login', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      json: async () => ({ message: 'Login failed' }),
    });

    renderComponent({ isOpen: true, onClose: jest.fn() });

    fireEvent.change(screen.getByLabelText('Email Address'), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByLabelText('Password'), { target: { value: 'password' } });
    fireEvent.click(screen.getByText('Login'));

    await waitFor(() => expect(screen.getByText('Login failed')).toBeInTheDocument());
  });

  test('closes modal on successful login', async () => {
    const onClose = jest.fn();
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ id: 1, username: 'testuser' }),
    });

    renderComponent({ isOpen: true, onClose });

    fireEvent.change(screen.getByLabelText('Email Address'), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByLabelText('Password'), { target: { value: 'password' } });
    fireEvent.click(screen.getByText('Login'));

    await waitFor(() => {
      expect(onClose).toHaveBeenCalledTimes(1);
    });
  });
});
