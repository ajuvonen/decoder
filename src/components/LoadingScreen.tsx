import {FC} from 'react';
import {useTranslation} from 'react-i18next';
import styled from 'styled-components';

const Screen = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: calc(100% - 70px);
`;

export const LoadingScreen: FC = () => {
  const {t} = useTranslation();
  return (
    <Screen>
      <h1>{t('general.loading')}</h1>
    </Screen>
  );
};
