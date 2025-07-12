import { convertFromRaw, EditorState } from 'draft-js';

/**
 * Converts Draft.js raw content to plain text
 * @param rawContent - JSON string of Draft.js raw content
 * @returns Plain text string
 */
export function convertDraftToPlainText(rawContent: string): string {
  try {
    const parsed = JSON.parse(rawContent);
    const contentState = convertFromRaw(parsed);
    const editorState = EditorState.createWithContent(contentState);
    return editorState.getCurrentContent().getPlainText();
  } catch (error) {
    // If parsing fails, return the original string
    console.warn('Failed to parse Draft.js content:', error);
    return rawContent;
  }
}

/**
 * Converts Draft.js raw content to HTML (basic formatting)
 * @param rawContent - JSON string of Draft.js raw content
 * @returns HTML string
 */
export function convertDraftToHTML(rawContent: string): string {
  try {
    const parsed = JSON.parse(rawContent);
    const contentState = convertFromRaw(parsed);
    const blocks = contentState.getBlockMap().toArray();
    
    return blocks.map(block => {
      if (!block) return '';
      
      const text = block.getText();
      const type = block.getType();
      const inlineStyles = block.getCharacterList().map(char => char.getStyle().toArray()).toArray();
      
      let html = text;
      
      // Apply inline styles
      if (inlineStyles.length > 0) {
        // This is a simplified version - in a real implementation you'd want to handle
        // overlapping styles more carefully
        if (inlineStyles.some(styles => styles.includes('BOLD'))) {
          html = `<strong>${html}</strong>`;
        }
        if (inlineStyles.some(styles => styles.includes('ITALIC'))) {
          html = `<em>${html}</em>`;
        }
        if (inlineStyles.some(styles => styles.includes('STRIKETHROUGH'))) {
          html = `<del>${html}</del>`;
        }
      }
      
      // Apply block styles
      switch (type) {
        case 'header-one':
          return `<h1>${html}</h1>`;
        case 'header-two':
          return `<h2>${html}</h2>`;
        case 'header-three':
          return `<h3>${html}</h3>`;
        case 'unordered-list-item':
          return `<li>${html}</li>`;
        case 'ordered-list-item':
          return `<li>${html}</li>`;
        case 'blockquote':
          return `<blockquote>${html}</blockquote>`;
        default:
          return `<p>${html}</p>`;
      }
    }).join('');
  } catch (error) {
    console.warn('Failed to parse Draft.js content:', error);
    return rawContent;
  }
} 