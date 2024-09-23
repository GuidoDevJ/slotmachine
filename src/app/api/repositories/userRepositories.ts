// repositories/userRepository.ts

import User, { IUser } from '@/app/api/models/Users';
import bcrypt from 'bcrypt';

class UserRepository {
  async createUser(email: string, password: string): Promise<IUser> {
    const hashed_password = await bcrypt.hash(password, 10);
    const user = new User({
      email,
      password: hashed_password,
    });
    return await user.save();
  }

  async findUserByEmail(email: string): Promise<IUser | null> {
    return await User.findOne({ email });
  }

  async comparePassword(
    plainPassword: string,
    hashedPassword: string
  ): Promise<boolean> {
    return await bcrypt.compare(plainPassword, hashedPassword);
  }
}

export default new UserRepository();
