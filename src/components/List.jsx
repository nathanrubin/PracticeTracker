import React, { useState, useEffect, useRef } from 'react'
import { Alert, Container, Row, Navbar, InputGroup, Button, FormControl, Form } from "react-bootstrap"
import { useAuth } from "../contexts/AuthContext"
import { useHistory } from "react-router-dom"
import { firestore } from "../firebase"
import Idea from './Idea'
import * as theme from '../theme'

export default function List() {
  const [error, setError] = useState("")
  const { currentUser, logout } = useAuth()
  const history = useHistory()

  async function handleLogout() {
    setError("")

    try {
      await logout()
      history.push("/login")
    } catch {
      setError("Failed to log out")
    }
  }

  const ideasContainer = useRef(null)
  const [idea, setIdeaInput] = useState('')
  const [ideas, setIdeas] = useState([])
  const [currentTheme, setCurrentTheme] = useState('lightTheme')

  const toggleTheme = () => {
    const newTheme = currentTheme === 'lightTheme' ? 'darkTheme' : 'lightTheme'
    setCurrentTheme(newTheme)
  }

  useEffect(() => {
    const selectedTheme = theme[currentTheme]

    Object.keys(selectedTheme).forEach(variable => {
      document.documentElement.style.setProperty(
        variable,
        selectedTheme[variable]
      )
    })
  }, [currentTheme])

  useEffect(() => {
    const unsubscribe = firestore.collection('ideas')
      .orderBy('timestamp', 'desc')
      .onSnapshot(({ docs }) => {
        const ideasFromDB = []

        docs.forEach(doc => {
          const details = {
            id: doc.id,
            content: doc.data().idea,
            timestamp: doc.data().timestamp
          }

          ideasFromDB.push(details)
        })

        setIdeas(ideasFromDB)
      })

    return () => unsubscribe()
  }, [])

  const onIdeaDelete = event => {
    const { id } = event.target
    firestore.collection('ideas').doc(id).delete()
  }

  const onIdeaAdd = event => {
    event.preventDefault()

    if (!idea.trim().length) return

    setIdeaInput('')
    ideasContainer.current.scrollTop = 0 // scroll to top of container

    firestore.collection('ideas').add({
      idea,
      timestamp: new Date()
    })
  }

  const renderIdeas = () => {
    if (!ideas.length)
      return <Alert variant="light"><h4>Add a new Idea...</h4></Alert>

    return ideas.map(idea => (
      <Idea key={idea.id} idea={idea} onDelete={onIdeaDelete} />
    ))
  }

  return (
    <>
      <Navbar bg="light">
        <Navbar.Brand><h3>Nathan's PRACTICE TRACKER</h3></Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <button type="button" className="btn btn-outline-dark" onClick={handleLogout}>
            Log Out
          </button>
        </Navbar.Collapse>
      </Navbar>
      <Container>
        <Row>
          {error && <Alert variant="danger">{error}</Alert>}
          <Container ref={ideasContainer} className="w-100" style={{ maxWidth: "600px" }}>
            {renderIdeas()}
          </Container>
        </Row>
      </Container>
      <Navbar fixed="bottom" bg="light" className="align-bottom">
        <Form onSubmit={onIdeaAdd}>
          <InputGroup className="mb-3">
            <FormControl
              placeholder="Add a new idea"
              aria-label="Add a new idea"
              aria-describedby="basic-addon2"
              value={idea}
              onChange={e => setIdeaInput(e.target.value)}
            />
            <InputGroup.Append>
              <Button variant="outline-secondary" type="submit">+</Button>
            </InputGroup.Append>
          </InputGroup>
        </Form>
      </Navbar>
    </>
  )
}
