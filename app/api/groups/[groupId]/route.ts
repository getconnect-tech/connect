import { z } from 'zod';
import { MessageType } from '@prisma/client';
import { handleApiError } from '@/helpers/errorHandler';
import { updateGroup } from '@/services/serverSide/group';
import withAdminAuth from '@/middlewares/withAdminAuth';
import {
  createStringSchema,
  customTraitsSchema,
  parseAndValidateRequest,
} from '@/lib/zod';
import withWorkspaceAuth from '@/middlewares/withWorkspaceAuth';
import { prisma } from '@/prisma/prisma';

const UpdateRequestBody = z.object({
  name: createStringSchema('name').optional(),
  groupLabel: createStringSchema('groupLabel').optional(),
  customTraits: customTraitsSchema.optional(),
  externalId: createStringSchema('externalId', { id: true }).optional(),
  avatar: createStringSchema('avatar').optional(),
});
export const PUT = withAdminAuth(async (req, { groupId }) => {
  try {
    const requestBody = await parseAndValidateRequest(req, UpdateRequestBody);

    const updatedGroup = await updateGroup(groupId, requestBody);

    return Response.json(updatedGroup, { status: 200 });
  } catch (err) {
    return handleApiError(err);
  }
});

export const GET = withWorkspaceAuth(async (req, { groupId }) => {
  try {
    const workspaceId = req.workspace.id;
    const userId = req.user.id;

    // Get group and verify it belongs to the current workspace
    const group = await prisma.group.findFirst({
      where: {
        OR: [{ id: groupId }, { group_id: groupId }],
      },
      include: {
        contacts: {
          include: {
            contact: true,
          },
        },
      },
    });

    if (!group) {
      return Response.json({ error: 'Group not found' }, { status: 404 });
    }

    if (group.workspace_id !== workspaceId) {
      return Response.json(
        { error: 'Group does not belong to this workspace' },
        { status: 403 },
      );
    }

    // Get all contacts in this group
    const contacts = group.contacts.map((gc) => gc.contact);

    // Get all tickets for these contacts
    const contactIds = contacts.map((contact) => contact.id);
    const tickets = await prisma.ticket.findMany({
      where: {
        contact_id: { in: contactIds },
        workspace_id: workspaceId,
      },
      include: {
        labels: { include: { label: true } },
        contact: true,
        assigned_user: true,
        messages: {
          where: {
            type: {
              in: [
                MessageType.FROM_CONTACT,
                MessageType.EMAIL,
                MessageType.REGULAR,
              ],
            },
          },
          select: {
            created_at: true,
            author: {
              select: {
                id: true,
                email: true,
                display_name: true,
                profile_url: true,
              },
            },
            content: true,
            type: true,
          },
          take: 1,
          orderBy: { created_at: 'desc' },
        },
      },
    });

    // Get last seen status for tickets
    const ticketIds = tickets.map((ticket) => ticket.id);
    const ticketLastSeen = await prisma.ticketUser.findMany({
      where: {
        ticket_id: { in: ticketIds },
        user_id: userId,
      },
      select: { last_seen: true, ticket_id: true },
    });

    // Create a Map for quick lookups
    const ticketLastSeenMap = new Map(
      ticketLastSeen.map((t) => [t.ticket_id, new Date(t.last_seen)]),
    );

    // Build the final ticket structure
    const ticketsWithLastMessage = tickets.map((ticket) => {
      const { messages, ...rest } = ticket;
      const last_message = messages[0];

      const has_read = last_message
        ? ticketLastSeenMap.has(ticket.id) &&
          ticketLastSeenMap.get(ticket.id)!.getTime() >=
            new Date(last_message.created_at).getTime()
        : true;

      return {
        ...rest,
        labels: ticket.labels.map((x) => x.label),
        last_message: last_message || null,
        has_read,
      };
    });

    // Return combined data
    return Response.json(
      {
        ...group,
        contacts,
        tickets: ticketsWithLastMessage,
      },
      { status: 200 },
    );
  } catch (err) {
    return handleApiError(err);
  }
});
