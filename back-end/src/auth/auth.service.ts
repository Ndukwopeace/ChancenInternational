import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  async register(name: string, email: string, password: string): Promise<User> {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = this.userRepository.create({ name, email, password: hashedPassword });
    return this.userRepository.save(user);
  }

  async login(email: string, password: string): Promise<{ accessToken: string; role: string; user: {id: number; name: string; email: string; role: string} }> {
  const user = await this.userRepository.findOne({ where: { email } });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    throw new UnauthorizedException('Invalid credentials');
  }

  const payload = { email: user.email, role: user.role, name: user.name }; // Include role in JWT payload
  const accessToken = this.jwtService.sign(payload);

  return {
    accessToken,
    role: user.role,
    user: {id: user.id, name: user.name, email: user.email, role: user.role}
  };
}


  async validateUser(userId: number): Promise<User> {
    return this.userRepository.findOneBy({ id: userId });
  }

  async getUserInfo(userId: number): Promise<Partial<User>> {
    const user = await this.validateUser(userId);
    if(!user){
      throw new UnauthorizedException('user not found');
    }
    const { password, ...userInfo } = user;
    return userInfo;
  }
}

export default AuthService;
