import {Entity, model, property, hasMany} from '@loopback/repository';
import {DetalleFactura} from './detalle-factura.model';

@model()
export class Factura extends Entity {
  @property({
    type: 'any',
    id: true,
    generated: true,
  })
  id?: any;

  @property({
    type: 'number',
    required: true,
  })
  correlativo: number;

  @property({
    type: 'date',
    required: true,
  })
  fecha: string;

  @property({
    type: 'string',
    required: true,
  })
  cliente: string;

  @property({
    type: 'string',
    required: true,
  })
  direccion: string;

  @property({
    type: 'string',
    required: true,
  })
  telefono: string;

  @property({
    type: 'string',
  })
  email?: string;

  @hasMany(() => DetalleFactura)
  detalleFacturas: DetalleFactura[];

  constructor(data?: Partial<Factura>) {
    super(data);
  }
}

export interface FacturaRelations {
  // describe navigational properties here
}

export type FacturaWithRelations = Factura & FacturaRelations;
