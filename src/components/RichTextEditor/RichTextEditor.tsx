import { useState, useEffect, useCallback } from 'react';
import { Slate, Editable, withReact } from 'slate-react';
import { createEditor, Descendant, Editor, Transforms, Text } from 'slate';
import { withHistory } from 'slate-history';
import Button from '@mui/material/Button';
import { Box, Select, MenuItem } from '@mui/material';

// Initial value for the editor
const initialValue: Descendant[] = [
  {
    type: 'paragraph',
    children: [{ text: '' }],
  },
];

// Load initial content for the editor
const loadInitialContent = (): Descendant[] => {
  try {
    const saved = localStorage.getItem('editorContent');
    return saved ? JSON.parse(saved) : initialValue;
  } catch (error) {
    console.error('Failed to load editor content:', error);
    return initialValue;
  }
};

// Define a type for the marks object in the editor
type Marks = Record<string, boolean>;

const toggleMark = (editor: Editor, format: string) => {
  const isActive = isMarkActive(editor, format);
  if (isActive) {
    Editor.removeMark(editor, format);
  } else {
    Editor.addMark(editor, format, true);
  }
};

const isMarkActive = (editor: Editor, format: string) => {
  const marks = Editor.marks(editor) as Marks | null;
  return marks ? marks[format] === true : false;
};

// Font size options
const FONT_SIZES: Record<string, string> = {
  small: '12px',
  medium: '16px',
  large: '20px',
};

const RichTextEditor = () => {
  const [editor] = useState(() => withHistory(withReact(createEditor())));
  const [value, setValue] = useState<Descendant[]>(loadInitialContent);
  const [isLoading, setIsLoading] = useState(true);
  const [fontSizeValue, setFontSizeValue] = useState('medium');

  useEffect(() => {
    setIsLoading(false);
  }, []);

  const handleChange = useCallback((newValue: Descendant[]) => {
    setValue(newValue);
  }, []);

  // Save content to local storage
  const handleSubmit = () => {
    try {
      localStorage.setItem('editorContent', JSON.stringify(value));
      alert('Content saved successfully!');
    } catch (error) {
      console.error('Failed to save editor content:', error);
    }
  };

  // Reset editor and clear local storage
  const handleReset = () => {
    setValue(initialValue); // Reset content
    localStorage.removeItem('editorContent'); // Clear saved data
    Transforms.select(editor, { anchor: { path: [0, 0], offset: 0 }, focus: { path: [0, 0], offset: 0 } }); // Move cursor to start
    setFontSizeValue('medium'); // Reset font size
  };

  // Apply font size to selected text
  const applyFontSize = (size: string) => {
    Editor.addMark(editor, 'fontSize', FONT_SIZES[size]);
    setFontSizeValue(size);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Slate editor={editor} initialValue={value} onChange={handleChange}>
      <Box sx={{ padding: 2, border: '1px solid #ddd', maxWidth: 600, margin: 'auto' }}>
        <Toolbar editor={editor} fontSizeValue={fontSizeValue} applyFontSize={applyFontSize} />
        <Editable
          style={{
            padding: '20px',
            border: '1px solid #ddd',
            minHeight: '200px',
            fontSize: FONT_SIZES[fontSizeValue],
          }}
          renderLeaf={({ attributes, children, leaf }) => (
            <span
              {...attributes}
              style={{
                fontWeight: leaf.bold ? 'bold' : 'normal',
                fontStyle: leaf.italic ? 'italic' : 'normal',
                textDecoration: leaf.underline ? 'underline' : 'none',
                fontSize: leaf.fontSize || FONT_SIZES.medium, // Apply font size
              }}
            >
              {children}
            </span>
          )}
        />
        <Box sx={{ marginTop: 2, display: 'flex', gap: 2 }}>
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            Submit
          </Button>
          <Button variant="outlined" color="secondary" onClick={handleReset}>
            Try Again
          </Button>
        </Box>
      </Box>
    </Slate>
  );
};

export default RichTextEditor;

// Toolbar component with buttons to toggle marks and font size selector
interface ToolbarProps {
  editor: Editor;
  fontSizeValue: string;
  applyFontSize: (size: string) => void;
}

const Toolbar = ({ editor, fontSizeValue, applyFontSize }: ToolbarProps) => {
  return (
    <Box sx={{ borderBottom: '1px solid #ddd', padding: '10px', display: 'flex', gap: 2 }}>
      <Button
        onMouseDown={(event) => {
          event.preventDefault();
          toggleMark(editor, 'bold');
        }}
      >
        Bold
      </Button>
      <Button
        onMouseDown={(event) => {
          event.preventDefault();
          toggleMark(editor, 'italic');
        }}
      >
        Italic
      </Button>
      <Button
        onMouseDown={(event) => {
          event.preventDefault();
          toggleMark(editor, 'underline');
        }}
      >
        Underline
      </Button>
      <Select
        value={fontSizeValue}
        onChange={(event) => applyFontSize(event.target.value)}
        size="small"
        sx={{ marginLeft: 'auto' }}
      >
        <MenuItem value="small">Small</MenuItem>
        <MenuItem value="medium">Medium</MenuItem>
        <MenuItem value="large">Large</MenuItem>
      </Select>
    </Box>
  );
};
