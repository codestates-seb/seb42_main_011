export const TIMES = [
  { name: 'year', milliSeconds: 60 * 60 * 24 * 365 },
  { name: 'month', milliSeconds: 60 * 60 * 24 * 30 },
  { name: 'day', milliSeconds: 60 * 60 * 24 },
  { name: 'hour', milliSeconds: 60 * 60 },
  { name: 'minute', milliSeconds: 60 },
];

export function getBetweenTime(start, end, milliSeconds) {
  const diff = (end - start) / 1000;

  return Math.floor(diff / milliSeconds);
}

export function elapsedTime(date) {
  const compareTime = new Date(date);
  const nowTime = new Date();

  const formatter = new Intl.RelativeTimeFormat('ko', {
    numeric: 'auto',
  });

  for (let i = 0; i < TIMES.length; i += 1) {
    const betweenTime = getBetweenTime(
      compareTime,
      nowTime,
      TIMES[i].milliSeconds,
    );

    if (
      (TIMES[i].name === 'hour' || TIMES[i] === 'minute') &&
      betweenTime > 0
    ) {
      return formatter.format(-betweenTime, TIMES[i].name);
    }

    if (betweenTime > 0) {
      return compareTime.toISOString().split('T')[0];
    }
  }

  return '방금 전';
}
