import {useEffect} from 'react';
import {Globe} from 'react-bootstrap-icons';
import {useTranslation} from 'react-i18next';
import styled from 'styled-components';

const LanguageButton = styled.a`
  color: rgba(0, 0, 0, 0.55);
  text-decoration: none;
  margin-left: 0.5rem;

  &:hover {
    color: rgba(0, 0, 0, 0.9);
  }
`;

export const LanguageSelector = () => {
  const {i18n} = useTranslation();
  const languages = ['en', 'fi'];
  const setLanguage = (language: string) => {
    i18n.changeLanguage(language);
    document.documentElement.lang = i18n.language;
  };
  useEffect(() => {
    document.documentElement.lang = i18n.language;
  }, []);
  return (
    <div className="d-flex align-items-center pt-2 pb-2">
      <Globe aria-hidden />
      {languages.map((language) => (
        <LanguageButton
          key={language}
          role="button"
          onClick={() => setLanguage(language)}
          data-test={`${language}-locale-button`}
        >
          {i18n.t('general.localeName', {lng: language})}
        </LanguageButton>
      ))}
    </div>
  );
};
