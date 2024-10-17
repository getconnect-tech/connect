import { z } from 'zod';
import { handleApiError } from '@/helpers/errorHandler';
import {
  addressSchema,
  ageSchema,
  avatarSchema,
  birthdaySchema,
  contactNameSchema,
  customTraitsSchema,
  descriptionSchema,
  firstNameSchema,
  genderSchema,
  lastNameSchema,
  phoneSchema,
  titleSchema,
  usernameSchema,
  websiteSchema,
} from '@/lib/zod/contact';
import {
  createOrUpdateContact,
  getContactById,
} from '@/services/serverSide/contact';
import { externalIdSchema } from '@/lib/zod/common';
import withAdminAuth from '@/middlewares/withAdminAuth';
import withWorkspaceAuth from '@/middlewares/withWorkspaceAuth';

export const GET = withWorkspaceAuth(async (req, { contactId }) => {
  try {
    const contact = await getContactById(contactId);

    return Response.json(contact, { status: 200 });
  } catch (err) {
    return handleApiError(err);
  }
});

const UpdateContactBody = z.object({
  address: addressSchema.optional(),
  age: ageSchema.optional(),
  avatar: avatarSchema.optional(),
  birthday: birthdaySchema.optional(),
  description: descriptionSchema.optional(),
  firstName: firstNameSchema.optional(),
  lastName: lastNameSchema.optional(),
  name: contactNameSchema.optional(),
  gender: genderSchema.optional(),
  phone: phoneSchema.optional(),
  title: titleSchema.optional(),
  username: usernameSchema.optional(),
  website: websiteSchema.optional(),
  customTraits: customTraitsSchema.optional(),
  externalId: externalIdSchema.optional(),
});
export const PUT = withAdminAuth(async (req, { contactId }) => {
  try {
    const contactUpdate = await req.json();
    UpdateContactBody.parse(contactUpdate);

    const {
      firstName: first_name,
      lastName: last_name,
      customTraits: custom_traits,
      ...update
    } = contactUpdate as z.infer<typeof UpdateContactBody>;

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
