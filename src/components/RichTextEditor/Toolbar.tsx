import { Button } from '@mui/material';
import { useSlate } from 'slate-react';
import { Editor } from 'slate';

// Helper function to toggle marks (like bold, italic, underline)
const toggleMark = (editor: Editor, format: string) => {
  const marks = Editor.marks(editor);
  if (marks) {
    const isActive = marks[format as keyof typeof marks] === true; // Type assertion for safe indexing
    if (isActive) {
      Editor.removeMark(editor, format);
    } else {
      Editor.addMark(editor, format, true);
    }
  }
};

export const Toolbar = () => {
  const editor = useSlate();

  return (
    <div style={{ borderBottom: '1px solid #ddd', padding: '10px' }}>
      <Button
        onMouseDown={(e) => {
          e.preventDefault(); // Prevent focus loss when clicking buttons
          toggleMark(editor, 'bold');
        }}
      >
        Bold
      </Button>
      <Button
        onMouseDown={(e) => {
          e.preventDefault(); // Prevent focus loss
          toggleMark(editor, 'italic');
        }}
      >
        Italic
      </Button>
      <Button
        onMouseDown={(e) => {
          e.preventDefault(); // Prevent focus loss
          toggleMark(editor, 'underline');
        }}
      >
        Underline
      </Button>
    </div>
  );
};
