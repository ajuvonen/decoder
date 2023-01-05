import { useGameContext } from '@/context/GameContext';

export default function Stats() {
  const {stats} = useGameContext();
  const percentage = stats.won + stats.lost
    ? ((stats.won / (stats.won + stats.lost)) * 100).toFixed(1)
    : '0';

  const getFastestTime = (totalSeconds: number) => {
    const minutes = Math.floor(totalSeconds / 60);
    const remainder = totalSeconds - minutes * 60;
    return `${minutes}m ${remainder}s`;
  };

  return (
    <>
      <h1 className="mt-5">Stats</h1>
      <p className="mt-3 fs-3">
        Won games: {stats.won} ({percentage}%)
      </p>
      <p className="fs-3">Lost games: {stats.lost}</p>
      {!!stats.fastest && (
        <p className="fs-3">Fastest time (easy difficulty): {getFastestTime(stats.fastest)}</p>
      )}
      {!!stats.fastestHardmode && (
        <p className="fs-3">Fastest time (hard difficulty): {getFastestTime(stats.fastestHardmode)}</p>
      )}
    </>
  );
};
