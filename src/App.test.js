import { render, screen } from '@testing-library/react';
import BookingForm from './BookingForm';
import { initializeTimes, updateTimes } from './App';

describe('Little Lemon app unit tests', () => {
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
