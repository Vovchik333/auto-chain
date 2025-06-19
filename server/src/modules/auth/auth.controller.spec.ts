// import { Test, TestingModule } from '@nestjs/testing';
// import { AuthController } from './auth.controller';
// import { AuthService } from './auth.service';
// import { SignUpUserDto } from './dto/sign-up-user.dto';
// import { SignInUserDto } from './dto/sign-in-user.dto';
// import { JwtService } from '@nestjs/jwt';
// import { getModelToken } from '@nestjs/mongoose';
// import { User } from 'src/schemas/user.schema';
// import { Model } from 'mongoose';
// import * as bcrypt from 'bcrypt';

// type AuthResponse = {
//   token: string;
//   user: User;
// };

// describe('AuthController Integration Tests', () => {
//   let controller: AuthController;
//   let authService: AuthService;
//   let jwtService: JwtService;
//   let userModel: Model<User>;

//   const mockUser: User = {
//     _id: 'mock-user-id',
//     email: 'test@example.com',
//     username: 'testuser',
//     password: 'hashedPassword123'
//   };

//   const mockUserModel = {
//     create: jest.fn(),
//     findOne: jest.fn(),
//     findById: jest.fn(),
//   };

//   const mockJwtService = {
//     sign: jest.fn().mockReturnValue('mock-jwt-token'),
//     verify: jest.fn().mockReturnValue({ id: mockUser._id }),
//   };

//   const mockAuthResponse: AuthResponse = {
//     token: 'mock-jwt-token',
//     user: mockUser
//   };

//   beforeEach(async () => {
//     const module: TestingModule = await Test.createTestingModule({
//       controllers: [AuthController],
//       providers: [
//         AuthService,
//         {
//           provide: JwtService,
//           useValue: mockJwtService,
//         },
//         {
//           provide: getModelToken(User.name),
//           useValue: mockUserModel,
//         },
//         {
//           provide: AuthService,
//           useValue: {
//             signUp: jest.fn().mockResolvedValue(mockAuthResponse),
//             signIn: jest.fn().mockResolvedValue(mockAuthResponse),
//             getCurrentUser: jest.fn().mockResolvedValue(mockAuthResponse),
//           }
//         },
//       ],
//     }).compile();

//     controller = module.get<AuthController>(AuthController);
//     authService = module.get<AuthService>(AuthService);
//     jwtService = module.get<JwtService>(JwtService);
//     userModel = module.get<Model<User>>(getModelToken(User.name));
//   });

//   describe('signUp', () => {
//     const signUpDto: SignUpUserDto = {
//       email: 'test@example.com',
//       password: 'Password123!',
//       username: 'testuser',
//     };

//     it('should successfully create a new user', async () => {
//       // Mock the user creation
//       mockUserModel.create.mockResolvedValueOnce(mockUser);
//       mockUserModel.findOne.mockResolvedValueOnce(null); // No existing user

//       const result = await controller.signUp(signUpDto);

//       expect(result).toBeDefined();
//       expect(mockUserModel.create).toHaveBeenCalled();
//       expect(mockJwtService.sign).toHaveBeenCalled();
//       expect(result).toHaveProperty('token');
//       expect(result).toHaveProperty('user');
//       expect(result.user.email).toBe(signUpDto.email);
//     });

//     it('should throw error if user already exists', async () => {
//       mockUserModel.findOne.mockResolvedValueOnce(mockUser);

//       await expect(controller.signUp(signUpDto)).rejects.toThrow();
//     });
//   });

//   describe('signIn', () => {
//     const signInDto: SignInUserDto = {
//       email: 'test@example.com',
//       password: 'Password123!',
//     };

//     beforeEach(() => {
//       jest.spyOn(bcrypt, 'compare').mockImplementation(() => Promise.resolve(true));
//     });

//     it('should successfully sign in existing user', async () => {
//       mockUserModel.findOne.mockResolvedValueOnce(mockUser);

//       const result = await controller.signIn(signInDto);

//       expect(result).toBeDefined();
//       expect(result).toHaveProperty('token');
//       expect(result).toHaveProperty('user');
//       expect(result.user.email).toBe(signInDto.email);
//     });

//     it('should throw error if user not found', async () => {
//       mockUserModel.findOne.mockResolvedValueOnce(null);

//       await expect(controller.signIn(signInDto)).rejects.toThrow();
//     });

//     it('should throw error if password is incorrect', async () => {
//       mockUserModel.findOne.mockResolvedValueOnce(mockUser);
//       jest.spyOn(bcrypt, 'compare').mockImplementationOnce(() => Promise.resolve(false));

//       await expect(controller.signIn(signInDto)).rejects.toThrow();
//     });
//   });

//   describe('getCurrentUser', () => {
//     const mockRequest = {
//       user: { id: mockUser._id }
//     };

//     it('should return current user data', async () => {
//       mockUserModel.findById.mockResolvedValueOnce(mockUser);

//       const result = (await controller.getCurrentUser(mockRequest as any));

//       expect(result).toBeDefined();
//       expect(result).toHaveProperty('token');
//       expect(result).toHaveProperty('user');
//       expect(result.id).toBe(mockUser._id);
//     });

//     it('should throw error if user not found', async () => {
//       mockUserModel.findById.mockResolvedValueOnce(null);

//       await expect(controller.getCurrentUser(mockRequest as any)).rejects.toThrow();
//     });
//   });

//   // Test validation
//   describe('Input Validation', () => {
//     it('should validate email format in signUp', async () => {
//       const invalidSignUpDto = {
//         email: 'invalid-email',
//         password: 'Password123!',
//         username: 'testuser',
//       };

//       await expect(controller.signUp(invalidSignUpDto as SignUpUserDto)).rejects.toThrow();
//     });

//     it('should validate password length in signUp', async () => {
//       const invalidSignUpDto = {
//         email: 'test@example.com',
//         password: 'short',
//         username: 'testuser',
//       };

//       await expect(controller.signUp(invalidSignUpDto as SignUpUserDto)).rejects.toThrow();
//     });

//     it('should validate username length in signUp', async () => {
//       const invalidSignUpDto = {
//         email: 'test@example.com',
//         password: 'Password123!',
//         username: 'ab', // too short
//       };

//       await expect(controller.signUp(invalidSignUpDto as SignUpUserDto)).rejects.toThrow();
//     });
//   });
// });
