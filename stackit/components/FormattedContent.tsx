'use client';

import React from 'react';
import { convertDraftToPlainText, convertDraftToHTML } from '@/utils/draft-utils';

interface FormattedContentProps {
  content: string;
  mode?: 'plain' | 'html';
  className?: string;
}

const FormattedContent: React.FC<FormattedContentProps> = ({
  content,
  mode = 'plain',
  className = ''
}) => {
  if (!content) {
    return null;
  }

  // Check if content is Draft.js raw content (JSON string)
  const isDraftContent = content.trim().startsWith('{') && content.trim().endsWith('}');
  
  if (!isDraftContent) {
    // If it's not Draft.js content, display as plain text
    return (
      <div className={className}>
        {content}
      </div>
    );
  }

  if (mode === 'html') {
    const htmlContent = convertDraftToHTML(content);
    return (
      <div 
        className={`${className} formatted-content`}
        dangerouslySetInnerHTML={{ __html: htmlContent }}
      />
    );
  }

  // Default to plain text mode
  const plainText = convertDraftToPlainText(content);
  return (
    <div className={className}>
      {plainText}
    </div>
  );
};

export default FormattedContent; 