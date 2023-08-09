import Product from "../../domain/entity/product";
import ProductRepositoryInterface from "../../domain/repository/product-repository.interface";
import ProductModel from "../db/sequelize/model/product.model";

export default class ProductRepository implements ProductRepositoryInterface {

	async create(entity: Product): Promise<void> {
		await ProductModel.create({
			id: entity.id,
			name: entity.name,
			price: entity.price
		})
	}

	async findAll(): Promise<Product[]> {
		const productModels = await ProductModel.findAll()
		return productModels.map(productModel => new Product(productModel.id, productModel.name, productModel.price))
	}

	async findById(id: string): Promise<Product | null> {
		const productModel = await ProductModel.findOne({ where: { id } })

		if (!productModel) {
			return null
		}

		return new Product(productModel.id, productModel.name, productModel.price)

	}

	async findByName(name: string): Promise<Product | null> {
		const productModel = await ProductModel.findOne({ where: { name } })

		if (!productModel) {
			return null
		}

		return new Product(productModel.id, productModel.name, productModel.price)
	}

	async update(entity: Product): Promise<void> {
		await ProductModel.update({
			name: entity.name,
			price: entity.price
		}, {
			where: { id: entity.id }
		})
	}

	async deleteById(id: string): Promise<void> {
		await ProductModel.destroy({ where: { id } })
	}




}