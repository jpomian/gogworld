'use client';

import { useEffect, useState } from 'react';

interface CountdownProps {
  startTime: Date;
  endTime: Date;
  onComplete?: () => void;
}

const Countdown: React.FC<CountdownProps> = ({ endTime, onComplete }) => {
  const [timeLeft, setTimeLeft] = useState<number>(0);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const distance = endTime.getTime() - now.getTime();

      if (distance <= 0) {
        clearInterval(interval);
        if (onComplete) onComplete();
      } else {
        setTimeLeft(distance);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [endTime, onComplete]);

  const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
  const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

  return (
    <div className="countdown">
      <div className="text-xl">{days}d {hours}h {minutes}m {seconds}s</div>
    </div>
  );
};

export default Countdown;
