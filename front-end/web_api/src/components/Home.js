import React ,{ useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';  
import {Container ,Card, Col, Button,Row, Form} from 'react-bootstrap';  
import img1 from '../img/img.webp';  
import axios from 'axios'
const  posts ={
    "success": true,
    "existingcrews": [
        {
            "_id": "626888ba8dfed54050dd8705",
            "contractID": "con01",
            "position": "Mechanic",
            "employeeID": "em00001",
            "employeeName": "Perera wijerathna",
            "contactNo": "0726785437",
            "__v": 0
        },
        {
            "_id": "626889b48dfed54050dd8726",
            "contractID": "con00003",
            "position": "Superviser",
            "employeeID": "emp003",
            "employeeName": "Jagath Silva",
            "contactNo": "0712345678",
            "__v": 0
        },
        {
            "_id": "62688a1d8dfed54050dd8750",
            "contractID": "con002",
            "position": "Mechanic",
            "employeeID": "emp002",
            "employeeName": "Saman dias",
            "contactNo": "0726785437",
            "__v": 0
        }
    ]
}
const Home =() => { 
    
    const [value, setValue] = useState({
        cats:[]
  
  
      });

    useEffect(()=>{
        console.log("Called")
        axios.get('http://localhost:8000/cats/getcat')
          .then(function (response) {
            console.log(response.data);
            setValue({cats:response})
 
          })
          .catch(function (error) {
            alert(error.data);
            console.log(error.data);
          })
    },[])



  return (  
    <div className="App">  
   <Container className='p-4'> 
   <div className='row'>
   
  
  
  {(value.cats.data || []).map((cat) => (
      <Col md="4"> 
        <Card sm={2}>  
            <Card.Img variant="top" src={img1} height={200} width={100} />  

        <Card.Body>   
            <Card.Title>{cat.name}</Card.Title>
            <Form.Group as={Row} className="mb-0" controlId="email">
                <Row>
                <Col sm={4}>
                <Form.Label column >Gender </Form.Label>
                </Col>
            
            <Col sm={8}>
            <Form.Label column >{cat.gender}</Form.Label>
            </Col>
            </Row>
            </Form.Group>
            <Form.Group as={Row} className="mb-0" controlId="email">
                <Row>
                <Col sm={4}>
                <Form.Label column >Features </Form.Label>
                </Col>
            
            <Col sm={8}>
            <Form.Label column >{cat.features}</Form.Label>
            </Col>
            </Row>
            </Form.Group>
            <Form.Group as={Row} className="mb-0" controlId="email">
                <Row>
                <Col sm={4}>
                <Form.Label column >Age </Form.Label>
                </Col>
            
            <Col sm={8}>
            <Form.Label column >{cat.age}</Form.Label>
            </Col>
            </Row>
            </Form.Group>
            <Form.Group as={Row} className="mb-0" controlId="email">
                <Row>
                <Col sm={4}>
                <Form.Label column >Owner </Form.Label>
                </Col>
            
            <Col sm={8}>
            <Form.Label column >{cat.owner_name}</Form.Label>
            </Col>
            </Row>
            </Form.Group>
            <Form.Group as={Row} className="mb-0" controlId="email">
                <Row>
                <Col sm={4}>
                <Form.Label column >Contact </Form.Label>
                </Col>
            
            <Col sm={8}>
            <Form.Label column >{cat.owner_mobile}</Form.Label>
            </Col>
            </Row>
            </Form.Group>
            <Form.Group as={Row} className="mb-0" controlId="email">
                <Row>
                <Col sm={4}>
                <Form.Label column >Description </Form.Label>
                </Col>
            
            <Col sm={8}>
            <Form.Label column >{cat.description}</Form.Label>
            </Col>
            </Row>
            </Form.Group>
          
        </Card.Body>  
      </Card>
      </Col> 
      ))}
        
     
    </div> 
</Container>  
    </div>  
  );  
}  
export default Home;  