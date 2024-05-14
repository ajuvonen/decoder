import {useState, useEffect, FC} from 'react';
import {useTranslation} from 'react-i18next';
import {NavLink, useLocation} from 'react-router-dom';
import NavbarBS from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import {LanguageSelector} from './LanguageSelector';
import {useWindowSize} from '@/hooks/windowSize';

export const Navbar: FC = () => {
  const location = useLocation();
  const {t} = useTranslation();
  const [currentPath, setCurrentPath] = useState<string | undefined>('');
  const hasMenu = useWindowSize().width <= 575;
  useEffect(() => {
    const routeCategory = (location.pathname.match(/\/[^/]*\//) || [])[0];
    setCurrentPath(routeCategory);
  }, [location]);
  return (
    <NavbarBS bg="light" expand="sm">
      <Container fluid="lg">
        <NavbarBS.Brand>
          <Nav.Link className="tektur" to="/" as={NavLink}>
            Decoder
          </Nav.Link>
        </NavbarBS.Brand>
        {!!currentPath && (
          <>
            <NavbarBS.Toggle
              aria-controls="basic-navbar-nav"
              data-test="navbar-toggler"
            />
            <NavbarBS.Collapse id="basic-navbar-nav">
              <Nav data-test="navbar-links">
                <Nav.Link
                  to={`${currentPath}play`}
                  as={NavLink}
                  data-test="play-link"
                >
                  {t('navbar.play')}
                </Nav.Link>
                <Nav.Link
                  to={`${currentPath}stats`}
                  as={NavLink}
                  data-test="stats-link"
                >
                  {t('navbar.stats')}
                </Nav.Link>
                {hasMenu && <LanguageSelector />}
              </Nav>
            </NavbarBS.Collapse>
          </>
        )}
        {!hasMenu && <LanguageSelector />}
      </Container>
    </NavbarBS>
  );
};
