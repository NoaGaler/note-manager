import './TextDisplay.css'
const TextDisplay = (props) => {

  // פונקציית עזר לניהול עדכון הפתקים במערך ה-notes של המשתמש
  const updateNotesInUser = (fileName, textBlocksToSave) => {
    props.setCurrentUser(prev => {
      const existingNotes = prev.notes || [];

      const newNoteData = { name: fileName, textBlocks: textBlocksToSave, style: { ...props.textDesign } };

      const isExisting = existingNotes.some(n => n.name === fileName);

      let updatedNotes;

      if (isExisting) {
        updatedNotes = existingNotes.map(n =>
          n.name === fileName ? newNoteData : n
        );
      } else {
        updatedNotes = [...existingNotes, newNoteData];
      }

      return { ...prev, notes: updatedNotes };
    });
  }

  





  const myUser = props.currentUser;
  const myOpenFiles = props.openFiles ? props.openFiles : [];

  return (
    <div className='fullDisplay'>

      {
        myUser && myOpenFiles.map((file, fIndex) => (
          <div
            key={fIndex}
            className={`file-tab ${props.currentFile === file.name ? 'active-tab' : ''}`}
          >

            <div className="tab-header">
              <button
                className="edit-button"
                onClick={() => {
                  props.setCurrentFile(file.name);
                  props.setTextBlocks(file.textBlocks);
                }}
              >
                ✏️
              </button>

              {/* כפתור סגירה (X) */}
              <button
                className="close-button"
                onClick={() => {
                  const confirmSave = window.confirm(`Save changes to ${file.name}?`);

                  if (confirmSave) {
                    const textToSave = props.currentFile === file.name ? props.textBlocks : file.textBlocks;
                    updateNotesInUser(file.name, textToSave);
                  }

                  props.setOpenFiles(prev => prev.filter(f => f.name !== file.name));

                  if (props.currentFile === file.name) {
                    props.setCurrentFile(null);
                    props.setTextBlocks([]);
                  }
                }}
              >
                ✖️
              </button>
            </div>

            <div className="note-display">
              {
                (props.currentFile === file.name ? props.textBlocks : file.textBlocks)
                  .filter(block => block != null)
                  .map((block, i) => (
                    <span key={i} style={block.style}>
                      {block.text}
                    </span>
                  ))
              }
            </div>
          </div>
        ))
      }
    </div>
  )
};

export default TextDisplay;





