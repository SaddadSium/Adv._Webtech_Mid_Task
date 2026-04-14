import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, ILike } from 'typeorm';
import { Products } from './entities/products.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PartialUpdateProductDto } from './dto/partial-update-product.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Products)
    private readonly productsRepo: Repository<Products>,
  ) {}

  async create(dto: CreateProductDto) {
    const product = this.productsRepo.create(dto);
    const savedProduct = await this.productsRepo.save(product);
    return {
      message: 'Product created successfully',
      data: savedProduct,
    };
  }

  async findAll() {
    const [products, count] = await this.productsRepo.findAndCount({
      order: { createdAt: 'DESC' },
    });
    return {
      message: 'All products fetched',
      count,
      data: products,
    };
  }

  async findOne(id: number) {
    const product = await this.productsRepo.findOne({ where: { id } });
    if (!product) {
      throw new NotFoundException(`Product with id ${id} not found`);
    }
    return {
      message: 'Product found',
      data: product,
    };
  }

  async update(id: number, dto: PartialUpdateProductDto) {
    const product = await this.findOne(id);
    const updated = await this.productsRepo.save({
      ...product.data,
      ...dto,
    });
    return {
      message: 'Product updated successfully (PATCH)',
      data: updated,
    };
  }

  async replace(id: number, dto: UpdateProductDto) {
    const product = await this.findOne(id);
    const updated = await this.productsRepo.save({
      ...product.data,
      ...dto,
    });
    return {
      message: 'Product fully replaced (PUT)',
      data: updated,
    };
  }

  async remove(id: number) {
    const product = await this.findOne(id);
    await this.productsRepo.remove(product.data);
    return {
      message: 'Product deleted successfully',
      id,
    };
  }

  async findByCategory(category: string) {
    const [products, count] = await this.productsRepo.findAndCount({
      where: { category },
    });
    return {
      message: `Products in category: ${category}`,
      count,
      data: products,
    };
  }

  async search(keyword: string) {
    const [products, count] = await this.productsRepo.findAndCount({
      where: { name: ILike(`%${keyword}%`) },
    });
    return {
      message: `Search results for: ${keyword}`,
      count,
      data: products,
    };
  }

  async toggleActive(id: number) {
    const product = await this.findOne(id);
    product.data.isActive = !product.data.isActive;
    const updated = await this.productsRepo.save(product.data);
    return {
      message: 'Product status toggled',
      data: updated,
    };
  }
}
