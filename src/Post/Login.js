import React from "react";
import './Login.css'
import { useState, useEffect } from "react";
import axios from "axios";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { useForm } from "react-hook-form";
import {
  MDBContainer,
  MDBCol,
  MDBRow,
  MDBBtn,
  MDBIcon,
  MDBInput,
  MDBCheckbox,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
} from 'mdb-react-ui-kit';
import toast, { Toaster } from 'react-hot-toast';
import GoogleLogin from 'react-google-login';
import ReactDOM from 'react-dom';
import FacebookLogin from 'react-facebook-login';

export default function App() {
  const [name, setname] = useState([]);
  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');
  const [show, setShow] = useState(false);
  const [dangky, setdangky] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  const handleCloseregister = () => setdangky(false);
  const handleShowregister = () => {
    setdangky(true);
    setShow(false);
  }

  const { register, handleSubmit, watch, formState: { errors } } = useForm();


  const onSubmit = async (data) => {

    await axios.post('https://reqres.in/api/login', data)
      .then(res => {
        setname(res.config.data)
        toast.success('Successful Login', {
          id: 'clipboard',
        })
        handleClose()



      }
      )
      .catch(async () => {
        toast.error('Login failed :(')
      })
  }

  const Register = async (data) => {
    var from = {
      email: email,
      password: password
    }
    await axios.post('https://632d221d0d7928c7d2455e19.mockapi.io/todolist/api/', from)
    setShow(true);
    setdangky(false);
    toast.success('Create Account Success', {
      id: 'clipboard',
    })


  }

  const responseGoogle = (response) => {
    console.log(response);
  }
  const responseFacebook = (response) => {
    console.log(response);
  }
  const componentClicked = () => {
    console.log('click')
  }
  return (
    <>

      <Toaster
        reverseOrder={true} />
      <Button className="space-x-10 " style={{ backgroundColor: '#30A64A', fontSize: '10px' }} onClick={handleShow} >
        &#160;
        Login
      </Button>




      <Modal size="lg" show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Log in</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <MDBContainer fluid className="p-3 my-5 h-custom">


              <MDBRow>

                <MDBCol col='10' md='6'>
                  <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp" class="img-fluid" alt="Sample image" />
                </MDBCol>

                <MDBCol col='4' md='6'>

                  <div  >

                    <p >Sign in with</p>

                    <div style={{ width: '180px' }}>
                      <FacebookLogin
                        size="metro"
                        appId="398957542432292"
                        buttonText="Login"
                        fields="name,email,picture"
                        onClick={componentClicked}
                        callback={responseFacebook}
                      />
                    </div>
                    <GoogleLogin
                      clientId="91698613648-0hq15ornsni4a5s0nbdedcai1i81o180.apps.googleusercontent.com"
                      // buttonText="Login"
                      onSuccess={responseGoogle}
                      onFailure={responseGoogle}
                      cookiePolicy={'single_host_origin'}
                      isSignedIn={true}
                    />

                  </div>

                  <div className="divider d-flex align-items-center my-4">
                    <p className="text-center fw-bold mx-3 mb-0">Or</p>
                  </div>
                  <Form.Label>Email</Form.Label>
                  <Form.Control {...register("email")} size="lg" required type="email" />
                  <Form.Label>Password</Form.Label>
                  <Form.Control  {...register("password")} size="lg" type="password" />
                  <br></br>
                  <div className="d-flex justify-content-between mb-4">
                    <MDBCheckbox name='flexCheck' value='' id='flexCheckDefault' label='Remember me' />
                    <a href="!#">Forgot password?</a>
                  </div>

                  <div className='text-center text-md-start mt-4 pt-2'>
                    <Button type='submit' value='Login' className='mb-0 px-5' size='lg'>Login</Button>
                    <p className="small fw-bold mt-2 pt-1 mb-2">Don't have an account? <a href="#!" className="link-danger" onClick={handleShowregister}>Register</a></p>
                  </div>

                </MDBCol>

              </MDBRow>

              <div className="d-flex flex-column flex-md-row text-center text-md-start justify-content-between py-4 px-4 px-xl-5 bg-primary">

                <div className="text-white mb-3 mb-md-0">
                  Copyright © 2020. All rights reserved.
                </div>

                <div>

                  <MDBBtn tag='a' color='none' className='mx-3' style={{ color: 'white' }}>
                    <MDBIcon fab icon='facebook-f' size="md" />
                  </MDBBtn>

                  <MDBBtn tag='a' color='none' className='mx-3' style={{ color: 'white' }}>
                    <MDBIcon fab icon='twitter' size="md" />
                  </MDBBtn>

                  <MDBBtn tag='a' color='none' className='mx-3' style={{ color: 'white' }}>
                    <MDBIcon fab icon='google' size="md" />
                  </MDBBtn>

                  <MDBBtn tag='a' color='none' className='mx-3' style={{ color: 'white' }}>
                    <MDBIcon fab icon='linkedin-in' size="md" />
                  </MDBBtn>

                </div>

              </div>

            </MDBContainer>
          </Form>
        </Modal.Body>

      </Modal>






      <Modal size="lg" show={dangky} onHide={handleCloseregister}>
        <Modal.Header closeButton>
          <Modal.Title>Register</Modal.Title>
        </Modal.Header>
        <Modal.Body>

          <Form onSubmit={handleSubmit(Register)}>
            <MDBContainer fluid>

              <MDBCard className='text-black m-5' style={{ borderRadius: '25px' }}>
                <MDBCardBody>
                  <MDBRow>
                    <MDBCol md='10' lg='6' className='order-2 order-lg-1 d-flex flex-column align-items-center'>

                      <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Sign up</p>

                      <div >
                        <MDBIcon fas icon="user me-3" size='lg' />
                        <Form.Control id='form1' size='xl' required type='text' className='w-100' />
                        <Form.Label>Your Name</Form.Label>
                        {/* <MDBInput  id='form1' type='text' className='w-100'/> */}
                      </div>

                      <div >
                        <MDBIcon fas icon="envelope me-3" size='lg' />
                        {/* <MDBInput label='Your Email' id='form2' type='email'/> */}
                        <Form.Control onChange={(e) => setemail(e.target.value)} id='form1' size='xl' required type='email' className='w-100' />
                        <Form.Label>Your Email</Form.Label>
                      </div>

                      <div >
                        <MDBIcon fas icon="lock me-3" size='lg' />
                        <Form.Control onChange={(e) => setpassword(e.target.value)} id='form3' size='xl' required type='password' className='w-100' />
                        <Form.Label>Password</Form.Label>
                        {/* <MDBInput label='Password' id='form3' type='password'/> */}
                      </div>

                      <div >
                        <MDBIcon fas icon="key me-3" size='lg' />
                        <Form.Control id='form4' size='xl' required type='password' className='w-100' />
                        <Form.Label>Repeat your password</Form.Label>
                        {/* <MDBInput label='Repeat your password' id='form4' type='password'/> */}
                      </div>

                      <div className='mb-4'>
                        <MDBCheckbox name='flexCheck' value='' id='flexCheckDefault' label='Subscribe to our newsletter' />
                      </div>

                      <Button type='submit' className='mb-4' size='lg'>Register</Button>

                    </MDBCol>

                    <MDBCol md='10' lg='6' className='order-1 order-lg-2 d-flex align-items-center'>
                      <MDBCardImage src='https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp' fluid />
                    </MDBCol>

                  </MDBRow>
                </MDBCardBody>
              </MDBCard>
            </MDBContainer>

          </Form>
        </Modal.Body>

      </Modal>

    </>
  );
}