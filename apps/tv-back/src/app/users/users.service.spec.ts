import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

describe('UsersService', () => {
  let service: UsersService;
  let repository: Repository<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    repository = module.get<Repository<User>>(getRepositoryToken(User));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of users', async () => {
      const usersArray = [
        new User(),
        new User(),
      ];

      jest.spyOn(repository, 'find').mockResolvedValue(usersArray);

      expect(await service.findAll()).toBe(usersArray);
    });
  });

  describe('validateUser', () => {
    it('should return the user if email and password match', async () => {
      const email = 'test@example.com';
      const password = 'password';
      const user = new User();
      user.email = email;
      user.password = password;

      jest.spyOn(repository, 'findOne').mockResolvedValue(user);

      const result = await service.validateUser(email, password);
      expect(result).toBe(user);
    });

    it('should return null if email does not exist', async () => {
      const email = 'nonexistent@example.com';
      const password = 'password';

      jest.spyOn(repository, 'findOne').mockResolvedValue(null);

      const result = await service.validateUser(email, password);
      expect(result).toBeNull();
    });

    it('should return null if password does not match', async () => {
      const email = 'test@example.com';
      const password = 'wrongpassword';
      const user = new User();
      user.email = email;
      user.password = 'password';

      jest.spyOn(repository, 'findOne').mockResolvedValue(user);

      const result = await service.validateUser(email, password);
      expect(result).toBeNull();
    });
  });
});
