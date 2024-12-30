'use client';

import { useState, useEffect } from 'react';
import Countdown from './Countdown';

const Seasons: React.FC = () => {
  const [weekCount, setWeekCount] = useState<number>(0);
  const [smallerEndTime, setSmallerEndTime] = useState<Date>(new Date());
  const [biggerEndTime, setBiggerEndTime] = useState<Date>(new Date());

  useEffect(() => {
    const now = new Date();
    const startTime = new Date(now.getTime());
    startTime.setHours(5, 0, 0, 0);
    startTime.setDate(now.getDate() + ((3 - now.getDay() + 7) % 7)); // Next Wednesday

    const smallerEnd = new Date(startTime.getTime());
    smallerEnd.setDate(startTime.getDate() + 7);
    smallerEnd.setHours(1, 0, 0, 0);

    const biggerEnd = new Date(startTime.getTime());
    biggerEnd.setDate(startTime.getDate() + 28);
    biggerEnd.setHours(5, 0, 0, 0);

    setSmallerEndTime(smallerEnd);
    setBiggerEndTime(biggerEnd);
  }, []);

  const handleSmallerComplete = () => {
    setWeekCount(weekCount + 1);
    const now = new Date();
    const startTime = new Date(now.getTime());
    startTime.setHours(5, 0, 0, 0);
    startTime.setDate(now.getDate() + ((3 - now.getDay() + 7) % 7)); // Next Wednesday

    const smallerEnd = new Date(startTime.getTime());
    smallerEnd.setDate(startTime.getDate() + 7);
    smallerEnd.setHours(1, 0, 0, 0);

    setSmallerEndTime(smallerEnd);
  };

  return (
    <div className="flex flex-col items-center p-4">
      <h1 className="text-2xl font-bold mb-4">Countdowns</h1>
      <div>
        <h2 className="text-xl font-semibold mb-2 p-3">End of Season</h2>
        <Countdown startTime={new Date()} endTime={biggerEndTime} />
      </div>
      <div className="mb-4">
        <h2 className="text-xl font-semibold mb-2 p-3">Week {weekCount} is still active for</h2>
        <Countdown startTime={new Date()} endTime={smallerEndTime} onComplete={handleSmallerComplete} />
      </div>
      <div className="mt-4">
        <p>Week Count: {weekCount}</p>
      </div>
    </div>
  );
};

export default Seasons;
