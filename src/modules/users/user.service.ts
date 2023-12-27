import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async getUsers(): Promise<any> {
    try {
      const data = await this.prisma.user.findMany();

      return { statusCode: '200', data: data };
    } catch (error) {
      throw error;
    }
  }

  async getUserById(id: number): Promise<any> {
    try {
      const user = await this.prisma.user.findUnique({
        where: {
          id: Number(id),
        },
        select: {
          id: true,
          email: true,
          nickname: true,
          avatarUrl: true,
          theme_ide: true,
          position: true,
          lastLogin: true,
          updatedAt: true,
          createdAt: true,
        },
      });

      if (!user) {
        throw new NotFoundException();
      }

      return { statusCode: '200', data: user };
    } catch (error) {
      throw error;
    }
  }

  // async updateUser(
  //   id: number,
  //   { email, nickname }: UsersDto,
  //   file: Express.Multer.File,
  // ): Promise<any> {
  //   try {
  //     const user = await this.prisma.user.findUnique({
  //       where: {
  //         id: Number(id),
  //       },
  //     });

  //     let upload = '';

  //     if (user) {
  //       if (file) {
  //         const res = await this.uploadService.handleUploadImg(file);
  //         upload = res.data;
  //       }
  //       await this.prisma.user.update({
  //         where: {
  //           id: Number(id),
  //         },
  //         data: {
  //           email,
  //           nickname,
  //           avatarUrl: upload,
  //         },
  //       });

  //       return { message: 'updated successfully' };
  //     } else {
  //       throw new NotFoundException();
  //     }
  //   } catch (error) {
  //     return { status: error.code, message: error.message };
  //   }
  // }

  async deleteUser(id: number): Promise<any> {
    try {
      const user = await this.prisma.user.findUnique({
        where: {
          id: Number(id),
        },
        select: {
          id: true,
          email: true,
          nickname: true,
          avatarUrl: true,
          theme_ide: true,
          position: true,
          lastLogin: true,
          updatedAt: true,
          createdAt: true,
        },
      });

      if (!user) {
        throw new NotFoundException();
      }

      const deleteUser = await this.prisma.user.delete({
        where: {
          id: Number(id),
        },
      });

      if (!deleteUser) {
        throw new InternalServerErrorException();
      }

      return { statusCode: '200', message: 'deleted successfully' };
    } catch (error) {
      throw error;
    }
  }
}
