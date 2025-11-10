import '../TextEditorFolder/TextEditor.css'
import { useState, useEffect } from 'react';

const TextEditor = (props) => {
    const [searchChar, setSearchChar] = useState(""); // תו לחיפוש
    const [filesList, setFilesList] = useState([]);

    // מעדכן את רשימת שמות הקבצים לתצוגה בסלקט
    useEffect(() => {
        const notes = props.currentUser?.notes || [];

        if (notes.length === 0) {
            setFilesList([]);
            return;
        }

        const keys = notes.map(note => note.name);
        setFilesList(keys);
    }, [props.currentUser]); 

    const deleteButtons = ["delete char", "delete word", "delete all"];
    
    // פונקציית עזר לניהול עדכון הפתקים במערך ה-notes של המשתמש
    const updateNotesInUser= (fileName, textBlocksToSave) => {
        props.setCurrentUser(prev => {
            const existingNotes = prev.notes || [];
            
            // יצירת פתק חדש או עדכון הקיים
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

    //כפתורי מחיקה
    const handleDelete = (type) => {
        let newBlocks = [...props.textBlocks];

        if (type === "delete char") {
            props.saveToHistory();
            newBlocks = newBlocks.slice(0, -1);
        } else if (type === "delete word") {
            props.saveToHistory(); 

            while (newBlocks.length && newBlocks[newBlocks.length - 1].text !== " ") {
                newBlocks.pop();
            }
            if (newBlocks.length && newBlocks[newBlocks.length - 1].text === " ") {
                 newBlocks.pop();
            }
        } else if (type === "delete all") {
            props.saveToHistory();
            newBlocks = [];
        }

        // סנכרון תמידי בין textBlocks ל-openFiles
        props.setTextBlocks(newBlocks);
        props.setOpenFiles(prev =>
            prev.map(f =>
                f.name === props.currentFile ? { ...f, textBlocks: newBlocks } : f
            )
        );
    };

    // חיפוש המופע של התו האחרון וסימון זמני
    const highlightLastChar = () => {
        if (!searchChar) return alert("הכנס תו לחיפוש קודם!");

        const blocksToSearch = [...props.textBlocks]; 
        const lastIndex = blocksToSearch
            .map(b => b.text)
            .lastIndexOf(searchChar);

        if (lastIndex === -1) {
            alert("התו לא נמצא!");
            return;
        }

        const newBlocks = [...blocksToSearch];
        const originalStyle = { ...newBlocks[lastIndex].style }; 

        // סימון
        newBlocks[lastIndex] = {
            ...newBlocks[lastIndex],
            style: { ...originalStyle, backgroundColor: "yellow" },
        };

        props.saveToHistory();
        props.setTextBlocks(newBlocks);
        
        props.setOpenFiles(prev =>
            prev.map(f =>
                f.name === props.currentFile ? { ...f, textBlocks: newBlocks } : f
            )
        );

        // ביטול הסימון
        setTimeout(() => {
            props.setTextBlocks(prev => {
                const reverted = [...prev];

                if (reverted[lastIndex]) {
                    reverted[lastIndex] = {
                        ...reverted[lastIndex],
                        style: originalStyle, 
                    };
                }
                return reverted;
            });
            // סנכרון openFiles לאחר ביטול הסימון
            props.setOpenFiles(prev =>
                prev.map(f =>
                    f.name === props.currentFile 
                        ? { ...f, textBlocks: props.textBlocks.map((b, i) => i === lastIndex ? { ...b, style: originalStyle } : b) } 
                        : f
                )
            );
        }, 1000);
    };


    // החלפת כל התווים בתו חדש
    const replaceAllChars = () => {
        if (!searchChar) return alert("הכנס תו לחיפוש קודם!");
        const replaceChar = prompt(`הכנס תו חדש במקום "${searchChar}"`);
        if (!replaceChar) return;

        props.saveToHistory();
        const newBlocks = props.textBlocks.map(block =>
            block.text === searchChar
                ? { ...block, text: replaceChar }
                : block
        );

        props.setTextBlocks(newBlocks);
        props.setOpenFiles(prev =>
            prev.map(f =>
                f.name === props.currentFile ? { ...f, textBlocks: newBlocks } : f
            )
        );
    }

    return (
        <>
            {/* סרגל כלים */}
            <div className="keyboard-toolbar">
                {/* פתיחת פתק חדש מסלקט */}
                <select className="select-file"
                    value={props.currentFile || ""} 
                    onChange={(e) => {
                        if (e.target.value === "open new file") {
                            const fileName = prompt("Enter file name:");
                            if (!fileName) return;

                            const notes = props.currentUser?.notes || [];
                            const existingNote = notes.find(n => n.name === fileName);

                            if (!existingNote) { 
                                
                                updateNotesInUser(fileName, []);
                                
                                props.setCurrentFile(fileName);

                                // הוספת הפתק החדש ל-openFiles
                                props.setOpenFiles(prev => [...prev, { name: fileName, textBlocks: [] }]);
                                props.setTextBlocks([]); 

                                alert(`File "${fileName}" created successfully! Don't forget to save.`);
                            } else {
                                alert("This name already exists");
                            }
                            return;
                        }


                        const fileName = e.target.value;
                        if (!fileName) return;
                        
                        const notes = props.currentUser?.notes || [];
                        const data = notes.find(n => n.name === fileName);
                        
                        const textBlocksToLoad = data?.textBlocks || []; 

                        props.setCurrentFile(fileName);
                        props.setTextBlocks(textBlocksToLoad); 
                        
                        if (!props.openFiles.some(f => f.name === fileName)) {
                            props.setOpenFiles(prev => [...prev, { name: fileName, textBlocks: textBlocksToLoad }]);
                        }

                    }}
                >
                    <option value="">-- Open file --</option>
                    <option value="open new file">open new file</option>
                    {filesList.map((file, i) => (
                        <option key={i} value={file}>{file}</option>
                    ))}
                </select>


                {/* כפתור שמירה בשם */}
                <button className="save-as-button" onClick={() => {
                    const fileName = prompt("Enter new file name:");
                    if (!fileName) return;
                    
                    const notes = props.currentUser?.notes || [];
                    const existingNote = notes.find(n => n.name === fileName);

                    if (!existingNote) {
                        updateNotesInUser(fileName, props.textBlocks);
                        
                        props.setCurrentFile(fileName);

                        if (!props.openFiles.some(f => f.name === fileName)) {
                            props.setOpenFiles(prev => [...prev, { name: fileName, textBlocks: props.textBlocks }]);
                        }

                        alert(`File "${fileName}" saved successfully!`);
                    } else {
                        alert("This name is already exist");
                    }
                }}>save as...</button>

                {/* כפתור שמירה */}
                <button className="save-button" onClick={() => {
                    if (!props.currentFile) {
                        alert("No file is currently open. Use 'Save As' first.");
                        return;
                    }
                    
                    // עדכון המשתמש עם הטקסט הנוכחי
                    updateNotesInUser(props.currentFile, props.textBlocks);

                    alert(`File "${props.currentFile}" saved successfully!`);
                }}>save</button>


                {/* בחירת פונט */}
                <select onChange={(e) =>
                    props.setTextDesign({ ...props.textDesign, fontFamily: e.target.value })
                }>
                    <option value="Times New Roman">Times New Roman</option>
                    <option value="Arial">Arial</option>
                    <option value="Courier New">Courier New</option>
                </select>

                {/* שינוי גודל הכתב */}
                <input
                    type="range"
                    min="10"
                    max="60"
                    value={parseInt(props.textDesign?.fontSize || "16px")}
                    onChange={(e) =>
                        props.setTextDesign({ ...props.textDesign, fontSize: `${e.target.value}px` })
                    }
                />

                {/* שינוי צבע הכתב */}
                <input
                    type="color"
                    value={props.textDesign.color || "#000000"} 
                    onChange={(e) =>
                        props.setTextDesign({ ...props.textDesign, color: e.target.value })
                    }
                />

                {/* כפתור עיצוב על כל הטקסט */}
                <button
                    onClick={() => {
                        props.saveToHistory();
                        const newBlocks = props.textBlocks.map(block => ({
                            ...block,
                            style: { ...props.textDesign }
                        }));
                        props.setTextBlocks(newBlocks);
                        props.setOpenFiles(prev =>
                            prev.map(f =>
                                f.name === props.currentFile ? { ...f, textBlocks: newBlocks } : f
                            )
                        );
                    }}
                >
                    Style all text
                </button>

                {/* כפתור עיצוב מכאן והלאה */}
                <button
                    onClick={() => {
                        props.saveToHistory();

                        const index = props.textBlocks.length; 
                        const newBlocks = props.textBlocks.map((block, i) =>
                            i >= index ? { ...block, style: { ...props.textDesign } } : block
                        );
                        props.setTextBlocks(newBlocks);
                        props.setOpenFiles(prev =>
                            prev.map(f =>
                                f.name === props.currentFile ? { ...f, textBlocks: newBlocks } : f
                            )
                        );
                    }}
                >
                    Style from here
                </button>

                {/* פעולות על תווים*/}
                <input
                    type="text"
                    maxLength="1"
                    placeholder="Enter char"
                    value={searchChar}
                    onChange={(e) => setSearchChar(e.target.value)}
                />

                <button onClick={highlightLastChar}>Find last</button>
                <button onClick={replaceAllChars}>Replace all</button>





                {/* כפתור ביטול-undo */}
            <button onClick={() => {
                if (props.history.length === 0) return;
                const prevState = props.history[props.history.length - 1];
                props.setHistory(props.history.slice(0, -1));
                props.setTextBlocks(prevState);
                props.setOpenFiles(prev =>
                    prev.map(f =>
                        f.name === props.currentFile ? { ...f, textBlocks: prevState } : f
                    )
                );
            }}>
                Undo
            </button>

             {/* כפתור רווח */}
                <button className="space-button" onClick={() => {
                    props.saveToHistory();
                    const newBlocks = [...props.textBlocks, { text: " ", style: { ...props.textDesign } }];
                    props.setTextBlocks(newBlocks);
                    props.setOpenFiles(prev =>
                        prev.map(f =>
                            f.name === props.currentFile ? { ...f, textBlocks: newBlocks } : f
                        )
                    );
                }}>Space</button>

            {/* הצגת כפתורי מחיקה */}
            <div className="delete-text">
                {deleteButtons.map((btn, index) => (
                    <button key={index} onClick={() => handleDelete(btn)}>
                        {btn}
                    </button>
                ))}
            </div>

            </div>

            
        </>
    )
}

export default TextEditor;
