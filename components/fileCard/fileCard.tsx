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
  // Function to get the appropriate icon based on the file extension
  const getFileIcon = () => {
    const fileExtension = fileName.split('.').pop()?.toLowerCase();

    switch (fileExtension) {
      case 'pdf':
        return (
          <SVGIcon
            name='pdf-icon'
            width='20'
            height='20'
            viewBox='0 0 16 16'
            className='file-icon'
          />
        );
      case 'doc':
      case 'docx':
        return (
          <SVGIcon
            name='doc-icon'
            width='20'
            height='20'
            viewBox='0 0 16 16'
            className='file-icon'
          />
        );
      case 'csv':
        return (
          <SVGIcon
            name='csv-icon'
            width='20'
            height='20'
            viewBox='0 0 16 16'
            className='file-icon'
          />
        );
      case 'xls':
      case 'xlsx':
        return (
          <SVGIcon
            name='excel-icon'
            width='20'
            height='20'
            viewBox='0 0 16 16'
            className='file-icon'
          />
        );
      case 'mp4':
        return (
          <SVGIcon
            name='mp4-icon'
            width='20'
            height='20'
            viewBox='0 0 16 16'
            className='file-icon'
          />
        );
      default:
        return (
          <SVGIcon
            name='common-file-icon'
            width='20'
            height='20'
            viewBox='0 0 16 16'
            className='file-icon'
          />
        );
    }
  };

  return (
    <FileCardDiv>
      <Content>
        {/* Show appropriate icon based on file type */}
        {getFileIcon()}
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
