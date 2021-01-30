import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import ReactMde from 'react-mde';
import css from './style.css';

function PlaintextEditor({ file, write }) {

  const [plainText,setPlaintext] = useState('');
  const [selectedTab, setSelectedTab] = useState('write');


  useEffect(() =>
  {
    (async () => 
    {
      setPlaintext(await file.text());
    })();
  },[file]);
  const change = (newText) => 
  {
    console.log("New Text: " + newText);
    const newFile = new File(
      [newText],
      file.name,
      {
        type:"text/plain",
        lastModified: new Date()
      }
    );
    setPlaintext(newText);
    write(newFile);
  }

  const reader = new FileReader();
  reader.onload = function(e)
  {
    const content = e.target.result;

    setPlaintext(content);
  };
  reader.readAsText(file);
  console.log("Plaintext: " + plainText);
  return (
    <div className={css.editor}>
      <div className="container">
      <ReactMde
        value={plainText}
        onChange={change}
        selectedTab={selectedTab}
        toolbarCommands={new Array()}
        onTabChange={setSelectedTab}
        childProps={{textArea: {style: {width: 600, height:200}}}}
        minEditorHeight={200}
        generateMarkdownPreview={() => {return;}}
      />
    </div>
    </div>
  );
}

PlaintextEditor.propTypes = {
  file: PropTypes.object,
  write: PropTypes.func
};

export default PlaintextEditor;
