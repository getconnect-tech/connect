import React, { useCallback } from 'react';
import SVGIcon from '@/assets/icons/SVGIcon';
import { formatFileSize } from '@/helpers/common';
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

interface Props {
  documentText: string;
  fileSize: string;
  fileName: string;
  url?: string;
  type?: string;
}

export default function FileCard({
  documentText,
  fileSize,
  fileName,
  url,
  type,
}: Props) {
  const isImageFile = type?.startsWith('image/');
  const isVideoFile = type?.startsWith('video/');

  const renderFileContent = useCallback(() => {
    // Switch based on the actual MIME type, not booleans
    switch (true) {
      case isImageFile:
        return (
          <ImageDiv>
            <img src={url} alt={fileName} className='image-preview' />
          </ImageDiv>
        );
      case isVideoFile:
        return (
          <SVGIcon
            name='mp4-icon'
            width='20'
            height='20'
            viewBox='0 0 16 16'
            className='file-icon'
          />
        );
      case type === 'text/csv':
        return (
          <SVGIcon
            name='csv-icon'
            width='20'
            height='20'
            viewBox='0 0 16 16'
            className='file-icon'
          />
        );
      case type === 'application/pdf':
        return (
          <SVGIcon
            name='pdf-icon'
            width='20'
            height='20'
            viewBox='0 0 16 16'
            className='file-icon'
          />
        );
      case type === 'application/msword':
      case type ===
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
        return (
          <SVGIcon
            name='doc-icon'
            width='20'
            height='20'
            viewBox='0 0 16 16'
            className='file-icon'
          />
        );
      case type === 'application/vnd.ms-excel':
      case type ===
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet':
        return (
          <SVGIcon
            name='excel-icon'
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
  }, [type, isImageFile, isVideoFile, url, fileName]);

  return (
    <>
      {isImageFile ? (
        // If it's an image, only show the image
        <ImageDiv>
          <img src={url} alt={fileName} className='image-preview' />
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
