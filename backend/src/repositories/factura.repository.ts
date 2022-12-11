import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MongoDbConnDataSource} from '../datasources';
import {Factura, FacturaRelations, DetalleFactura} from '../models';
import {DetalleFacturaRepository} from './detalle-factura.repository';

export class FacturaRepository extends DefaultCrudRepository<
  Factura,
  typeof Factura.prototype.id,
  FacturaRelations
> {

  public readonly detalleFacturas: HasManyRepositoryFactory<DetalleFactura, typeof Factura.prototype.id>;

  constructor(
    @inject('datasources.MongoDb_CONN') dataSource: MongoDbConnDataSource, @repository.getter('DetalleFacturaRepository') protected detalleFacturaRepositoryGetter: Getter<DetalleFacturaRepository>,
  ) {
    super(Factura, dataSource);
    this.detalleFacturas = this.createHasManyRepositoryFactoryFor('detalleFacturas', detalleFacturaRepositoryGetter,);
    this.registerInclusionResolver('detalleFacturas', this.detalleFacturas.inclusionResolver);
  }
}
