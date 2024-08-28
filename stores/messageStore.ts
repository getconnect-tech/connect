'use client';
import { action, makeObservable, observable } from 'mobx';
import { generateRandomFilename } from '@/helpers/common';
import { Message } from '@/utils/appTypes';

class MessageStore {
  messages: Message[] = [];
  constructor() {
    makeObservable(this, {
      //Loading variable
      messages: observable,
      setErrorMessage: action,
    });
  }

  // Set Error Message
  setErrorMessage(value: string) {
    this.messages.push({
      type: 'error',
      content: value,
      id: generateRandomFilename()?.toString(),
    });
  }

  // Set Success Message
  setSuccessMessage(value: string) {
    this.messages.push({
      type: 'success',
      content: value,
      id: generateRandomFilename()?.toString(),
    });
  }

  // Set Warning Message
  setWarningMessage(value: string) {
    this.messages.push({
      type: 'warning',
      content: value,
      id: generateRandomFilename()?.toString(),
    });
  }

  removeMessage(id: string) {
    const messageIndex = this.messages?.findIndex(
      (message) => message?.id === id,
    );
    if (messageIndex !== -1) this.messages?.splice(messageIndex, 1);
  }
}

export const messageStore = new MessageStore();
