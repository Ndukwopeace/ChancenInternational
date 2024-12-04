import { Controller, Post, Body, Req, Get, ParseIntPipe, Param } from '@nestjs/common';
import { AuthService } from './auth.service';
import { User } from './user.entity';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('register')
  async register(@Body() { name, email, password }: { name: string; email: string; password: string }) {
    return this.authService.register(name, email, password);
  }

  @Post('login')
  async login(@Body() loginDto: { email: string; password: string }) {
    return this.authService.login(loginDto.email, loginDto.password);
  }

  @Get('one/:id')
  async getUserByID(@Param('id', ParseIntPipe) userId: number): Promise<Partial<User>> {
    return this.authService.getUserInfo(userId);
  }

  @Get('me')
  async getMe(@Req() req) {
    // Return full user details
    return {
      id: req.user.id,
      name: req.user.name,
      email: req.user.email,
      role: req.user.role,
    };

}
}