import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  DetalleFactura,
  Productos,
} from '../models';
import {DetalleFacturaRepository} from '../repositories';

export class DetalleFacturaProductosController {
  constructor(
    @repository(DetalleFacturaRepository) protected detalleFacturaRepository: DetalleFacturaRepository,
  ) { }

  @get('/detalle-facturas/{id}/productos', {
    responses: {
      '200': {
        description: 'Array of DetalleFactura has many Productos',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Productos)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: any,
    @param.query.object('filter') filter?: Filter<Productos>,
  ): Promise<Productos[]> {
    return this.detalleFacturaRepository.productos(id).find(filter);
  }

  @post('/detalle-facturas/{id}/productos', {
    responses: {
      '200': {
        description: 'DetalleFactura model instance',
        content: {'application/json': {schema: getModelSchemaRef(Productos)}},
      },
    },
  })
  async create(
    @param.path.any('id') id: typeof DetalleFactura.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Productos, {
            title: 'NewProductosInDetalleFactura',
            exclude: ['id'],
            optional: ['detalleFacturaId']
          }),
        },
      },
    }) productos: Omit<Productos, 'id'>,
  ): Promise<Productos> {
    return this.detalleFacturaRepository.productos(id).create(productos);
  }

  @patch('/detalle-facturas/{id}/productos', {
    responses: {
      '200': {
        description: 'DetalleFactura.Productos PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.any('id') id: any,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Productos, {partial: true}),
        },
      },
    })
    productos: Partial<Productos>,
    @param.query.object('where', getWhereSchemaFor(Productos)) where?: Where<Productos>,
  ): Promise<Count> {
    return this.detalleFacturaRepository.productos(id).patch(productos, where);
  }

  @del('/detalle-facturas/{id}/productos', {
    responses: {
      '200': {
        description: 'DetalleFactura.Productos DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.any('id') id: any,
    @param.query.object('where', getWhereSchemaFor(Productos)) where?: Where<Productos>,
  ): Promise<Count> {
    return this.detalleFacturaRepository.productos(id).delete(where);
  }
}
