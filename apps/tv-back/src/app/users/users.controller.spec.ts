import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { UnauthorizedException } from '@nestjs/common';

describe('UsersController', () => {
  let controller: UsersController;
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: {
            validateUser: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('login', () => {
    it('should call validateUser with correct parameters', async () => {
      const loginDto = { email: 'test@example.com', password: 'password' };
      const user = new User();
      user.email = loginDto.email;
      user.password = loginDto.password;

      jest.spyOn(service, 'validateUser').mockResolvedValue(user);

      const result = await controller.login(loginDto);

      expect(service.validateUser).toHaveBeenCalledWith(loginDto.email, loginDto.password);
      expect(result).toBe(user);
    });

    it('should throw UnauthorizedException if credentials are invalid', async () => {
      const loginDto = { email: 'test@example.com', password: 'wrongpassword' };

      jest.spyOn(service, 'validateUser').mockResolvedValue(null);

      await expect(controller.login(loginDto)).rejects.toThrow(UnauthorizedException);
    });
  });
});
