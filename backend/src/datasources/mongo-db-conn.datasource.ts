import {inject, lifeCycleObserver, LifeCycleObserver} from '@loopback/core';
import {juggler} from '@loopback/repository';

const config = {
  name: 'MongoDb_CONN',
  connector: 'mongodb',
  url: 'mongodb+srv://Kilomaru:Aguz..625a_C@cluster0.fwdidnr.mongodb.net/?retryWrites=true&w=majorty',
  host: 'localhost',
  port: 27017,
  user: 'Kilomaru',
  password: 'Aguz..625a_C',
  database: 'Examen',
  useNewUrlParser: true
};

// Observe application's life cycle to disconnect the datasource when
// application is stopped. This allows the application to be shut down
// gracefully. The `stop()` method is inherited from `juggler.DataSource`.
// Learn more at https://loopback.io/doc/en/lb4/Life-cycle.html
@lifeCycleObserver('datasource')
export class MongoDbConnDataSource extends juggler.DataSource
  implements LifeCycleObserver {
  static dataSourceName = 'MongoDb_CONN';
  static readonly defaultConfig = config;

  constructor(
    @inject('datasources.config.MongoDb_CONN', {optional: true})
    dsConfig: object = config,
  ) {
    super(dsConfig);
  }
}
