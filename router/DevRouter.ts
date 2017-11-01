// Imports
import { Router, Request, Response } from 'express';


export class DevRouter {

    router: Router;

    constructor() {
        this.router = Router();
        this.routes();
    };


    // Documentation
    public dev(req: Request, res: Response): void {
        res.sendFile(__dirname + '/index.html')
    };


    // Routes
    routes() {
        this.router.get('/', this.dev);
    };
};


const devRoutes = new DevRouter();
devRoutes.routes();


// Export
export default devRoutes.router;