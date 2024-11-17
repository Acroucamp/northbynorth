import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  /**
   * Creates a new product.
   * @param createProductDto - Data transfer object containing product information.
   * @returns The created product.
   */
  async createProduct(createProductDto: CreateProductDto): Promise<Product> {
    const product = this.productRepository.create(createProductDto); // Create a new product instance
    return this.productRepository.save(product); // Save the product to the database
  }

  /**
   * Retrieves a list of all products.
   * @returns List of products.
   * @throws NotFoundException if no products are found.
   */
  async getProducts(): Promise<Product[]> {
    const products = await this.productRepository.find();

    if (!products || products.length === 0) {
      throw new NotFoundException('No products found');
    }

    return products;
  }

  /**
   * Retrieves a product by its ID.
   * @param product_id - The ID of the product.
   * @returns The product corresponding to the provided ID.
   * @throws NotFoundException if no product is found.
   */
  async getProductById(product_id: string): Promise<Product> {
    const product = await this.productRepository.findOne({
      where: { product_id: product_id },
    });

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    return product;
  }

  /**
   * Updates an existing product by ID.
   * @param product_id - The ID of the product to be updated.
   * @param updateProductDto - The DTO containing the updated product data.
   * @returns The updated product.
   * @throws NotFoundException if the product is not found.
   */
  async updateProduct(
    product_id: string,
    updateProductDto: UpdateProductDto,
  ): Promise<Product> {
    const product = await this.productRepository.findOne({
      where: { product_id: product_id },
    });

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    // Update the product details with the new data
    Object.assign(product, updateProductDto);

    return this.productRepository.save(product);
  }

  /**
   * Deletes a product by its ID.
   * @param product_id - The ID of the product to be deleted.
   * @throws NotFoundException if the product is not found.
   */
  async deleteProduct(product_id: string): Promise<void> {
    const product = await this.productRepository.findOne({
      where: { product_id: product_id },
    });

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    await this.productRepository.remove(product);
  }
}
