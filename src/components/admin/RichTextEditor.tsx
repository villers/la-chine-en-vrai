'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';

// Import dynamique pour éviter les erreurs SSR
const MDEditor = dynamic(
  () => import('@uiw/react-md-editor'),
  { ssr: false }
);

interface RichTextEditorProps {
  content: string;
  onChange: (content: string) => void;
  placeholder?: string;
}

export default function RichTextEditor({ content, onChange, placeholder = "Commencez à écrire..." }: RichTextEditorProps) {
  const [value, setValue] = useState(content);

  // Synchroniser avec le prop content
  useEffect(() => {
    if (content !== value) {
      setValue(content);
    }
  }, [content]);

  const handleChange = (val?: string) => {
    const newValue = val || '';
    setValue(newValue);
    onChange(newValue);
  };

  return (
    <div className="markdown-editor">
      <MDEditor
        value={value}
        onChange={handleChange}
        preview="edit"
        hideToolbar={false}
        visibleDragbar={false}
        textareaProps={{
          placeholder,
          style: {
            fontSize: 14,
            lineHeight: 1.5,
            fontFamily: 'ui-monospace, SFMono-Regular, "SF Mono", Monaco, Consolas, "Liberation Mono", "Courier New", monospace'
          }
        }}
        height={400}
        data-color-mode="light"
      />
      
      <style jsx global>{`
        .w-md-editor {
          background-color: white;
        }
        
        .w-md-editor-text-container .w-md-editor-text {
          font-size: 14px !important;
          font-family: ui-monospace, SFMono-Regular, "SF Mono", Monaco, Consolas, "Liberation Mono", "Courier New", monospace !important;
        }
        
        .w-md-editor .w-md-editor-text-container .w-md-editor-text-input, 
        .w-md-editor .w-md-editor-text-container .w-md-editor-text {
          font-size: 14px !important;
          line-height: 1.5 !important;
          color: #374151;
        }
        
        .w-md-editor-focus {
          border-color: #ef4444 !important;
          box-shadow: 0 0 0 2px rgb(239 68 68 / 0.2) !important;
        }
        
        .w-md-editor.w-md-editor-focus {
          border-color: #ef4444;
          box-shadow: 0 0 0 2px rgb(239 68 68 / 0.2);
        }
        
        .w-md-editor-text-container ul {
          list-style: disc outside;
          margin-left: 1.5rem;
          margin-bottom: 1rem;
        }
        
        .w-md-editor-text-container ol {
          list-style: decimal outside;
          margin-left: 1.5rem;
          margin-bottom: 1rem;
        }
        
        .w-md-editor-text-container li {
          margin-bottom: 0.5rem;
        }
      `}</style>
    </div>
  );
}