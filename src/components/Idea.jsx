import React from 'react'
import { Alert, Card, Container, Button, Navbar, Row, Col } from 'react-bootstrap'

const Idea = ({ idea, onDelete }) => (
    <Alert variant="light">
      <Navbar className="justify-content-between">
        <h4>{idea.content}</h4>
        <Button variant="outline-danger" size="sm" id={idea.id} onClick={onDelete}>-</Button>
      </Navbar>
    </Alert>
    
)

export default Idea
