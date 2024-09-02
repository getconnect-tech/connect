import { prisma } from '@/prisma/prisma';
import { isEmpty } from '@/helpers/common';

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

export const deleteMacro = async (macroId: string): Promise<boolean> => {
  try {
    if (isEmpty(macroId)) throw new Error("'macroId' is required!");
    const result = await prisma.macro.delete({
      where: { id: macroId },
    });
    if (result) return true;
    return false;
  } catch (e) {
    console.log('Error deleting Macro:', e);
    throw e;
  }
};
