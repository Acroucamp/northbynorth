import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { Product } from './entities/product.entity';
import { UpdateProductDto } from './dto/update-product.dto';
import { CreateProductDto } from './dto/create-product.dto';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  async createProduct(
    @Body() createProductDto: CreateProductDto,
  ): Promise<Product> {
    return await this.productService.createProduct(createProductDto);
  }

  @Get()
  async getProducts(): Promise<Product[]> {
    const products = await this.productService.getProducts();

    if (!products) {
      throw new NotFoundException('No products found');
    }

    return products;
  }

  @Get(':product_id')
  async getProductById(
    @Param('product_id', new ParseUUIDPipe()) product_id: string,
  ): Promise<Product> {
    const product = await this.productService.getProductById(product_id);

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    return product;
  }

  @Patch(':product_id')
  async updateProduct(
    @Param('product_id', new ParseUUIDPipe()) product_id: string,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    return await this.productService.updateProduct(
      product_id,
      updateProductDto,
    );
  }

  @Delete(':product_id')
  async deleteProduct(
    @Param('product_id', new ParseUUIDPipe()) product_id: string,
  ): Promise<void> {
    return await this.productService.deleteProduct(product_id);
  }
}
