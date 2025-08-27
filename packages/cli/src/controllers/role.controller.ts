import { CreateRoleDto, RoleDTO, UpdateRoleDto } from '@n8n/api-types';
import {
	Body,
	Delete,
	Get,
	GlobalScope,
	Param,
	Patch,
	Post,
	RestController,
} from '@n8n/decorators';

import { RoleService } from '@/services/role.service';

@RestController('/roles')
export class RoleController {
	constructor(private readonly roleService: RoleService) {}

	@Get('/')
	async getAllRoles(): Promise<RoleDTO[]> {
		return await this.roleService.getAllRoles();
	}

	@Get('/:slug')
	async getRoleBySlug(@Param('slug') slug: string): Promise<RoleDTO> {
		return await this.roleService.getRole(slug);
	}

	@Patch('/:slug')
	@GlobalScope('role:manage')
	async updateRole(@Param('slug') slug: string, @Body body: UpdateRoleDto): Promise<RoleDTO> {
		return await this.roleService.updateCustomRole(slug, body);
	}

	@Delete('/:slug')
	@GlobalScope('role:manage')
	async deleteRole(@Param('slug') slug: string): Promise<RoleDTO> {
		return await this.roleService.removeCustomRole(slug);
	}

	@Post('/')
	@GlobalScope('role:manage')
	async createRole(@Body body: CreateRoleDto): Promise<RoleDTO> {
		return await this.roleService.createCustomRole(body);
	}
}
