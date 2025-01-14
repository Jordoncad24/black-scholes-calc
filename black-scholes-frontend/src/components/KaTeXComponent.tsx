import React from 'react';
import katex from 'katex';
import 'katex/dist/katex.min.css';

interface KatexComponentProps {
  formula: string;
  displayMode?: boolean;
}

const KatexComponent: React.FC<KatexComponentProps> = ({ formula, displayMode }) => {
  const html = katex.renderToString(formula, {
    displayMode: displayMode || false,
  });

  return (
    <span
      dangerouslySetInnerHTML={{ __html: html }}
      style={{ display: 'inline-block' }}
    />
  );
};

export default KatexComponent;
