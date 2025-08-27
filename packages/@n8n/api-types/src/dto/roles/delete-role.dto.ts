import { z } from 'zod';

const deleteRoleDtoSchema = z.object({
	replacementRole: z.string().optional(),
});

export type DeleteRoleDto = z.infer<typeof deleteRoleDtoSchema>;
