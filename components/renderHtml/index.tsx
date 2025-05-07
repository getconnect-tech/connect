'use client';
import parse, { domToReact } from 'html-react-parser';
import { useState } from 'react';
import styled from 'styled-components';
import { isEmpty } from '@/helpers/common';
import SVGIcon from '@/assets/icons/SVGIcon';

export const DotIcon = styled.div`
  border: var(--border-main);
  width: 36px;
  height: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 11px;
  margin-top: 10px;
  cursor: pointer;
  box-shadow: 0px 1px 2px 0px var(--box-shadow-2);
`;

interface RenderHtmlProps {
  htmlstring: string;
  isSpreadIcon?: boolean;
}

const RenderHtml = ({ htmlstring, isSpreadIcon = true }: RenderHtmlProps) => {
  const cleanHtmlString = (html: string) => {
    return html
      .replace(/<br\\>/g, '<br />') // Replace <br\> with <br />
      .replace(/<br>/g, '<br />'); // Standardize all br tags
  };

  const [htmlAboveHr, htmlBelowHr] =
    cleanHtmlString(htmlstring || '')
      ?.replace(/https?:\/\/[^\s"]*pstmrk\.it[^\s"]*/g, '')
      ?.split(/<hr[^>]*>/i) || [];
  const [showQuotedText, setShowQuotedText] = useState(false);

  return (
    <div>
      <div>
        {parse(`<div>${htmlAboveHr || ''}</div>`, {
          replace: (domNode: any) => {
            if (domNode.type === 'tag' && domNode.name === 'table') {
              return (
                <div className='tableWrapper'>{domToReact([domNode])}</div>
              );
            }
            return domNode;
          },
        })}
      </div>

      {!isEmpty(htmlBelowHr) && isSpreadIcon && (
        <DotIcon onClick={() => setShowQuotedText(!showQuotedText)}>
          <SVGIcon
            name='message-three-dot-icon'
            width='24'
            height='18'
            viewBox='0 0 24 18'
          />
        </DotIcon>
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
