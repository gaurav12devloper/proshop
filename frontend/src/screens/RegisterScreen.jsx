import {useEffect, useState} from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux'; // useDispatch is used for storing data in stored and useSelectior is used for accessing data from stored
import FormContainer from '../components/FormContainer';
import Loader from '../components/Loader';
import Concol from 'vconcol';
import { useRegisterMutation } from '../slices/userApiSlice';
import { setCredentials } from '../slices/authSlice';
import {toast} from 'react-toastify';
const RegisterScreen = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const concol = new Concol();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [register, {isLoading}] = useRegisterMutation(); // useLoginMutation is a hook that is used to send data to the server

    const {userinfo} = useSelector((state) => state.auth); // get the data from the authslice stored
  

    const { search } = useLocation(); // get the location of the page

    const sp= new URLSearchParams(search); // get the search parameter from the url
    const redirect=sp.get('redirect') || '/'; // get the redirect parameter from the url
  
    useEffect(() => {
        if(userinfo) {
            navigate(redirect); // if the user is logged in then redirect to the redirect page
        }
    }, [userinfo, redirect,navigate]);

    const submitHandler = async(e) => {  
        e.preventDefault();
        if(password !== confirmPassword) { 
            toast.error('Password do not match'); // if the password and confirm password do not match then show the error message
            return;
         }
         else{
            try{
                const res=await register({name, email, password}).unwrap(); // send the data to the server , unwrap will throw reject value
                console.log(res); 
                dispatch(setCredentials({...res})); // store the data in the stored
                navigate(redirect); // redirect to the redirect page
            } catch (err) {
                toast.error(err?.data?.message || err.error); // show the error message which we have set in usercontroller if login is not successful, it will call with the help of userrouter.js
            }
        }
    }
    return (
        <FormContainer>
            <h1>Sign Up</h1>
            <Form onSubmit={submitHandler}>
                <Form.Group controlId='name'>
                    <Form.Label>Name</Form.Label>
                    <Form.Control type='name' placeholder='Enter Name' 
                        value={name} onChange={(e) => setName(e.target.value)}>
                    </Form.Control>
                </Form.Group>
                <Form.Group controlId='email'>
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control type='email' placeholder='Enter email' 
                        value={email} onChange={(e) => setEmail(e.target.value)}>
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId='password'>
                    <Form.Label>Password</Form.Label>
                    <Form.Control type='password' placeholder='Enter password' 
                        value={password} onChange={(e) => setPassword(e.target.value)}>
                    </Form.Control>
                </Form.Group>
                <Form.Group controlId='confirmPassword'>
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control type='password' placeholder='Confirm password' 
                        value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}>
                    </Form.Control>
                </Form.Group>
                <Button type='submit' variant='primary' className='mt-2' disabled={isLoading}>Register</Button>
            </Form>
            {isLoading && <Loader />} 
            <Row className='py-3'>
                <Col>
                    Already have account? <Link to={'/login'}>Login</Link>
                </Col>
            </Row>
        </FormContainer>
    );
};

export default RegisterScreen;