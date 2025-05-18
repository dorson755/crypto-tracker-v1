import { useEffect, useState } from 'react';
import { format } from 'date-fns';

export default function Greeting() {
  const [city, setCity] = useState('there');
  const [dateStr, setDateStr] = useState('');
  useEffect(()=>{
    fetch('https://ipapi.co/json/')
      .then(r=>r.json())
      .then(d=> d.city && setCity(d.city))
      .catch(()=>{});
    setDateStr(format(new Date(), 'MMMM d, yyyy'));
  },[]);
  return (
    <div className="px-6 mb-6">
      <h1 className="text-4xl font-serif text-gold">Hello from {city}</h1>
      <p className="text-sm text-ivory/70">{dateStr}</p>
    </div>
  );
}
