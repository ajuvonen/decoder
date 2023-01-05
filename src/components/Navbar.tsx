import { NavLink, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import NavbarBS from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';

export const Navbar = () => {
  const location = useLocation();
    const [currentPath, setCurrentPath] = useState<string|undefined>('');
    useEffect(() => {
      const routeCategory = (location.pathname.match(/\/[^\/]*\//) || [])[0];
      setCurrentPath(routeCategory);
    }, [location]);
  return (
    <NavbarBS bg="light" expand="sm">
      <Container fluid="lg">
        <NavbarBS.Brand>
          <Nav.Link to="/" as={NavLink}>
            Mastermind
          </Nav.Link>
        </NavbarBS.Brand>
          {!!currentPath && (
            <>
              <NavbarBS.Toggle aria-controls="basic-navbar-nav" />
              <NavbarBS.Collapse id="basic-navbar-nav">
                <Nav>
                  <Nav.Link to={`${currentPath}play`} as={NavLink}>
                    Play
                  </Nav.Link>
                  <Nav.Link to={`${currentPath}stats`} as={NavLink}>
                    Stats
                  </Nav.Link>
                </Nav>
              </NavbarBS.Collapse>
            </>
          )}
      </Container>
    </NavbarBS>
  );
};
