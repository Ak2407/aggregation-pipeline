import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './user.schema';

@Injectable()
export class UserService {
  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

  // Find all users
  async findAllUsers() {
    return this.userModel.find();
  }

  // Find all users with a specific eye color and sort by age
  async findUsersByEyeColorAndSort(eyeColor: string) {
    return this.userModel.aggregate([
      { $match: { eyeColor } },
      { $sort: { age: 1 } },
    ]);
  }

  // Count users by gender
  async countUsersByGender() {
    return this.userModel.aggregate([
      { $group: { _id: '$gender', count: { $sum: 1 } } },
    ]);
  }

  // Find the average age of active users
  async averageAgeOfActiveUsers() {
    return this.userModel.aggregate([
      { $match: { isActive: true } },
      { $group: { _id: null, averageAge: { $avg: '$age' } } },
    ]);
  }

  // Fetch users with tags containing a specific value
  async findUsersByTag(tag: string) {
    return this.userModel.aggregate([{ $match: { tags: tag } }]);
  }

  // Fetch users registered within a date range
  async findUsersRegisteredInRange(startDate: Date, endDate: Date) {
    return this.userModel.aggregate([
      { $match: { registered: { $gte: startDate, $lte: endDate } } },
    ]);
  }

  // Fetch top N companies with the most users
  async topCompaniesByUserCount(limit: number) {
    return this.userModel.aggregate([
      { $group: { _id: '$company.title', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: limit },
    ]);
  }
}
