import React, { useCallback } from 'react';
import Icon from '../icon/icon';
import {
  Content,
  FileCardDiv,
  FileDetail,
  FileName,
  FileSize,
  TextPreviewDiv,
  ImageDiv, // Make sure to use this for styling the image preview
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
  const fileExtension = fileName.split('.').pop()?.toLowerCase();
  const isImageFile = ['png', 'jpg', 'jpeg'].includes(fileExtension || '');

  const renderFileContent = useCallback(() => {
    switch (fileExtension) {
      case 'png':
      case 'jpg':
      case 'jpeg':
        return (
          <ImageDiv>
            <img src={url} alt={fileName} className='image-preview' />
          </ImageDiv>
        );
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
  }, []);

  return (
    <>
      {isImageFile ? (
        // If it's an image, only show the image
        <ImageDiv>
          <img src={url} alt={fileName} className='image-preview' />
        </ImageDiv>
      ) : (
        // Otherwise, show the FileCardDiv with the icon and other details
        <FileCardDiv>
          <Content>
            {/* Show appropriate icon based on file type */}
            {renderFileContent()}
            <FileDetail>
              <FileName>{fileName}</FileName>
              <FileSize className='file-size'>
                {formatFileSize(Number(fileSize))}
              </FileSize>
            </FileDetail>
          </Content>
          <div className='overlay'></div>
          {/* Always display the internal text of the document */}
          <TextPreviewDiv className='text-preview'>
            {documentText}
          </TextPreviewDiv>
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
      )}
    </>
  );
}
