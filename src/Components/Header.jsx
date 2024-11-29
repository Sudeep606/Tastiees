import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import logo from '../assets/tastiess.png';
import './header.css';
import { Link } from 'react-router-dom';

function BasicExample() {
  return (
    <Navbar collapseOnSelect expand="lg" bg="light" variant="light" className="shadow-sm">
      <Container>
        {/* Brand Logo */}
        <Navbar.Brand Link to="/home">
          <img src={logo} alt="Logo" className="img-fluid" style={{ height: '100px' }} />
        </Navbar.Brand>
        
        {/* Toggle Button for Mobile View */}
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        
        {/* Collapsible Navbar Links */}
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="/" style={linkStyle}>Home</Nav.Link>
            <Nav.Link as={Link} to="/cart" style={linkStyle}>Cart</Nav.Link>
            <Nav.Link as={Link} to="/favourites" style={linkStyle}>Favourites</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

const linkStyle = {
  color: 'brown',
  marginTop: '5px',
  fontWeight: '600',
};

export default BasicExample;
