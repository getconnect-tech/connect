import { removeNullUndefined } from '@/helpers/common';
import { prisma } from '@/prisma/prisma';

export const getTicketLabels = async (ticketId: string) => {
  const labels = await prisma.ticketLabel.findMany({
    where: { ticket_id: ticketId },
    include: { label: true },
  });

  const formattedLabels = labels.map((label) => label.label);
  return formattedLabels;
};

export const createLabel = async ({
  name,
  icon,
  color,
  workspaceId,
}: {
  name: string;
  icon: string;
  color?: string;
  workspaceId: string;
}) => {
  const query = { name, icon, color, workspace_id: workspaceId };

  removeNullUndefined(query);

  const newLabel = await prisma.label.create({
    data: query,
  });

  return newLabel;
};

export const deleteLabelById = async (labelId: string) => {
  const res = await prisma.$transaction([
    prisma.ticketLabel.deleteMany({ where: { label_id: labelId } }),
    prisma.label.delete({ where: { id: labelId } }),
  ]);
  return res[1];
};

export const updateLabel = async (
  labelId: string,
  labelUpdates: {
    name?: string;
    icon?: string;
    color?: string;
  },
) => {
  removeNullUndefined(labelUpdates);

  const newLabel = await prisma.label.update({
    where: { id: labelId },
    data: labelUpdates,
  });

  return newLabel;
};
