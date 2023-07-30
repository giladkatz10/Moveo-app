import React from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { dracula } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import '../App.css';

const HighlightBlock = ({ code }) => {
  return (
    <div className='code-block-container'>
        <SyntaxHighlighter language="javascript" style={dracula}>
        {code}
        </SyntaxHighlighter>
    </div>
  );
};

export default HighlightBlock;