import {Entity, model, property, hasMany, belongsTo} from '@loopback/repository';
import { Factura } from './factura.model';
import {Productos} from './productos.model';

@model({settings: {strict: false}})
export class DetalleFactura extends Entity {
  @property({
    type: 'any',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  facturaID: string;

  @property({
    type: 'string',
    required: true,
  })
  ProductoID: string;

  @property({
    type: 'number',
    required: true,
  })
  cantidad: number;

  @belongsTo(()=>Factura)
  facturaId : string;

  @belongsTo(()=> Productos)
  producstos : string;

  constructor (data?: Partial<DetalleFactura>){
    super(data);
  }
}

export interface DetalleFacturaRelations {
  // describe navigational properties here
}

export type DetalleFacturaWithRelations = DetalleFactura & DetalleFacturaRelations;
