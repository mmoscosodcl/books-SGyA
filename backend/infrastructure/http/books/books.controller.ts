import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
  UseGuards
} from '@nestjs/common';
import { Book } from '../../../domain/models/book';
import { BookService } from '../../../domain/services/book.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('books')
export class BooksController {
  constructor(private readonly bookService: BookService) {}

  @Get()
  async list() {
    return this.bookService.list();
  }

  @Get(':isbn13')
  async getByIsbn13(@Param('isbn13') isbn13: string) {
    const book = await this.bookService.getByIsbn13(isbn13);
    if (!book) throw new HttpException('Book not found.', HttpStatus.NOT_FOUND);
    return book;
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(@Body() body: Book) {
    try {
      return await this.bookService.create(body);
    } catch (error) {
      throw mapError(error);
    }
  }

  @Put(':isbn13')
  @UseGuards(JwtAuthGuard)
  async update(@Param('isbn13') isbn13: string, @Body() body: Partial<Book>) {
    try {
      return await this.bookService.update(isbn13, body);
    } catch (error) {
      throw mapError(error);
    }
  }

  @Delete(':isbn13')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('isbn13') isbn13: string) {
    try {
      await this.bookService.delete(isbn13);
    } catch (error) {
      throw mapError(error);
    }
  }
}

function mapError(error: unknown): HttpException {
  const message = error instanceof Error ? error.message : 'Unexpected error.';
  if (message.toLowerCase().includes('not found')) {
    return new HttpException(message, HttpStatus.NOT_FOUND);
  }
  return new HttpException(message, HttpStatus.BAD_REQUEST);
}