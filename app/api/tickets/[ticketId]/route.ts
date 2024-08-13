import { z } from 'zod';
import { handleApiError } from '@/helpers/errorHandler';
import withWorkspaceAuth from '@/middlewares/withWorkspaceAuth';
import {
  assginToSchema,
  contactIdSchema,
  prioritySchema,
  snoozeUntilSchema,
  statusSchema,
  ticketSourceSchema,
  titleSchema,
} from '@/lib/zod/ticket';
import { getTicketById, updateTicket } from '@/services/serverSide/ticket';

// GET /api/tickets/[ticketId]
export const GET = withWorkspaceAuth(async (req, { ticketId }) => {
  try {
    const workspaceId = req.workspace.id;

    const ticket = await getTicketById(ticketId, workspaceId);

    if (!ticket) {
      return Response.json({ error: 'Not found!' }, { status: 404 });
    }

    return Response.json(ticket, { status: 200 });
  } catch (err) {
    return handleApiError(err);
  }
});

// PUT /api/tickets/[ticketId]
const UpdateTicketRequestBody = z.object({
  title: titleSchema.optional(),
  contanctId: contactIdSchema.optional(),
  assignedTo: assginToSchema.optional(),
  priority: prioritySchema.optional(),
  source: ticketSourceSchema.optional(),
  status: statusSchema.optional(),
  snoozeUntil: snoozeUntilSchema.optional(),
});

export const PUT = withWorkspaceAuth(async (req, { ticketId }) => {
  try {
    const requestBody = await req.json();

    UpdateTicketRequestBody.parse(requestBody);

    const ticketUpdates = requestBody as z.infer<
      typeof UpdateTicketRequestBody
    >;

    const updatedTicket = await updateTicket(ticketId, ticketUpdates);

    return Response.json(updatedTicket, { status: 200 });
  } catch (err) {
    return handleApiError(err);
  }
});
