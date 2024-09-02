import { prisma } from '@/prisma/prisma';

export const createOrUpdateMacro = async (
  user_id: string,
  workspace_id: string,
  macroId: string,
  model: {
    title: string;
    content: string;
  },
) => {
  const payload = {
    ...model,
    workspace_id,
    created_by: user_id,
  };

  const macro = await prisma.macro.upsert({
    where: { id: macroId },
    update: payload,
    create: payload,
  });
  return macro;
};
