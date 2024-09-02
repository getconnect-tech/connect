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
  const result = await prisma.macro.delete({
    where: { id: macroId },
  });
  if (result) return true;
  return false;
};

export const getMacros = async (workspaceId: string): Promise<Macro[]> => {
  try {
    if (isEmpty(workspaceId)) throw new Error("'workspaceId' is required!");
    const result = await prisma.macro.findMany({
      where: { workspace_id: workspaceId },
    });
    if (result.length > 0) return result;
    return [];
  } catch (e) {
    console.log('Error deleting Macro:', e);
    throw e;
  }
};
