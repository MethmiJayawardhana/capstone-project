import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function BookingForm({ availableTimes, dispatch, submitForm }) {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [time, setTime] = useState("");
  const [guests, setGuests] = useState("2");
  const [occasion, setOccasion] = useState("Birthday");

  const handleDateChange = (date) => {
    setSelectedDate(date);
    if (date) {
      const formattedDate = date.toISOString().split("T")[0];
      dispatch({ type: "UPDATE_TIMES", payload: formattedDate });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const formattedDate = selectedDate ? selectedDate.toISOString().split("T")[0] : "";

    const formData = {
      date: formattedDate,
      time,
      guests,
      occasion,
    };

    // Call submitForm passed via props from Main.js
    submitForm(formData);
  };

  return (
    <div className="reservation-container">
      <div className="booking-card">
        <form onSubmit={handleSubmit} className="booking-form">
          <div className="form-group">
            <label htmlFor="res-date">Choose date</label>
            <DatePicker
              selected={selectedDate}
              onChange={handleDateChange}
              dateFormat="yyyy-MM-dd"
              minDate={new Date()}
              className="form-control"
              id="res-date"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="res-time">Choose time</label>
            <select
              id="res-time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              required
              className="form-control"
            >
              <option value="" disabled>Select a time</option>
              {availableTimes.map((availableTime) => (
                <option key={availableTime} value={availableTime}>
                  {availableTime}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="guests">Number of guests</label>
            <input
              type="number"
              placeholder="1"
              min="1"
              max="10"
              id="guests"
              value={guests}
              onChange={(e) => setGuests(e.target.value)}
              required
              className="form-control"
            />
          </div>

          <div className="form-group">
            <label htmlFor="occasion">Occasion</label>
            <select
              id="occasion"
              value={occasion}
              onChange={(e) => setOccasion(e.target.value)}
              className="form-control"
            >
              <option value="Birthday">Birthday</option>
              <option value="Anniversary">Anniversary</option>
              <option value="Engagement">Engagement</option>
                <option value="Other">Other</option>
            </select>
          </div>

          <button type="submit" className="submit-btn">
            Make Your Reservation
          </button>
        </form>
      </div>

      <div className="reservation-image-wrapper">
        <img
          src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80"
          alt="Little Lemon Restaurant Table and Chairs"
          className="reservation-image"
        />
      </div>
    </div>
  );
}