import React ,{ useState } from 'react';
import { Button, Form,Container,Row,Col,ToggleButton,ButtonGroup,Card } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios'
import NavBar from './nav';


const CreatePost = ()=> {
    const user = localStorage.getItem('user')
    const [value, setValue] = useState({
      name:'',
      age:'',
      gender:'male',
      description:'',
      features:'',
      ownerName:'',
      ownerMoble:'',
      photo:'',
      adminId:JSON.parse(user).user._id



    });

  const radios = [
    { name: 'Male', value: 'male' },
    { name: 'Female', value: 'male' }
  ];

  const register = (e) =>{
    e.preventDefault();

    console.log("value===>>",JSON.stringify(value))

    if(value.name && 
      value.age && 
      value.gender&& 
      value.description&& 
      value.features&& 
      value.ownerMoble&& 
      value.ownerName){

    axios.post('http://localhost:8000/cats/createcat', {
        name:value.name,
        age:value.age,
        gender:value.gender,
        description:value.description,
        features:value.features,
        owner_name:value.name,
        owner_mobile:value.ownerMoble,
        photo:value.photo,
        adminId:value.adminId
  })
    .then(function (response) {
      console.log(response.data);
    })
    .catch(function (error) {
        console.log(error.data);
    });
  }else{
    
    alert("Please Fill All requred fields")

  }
  

  }

  return (
    <div className="App">  
        <NavBar />
 <Container>

  <Row>
    <Col sm={3}></Col>
    <Col sm={6}>  
     
    <Row>
    <Col sm={3}></Col>
    <Col sm={6}>
      <h3>Add Your Loving Cat</h3> 
    </Col>
    <Col sm={3}></Col>
    </Row>
    <Form onSubmit={register}>

    <Form.Group as={Row} className="mb-4" controlId="email">
        <Row>
        <Col sm={3}>
        <Form.Label column >Cat's Name</Form.Label>
        </Col>
      
      <Col sm={9}>
      <Form.Control type="text" placeholder="Enter Cat's Name" onChange={e => setValue({...value,name:e.target.value})} />
      </Col>
      </Row>
    </Form.Group>

    <Form.Group as={Row} className="mb-4" controlId="password">
    <Row>
        <Col sm={3}>
        <Form.Label column >Contact No</Form.Label>
        </Col>
      
      <Col sm={9}>
      <Form.Control type="text" placeholder="Contact No" onChange={(e) => setValue({...value,ownerMoble:e.target.value})}/>
      </Col>
      </Row>
    </Form.Group>

    <Form.Group as={Row} className="mb-4" controlId="password">
    <Row>
        <Col sm={3}>
        <Form.Label column >Owner Name</Form.Label>
        </Col>
      
      <Col sm={9}>
      <Form.Control type="text" placeholder="Owner Name" onChange={(e) => setValue({...value,ownerName:e.target.value})}/>
      </Col>
      </Row>
    </Form.Group>

    {/* <Form.Group as={Row} className="mb-4" controlId="confirmPassword">
    <Row>
        <Col sm={3}>
        <Form.Label column >Age</Form.Label>
        </Col>
      
      <Col sm={9}>
      <Form.Control type="password" placeholder="Confirm Password" onChange={(e) => setValue({...value,confirmPassword:e.target.value})}/>
      </Col>
      </Row>
    </Form.Group> */}

    <Form.Group as={Row} className="mb-4" controlId="formPlaintextFirstName">
    <Row>
        <Col sm={3}>
        <Form.Label column>Features</Form.Label>
        </Col>
      
      <Col sm={9}>
      <Form.Control  as="textarea" rows={3}type="text" placeholder="Feature" onChange={(e) => setValue({...value,features:e.target.value})}/>
      </Col>
      </Row>
    </Form.Group>

    <Form.Group as={Row} className="mb-4" controlId="formPlaintextLastName">
    <Row>
        <Col sm={3}>
        <Form.Label column>Description</Form.Label>
        </Col>
      
      <Col sm={9}>
      <Form.Control as="textarea" rows={3} type="description" placeholder="Description" onChange={(e) => setValue({...value,description:e.target.value})}/>
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
    <Form.Group as={Row} className="mb-4" controlId="formPlaintextLastName">
    <Row>
        <Col sm={3}>
        <Form.Label column>Upload Photo</Form.Label>
        </Col>
      
      <Col sm={9}>
      <Form.Control type="file" accept="image/*" onChange={(e) => setValue({...value,photo:URL.createObjectURL(e.target.files[0])})}/>
      </Col>
      </Row>
    </Form.Group>


    
    {/* <Form.Group controlId="formFile" className="mb-3">
    <Form.Label>Upload Photo</Form.Label>
    <Form.Control type="file" />
  </Form.Group> */}

    <Row>
    <Col sm={3}>

    </Col>
    <Col sm={6}>
        <br/>
    <Button sm={4} variant="info" type="submit" value="submit"
    >
      Save
    </Button>
    </Col>
    <Col sm={3}>

    </Col>
    </Row>

  </Form></Col>

    <Col sm={3}>
        <br/> <br/>
    <Card md={3} style={{ width: '18rem' }}>
    <Card.Img variant="bottom" src={value.photo} />
  </Card>
    </Col>
  </Row>
</Container>
</div>

  );
}

export default CreatePost;