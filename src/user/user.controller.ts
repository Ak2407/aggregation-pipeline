import { Controller, Get, Query } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getAllUsers() {
    return this.userService.findAllUsers();
  }

  @Get('eye-color')
  async getUsersByEyeColor(@Query('eyeColor') eyeColor: string) {
    return this.userService.findUsersByEyeColorAndSort(eyeColor);
  }

  @Get('gender-count')
  async getGenderCounts() {
    return this.userService.countUsersByGender();
  }

  @Get('active-average-age')
  async getAverageAgeOfActiveUsers() {
    return this.userService.averageAgeOfActiveUsers();
  }

  @Get('tags')
  async getUsersByTag(@Query('tag') tag: string) {
    return this.userService.findUsersByTag(tag);
  }

  @Get('registered-range')
  async getUsersRegisteredInRange(
    @Query('start') start: string,
    @Query('end') end: string,
  ) {
    return this.userService.findUsersRegisteredInRange(
      new Date(start),
      new Date(end),
    );
  }

  @Get('top-companies')
  async getTopCompanies(@Query('limit') limit: string) {
    return this.userService.topCompaniesByUserCount(Number(limit));
  }
}
