import React from 'react';
import { Navbar, Container, Form, Button, Nav, NavDropdown, FormControl} from 'react-bootstrap';
import {Link} from  'react-router-dom';

const Navigation = () => {
    return (
        <Navbar bg="light" expand="lg">
          <Container fluid>
            <Navbar.Brand as={Link} to="/">HOME</Navbar.Brand>
            <Navbar.Toggle aria-controls="navbarScroll" />
            <Navbar.Collapse id="navbarScroll">
              <Nav
                className="me-auto my-2 my-lg-0"
                style={{ maxHeight: '100px' }}
                navbarScroll
              >
                <Nav.Link href="/game">
                  게임
                </Nav.Link>
                <Nav.Link as={Link} to="/">
                  랭킹
                </Nav.Link>
                <Nav.Link as={Link} to="/">
                  모기 게시판
                </Nav.Link>
              </Nav>
              <Form className="d-flex">
                <Form.Control
                  type="search"
                  placeholder="Search"
                  className="me-2"
                  aria-label="Search"
                />
                <Button variant="outline-success">Search</Button>
              </Form>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      );
}

export default Navigation;