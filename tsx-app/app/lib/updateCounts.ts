// src/updateCounts.ts
import * as fs from 'fs';
import * as path from 'path';

export interface Counts {
  weekCount: number;
  seasonCount: number;
}

const countsFilePath = path.join(__dirname, '..', 'counts.json');

const updateCounts = () => {
  fs.readFile(countsFilePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading counts file:', err);
      return;
    }

    const counts: Counts = JSON.parse(data);
    counts.weekCount += 1;

    if (counts.weekCount % 4 === 0) {
      counts.seasonCount += 1;
    }

    fs.writeFile(countsFilePath, JSON.stringify(counts, null, 2), 'utf8', (err) => {
      if (err) {
        console.error('Error writing counts file:', err);
      } else {
        console.log('Counts updated successfully');
      }
    });
  });
};

const scheduleUpdate = () => {
  const now = new Date();
  const nextWednesday = new Date(now.getTime());
  nextWednesday.setDate(now.getDate() + ((3 - now.getDay() + 7) % 7)); // Next Wednesday
  nextWednesday.setHours(5, 0, 0, 0);

  const delay = nextWednesday.getTime() - now.getTime();
  setTimeout(updateCounts, delay);
};

scheduleUpdate();
