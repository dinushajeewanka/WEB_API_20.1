import React ,{ useState } from 'react';
import { Button, Form,Container,Row,Col,ToggleButton,ButtonGroup } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios'
// import {Swal} from 'sweetalert2-react';
import Swal from 'sweetalert2'


const SignUp = ()=> {
    const [value, setValue] = useState({
      email:'',
      password:'',
      confirmPassword:'',
      fname:'',
      lname:'',
      gender:'male',
      age:0


    });

  const radios = [
    { name: 'Male', value: 'male' },
    { name: 'Female', value: 'male' }
  ];

  const register = (e) =>{
    e.preventDefault();

    console.log("value===>>",JSON.stringify(value))

    if(value.email && 
      value.password && 
      value.password===value.confirmPassword&& 
      value.fname&& 
      value.lname&& 
      value.gender&& 
      value.age){

    axios.post('http://localhost:8000/users/createUser', {
      email: value.email,
      password: value.password,
      first_name: value.fname,
      last_name: value.lname,
      gender:value.gender,
      age: value.age
  })
    .then(function (response) {
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Registration Successfull !',
        showConfirmButton: false,
        timer: 1500
      })
    })
    .catch(function (error) {

      Swal.fire({
        position: 'top-end',
        icon: 'error',
        title: 'Registration Faild !',
        showConfirmButton: false,
        timer: 1500
      })
    });
  }else{
    
    Swal.fire({
      position: 'top-end',
      icon: 'warning',
      title: 'Please Fill All Required fields',
      showConfirmButton: false,
      timer: 1500
    })

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
      <h3>Sign Up</h3> 
    </Col>
    <Col sm={3}></Col>
    </Row>
    <Form onSubmit={register}>

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

    <Form.Group as={Row} className="mb-4" controlId="confirmPassword">
    <Row>
        <Col sm={3}>
        <Form.Label column >Confirm Password</Form.Label>
        </Col>
      
      <Col sm={9}>
      <Form.Control type="password" placeholder="Confirm Password" onChange={(e) => setValue({...value,confirmPassword:e.target.value})}/>
      </Col>
      </Row>
    </Form.Group>

    <Form.Group as={Row} className="mb-4" controlId="formPlaintextFirstName">
    <Row>
        <Col sm={3}>
        <Form.Label column>FirstName</Form.Label>
        </Col>
      
      <Col sm={9}>
      <Form.Control type="f_name" placeholder="Enter Your First Name" onChange={(e) => setValue({...value,fname:e.target.value})}/>
      </Col>
      </Row>
    </Form.Group>

    <Form.Group as={Row} className="mb-4" controlId="formPlaintextLastName">
    <Row>
        <Col sm={3}>
        <Form.Label column>LastName</Form.Label>
        </Col>
      
      <Col sm={9}>
      <Form.Control type="l_name" placeholder="Enter Your Last Name" onChange={(e) => setValue({...value,lname:e.target.value})}/>
      </Col>
      </Row>
    </Form.Group>

    <Form.Group as={Row} className="mb-4" controlId="gender">
    <Row>
        <Col sm={3}>
        <Form.Label column>Gender</Form.Label>
        </Col>
      
      <Col sm={9}>
      <ButtonGroup className="mb-4">
        {radios.map((radio, idx) => (
          <ToggleButton
            key={idx}
            id={`radio-${idx}`}
            type="radio"
            variant={'outline-success'}
            name="radio"
            value={radio.value}
            checked={value.gender === radio.value}
            onChange={(e) => setValue({...value,gender:e.target.value})}
          >
            {radio.name}
          </ToggleButton>
        ))}
      </ButtonGroup>
      </Col>
      </Row>
    </Form.Group>

    <Form.Group as={Row} className="mb-4" controlId="formPlaintextLastName">
    <Row>
        <Col sm={3}>
        <Form.Label column>Age</Form.Label>
        </Col>
      
      <Col sm={9}>
      <Form.Control type="number" placeholder="Enter Your age" onChange={(e) => setValue({...value,age:e.target.value})}/>
      </Col>
      </Row>
    </Form.Group>

    <Row>
    <Col sm={5}></Col>
    <Col sm={4}>
    <Button sm={2} variant="info" type="submit" value="submit"
    >
      Register
    </Button>
    </Col>
    <Col sm={3}></Col>
    </Row>

  </Form>
  Alredy have an account? <a href='/login'>Log In</a>
  </Col>

    <Col sm={3}></Col>
  </Row>
</Container>

  );
}

export default SignUp;