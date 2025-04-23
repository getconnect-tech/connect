import { z } from 'zod';
import { GENDER } from '@prisma/client';
import { handleApiError } from '@/helpers/errorHandler';
import {
  createOrUpdateContact,
  getContactById,
  getContactDetails,
  getContactTickets,
} from '@/services/serverSide/contact';
import withAdminAuth from '@/middlewares/withAdminAuth';
import withWorkspaceAuth from '@/middlewares/withWorkspaceAuth';
import {
  addressSchema,
  createEnumSchema,
  createNumberSchema,
  createStringSchema,
  customTraitsSchema,
  parseAndValidateRequest,
} from '@/lib/zod';

export const GET = withWorkspaceAuth(async (req, { contactId }) => {
  try {
    const { searchParams } = new URL(req.url);
    const contactDetails = searchParams.get('details');
    const contactTickets = searchParams.get('tickets');

    const workspaceId = req.workspace.id;
    const userId = req.user.id;

    let contact;

    if (contactDetails) {
      contact = await getContactDetails(contactId);
    } else if (contactTickets) {
      contact = await getContactTickets(workspaceId, contactId, userId);
    } else {
      contact = await getContactById(contactId);
    }

    return Response.json(contact, { status: 200 });
  } catch (err) {
    return handleApiError(err);
  }
});

const UpdateRequestBody = z.object({
  address: addressSchema.optional(),
  age: createNumberSchema('age', { min: 1 }).optional(),
  avatar: createStringSchema('avatar').optional(),
  birthday: createStringSchema('birthday', { datetime: true }).optional(),
  description: createStringSchema('description').optional(),
  firstName: createStringSchema('firstName').optional(),
  lastName: createStringSchema('lastName').optional(),
  name: createStringSchema('name').optional(),
  gender: createEnumSchema('gender', GENDER).optional(),
  phone: createStringSchema('phone').optional(),
  title: createStringSchema('title').optional(),
  username: createStringSchema('username').optional(),
  website: createStringSchema('website', { url: true }).optional(),
  customTraits: customTraitsSchema.optional(),
  externalId: createStringSchema('externalId', { id: true }).optional(),
});
export const PUT = withAdminAuth(async (req, { contactId }) => {
  try {
    const contactUpdate = await parseAndValidateRequest(req, UpdateRequestBody);

    const {
      firstName: first_name,
      lastName: last_name,
      customTraits: custom_traits,
      ...update
    } = contactUpdate;

    const updatedContact = await createOrUpdateContact({
      contactId,
      first_name,
      last_name,
      custom_traits,
      ...update,
    });

    return Response.json(updatedContact, { status: 200 });
  } catch (err) {
    return handleApiError(err);
  }
});
