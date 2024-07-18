import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightFromBracket} from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Sidebar() {
    const navigate = useNavigate();
    const nome = localStorage.getItem('user');

    const handleLogout = async () => {
        const api_url = 'https://estoque-api-latest.onrender.com/';
        const config = {
            headers: {
              'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
          };
        // console.log(config);
    
        await axios.post(api_url + 'logout', {}, config);
        // console.log(res);

        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/');
    };

  return (
    <>
      {[false].map((expand) => (
        <Navbar key={expand} expand={expand} className="body-tertiary mb-3">
          <Container Fluid>
            <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
            <Navbar.Offcanvas
              id={`offcanvasNavbar-expand-${expand}`}
              aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
              placement="end"
            >
              <Offcanvas.Header closeButton>
                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                  Bem vindo, <b>{nome}</b>!
                </Offcanvas.Title>
              </Offcanvas.Header>

              <Offcanvas.Body>
                <Nav className="justify-content-end flex-grow-1 pe-3">
                  <Nav.Link onClick={handleLogout} id="logout">
                    Logout
                    <FontAwesomeIcon icon={faRightFromBracket} id='logout-icon' className='action-icon'/>
                  </Nav.Link>
                </Nav>
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
      ))}
    </>
  );
}

export default Sidebar;