import {useState} from 'react';
import {useTranslation} from 'react-i18next';
import {useSelector} from '@/hooks/reduxHooks';
import Button from 'react-bootstrap/Button';
import {useDispatch} from 'react-redux';
import {resetStats} from '@/redux-store/statsSlice';
import {ConfirmationModal} from '@/components/ConfirmationModal';

export default function Stats() {
  const stats = useSelector((state) => state.stats);
  const [showResetModal, setShowResetModal] = useState(false);
  const {t} = useTranslation();
  const dispatch = useDispatch();
  const percentage =
    stats.won + stats.lost
      ? ((stats.won / (stats.won + stats.lost)) * 100).toFixed(1)
      : '0';

  const getFastestTime = (totalSeconds: number) => {
    const minutes = Math.floor(totalSeconds / 60);
    const remainder = totalSeconds - minutes * 60;
    return `${minutes}m ${remainder}s`;
  };

  const handleReset = () => {
    dispatch(resetStats());
    setShowResetModal(false);
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
      <div>
        <Button variant="danger" onClick={() => setShowResetModal(true)}>
          {t('stats.reset')}
        </Button>
      </div>
      <ConfirmationModal
        show={showResetModal}
        header={t('stats.resetConfirmationTitle')}
        body={t('stats.resetConfirmationContent')}
        onClose={() => setShowResetModal(false)}
        onContinue={handleReset}
      />
    </>
  );
}
