import React ,{ useState } from 'react';
import { Button, Form,Container,Row,Col,ToggleButton,ButtonGroup } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios'


const Login = ()=> {
    const [value, setValue] = useState({
      email:'',
      password:''


    });

  const login = (e) =>{
    e.preventDefault();

  

    if(value.email && 
      value.password ){

    axios.post('http://localhost:8000/users/login', {
      email: value.email,
      password: value.password
  })
    .then(function (response) {
      // alert(response.data);
      localStorage.setItem('user',JSON.stringify(response.data))
      console.log(response.data);
      localStorage.getItem('user')
      console.log("localStorage.getItem('user')===>>",localStorage.getItem('user'))
      window.location.replace("/home");
     
    })
    .catch(function (error) {
      alert(error.data);
      console.log(error.data);
    });
  }else{
    
    alert("Please Fill All requred fields")

  }
  

  }

  return (

<Container>

  <Row>
    <Col sm={3}></Col>
    <Col sm={6}>  
     
    <Row>
    <Col sm={5}></Col>
    <Col sm={4}>
      <h3>Sign In</h3> 
    </Col>
    <Col sm={3}></Col>
    </Row>
    <Form onSubmit={login}>

    <Form.Group as={Row} className="mb-4" controlId="email">
        <Row>
        <Col sm={3}>
        <Form.Label column >Email</Form.Label>
        </Col>
      
      <Col sm={9}>
      <Form.Control type="email" placeholder="Enter email" onChange={e => setValue({...value,email:e.target.value})} />
      </Col>
      </Row>
    </Form.Group>

    <Form.Group as={Row} className="mb-4" controlId="password">
    <Row>
        <Col sm={3}>
        <Form.Label column >Password</Form.Label>
        </Col>
      
      <Col sm={9}>
      <Form.Control type="password" placeholder="Password" onChange={(e) => setValue({...value,password:e.target.value})}/>
      </Col>
      </Row>
    </Form.Group>

    

    <Row>
    <Col sm={5}></Col>
    <Col sm={4}>
    <Button sm={2} variant="info" type="submit" value="submit"
    >
      Sign In
    </Button>
    </Col>
    <Col sm={3}></Col>
    </Row>

  </Form>
  Need an Account ? <a href='/register'> Sign Up</a>
  </Col>

    <Col sm={3}></Col>
  </Row>
</Container>

  );
}

export default Login;