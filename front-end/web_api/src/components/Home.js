import React ,{ useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';  
import {Container ,Card, Col, Button,Row, Form} from 'react-bootstrap';  
import img1 from '../img/img.webp';  
import axios from 'axios'
import NavBar from './nav';
const Home =(props) => { 
    
    const [value, setValue] = useState({
        cats:[],
        searchableCatName:''
  
  
      });

    const searchCat = (searchItem) =>{

        const allcats = {...value.cats}

        

        const filteredUsers = (value.cats.data || []).filter(item=>{
            console.log("item.name==>>",item.name)
            console.log("value.cats==>>",searchItem)
            if(item.name.toLowerCase() === searchItem.toLowerCase()){
                return item;
            }
        
            
        })
        !searchItem ? setValue({...value,cats:allcats}) : setValue({...value,cats:filteredUsers})

    }
    const handleSearch = (e) =>{
        
        e.preventDefault();
        // setValue({...value,searchableCatName:e.target.value})
        // console.log("e.target.value",value.searchableCatName)
        searchCat(e.target.value);
    }

    useEffect(()=>{
        
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
    <NavBar />

   <Container className='p-4'> 
   <div className='row'>

       <Row>
           <Col></Col>
           <Col >
           <Form>
           <Row>
    <Form.Control type="input" placeholder="Enter cat Name" onChange={handleSearch} />
    </Row>
  </Form>
           </Col>
           <Col></Col>
       </Row>
   


  
  {(value.cats.data || []).map((cat) => (
      <Col md="3"> 
        <Card sm={2}>  
            <Card.Img variant="top" src={cat.photo} style={{ width: '18.5rem' }} />  

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