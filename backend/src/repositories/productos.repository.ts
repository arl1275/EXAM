import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MongoDbConnDataSource} from '../datasources';
import {Productos, ProductosRelations} from '../models';

export class ProductosRepository extends DefaultCrudRepository<
  Productos,
  typeof Productos.prototype.id,
  ProductosRelations
> {
  constructor(
    @inject('datasources.MongoDb_CONN') dataSource: MongoDbConnDataSource,
  ) {
    super(Productos, dataSource);
  }
}
