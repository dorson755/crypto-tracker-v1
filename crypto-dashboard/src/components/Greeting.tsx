// src/components/Greeting.tsx
import React, { useEffect, useState } from "react";
import { format } from "date-fns";

const Greeting = () => {
  const [location, setLocation] = useState("there");
  const [currentDate, setCurrentDate] = useState("");

  useEffect(() => {
    // Get location from IP
    fetch("https://ipapi.co/json/")
      .then((res) => res.json())
      .then((data) => {
        setLocation(data.city || "there");
      })
      .catch(() => setLocation("there"));

    // Get date
    const dateStr = format(new Date(), "MMMM d, yyyy");
    setCurrentDate(dateStr);
  }, []);

  return (
    <div className="text-gold font-serif text-2xl mb-6 px-4">
      <div>Hello from {location}</div>
      <div className="text-sm text-gold/80">{currentDate}</div>
    </div>
  );
};

export default Greeting;
