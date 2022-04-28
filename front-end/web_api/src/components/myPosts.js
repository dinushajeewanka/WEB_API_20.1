import React ,{ useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';  
import {Container ,Card, Col, Button,Row, Form, Modal,ToggleButton,ButtonGroup} from 'react-bootstrap';  
import img1 from '../img/img.webp';  
import axios from 'axios'
import NavBar from './nav';
import Swal from 'sweetalert2'
const MyPosts =(props) => { 
    const user = localStorage.getItem('user')
    const handleClose = () => setValue({...value,show:false});
    const handleCloseEditModal = () => {
        setValue({...value,showEditModal:false})
    };
    
    const radios = [
        { name: 'Male', value: 'male' },
        { name: 'Female', value: 'male' }
      ];
    const [value, setValue] = useState({
        cats:[],
        searchableCatName:'',
        show:false,
        showEditModal:false,
        postId:'',
        cat:{},
        age:'',
        gender:'',
        name:'',
        owner_mobile:'',
        description:''
    
      });

    useEffect(()=>{
        async function func(){
          await  getcatbyAdmin();
        }
        func()
        console.log("cat.photo",value.cats)
        
    },[])
     const getcatbyAdmin=()=>{
        axios.get(`http://localhost:8000/cats/getcatByAdminId?adminId=${JSON.parse(user).user._id}`,{
            headers: {
              'authorization': `Bearer ${JSON.parse(user).accessToken}`
            }
          })
          .then(function (response) {
            console.log("response",response.data);
            setValue({cats:response.data})
            console.log(value.cats);
 
          })
          .catch(function (error) {
            alert(error.data);
            console.log(error.data);
          })
    }
    const deletePost =()=>{
        // const deleteId = localStorage.getItem('deleteItemId')
        // e.preventDefault();
        axios.delete(`http://localhost:8000/cats/deletecat?catId=${value.postId}`,{
            headers: {
              'authorization': `Bearer ${JSON.parse(user).accessToken}`
            }
          }
        )
        .then(function (response) {
        console.log("response.data",response.data);
        setValue({...value,show:false})
                getcatbyAdmin();
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Post Delete Successfull !',
                    showConfirmButton: false,
                    timer: 1500
                  })
        })
        .catch(function (error) {
        
      Swal.fire({
        position: 'top-end',
        icon: 'error',
        title: 'Cannot Delete Post!',
        showConfirmButton: false,
        timer: 1500
      })
        console.log(error.data);
        })
    }
    const EditPost =()=>{
        // const deleteId = localStorage.getItem('deleteItemId')
        // e.preventDefault();
        console.log("edit post",JSON.stringify(value.cat))
        console.log("Object Id",value.cat._id)
        axios.put(`http://localhost:8000/cats/updatecat?catId=${value.cat._id}`,{
            name:value.cat.name,
            age:value.cat.age,
            gender:value.cat.gender,
            description:value.cat.description,
            features:value.cat.features,
            owner_name:value.cat.owner_name,
            owner_mobile:value.cat.owner_mobile,
            photo:value.cat.photo
        },{
            headers: {
              'authorization': `Bearer ${JSON.parse(user).accessToken}`
            }
          })
        .then(function (response) {
        console.log("response.data",response.data);
        setValue({...value,showEditModal:false})
                getcatbyAdmin();
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Post Updated !',
                    showConfirmButton: false,
                    timer: 1500
                  })
        })
        .catch(function (error) {
        
      Swal.fire({
        position: 'top-end',
        icon: 'error',
        title: 'Post Updated Faild !',
        showConfirmButton: false,
        timer: 1500
      })
        console.log(error.data);
        })
    }
    const convertToBase64 = (file) => {
      return new Promise((resolve, reject) => {
        const fileReader = new FileReader();
        fileReader.readAsDataURL(file);
        fileReader.onload = () => {
          resolve(fileReader.result);
        };
        fileReader.onerror = (error) => {
          reject(error);
        };
      });
    };
  
    const handleFileUpload = async (e) => {
      const file = e.target.files[0];
      const base64 = await convertToBase64(file);
      console.log(base64)
      setValue({...value,cat:{...value.cat,photo:base64}})
      // setPostImage({ ...postImage, myFile: base64 });
    };

  return (  
    <div className="App">  
    <NavBar />
    <Modal show={value.show} onHide={handleClose}>
       
        <Modal.Body>Are you sure you want delete data?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={()=>{deletePost()}}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={value.showEditModal} onHide={handleCloseEditModal}>
      <Modal.Header closeButton>
          <Modal.Title>Edit Your Loving Cat</Modal.Title>
        </Modal.Header>
        <Modal.Body> 
        <Row>
            <Col sm={12}>  
                <Row>
                <Col class="text-center" sm={12}>
            </Col>
            </Row>
            <Form >

            <Form.Group as={Row} className="mb-4" controlId="email">
                <Row>
                <Col sm={3}>
                <Form.Label column >Cat's Name</Form.Label>
                </Col>
            
            <Col sm={9}>
            <Form.Control type="text" defaultValue ={value.cat?value.cat.name:''}placeholder="Enter Cat's Name" onChange={e => setValue({...value,cat:{...value.cat,name:e.target.value}})} />
            </Col>
            </Row>
            </Form.Group>
            <Form.Group as={Row} className="mb-4" controlId="password">
            <Row>
                <Col sm={3}>
                <Form.Label column >Contact No</Form.Label>
                </Col>
            
                <Col sm={9}>
                <Form.Control type="text" defaultValue ={value.cat?value.cat.owner_mobile:''} placeholder="Contact No" onChange={(e) => setValue({...value,cat:{...value.cat,owner_mobile:e.target.value}})}/>
                </Col>
            </Row>
            </Form.Group>

            <Form.Group as={Row} className="mb-4" controlId="password">
            <Row>
                <Col sm={3}>
                <Form.Label column >Owner Name</Form.Label>
                </Col>
            
            <Col sm={9}>
            <Form.Control type="text" placeholder="Owner Name" defaultValue ={value.cat?value.cat.owner_name:''} onChange={(e) => setValue({...value,cat:{...value.cat,owner_name:e.target.value}})}/>
            </Col>
            </Row>
            </Form.Group>
            <Form.Group as={Row} className="mb-4" controlId="formPlaintextFirstName">
            <Row>
                <Col sm={3}>
                <Form.Label column>Features</Form.Label>
                </Col>
            
            <Col sm={9}>
            <Form.Control  as="textarea" rows={3} defaultValue ={value.cat?value.cat.description:''} type="text" placeholder="Feature" onChange={(e) => setValue({...value,cat:{...value.cat,features:e.target.value}})}/>
            </Col>
            </Row>
            </Form.Group>

            <Form.Group as={Row} className="mb-4" controlId="formPlaintextLastName">
            <Row>
                <Col sm={3}>
                <Form.Label column>Description</Form.Label>
                </Col>
            
            <Col sm={9}>
    <Form.Control as="textarea" rows={3} defaultValue ={value.cat? value.cat.description: ''} placeholder="Description" onChange={(e) => setValue({...value,cat:{...value.cat,description:e.target.value}})}/>
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
                    // value={radio.value}
                    value ={value.cat?value.cat.gender:''}
                    checked={value.gender === radio.value}
                    onChange={(e) => setValue({...value,cat:{...value.cat,gender:e.target.value}})}
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
      <Form.Control type="number" defaultValue ={value.cat?value.cat.age:''} placeholder="Enter Your age" onChange={(e) => setValue({...value,cat:{...value.cat,age:e.target.value}})}/>
      </Col>
      </Row>
    </Form.Group>
    <Form.Group as={Row} className="mb-4" controlId="formPlaintextLastName">
    <Row>
        <Col sm={3}>
        <Form.Label column>Upload Photo</Form.Label>
        </Col>
      
      <Col sm={9}>
      <Form.Control type="file" accept="image/*" onChange={(e) => handleFileUpload(e)}/>
      </Col>
      </Row>
    </Form.Group>
    <Card md={3} style={{ width: '18rem' ,height:'18rem'}}>
    <Card.Img variant="bottom"  src={value.cat?value.cat.photo:''} />
  </Card>
    

            </Form>
            </Col>
            </Row>
        </Modal.Body>
        
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseEditModal}>
            Cancel
          </Button>
          <Button variant="primary" onClick={()=>{EditPost()}}>
            Update
          </Button>
        </Modal.Footer>
      </Modal>
   <Container className='p-4'> 
   
   <div className='row'>

   


  
  {(value.cats || []).map((cat) => (
      <Col md="3"> 
        <Card sm={2}>  
            <Card.Img variant="top" src={cat?cat.photo:"" } style={{ width: '18.5rem',height:'18.5rem' }} />  

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
            <Row>
                <Col sm={2}></Col>
                <Col sm={4}>
                        <Button  onClick={()=>{setValue({...value,show:true,postId:cat._id})}} sm={2} variant="danger" type="submit" value="submit"
                    >
                    Delete
                    </Button>
                </Col>
                <Col sm={4}>
                <Button onClick={()=>{setValue({...value,showEditModal:true,cat})}} sm={2} variant="secondary" type="submit" value="submit"
                >
                Edit
                </Button>
                </Col>
                <Col sm={2}></Col>
            </Row>
        </Card.Body>  
      </Card>
      </Col> 
      ))}
        
     
    </div> 
</Container>  
    </div>  
  );  
}  
export default MyPosts;  