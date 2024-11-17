import * as bcrypt from 'bcrypt';
import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  /**
   * Retrieve user account details by userId.
   * @param userId - The UUID of the user.
   * @returns The User entity if found.
   */
  async getAccount(userId: string): Promise<User | null> {
    const user = await this.userRepository.findOne({
      where: { user_id: userId },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  /**
   * Update user account information.
   * @param userId - The UUID of the user.
   * @param updateUserDto - The data transfer object containing the user updates.
   * @returns The updated User entity.
   */
  async updateAccount(
    userId: string,
    updateUserDto: UpdateUserDto,
  ): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { user_id: userId },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (updateUserDto.hashed_password) {
      if (updateUserDto.hashed_password.length < 6) {
        throw new BadRequestException(
          'Password must be at least 6 characters long',
        );
      }
      try {
        updateUserDto.hashed_password = await bcrypt.hash(
          updateUserDto.hashed_password,
          10,
        );
      } catch (error) {
        throw new InternalServerErrorException('Error hashing password');
      }
    }

    // Assing new data to the user and save changes
    Object.assign(user, updateUserDto);

    try {
      return this.userRepository.save(user);
    } catch (error) {
      throw new InternalServerErrorException('Error updating user account');
    }
  }

  async getOrderHistory() {}

  /**
   * Delete a user account by userId.
   * @param userId - The UUID of the user.
   */
  async deleteAccount(userId: string): Promise<void> {
    const result = await this.userRepository.delete({ user_id: userId });

    if (result.affected === 0) {
      throw new NotFoundException('User not found');
    }
  }
}
