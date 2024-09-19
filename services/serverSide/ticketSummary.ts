import { MessageType } from '@prisma/client';
import { prisma } from '@/prisma/prisma';
import { MessageSummary } from '@/utils/dataTypes';
import { chatWithOpenAi } from '@/lib/openAi';

const formateData = (item: MessageSummary) => {
  const displayName =
    item.author && item.author.display_name
      ? item.author.display_name
      : 'Anonymous';

  // Remove HTML tags, inline styles, and class/id attributes, then replace &nbsp; with a regular space
  const content = item.content
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

const getContent = async (ticketId: string) => {
  const messages = await prisma.message.findMany({
    where: {
      ticket_id: ticketId,
      type: {
        in: [MessageType.REGULAR, MessageType.EMAIL, MessageType.FROM_CONTACT],
      },
    },
    select: {
      content: true,
      author: { select: { email: true, display_name: true } },
    },
  });

  return messages
    .map(formateData)
    .filter((item: any) => item !== null) // Filter out null values
    .join('\n\n'); // Join the array into a single string with newline as separator
};

// Get ticket summary based on message data
export const getTicketSummary = async (ticketId: string) => {
  const ticketContent = await getContent(ticketId);

  const summary = await chatWithOpenAi(
    `${ticketContent} \n\n\n Now give summary for above content in 1-2 lines.`,
  );

  return { summary: summary.choices[0].message.content };
};

// Get ticket sentiment based on message data
export const getTicketSentiment = async (ticketId: string) => {
  const ticketContent = await getContent(ticketId);

  const sentiment = await chatWithOpenAi(
    `${ticketContent} \n\n\n Now give sentiment for above content in 1 line`,
  );

  return { sentiment: sentiment.choices[0].message.content };
};
