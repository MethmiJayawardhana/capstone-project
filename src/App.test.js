import { render, screen } from '@testing-library/react';
import App, { initializeTimes, updateTimes } from './App';
import BookingForm from './BookingForm';

describe('Little Lemon app unit tests', () => {
  beforeEach(() => {
    class MockIntersectionObserver {
      observe() {}
      unobserve() {}
      disconnect() {}
    }

    Object.defineProperty(window, 'IntersectionObserver', {
      writable: true,
      configurable: true,
      value: MockIntersectionObserver,
    });

    Object.defineProperty(global, 'IntersectionObserver', {
      writable: true,
      configurable: true,
      value: MockIntersectionObserver,
    });

    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      configurable: true,
      value: jest.fn().mockImplementation((query) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(),
        removeListener: jest.fn(),
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      })),
    });
  });

  afterEach(() => {
    delete window.fetchAPI;
    delete window.submitAPI;
  });

  test('initializes the available time fallback list', () => {
    expect(initializeTimes()).toEqual(['17:00', '18:00', '19:00', '20:00']);
  });

  test('updateTimes keeps the existing state when fetchAPI is unavailable', () => {
    const previousTimes = ['17:00', '18:00'];

    expect(
      updateTimes(previousTimes, {
        type: 'UPDATE_TIMES',
        payload: '2026-09-10',
      })
    ).toEqual(previousTimes);
  });

  test('updateTimes calls fetchAPI and returns the new available slots', () => {
    const fetchAPI = jest.fn(() => ['18:00', '19:00']);
    window.fetchAPI = fetchAPI;

    const result = updateTimes(['17:00'], {
      type: 'UPDATE_TIMES',
      payload: '2026-09-10',
    });

    expect(fetchAPI).toHaveBeenCalledWith(new Date('2026-09-10'));
    expect(result).toEqual(['18:00', '19:00']);
  });

  test('renders the home page with the booking call to action', () => {
    render(<App />);

    expect(screen.getAllByRole('heading', { name: /little lemon/i }).length).toBeGreaterThan(0);
    expect(screen.getByRole('button', { name: /reserve a table/i })).toBeInTheDocument();
  });

  test('renders the booking form date and time fields with available options', () => {
    const dispatch = jest.fn();

    render(
      <BookingForm
        availableTimes={['17:00', '18:00', '19:00']}
        dispatch={dispatch}
      />
    );

    expect(screen.getByLabelText(/Choose date/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Choose time/i)).toBeInTheDocument();
    expect(screen.getByRole('option', { name: '17:00' })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: '18:00' })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: '19:00' })).toBeInTheDocument();
  });
});
