import { Macro } from '@prisma/client';
import { prisma } from '@/prisma/prisma';

export const createMacro = async (
  user_id: string,
  workspace_id: string,
  model: {
    title: string;
    content: string;
  },
): Promise<Macro> => {
  try {
    const payload = {
      ...model,
      workspace_id,
      created_by: user_id,
    };
    const macro = await prisma.macro.create({
      data: payload,
    });
    return macro;
  } catch (e) {
    console.log('Error create Macro:', e);
    throw e;
  }
};
