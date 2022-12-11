import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MongoDbConnDataSource} from '../datasources';
import {DetalleFactura, DetalleFacturaRelations, Productos} from '../models';
import {ProductosRepository} from './productos.repository';

export class DetalleFacturaRepository extends DefaultCrudRepository<
  DetalleFactura,
  typeof DetalleFactura.prototype.id,
  DetalleFacturaRelations
> {

  public readonly productos: HasManyRepositoryFactory<Productos, typeof DetalleFactura.prototype.id>;

  constructor(
    @inject('datasources.MongoDb_CONN') dataSource: MongoDbConnDataSource, @repository.getter('ProductosRepository') protected productosRepositoryGetter: Getter<ProductosRepository>,
  ) {
    super(DetalleFactura, dataSource);
    this.productos = this.createHasManyRepositoryFactoryFor('productos', productosRepositoryGetter,);
    this.registerInclusionResolver('productos', this.productos.inclusionResolver);
  }
}
