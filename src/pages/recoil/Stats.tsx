import { useRecoilValue } from 'recoil';
import { statsState } from '@/recoil-store';

export default function Stats() {
  const stats = useRecoilValue(statsState);
  const percentage =
    stats.won + stats.lost
      ? ((stats.won / (stats.won + stats.lost)) * 100).toFixed(1)
      : '0';
  const getFastestTime = () => {
    const minutes = Math.floor(stats.fastest / 60);
    const seconds = stats.fastest - minutes * 60;
    return `${minutes}m ${seconds}s`;
  };
  return (
    <>
      <h1 className="mt-5">Stats</h1>
      <p className="mt-3 fs-3">
        Won games: {stats.won} ({percentage}%)
      </p>
      <p className="fs-3">Lost games: {stats.lost}</p>
      {!!stats.fastest && (
        <p className="fs-3">Fastest time: {getFastestTime()}</p>
      )}
    </>
  );
};
