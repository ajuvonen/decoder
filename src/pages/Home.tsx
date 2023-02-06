import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Stack from 'react-bootstrap/Stack';

export const Home = () => {
  const {t} = useTranslation();
  const navigate = useNavigate();
  return (
    <>
      <h1 className="mt-5">{ t('home.welcome') }</h1>
      <p className="mt-3">{ t('home.instruction1') }</p>
      <p>{ t('home.instruction2') }</p>
      <p className="mt-3">{ t('home.instruction3') }</p>
      <Stack direction="horizontal" gap={3} className="justify-content-center mt-3">
        <Button className="outline-primary" onClick={() => navigate('recoil/play')}>
          Recoil
        </Button>
        <Button className="outline-primary" onClick={() => navigate('redux/play')}>
          Redux
        </Button>
        <Button className="outline-primary" onClick={() => navigate('context/play')}>
          Context API
        </Button>
      </Stack>
    </>
  );
};
