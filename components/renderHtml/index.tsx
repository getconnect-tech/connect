'use client';

import parse from 'html-react-parser';
import { useState } from 'react';
import { isEmpty } from '@/helpers/common';

const RenderHtml = ({ htmlstring }: { htmlstring: string }) => {
  const [htmlAboveHr, htmlBelowHr] = htmlstring.split(/<hr[^>]*>/i) || [];
  const [showQuotedText, setShowQuotedText] = useState(false);

  return (
    <div>
      <div>{parse(`<div>${htmlAboveHr}</div>`, {})}</div>

      {!isEmpty(htmlBelowHr) && (
        <div onClick={() => setShowQuotedText(!showQuotedText)}>
          three dots...
        </div>
      )}

      {htmlBelowHr && showQuotedText && (
        <>
          <hr />
          {htmlBelowHr && <div>{parse(`<div>${htmlBelowHr}</div>`, {})}</div>}
        </>
      )}
    </div>
  );
};
export default RenderHtml;
