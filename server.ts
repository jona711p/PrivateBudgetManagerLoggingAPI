// Imports
import * as bodyParser from 'body-parser';
import * as compression from 'compression';
import * as cookieParser from 'cookie-parser';
import * as cors from 'cors';
import * as express from 'express';
import * as logger from 'morgan';
import * as helmet from 'helmet';
import * as mongoose from 'mongoose';


// Import our Routers/Controllers
import LogRouter from './router/LogRouter';


class Server {

  // Set app to be of Type Express.Application
  public app: express.Application;

  constructor() {
    this.app = express();
    this.config();
    this.routes();
  };


  // Application Config
  public config(): void {


    // Init MongoDB
    const MONGO_URI: string = 'mongodb://localhost/privatebudgetmanagerloggingapi';
    mongoose.connect(process.env.MONGODB_URI || MONGO_URI);


    // Express Middleware
    this.app.use(bodyParser.urlencoded({ extended: true }));
    this.app.use(bodyParser.json());
    this.app.use(compression());
    this.app.use(cookieParser());
    this.app.use(cors());
    this.app.use(logger('dev'));
    this.app.use(helmet());


    // Cors
    this.app.use((req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
      res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization, Access-Control-Allow-Credentials');
      res.header('Access-Control-Allow-Credentials', 'true');
      next();
    });
  };


  // Application Routes
  public routes(): void {
    const router: express.Router = express.Router();

    this.app.use('/', router);
    this.app.use('/logs', LogRouter);
  };
};


// Export
export default new Server().app;