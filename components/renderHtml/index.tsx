'use client';

import parse from 'html-react-parser';
import { useState } from 'react';
import styled from 'styled-components';
import { isEmpty } from '@/helpers/common';
import SVGIcon from '@/assets/icons/SVGIcon';
import { colors } from '@/styles/colors';

export const DotIcon = styled.div`
  border: 1px solid ${colors.border};
  width: 36px;
  height: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 11px;
  margin-top: 10px;
  margin-bottom: 10px;
  cursor: pointer;
  box-shadow: 0px 1px 2px 0px ${colors.box_shadow_2};
`;

const RenderHtml = ({ htmlstring }: { htmlstring: string }) => {
  const [htmlAboveHr, htmlBelowHr] = htmlstring.split(/<hr[^>]*>/i) || [];
  const [showQuotedText, setShowQuotedText] = useState(false);

  return (
    <div>
      <div>{parse(`<div>${htmlAboveHr}</div>`, {})}</div>

      {!isEmpty(htmlBelowHr) && (
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