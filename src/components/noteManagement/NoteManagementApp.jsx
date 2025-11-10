import { useState } from 'react'
import './NoteManagementApp.css'
import TextEditor from './textEditorFolder/TextEditor'
import TextDisplay from './textDisplayFolder/TextDisplay'
import KeyBoard from './keyBoardFolder/KeyBoard'

function NoteManagementApp({ currentUser, setCurrentUser }) {
  const [textBlocks, setTextBlocks] = useState([]);
  const [currentKeyboard, setCurrentKeyboard] = useState("hebrew");
  const [history, setHistory] = useState([]);
  const [openFiles, setOpenFiles] = useState([]);
  const [currentFile, setCurrentFile] = useState("");


  const [textDesign, setTextDesign] = useState({
    fontFamily: "Times New Roman",
    color: "#000000",
    fontSize: "20px"
  });



  const saveToHistory = () => {
    setHistory(prev => [...prev, JSON.parse(JSON.stringify(textBlocks))]);
  };




  return (
    <>
      <TextDisplay
        setTextBlocks={setTextBlocks}
        textBlocks={textBlocks}
        setOpenFiles={setOpenFiles}
        openFiles={openFiles}
        currentUser={currentUser}
        setCurrentUser={setCurrentUser}
        setCurrentFile={setCurrentFile}
        currentFile={currentFile}
        textDesign={textDesign}
        setTextDesign={setTextDesign}

      />
      <TextEditor
        textBlocks={textBlocks}
        setTextBlocks={setTextBlocks}
        textDesign={textDesign}
        setTextDesign={setTextDesign}
        saveToHistory={saveToHistory}
        setHistory={setHistory}
        history={history}
        setOpenFiles={setOpenFiles}
        openFiles={openFiles}
        setCurrentFile={setCurrentFile}
        currentFile={currentFile}
        currentUser={currentUser}
        setCurrentUser={setCurrentUser}
      />
      <KeyBoard
        setTextBlocks={setTextBlocks}
        currentKeyboard={currentKeyboard}
        setCurrentKeyboard={setCurrentKeyboard}
        textDesign={textDesign}
        saveToHistory={saveToHistory}
        setHistory={setHistory}
        history={history}
        setCurrentFile={setCurrentFile}
        currentFile={currentFile}
        setOpenFiles={setOpenFiles}
        openFiles={openFiles}
      />
    </>
  )
}

export default NoteManagementApp
