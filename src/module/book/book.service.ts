import { Injectable } from '@nestjs/common';
import { BookDTO } from './book.dto';
import { PrismaService } from 'src/database/PrismaService';
// import { Prisma } from '@prisma/client';

@Injectable()
export class BookService {
  // async create(data:Prisma.BookCreateInput) {}

  constructor(private prisma: PrismaService) { }

  async create(data: BookDTO) {

    const bookExists = await this.prisma.book.findFirst({
      where: {
        bar_code: data.bar_code
      }
    })

    if (bookExists) {
      throw new Error('Book already exists')
    }

    const book = await this.prisma.book.create({
      data
    })

    return book
  }
  
  async findAll() {
    return this.prisma.book.findMany()
  }

  async update(id:string, data:BookDTO) {
    const bookExist = await this.prisma.book.findUnique({
      where: {
        id: id
      }
    })
    if (!bookExist) {
      throw new Error('Book not found')
    }
    
    return await this.prisma.book.update({
      data,
      where: {
        id,
      },
    })
  }

  async delete(id: string) {
    const bookExist = await this.prisma.book.findUnique({
      where: {
        id: id
      }
    })

    if (!bookExist) {
      throw new Error('Book not found')
    } 

    return await this.prisma.book.delete({
      where: {
        id,
      }
    })
  }
}