import { MessageType } from '@prisma/client';
import { handleApiError } from '@/helpers/errorHandler';
import withWorkspaceAuth from '@/middlewares/withWorkspaceAuth';
import { prisma } from '@/prisma/prisma';

export const GET = withWorkspaceAuth(async (req, { contactId }) => {
  try {
    const workspaceId = req.workspace.id;
    const userId = req.user.id;

    if (!workspaceId) {
      return Response.json(
        { error: 'Workspace ID is required' },
        { status: 400 },
      );
    }

    // First verify the contact exists and belongs to the workspace
    const contact = await prisma.contact.findUnique({
      where: { id: contactId },
      select: { id: true, workspace_id: true },
    });

    if (!contact) {
      return Response.json({ error: 'Contact not found' }, { status: 404 });
    }

    if (contact.workspace_id !== workspaceId) {
      return Response.json(
        { error: 'Contact does not belong to this workspace' },
        { status: 403 },
      );
    }

    // Get contact's tickets with related data
    const tickets = await prisma.ticket.findMany({
      where: {
        contact_id: contactId,
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

    // If no tickets found, return empty array
    if (tickets.length === 0) {
      return Response.json([], { status: 200 });
    }

    const ticketIds = tickets.map((ticket) => ticket.id);

    // Fetch last seen tickets
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

      // Handle case where there are no messages
      const has_read = last_message
        ? ticketLastSeenMap.has(ticket.id) &&
          ticketLastSeenMap.get(ticket.id)!.getTime() >=
            new Date(last_message.created_at).getTime()
        : true; // If no messages, consider it as read

      return {
        ...rest,
        last_message: last_message || null,
        has_read,
      };
    });

    return Response.json(ticketsWithLastMessage, { status: 200 });
  } catch (err) {
    console.error('Error fetching contact tickets:', err);
    return handleApiError(err);
  }
});
