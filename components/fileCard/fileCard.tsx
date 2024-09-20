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
import { formatFileSize } from '@/helpers/common';

interface Props {
  documentText: string;
  fileSize: string;
  fileName: string;
  url?: string;
}
export default function FileCard({
  documentText,
  fileSize,
  fileName,
  url,
}: Props) {
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
          <FileSize className='file-size'>
            {formatFileSize(Number(fileSize))}
          </FileSize>
        </FileDetail>
      </Content>
      <div className='overlay'></div>
      {/* Always display the internal text of the document */}
      <TextPreviewDiv className='text-preview'>{documentText}</TextPreviewDiv>
      <div className='download-icon'>
        <a href={url} target='_blank' download={fileName}>
          <Icon
            iconName={'download-alt-icon'}
            iconSize={'12'}
            iconViewBox={'0 0 12 12'}
            secondaryIcon={true}
          />
        </a>
      </div>
    </FileCardDiv>
  );
}
