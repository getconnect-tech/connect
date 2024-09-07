'use client';

import parse from 'html-react-parser';

const RenderHtml = ({ htmlstring }: { htmlstring: string }) => {
  return <>{parse(`<div>${htmlstring}</div>`, {})}</>;
};
export default RenderHtml;
