import { removeNullUndefined } from '@/helpers/common';
import { prisma } from '@/prisma/prisma';

export const getContactByEmail = async (email: string) => {
  const contact = await prisma.contact.findUnique({ where: { email } });
  return contact;
};

export const createOrUpdateContact = async (contactDetails: {
  email: string;
  name: string;
}) => {
  removeNullUndefined(contactDetails);

  const contact = await prisma.contact.upsert({
    where: { email: contactDetails.email },
    create: contactDetails,
    update: contactDetails,
  });

  return contact;
};
