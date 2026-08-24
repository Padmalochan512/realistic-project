import React, { useState, useEffect } from "react";
import api, { API_BASE_URL } from "../../lib/api";
import { X } from "lucide-react";

const initialState = {
  client_name: "",
  phone: "",
  booking_date: "",
  expected_time: "",
  note: "",
  message: "",
};

const BookingModal = ({ open, onClose, service }) => {
  const API = API_BASE_URL;

  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState(initialState);

  useEffect(() => {
    if (open) {
      setForm(initialState);
    }
  }, [open]);

  if (!open || !service) return null;

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const submit = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      await api.post(`${API}/bookings/create/`, {
        ...form,
        service: service.id,
      });

      alert("Booking submitted successfully.");

      setForm(initialState);
      onClose();
    } catch (err) {
      console.log(err);
      alert("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 p-4">

      <div className="bg-white rounded-xl w-full max-w-lg p-6 relative">

        <button
          onClick={onClose}
          className="absolute right-4 top-4"
        >
          <X />
        </button>

        <h2 className="text-2xl font-bold mb-2">
          Book Appointment
        </h2>

        <p className="text-gray-600 mb-6">
          Service :
          <span className="font-semibold ml-2">
            {service.service_name}
          </span>
        </p>

        <form
          onSubmit={submit}
          className="space-y-4"
        >

          <input
            type="text"
            name="client_name"
            placeholder="Your Name"
            required
            value={form.client_name}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
          />

          <input
            type="text"
            name="phone"
            placeholder="Phone Number"
            required
            value={form.phone}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
          />

          <div className="grid grid-cols-2 gap-4">

            <input
              type="date"
              name="booking_date"
              required
              value={form.booking_date}
              onChange={handleChange}
              className="border rounded-lg p-3"
            />

            <input
              type="time"
              name="expected_time"
              required
              value={form.expected_time}
              onChange={handleChange}
              className="border rounded-lg p-3"
            />

          </div>

          <textarea
            rows="3"
            name="note"
            placeholder="Note"
            value={form.note}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
          />

          <textarea
            rows="3"
            name="message"
            placeholder="Message"
            value={form.message}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
          />

          <button
            disabled={loading}
            className="w-full py-3 rounded-lg"
          >
            {loading ? "Booking..." : "Book Appointment"}
          </button>

        </form>

      </div>

    </div>
  );
};

export default BookingModal;
