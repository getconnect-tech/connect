/* eslint-disable no-useless-escape */
/* eslint-disable indent */
/* eslint-disable no-undef */
/* eslint-disable max-len */
import React, { useRef, useState } from 'react';
import { useCallback, useEffect } from 'react';
import {
  RichTextEditorComponent,
  Inject,
  QuickToolbar,
  Image,
  Link,
  HtmlEditor,
  Toolbar,
  InlineModeModel,
  FormatModel,
  FontFamilyModel,
  ToolbarSettingsModel,
  PasteCleanup,
} from '@syncfusion/ej2-react-richtexteditor';
import '@syncfusion/ej2-base/styles/bootstrap5.css';
import '@syncfusion/ej2-icons/styles/bootstrap5.css';
import '@syncfusion/ej2-buttons/styles/bootstrap5.css';
import '@syncfusion/ej2-splitbuttons/styles/bootstrap5.css';
import '@syncfusion/ej2-inputs/styles/bootstrap5.css';
import '@syncfusion/ej2-lists/styles/bootstrap5.css';
import '@syncfusion/ej2-navigations/styles/bootstrap5.css';
import '@syncfusion/ej2-popups/styles/bootstrap5.css';
import '@syncfusion/ej2-richtexteditor/styles/bootstrap5.css';
import { MentionComponent } from '@syncfusion/ej2-react-dropdowns';
import Avatar from '../avtar/Avtar';
import {
  DummyDiv,
  Main,
  MentionList,
  MentionTable,
  TextMainDiv,
  Mentioncomponent,
} from './style';
import { isEmpty } from '@/helpers/common';

function RichTextBox(this: any, props: any) {
  const {
    disable = false,
    isInlineToolbar = true,
    isScrollbarnone = false,
    isEveryoneMentionEnable = false,
    isInternalDiscussion,
    className = '',
    placeholder = '',
  } = props;
  const fieldsData = { text: 'display_name' };
  const mentionRef = useRef<MentionComponent>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [uploadedFiles, setUploadedFiles] = useState<any>([]);
  const [valueContent, setValueContent] = useState<string>('');

  let rteObj: any = useRef(null);

  useEffect(() => {
    rteObj.focusIn();
  }, [rteObj]);

  function itemTemplate(data: {
    profile_url: string;
    display_name: string;
    id: string;
  }) {
    return (
      <MentionTable>
        <MentionList>
          {data?.id === 'everyone' ? (
            <img src={''} alt='emptyprofile' width={18} height={18} />
          ) : (
            <Avatar
              imgSrc={data.profile_url}
              size={18}
              name={data?.display_name}
            />
          )}
          <p>{data.display_name}</p>
        </MentionList>
      </MentionTable>
    );
  }

  function displayTemplate(data: { display_name: string; id: string }) {
    return (
      <React.Fragment>
        <a className='display-template' title={data.id}>
          @{data.display_name}
        </a>
      </React.Fragment>
    );
  }

  const inlineMode: InlineModeModel = {
    enable: isInlineToolbar,
    onSelection: true,
  };
  const format: FormatModel = {
    width: 'auto',
  };
  const fontFamily: FontFamilyModel = {
    width: 'auto',
  };
  // Rich Text Editor items list
  const toolbarSettings: ToolbarSettingsModel = {
    items: [
      'Bold',
      'Italic',
      'Underline',
      'Strikethrough',
      'blockquote',
      'sourceCode',
      'createLink',
      'OrderedList',
      'UnorderedList',
      'clearAll',
    ],
  };

  const handleActionComplete = () => {
    if (rteObj) {
      rteObj.focusIn();
    }
  };
  const onSendComment = useCallback(() => {
    setUploadedFiles([]);
    props.sendComment(uploadedFiles);
    // Clear the mention input value
    const mentionComponent: any = mentionRef.current;
    if (mentionComponent) {
      mentionComponent.value = '';
      mentionComponent
        ?.getMentionWrapper()
        ?.querySelector('.e-search-result')
        ?.remove();
    }
  }, [props, mentionRef, uploadedFiles]);

  const onChangeText = useCallback(async (textValue: string) => {
    setValueContent(textValue);
  }, []);

  const handleKeyDown = useCallback(
    (args: {
      requestType: string;
      originalEvent: KeyboardEvent;
      cancel: boolean;
    }) => {
      if (
        args?.originalEvent?.key === 'Enter' &&
        !args?.originalEvent?.metaKey &&
        !args?.originalEvent?.ctrlKey
      ) {
        const mentionComponent: any = mentionRef.current;
        if (
          mentionComponent &&
          mentionComponent
            ?.getMentionWrapper()
            ?.classList?.contains('e-search-result')
        ) {
          const selectedItem = mentionComponent
            ?.getMentionWrapper()
            ?.querySelector('.e-item-focus') as HTMLElement;
          if (selectedItem) {
            const mentionModule: any = rteObj?.getInjectedModules()[0];
            const customEvent = new Event('customEvent') as any;
            customEvent.target = selectedItem;
            mentionModule.selectHandler(customEvent, mentionModule);
            args.cancel = true;
          }
        }
      }
      if (
        (args?.originalEvent?.metaKey || args?.originalEvent?.ctrlKey) &&
        args?.originalEvent?.key === 'Enter'
      ) {
        setTimeout(onSendComment.bind(this), 1000);
      }
      if (
        args.requestType === 'backspace' &&
        args.originalEvent.key === 'Backspace'
      ) {
        const selection = window.getSelection();
        if (selection && selection.rangeCount > 0) {
          const range = selection.getRangeAt(0);
          const container = range.startContainer as Node;

          let previousElement: Element | null = null;
          if (container.nodeType === Node.ELEMENT_NODE) {
            previousElement = (container as HTMLElement).previousElementSibling;
          } else if (
            container.parentNode &&
            container.parentNode.nodeType === Node.ELEMENT_NODE
          ) {
            previousElement = (container.parentNode as HTMLElement)
              .previousElementSibling;
          }
          if (previousElement && range.startOffset === 0) {
            previousElement.parentNode!.removeChild(previousElement);
            args.cancel = true;
          }
        }
      }
    },

    [onSendComment],
  );

  const fileInputRef = useRef<HTMLInputElement>(null);

  const convertBase64 = useCallback((file: File) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        const item = {
          fileContent: fileReader.result,
          fileType: file?.type,
          name: file?.name,
          size: file?.size,
          file: file,
        };
        resolve(item);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  }, []);

  const handleFileRead = useCallback(
    async (file: File) => {
      if (file?.size > 2.5e8) {
        return false;
      }
      const newPromise = convertBase64(file);
      try {
        const value = await Promise.all([newPromise]);
        return value[0];
      } catch (error) {
        console.log('error', error);
      }
    },
    [convertBase64],
  );

  const onFileUpload = useCallback(
    async (event: { target: { files: any } }) => {
      try {
        setLoading(true);
        const fileData: any = await handleFileRead(event.target.files[0]);
        if (fileData?.size > 2.5e8) {
          return false;
        }
        if (!isEmpty(fileData?.fileContent)) {
          //need to change
          let fileUrl;
          if (fileUrl) {
            const parts = fileData?.name?.split('.');
            const extension = parts[parts.length - 1];

            const sizeInMB = fileData?.size / (1024 * 1024);
            let sizeValue;
            let images = '';
            if (sizeInMB >= 1) {
              sizeValue = `${sizeInMB.toFixed(2)} MB`;
            } else {
              const sizeInKB = fileData?.size / 1024;
              sizeValue = `${sizeInKB.toFixed(2)} KB`;
            }
            if (
              extension === 'png' ||
              extension === 'jpeg' ||
              extension === 'jpg'
            ) {
              // eslint-disable-next-line no-useless-escape
              images =
                images +
                `<p><img src=\"${fileUrl}\" alt=\"\" class=\"e-rte-image e-imginline\"><br></p>`;
              setValueContent(`<p>${valueContent || ''} ${images}</p>`);
            } else {
              const newObj = {
                name: fileData?.name,
                href: fileUrl,
                size: sizeValue,
                file_type: extension,
              };
              setUploadedFiles([...(uploadedFiles || []), newObj]);
            }
          }
        }
      } catch (e) {
        console.log('e', e);
      } finally {
        setLoading(false);
      }
    },
    [handleFileRead, valueContent],
  );

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    // Add styles to indicate that the area can accept drops
    e.dataTransfer.dropEffect = 'copy';
  };

  const handleDrop = useCallback(
    async (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      e.stopPropagation();
      const droppedFiles = e.dataTransfer.files;
      // Upload the dropped files
      const files = [];
      let images = '';
      for (let i = 0; i < droppedFiles.length; i++) {
        const file = droppedFiles[i];
        try {
          setLoading(true);
          const fileData: any = await handleFileRead(file);
          if (!isEmpty(fileData?.fileContent)) {
            //need to change
            let fileUrl;
            if (fileUrl) {
              const parts = fileData?.name?.split('.');
              const extension = parts[parts.length - 1];

              const sizeInMB = fileData?.size / (1024 * 1024);
              let sizeValue;
              if (sizeInMB >= 1) {
                sizeValue = `${sizeInMB.toFixed(2)} MB`;
              } else {
                const sizeInKB = fileData?.size / 1024;
                sizeValue = `${sizeInKB.toFixed(2)} KB`;
              }

              if (
                extension === 'png' ||
                extension === 'jpeg' ||
                extension === 'jpg'
              ) {
                // eslint-disable-next-line no-useless-escape
                images =
                  images +
                  // eslint-disable-next-line no-useless-escape
                  `<p><img src=\"${fileUrl}\" alt=\"\" class=\"e-rte-image e-imginline\"><br></p>`;
              } else {
                const newObj = {
                  name: fileData?.name,
                  href: fileUrl,
                  size: sizeValue,
                  file_type: extension,
                };
                files?.push(newObj);
              }
            }
          }
        } catch (error) {
          console.log('error', error);
        } finally {
          setLoading(false);
        }
      }
      setUploadedFiles([...(uploadedFiles || []), ...files]);
      setValueContent(`<p>${valueContent || ''} ${images}</p>`);
    },
    [valueContent, handleFileRead],
  );

  const pasteCleanupSettings = {
    allowedStyleProps: ['color', 'margin', 'font-size'],
    deniedAttrs: ['class', 'title', 'id'],
    keepFormat: false,
    plainText: false,
  };

  const usersWithAll = [
    { id: 'everyone', display_name: 'Everyone' },
    ...(props?.users || []),
  ];

  return (
    <>
      <>
        <div onDragOver={handleDragOver} onDrop={handleDrop}>
          <Main
            isApplyMsgModel={props?.isApplyMsgModel}
            isInlineToolbar={isInlineToolbar}
            isplaceholder={props?.isplaceholder}
            isScrollbarnone={isScrollbarnone}
          >
            <TextMainDiv className={className}>
              {!disable && (
                <>
                  <RichTextEditorComponent
                    disabled={disable}
                    id='inlineRTE'
                    ref={(richtexteditor: RichTextEditorComponent) => {
                      rteObj = richtexteditor;
                    }}
                    inlineMode={inlineMode}
                    toolbarSettings={toolbarSettings}
                    format={format}
                    fontFamily={fontFamily}
                    showTooltip={true}
                    actionBegin={handleKeyDown}
                    enableAutoUrl={true}
                    saveInterval={1000}
                    pasteCleanupSettings={pasteCleanupSettings}
                    change={(item) => onChangeText(item?.value)}
                    value={valueContent}
                    actionComplete={handleActionComplete}
                    placeholder={placeholder}
                  >
                    <Inject
                      services={[
                        Image,
                        Link,
                        QuickToolbar,
                        HtmlEditor,
                        Toolbar,
                        PasteCleanup,
                      ]}
                    />
                  </RichTextEditorComponent>
                  {isInternalDiscussion && (
                    <Mentioncomponent
                      ref={mentionRef}
                      id='mentionEditor'
                      target='#inlineRTE_rte-edit-view'
                      showMentionChar={false}
                      allowSpaces={true}
                      dataSource={
                        isEveryoneMentionEnable ? usersWithAll : props?.users
                      }
                      fields={fieldsData}
                      popupHeight='200px'
                      itemTemplate={itemTemplate}
                      displayTemplate={displayTemplate}
                    ></Mentioncomponent>
                  )}
                </>
              )}
              {disable && <DummyDiv></DummyDiv>}
            </TextMainDiv>
          </Main>

          {!loading && (
            <input
              type='file'
              ref={fileInputRef}
              style={{ display: 'none' }}
              onChange={onFileUpload}
              multiple
            />
          )}
        </div>
      </>
    </>
  );
}
export default RichTextBox;
