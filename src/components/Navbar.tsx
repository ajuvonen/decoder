import {useTranslation} from 'react-i18next';
import {NavLink, useLocation} from 'react-router-dom';
import {useState, useEffect} from 'react';
import NavbarBS from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import {LanguageSelector} from './LanguageSelector';
import {useWindowSize} from '@/hooks/windowSize';

export const Navbar = () => {
  const location = useLocation();
  const {t} = useTranslation();
  const [currentPath, setCurrentPath] = useState<string | undefined>('');
  const hasMenu = useWindowSize().width <= 575;
  useEffect(() => {
    const routeCategory = (location.pathname.match(/\/[^\/]*\//) || [])[0];
    setCurrentPath(routeCategory);
  }, [location]);
  return (
    <NavbarBS bg="light" expand="sm">
      <Container fluid="lg">
        <NavbarBS.Brand>
          <Nav.Link to="/" as={NavLink}>
            Decoder
          </Nav.Link>
        </NavbarBS.Brand>
        {!!currentPath && (
          <>
            <NavbarBS.Toggle aria-controls="basic-navbar-nav" />
            <NavbarBS.Collapse id="basic-navbar-nav">
              <Nav>
                <Nav.Link to={`${currentPath}play`} as={NavLink}>
                  {t('navbar.play')}
                </Nav.Link>
                <Nav.Link to={`${currentPath}stats`} as={NavLink}>
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
