// Imports
import { Router, Request, Response } from 'express';
import Log from '../models/Log';


// LogRouter
export class LogRouter {

  router: Router;

  constructor() {
    this.router = Router();
    this.routes();
  };


  // Get all of the Logs in the Database
  public all(req: Request, res: Response): void {
    Log.find()
      .then((data) => {
        res.status(200).json({ data });
      })
      .catch((error) => {
        res.json({ error });
      })
  };


  // Get a single Log by 'Id'
  public one(req: Request, res: Response): void {
    const id: string = req.params.Id;

    Log.findOne({ id })
      .then((data) => {
        res.status(200).json({ data });
      })
      .catch((error) => {
        res.status(500).json({ error });
      })
  };


  // Create a new Log
  public create(req: Request, res: Response): void {
    const user: string = req.body.user;
    const statusCode: string = req.body.statusCode;
    const logEntry: string = req.body.logEntry;

    if (!user || !logEntry) {
      res.status(422).json({ message: 'All Fields Required.' });
    }

    const log = new Log({
      user,
      statusCode,
      logEntry
    });

    log.save()
      .then((data) => {
        res.status(201).json({ data });
      })
      .catch((error) => {
        res.status(500).json({ error });
      })
  };


  // Update log by 'Id'
  public update(req: Request, res: Response): void {
    const id: string = req.body.id;

    Log.findOneAndUpdate({ id }, req.body)
      .then((data) => {
        res.status(200).json({ data });
      })
      .catch((error) => {
        res.status(500).json({ error });
      })
  };


  // Delete log by 'Id'
  public delete(req: Request, res: Response): void {
    const id: string = req.body.id;

    Log.findOneAndRemove({ id })
      .then(() => {
        res.status(204).end();
      })
      .catch((error) => {
        res.status(500).json({ error });
      })
  };


  // Get all of the Logs in the Database for one Day
  public day(req: Request, res: Response): void {
    Log.find({ timestamp: { $lte: new Date(), $gte: new Date(new Date().setDate(new Date().getDate() - 1)) } })
      .then((data) => {
        res.status(200).json({ data });
      })
      .catch((error) => {
        res.json({ error });
      })
  };


  // Get all of the Logs in the Database for one Week
  public week(req: Request, res: Response): void {
    Log.find({ timestamp: { $lte: new Date(), $gte: new Date(new Date().setDate(new Date().getDate() - 7)) } })
      .then((data) => {
        res.status(200).json({ data });
      })
      .catch((error) => {
        res.json({ error });
      })
  };


  // Get all of the Logs in the Database for one Month
  public month(req: Request, res: Response): void {
    Log.find({ timestamp: { $lte: new Date(), $gte: new Date(new Date().setDate(new Date().getDate() - 31)) } })
      .then((data) => {
        res.status(200).json({ data });
      })
      .catch((error) => {
        res.json({ error });
      })
  };


  // Routes
  routes() {
    this.router.get('/', this.all);
    this.router.get('/:id', this.one);
    this.router.post('/', this.create);
    this.router.put('/:id', this.update);
    this.router.delete('/:id', this.delete);
    this.router.get('/day', this.day);
    this.router.get('/week', this.week);
    this.router.get('/month', this.month);
  };
};


const logRoutes = new LogRouter();
logRoutes.routes();


// Export
export default logRoutes.router;