import React from 'react';
import Icon from '../icon/icon';
import {
  Content,
  FileCardDiv,
  FileDetail,
  FileName,
  FileSize,
  TextPreviewDiv,
} from './style';
import SVGIcon from '@/assets/icons/SVGIcon';
interface Props {
  documentText: string;
  fileSize: string;
  fileName: string;
}
export default function FileCard({ documentText, fileSize, fileName }: Props) {
  return (
    <FileCardDiv>
      <Content>
        <SVGIcon
          name='pdf-icon'
          width='20px'
          height='20px'
          viewBox='0 0 20 20'
          className='file-icon'
        />
        <FileDetail>
          <FileName>{fileName}</FileName>
          <FileSize className='file-size'>{fileSize}</FileSize>
        </FileDetail>
      </Content>
      <div className='overlay'></div>
      {/* Always display the internal text of the document */}
      <TextPreviewDiv className='text-preview'>{documentText}</TextPreviewDiv>
      <div className='download-icon'>
        <Icon
          onClick={() => {}}
          iconName={'download-alt-icon'}
          iconSize={'12'}
          iconViewBox={'0 0 12 12'}
        />
      </div>
    </FileCardDiv>
  );
}
