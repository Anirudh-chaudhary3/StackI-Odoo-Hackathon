'use client';

import React, { useState, useRef, useCallback, useEffect } from 'react';
import {
  Editor, EditorState, RichUtils, AtomicBlockUtils,
  convertToRaw, convertFromRaw, Modifier
} from 'draft-js';
import 'draft-js/dist/Draft.css';

interface RichTextEditorProps {
  initialValue?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  className?: string;
}

const RichTextEditor: React.FC<RichTextEditorProps> = ({
  initialValue = '',
  onChange,
  placeholder = 'Start typing...',
  className = ''
}) => {
  const [editorState, setEditorState] = useState<EditorState | null>(null);
  const [isClient, setIsClient] = useState(false);
  const [isLinkModalOpen, setIsLinkModalOpen] = useState(false);
  const [linkUrl, setLinkUrl] = useState('');
  const editorRef = useRef<Editor>(null);
  const emojis = ['😀', '😂', '😍', '🤔', '👍', '👎', '❤️', '🔥', '💯', '🎉', '✨', '🌟'];

  useEffect(() => {
    setIsClient(true);
    try {
      const rawContent = initialValue ? JSON.parse(initialValue) : null;
      setEditorState(rawContent
        ? EditorState.createWithContent(convertFromRaw(rawContent))
        : EditorState.createEmpty());
    } catch {
      setEditorState(EditorState.createEmpty());
    }
  }, [initialValue]);

  const handleEditorChange = useCallback((newState: EditorState) => {
    setEditorState(newState);
    if (onChange) {
      const raw = convertToRaw(newState.getCurrentContent());
      onChange(JSON.stringify(raw));
    }
  }, [onChange]);

  const handleKeyCommand = useCallback((cmd: string, state: EditorState) => {
    const newState = RichUtils.handleKeyCommand(state, cmd);
    if (newState) {
      handleEditorChange(newState);
      return 'handled';
    }
    return 'not-handled';
  }, [handleEditorChange]);

  const handleFormat = (style: string) => editorState && handleEditorChange(RichUtils.toggleInlineStyle(editorState, style));
  const handleBlockType = (type: string) => editorState && handleEditorChange(RichUtils.toggleBlockType(editorState, type));
  const handleAlignment = (align: string) => {
    if (!editorState) return;
    const content = Modifier.mergeBlockData(editorState.getCurrentContent(), editorState.getSelection(), { textAlign: align } as any);
    handleEditorChange(EditorState.push(editorState, content, 'change-block-data'));
  };

  const handleEmoji = (emoji: string) => {
    if (!editorState) return;
    const content = Modifier.insertText(editorState.getCurrentContent(), editorState.getSelection(), emoji);
    handleEditorChange(EditorState.push(editorState, content, 'insert-characters'));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!editorState) return;
    const file = e.target.files?.[0];
    if (file?.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        const content = editorState.getCurrentContent().createEntity('IMAGE', 'IMMUTABLE', {
          src: ev.target?.result as string,
          alt: file.name
        });
        const key = content.getLastCreatedEntityKey();
        handleEditorChange(AtomicBlockUtils.insertAtomicBlock(editorState, key, ' '));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleLink = () => {
    if (editorState?.getSelection().isCollapsed()) return;
    setIsLinkModalOpen(true);
  };

  const insertLink = () => {
    if (!editorState || !linkUrl) return;
    const content = editorState.getCurrentContent().createEntity('LINK', 'MUTABLE', { url: linkUrl });
    const key = content.getLastCreatedEntityKey();
    const newContent = Modifier.applyEntity(content, editorState.getSelection(), key);
    handleEditorChange(EditorState.push(editorState, newContent, 'apply-entity'));
    setLinkUrl('');
    setIsLinkModalOpen(false);
  };

  const blockStyleFn = (block: any) => block.getType() === 'atomic' ? 'atomic-block' : '';
  const blockRendererFn = (block: any) => block.getType() === 'atomic' ? {
    component: MediaBlock, editable: false
  } : null;

  const MediaBlock = (props: any) => {
    const { src, alt } = props.contentState.getEntity(props.block.getEntityAt(0)).getData();
    return <div className="my-4"><img src={src} alt={alt} className="max-w-full h-auto rounded" /></div>;
  };

  if (!isClient || !editorState) {
    return (
      <div className={`border border-gray-300 rounded-lg overflow-hidden ${className}`}>
        <div className="bg-gray-50 border-b p-2 text-sm text-gray-500">Loading editor...</div>
        <div className="p-4 min-h-[200px] bg-gray-50 flex items-center justify-center text-gray-400">Initializing rich text editor...</div>
      </div>
    );
  }

  return (
    <div className={`border border-gray-300 rounded-lg overflow-hidden ${className}`}>
      {/* Toolbar */}
      <div className="bg-gray-50 border-b p-2 flex flex-wrap gap-1">
        {/* Text Styles */}
        <div className="flex gap-1 border-r pr-2">
          {['BOLD', 'ITALIC', 'STRIKETHROUGH'].map(style => (
            <button key={style}
              onClick={() => handleFormat(style)}
              className={`p-2 text-black hover:bg-gray-200 rounded text-sm ${style === 'BOLD' ? 'font-bold' : style === 'ITALIC' ? 'italic' : 'line-through'} ${editorState.getCurrentInlineStyle().has(style) ? 'bg-blue-200' : ''}`}
              title={style}
            >{style[0]}</button>
          ))}
        </div>

        {/* Lists */}
        <div className="flex gap-1 border-r pr-2">
          {[
            { type: 'unordered-list-item', label: '•' },
            { type: 'ordered-list-item', label: '1.' }
          ].map(({ type, label }) => (
            <button key={type}
              onClick={() => handleBlockType(type)}
              className={`p-2 text-black hover:bg-gray-200 rounded text-sm ${RichUtils.getCurrentBlockType(editorState) === type ? 'bg-blue-200' : ''}`}
              title={type}
            >{label}</button>
          ))}
        </div>

        {/* Alignment */}
        <div className="flex gap-1 border-r pr-2">
          {['left', 'center', 'right'].map(align => (
            <button key={align} onClick={() => handleAlignment(align)} className="p-2 hover:bg-gray-200 rounded text-sm" title={`Align ${align}`}>{align === 'left' ? '⬅️' : align === 'center' ? '↔️' : '➡️'}</button>
          ))}
        </div>

        {/* Emoji Picker */}
        <div className="relative group border-r pr-2">
          <button className="p-2 hover:bg-gray-200 rounded text-sm">😀</button>
          <div className="absolute top-full left-0 bg-white border p-2 shadow-lg rounded hidden group-hover:block z-10">
            <div className="grid grid-cols-6 gap-1">
              {emojis.map((e, i) => <button key={i} onClick={() => handleEmoji(e)} className="p-1 hover:bg-gray-100 rounded">{e}</button>)}
            </div>
          </div>
        </div>

        {/* Link */}
        <div className="flex gap-1 border-r pr-2">
          <button onClick={handleLink} className="p-2 hover:bg-gray-200 rounded text-sm" title="Insert Link">🔗</button>
        </div>

        {/* Image Upload */}
        <div className="flex gap-1">
          <label className="p-2 hover:bg-gray-200 rounded text-sm cursor-pointer">📷
            <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
          </label>
        </div>
      </div>

      {/* Editor */}
      <div className="p-4 text-black min-h-[200px] focus-within:outline-none">
        <Editor
          ref={editorRef}
          editorState={editorState}
          onChange={handleEditorChange}
          handleKeyCommand={handleKeyCommand}
          blockStyleFn={blockStyleFn}
          blockRendererFn={blockRendererFn}
          placeholder={placeholder}
        />
      </div>

      {/* Link Modal */}
      {isLinkModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold mb-4">Insert Link</h3>
            <input
              type="url"
              value={linkUrl}
              onChange={(e) => setLinkUrl(e.target.value)}
              className="w-full p-2 border rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="https://example.com"
            />
            <div className="flex justify-end gap-2">
              <button onClick={() => { setIsLinkModalOpen(false); setLinkUrl(''); }} className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded">Cancel</button>
              <button onClick={insertLink} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Insert</button>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        .DraftEditor-root { font-family: inherit; }
        .public-DraftEditorPlaceholder-root { color: #9ca3af; position: absolute; pointer-events: none; }
        .atomic-block { margin: 1rem 0; }
        [data-text-align="left"] { text-align: left; }
        [data-text-align="center"] { text-align: center; }
        [data-text-align="right"] { text-align: right; }
      `}</style>
    </div>
  );
};

export default RichTextEditor;
