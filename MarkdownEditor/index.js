import React, {useState} from 'react';
import PropTypes from 'prop-types';
import ReactMde from 'react-mde';
import ReactMarkdown from 'react-markdown';

import css from './style.css';


function MarkdownEditor({ file, write }) {
  console.log(file, write);
  const [text,setText] = useState("");
  const [selectedTab, setSelectedTab] = useState('write');

  const change = (newText) => 
  {
    const newFile = new File(
      [newText],
      file.name,
      {
        type:"text/markdown",
        lastModified: new Date()
      }
    );
    setText(newText);
    write(newFile);
  }

  const reader = new FileReader();
  reader.onload = function(e)
  {
    const content = e.target.result;

    console.log("MarkdownEditor File Content: " + content);
    setText(content);
  };
  reader.readAsText(file);
  return (
    <div className={css.editor}>
      <link rel="stylesheet" href="https://nebulon.s3.amazonaws.com/react-mde/react-mde-all.css" />
      <div className="container">
      <ReactMde
        value={text}
        onChange={change}
        selectedTab={selectedTab}
        onTabChange={setSelectedTab}
        generateMarkdownPreview={(markdown) =>
          Promise.resolve(<div><hr/><ReactMarkdown source={markdown} /></div>)
        }
        
      />
    </div>

    </div>
  );
}

MarkdownEditor.propTypes = {
  file: PropTypes.object,
  write: PropTypes.func
};

export default MarkdownEditor;
