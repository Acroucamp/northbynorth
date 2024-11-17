import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  ParseUUIDPipe,
  Patch,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './entities/user.entity';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UpdateUserDto } from './dto/update-user.dto';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  /**
   * Get user account details bu userId.
   * @param userId - The UUID of the user to retrieve.
   * @returns The User entity if found.
   */
  @ApiOperation({ summary: 'Get user account details by userId' })
  @ApiParam({
    name: 'userId',
    type: 'string',
    description: 'The UUID of the user',
  })
  @ApiResponse({
    status: 200,
    description: 'The User entity if found',
    type: User,
  })
  @ApiResponse({ status: 404, description: 'User not found' })
  @Get(':userId')
  async getAccount(
    @Param('userId', new ParseUUIDPipe()) userId: string,
  ): Promise<User> {
    const user = await this.userService.getAccount(userId);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  /**
   * Update user account information by userId.
   * @param userId - The UUID of the user.
   * @param updateUserDto - The data transfer object with user updates.
   * @returns The updated User entity.
   */
  @ApiOperation({ summary: 'Update user account information' })
  @ApiParam({
    name: 'userId',
    type: 'string',
    description: 'The UUID of the user',
  })
  @ApiResponse({
    status: 200,
    description: 'User updated successfully',
    type: User,
  })
  @ApiResponse({ status: 404, description: 'User not found' })
  @Patch(':userId')
  async updateAccount(
    @Param('userId', new ParseUUIDPipe()) userId: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<User> {
    return await this.userService.updateAccount(userId, updateUserDto);
  }

  /**
   * Delete user account by userId.
   * @param userId - The UUID of the user to delete.
   */
  @ApiOperation({ summary: 'Delete user account' })
  @ApiParam({
    name: 'userId',
    type: 'string',
    description: 'The UUID of the user',
  })
  @ApiResponse({
    status: 200,
    description: 'User deleted successfully',
  })
  @ApiResponse({ status: 404, description: 'User not found' })
  @Delete(':userId')
  async deleteAccount(
    @Param('userId', new ParseUUIDPipe()) userId: string,
  ): Promise<void> {
    return await this.userService.deleteAccount(userId);
  }
}
