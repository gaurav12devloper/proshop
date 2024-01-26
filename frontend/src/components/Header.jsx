import {Navbar,Nav,Container} from 'react-bootstrap';
import {FaShoppingCart,FaUser} from 'react-icons/fa';
import { LinkContainer } from 'react-router-bootstrap'; // this is used to wrap the Nav.Link for that install npm i react-router-bootstrap
import logo from '../assets/logo.png';
const Header = () => {
    return (
        <header>
            <Navbar bg="dark" variant="dark" expand="md" collapseOnSelect>
                <Container>
                    <LinkContainer to="/">
                    <Navbar.Brand>
                        <img src={logo} alt="ProShop" />
                        ProShop
                    </Navbar.Brand>
                    </LinkContainer>
                    <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ms-auto">
                            <LinkContainer to='/cart'>
                                <Nav.Link><FaShoppingCart/>Cart</Nav.Link>
                            </LinkContainer> {/* it is used to wrap the Nav.Link i.e it is used to make the Nav.Link clickable  without refreshing the page. */}
                            <LinkContainer to='/login'>
                                <Nav.Link><FaUser/>Sign In</Nav.Link>
                            </LinkContainer> {/* <Nav.Link href="/login"><FaUser/>Sign In</Nav.Link> */}
                            
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    )
}
export default Header;