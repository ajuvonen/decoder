import {useTranslation} from 'react-i18next';
import {useGameContext} from '@/context/GameContext';

export default function Stats() {
  const {stats} = useGameContext();
  const {t} = useTranslation();
  const percentage =
    stats.won + stats.lost
      ? ((stats.won / (stats.won + stats.lost)) * 100).toFixed(1)
      : '0';

  const getFastestTime = (totalSeconds: number) => {
    const minutes = Math.floor(totalSeconds / 60);
    const remainder = totalSeconds - minutes * 60;
    return `${minutes}m ${remainder}s`;
  };

  return (
    <>
      <h1 className="mt-5">{t('stats.title')}</h1>
      <p className="mt-3 fs-3">
        {t('stats.wonGames', {won: stats.won, percentage})}
      </p>
      <p className="fs-3">{t('stats.lostGames', {lost: stats.lost})}</p>
      {!!stats.fastest && (
        <p className="fs-3">
          {t('stats.fastestTimeEasy', {time: getFastestTime(stats.fastest)})}
        </p>
      )}
      {!!stats.fastestHardmode && (
        <p className="fs-3">
          {t('stats.fastestTimeDifficult', {
            time: getFastestTime(stats.fastestHardmode),
          })}
        </p>
      )}
    </>
  );
}
