import '../keyBoardFolder/KeyBoard.css'

const KeyBoard = (props) => {

  const keyboards = {
    english: [
      ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
      ["a", "s", "d", "f", "g", "h", "j", "k", "l"],
      ["z", "x", "c", "v", "b", "n", "m"]],
    numbers: [
      ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"],
      ["-", "/", ":", ";", "(", ")", "$", "&", "@"],
      [".", "?", "!", "%"]],
    emoji: [
      ["😀", "😁", "😂", "🤣", "😊"],
      ["😍", "😘", "😅", "😉", "😭"],
      ["👍", "🙏", "🔥", "✨", "🎉"]],
    hebrew: [
      ["ק", "ר", "א", "ט", "ו", "ן", "ם", "פ"],
      ["ש", "ד", "ג", "כ", "ע", "י", "ח", "ל", "ך", "ף"],
      ["ז", "ס", "ב", "ה", "נ", "מ", "צ", "ת"]]
  };

  const addChar = (char) => {
    props.saveToHistory();

    props.setOpenFiles(prev => {
      return prev.map(f => {
        if (f.name === props.currentFile) {
          const updatedBlocks = [...f.textBlocks, { text: char, style: { ...props.textDesign } }];
          // עדכון גם ל-textBlocks הראשי
          props.setTextBlocks(updatedBlocks);
          return { ...f, textBlocks: updatedBlocks };
        }
        return f;
      });
    });
  };


  return (
    <>
      <div className="keyboard-switch">
        {Object.keys(keyboards).map((key) => (
          <button key={key} onClick={() => props.setCurrentKeyboard(key)}>
            {key}
          </button>
        ))}
      </div>

      <div className="keyboard">
        {keyboards[props.currentKeyboard].map((row, rowIndex) => (
          <div key={rowIndex} className="keyboard-row">
            {row.map((key) => (
              <button key={key} onClick={() => addChar(key)}>
                {key}
              </button>
            ))}
          </div>
        ))}
      </div>
    </>
  )
}

export default KeyBoard;
