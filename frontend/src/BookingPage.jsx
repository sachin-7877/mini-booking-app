import { useEffect, useState } from "react";

export default function BookingPage() {
  const [slots, setSlots] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/slots")
      .then(res => res.json())
      .then(setSlots);
  }, []);

  const bookSlot = async (id) => {
    await fetch(`http://localhost:5000/api/slots/book/${id}`, {
      method: "POST"
    });

    setSlots(slots.map(s =>
      s.id === id ? { ...s, available: false } : s
    ));
  };

  return (
    <div style={{ maxWidth: "400px", margin: "auto" }}>
      <h2>Book a Court Slot</h2>

      {slots.map(slot => (
        <div key={slot.id}>
          {slot.time}
          <button
            disabled={!slot.available}
            onClick={() => bookSlot(slot.id)}
          >
            {slot.available ? "Book" : "Booked"}
          </button>
        </div>
      ))}
    </div>
  );
}
