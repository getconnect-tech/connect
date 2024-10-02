import { MessageType } from '@prisma/client';
import { prisma } from '@/prisma/prisma';
import { MessageSummary } from '@/utils/dataTypes';
import { chatWithOpenAi, getParsedTicketAnalysis } from '@/lib/openAi';

const formatMessageData = (message: MessageSummary) => {
  const displayName = message.author.display_name
    ? message.author.display_name +
      (message.type === MessageType.FROM_CONTACT ? ` [CONTACT]` : '')
    : 'Anonymous';

  // Remove HTML tags, inline styles, and class/id attributes, then replace &nbsp; with a regular space
  const content = message.content
    .replace(/<[^>]+(?:style="[^"]*"|class="[^"]*"|id="[^"]*")?[^>]*>/g, '') // Remove tags with style, class, or id
    .replace(/<\/?[^>]+(>|$)/g, '') // Remove remaining HTML tags
    .replace(/&nbsp;/g, ' ')
    .replace(/\n\s+/g, ' ')
    .trim(); // Remove extra spaces from content

  // Skip if the content is empty after stripping tags
  if (content === '') {
    return null;
  }

  return `${displayName}: ${content}`;
};

export const getTicketContent = async (ticketId: string) => {
  const ticketData = await prisma.ticket.findUnique({
    where: { id: ticketId },
    select: {
      messages: {
        where: {
          type: {
            in: [
              MessageType.REGULAR,
              MessageType.EMAIL,
              MessageType.FROM_CONTACT,
            ],
          },
        },
        select: {
          content: true,
          type: true,
          author: {
            select: {
              email: true,
              display_name: true,
            },
          },
        },
      },
      contact: {
        select: {
          name: true,
          email: true,
        },
      },
    },
  });

  if (!ticketData) {
    throw new Error("'ticketId' is invalid!");
  }

  const processedMessages = ticketData.messages.map((message) => {
    if (message.type === MessageType.FROM_CONTACT) {
      return {
        ...message,
        author: {
          email: ticketData.contact.email,
          display_name: ticketData.contact.name, // Use contact name
        },
      };
    }
    return { ...message, author: message.author! };
  });

  return processedMessages
    .map(formatMessageData)
    .filter((item) => !!item)
    .join('\n\n');
};

// Get ticket summary based on message data
export const getTicketSummary = async (
  ticketId: string,
  messageData?: string,
) => {
  const ticketContent = messageData || (await getTicketContent(ticketId));

  const prompt = `${ticketContent}\n\n\nNow give summary for above content in 1-2 lines.`;
  const summary = await chatWithOpenAi(prompt);

  return summary;
};

// Get ticket sentiment based on message data
export const getTicketSentiment = async (
  ticketId: string,
  messageData?: string,
) => {
  const ticketContent = messageData || (await getTicketContent(ticketId));

  // eslint-disable-next-line max-len
  const prompt = `${ticketContent}\n\n\nNow give what is the sentiment of person tagged CONTACT in 1 line with an facial expression emoji. Format Example: Sanjay’s sentiment is slightly sad 😔`;
  const sentiment = await chatWithOpenAi(prompt);

  return sentiment;
};

export const getTicketSummaryAndSentiment = async (ticketId: string) => {
  const ticketContent = await getTicketContent(ticketId);

  // eslint-disable-next-line max-len
  const instructions = `You have to generate ticket summary and the sentiment of person tagged CONTACT in 1 line with an facial expression emoji (Format Example: Sanjay’s sentiment is slightly sad 😔).`;
  const analysisResult = await getParsedTicketAnalysis(
    instructions,
    ticketContent,
  );
  return analysisResult;
};
