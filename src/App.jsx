import react, { useState } from 'react'
import './App.css';
import ContactApp from './components/contact/ContactApp.jsx';
import NoteManagementApp from './components/noteManagement/NoteManagementApp.jsx'



function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  return (
    <>
      <ContactApp isConnected={isConnected} setIsConnected={setIsConnected} currentUser= {currentUser} setCurrentUser = {setCurrentUser}/>
      {isConnected && <NoteManagementApp currentUser= {currentUser} setCurrentUser = {setCurrentUser}/>}
    </>
  );
}

export default App;

