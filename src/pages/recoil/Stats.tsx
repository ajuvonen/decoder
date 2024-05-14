import {useState} from 'react';
import {useTranslation} from 'react-i18next';
import {useRecoilState} from 'recoil';
import {statsState} from '@/recoil-store';
import Button from 'react-bootstrap/Button';
import {ConfirmationModal} from '@/components/ConfirmationModal';
import {formatFastestTime} from '@/utils/gameUtils';

export default function Stats() {
  const [stats, setStats] = useRecoilState(statsState);
  const [showResetModal, setShowResetModal] = useState(false);
  const {t} = useTranslation();
  const percentage =
    stats.won + stats.lost
      ? ((stats.won / (stats.won + stats.lost)) * 100).toFixed(1)
      : '0';

  const handleReset = () => {
    setStats({
      fastest: 0,
      fastestHardMode: 0,
      lost: 0,
      won: 0,
    });
    setShowResetModal(false);
  };

  return (
    <>
      <h1 className="mt-5">{t('stats.title')}</h1>
      <p className="mt-3 fs-3 tektur">
        {t('stats.wonGames', {won: stats.won, percentage})}
      </p>
      <p className="fs-3 tektur">{t('stats.lostGames', {lost: stats.lost})}</p>
      {!!stats.fastest && (
        <p className="fs-3 tektur">
          {t('stats.fastestTimeEasy', {time: formatFastestTime(stats.fastest)})}
        </p>
      )}
      {!!stats.fastestHardMode && (
        <p className="fs-3 tektur">
          {t('stats.fastestTimeDifficult', {
            time: formatFastestTime(stats.fastestHardMode),
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
