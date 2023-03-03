import './App.css';
import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import { getUser } from '../../utilities/users-service'
import AuthPage from '../AuthPage/AuthPage';
import NavBar from '../../components/NavBar/NavBar'

export default function App() {
  const [ user, setUser ] = useState(getUser())
  const [ notes, setNotes ] = useState([])
  const [ newNote, setNewNote ] = useState('')

  const handleAddNote = () => {
    setNotes([...notes, {text: newNote, createdAt: new Date()}])
    setNewNote('')
  }

  return (
    <main className="App">
      {
        user ?
        <>
          <NavBar user={user} setUser={setUser} />
          <div>
            <input type="text" value={newNote} onChange={(e) => setNewNote(e.target.value)} />
            <button onClick={handleAddNote}>Add Note</button>
          </div>
          {notes.length === 0 && <p>No Notes Yet!</p>}
          {notes.map((note, idx) => (
            <div key={idx}>
              <p>{note.text}</p>
              <p>{note.createdAt.toLocaleString()}</p>
            </div>
          ))}
        </>
        :
        <AuthPage setUser={setUser} />
      }
    </main>
  );
}
