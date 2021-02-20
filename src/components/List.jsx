import React, { useState, useEffect, useRef } from 'react'
import { Alert, Container, Row } from "react-bootstrap"
import { useAuth } from "../contexts/AuthContext"
import { useHistory } from "react-router-dom"
import { firestore } from "../firebase"
import Idea from './Idea'
import * as theme from '../theme'
import './List.less'

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
      return <h2 className="app__content__no-idea">Add a new Idea...</h2>

    return ideas.map(idea => (
      <Idea key={idea.id} idea={idea} onDelete={onIdeaDelete} />
    ))
  }

  return (
    <Container className="d-flex flex-column h-100">
      <Row>
        <h3>Nathan's PRACTICE TRACKER</h3>
        <button type="button" className="btn btn-outline-dark" onClick={handleLogout}>
          Log Out
        </button>
      </Row>
      <Row>
        {error && <Alert variant="danger">{error}</Alert>}
        <section ref={ideasContainer} className="app__content">
          {renderIdeas()}
        </section>
      </Row>
      <Row>
        <form onSubmit={onIdeaAdd}>
          <input
            type="text"
            className="app__footer__input"
            placeholder="Add a new idea"
            value={idea}
            onChange={e => setIdeaInput(e.target.value)}
          />
          <button type="submit" className="app__btn app__footer__submit-btn">
            +
          </button>
        </form>
      </Row>
      </Container>
  )
}
