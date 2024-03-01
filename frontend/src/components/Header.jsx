import { useNavigate } from 'react-router-dom';
import {Badge ,Navbar,Nav,Container, NavDropdown} from 'react-bootstrap';
import {FaShoppingCart,FaUser} from 'react-icons/fa';
import { LinkContainer } from 'react-router-bootstrap'; // this is used to wrap the Nav.Link for that install npm i react-router-bootstrap
import { useSelector, useDispatch } from 'react-redux'; 
import { useLogoutMutation } from '../slices/userApiSlice';
import { logout } from '../slices/authSlice';
import logo from '../assets/logo.png';
const Header = () => {
   
    const { cartItems } = useSelector((state) => state.cart); 
    const { userinfo } = useSelector((state) => state.auth); // get data from the stored

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [lagoutApiCall]=useLogoutMutation(); // call the logout mutation

    const logoutHandler = async() => {
        try{
            await lagoutApiCall().unwrap(); // call the logout mutation
            dispatch(logout()); // dispatch the logout action
            navigate('/login'); // redirect to the login page
        } catch(err){
            console.log(err);
        }
    }
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
                                <Nav.Link><FaShoppingCart/>Cart
                                    {cartItems.length > 0 && (
                                        <Badge pill bg='success' style={{ marginLeft: '5px'}}>{cartItems.length}</Badge> // pill is used to make the badge rounded and bg is used to give the background color to the badge and success is the color name
                                    )}
                                </Nav.Link>
                            </LinkContainer> {/* it is used to wrap the Nav.Link i.e it is used to make the Nav.Link clickable  without refreshing the page. */}
                            
                            { userinfo ? (
                               <NavDropdown title={userinfo.name} id='username'>
                                <LinkContainer to='/profile'>
                                    <NavDropdown.Item>Profile</NavDropdown.Item>
                                </LinkContainer>
                                <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>
                               </NavDropdown>
                            ):(
                                <LinkContainer to='/login'>
                                <Nav.Link href='/login'><FaUser/>Sign In</Nav.Link>
                                </LinkContainer>
                            )}
                           
                            
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    )
}
export default Header;