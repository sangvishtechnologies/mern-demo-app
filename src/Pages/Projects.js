import React, { useState } from 'react';
import { Box, Button, Typography, Paper, styled } from '@mui/material';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dracula } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import the CSS for Toastify

// Function to convert text to JSON
const convertTextToJson = (text) => {
  const lines = text.split('\n').filter(line => line.trim());
  const json = {};
  lines.forEach((line, index) => {
    json[`question${index + 1}`] = line;
  });
  return json;
};

// Styled components
const Container = styled(Paper)({
  padding: '20px',
  maxWidth: '60%',
  width: '80%',
  height: '650px', // Allow container to grow with content
  margin: '20px auto',
  borderRadius: '8px',
  boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
  display: 'flex',
  flexDirection: 'column',
  gap: '20px', // Add gap between elements
});

const JsonOutput = styled(Box)({
  backgroundColor: '#000', // Black background
  color: '#f8f8f2', // Light text color for contrast
  padding: '10px',
  borderRadius: '4px',
  border: '1px solid #ddd',
  maxHeight: '250px', // Set a max height for scrolling
  overflowY: 'auto', // Enable vertical scrolling
  whiteSpace: 'pre-wrap',
  wordBreak: 'break-word',
});

const CopyButton = styled(Button)({
  backgroundColor: '#4caf50',
  color: '#fff',
  '&:hover': {
    backgroundColor: '#45a049',
  },
});

const TaskConverter = () => {
  const [inputText, setInputText] = useState('');
  const [jsonOutput, setJsonOutput] = useState(null);

  const handleConvert = () => {
    const json = convertTextToJson(inputText);
    setJsonOutput(json);
  };

  const handleCopy = () => {
    if (jsonOutput) {
      navigator.clipboard.writeText(JSON.stringify(jsonOutput, null, 2));
      toast.success('JSON copied to clipboard!'); // Show success message
    }
  };

  return (
    <Container>
      <Typography variant="h5" component="h2" gutterBottom>
        Text to JSON Converter
      </Typography>
      <textarea
        rows="10"
        style={{ width: '100%', marginBottom: '20px', padding: '10px' }}
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        placeholder="Enter your text, each line will be converted to a JSON key-value pair."
      />
      <Button variant="contained" color="primary" onClick={handleConvert}>
        Convert to JSON
      </Button>
      {jsonOutput && (
        <>
          <JsonOutput>
            <SyntaxHighlighter language="json" style={dracula}>
              {JSON.stringify(jsonOutput, null, 2)}
            </SyntaxHighlighter>
          </JsonOutput>
          <CopyButton variant="contained" onClick={handleCopy}>
            Copy JSON
          </CopyButton>
        </>
      )}
      <ToastContainer /> {/* Add ToastContainer to render Toast messages */}
    </Container>
  );
};

export default TaskConverter;
