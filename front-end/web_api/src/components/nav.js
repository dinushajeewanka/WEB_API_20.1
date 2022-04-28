import React ,{ useState } from 'react';
import { Button, Form,Container,Row,Col,ToggleButton,ButtonGroup,Navbar,Nav ,NavDropdown} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios'
import Home from './Home';

const NavBar = (props)=> {
    const userDetails = localStorage.getItem('user')
    console.log("propsuserDetails===>",JSON.parse(userDetails))
  return (
      
<Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
  <Container>
  <Navbar.Brand href="/home">Catty Love</Navbar.Brand>
  <Navbar.Toggle aria-controls="responsive-navbar-nav" />
  <Navbar.Collapse id="responsive-navbar-nav">
    <Nav className="me-auto">
      <Nav.Link href="/myposts">My Posts</Nav.Link>
      <Nav.Link href="/createpost">Create Post</Nav.Link>
    </Nav>
    <Nav>
      
      <Nav.Link >
      {JSON.parse(userDetails).user.first_name} {JSON.parse(userDetails).user.last_name}
      </Nav.Link>
      <Nav.Link >{JSON.parse(userDetails).user.email}</Nav.Link>
    </Nav>
  </Navbar.Collapse>
  </Container>
</Navbar>
  );
}

export default NavBar;