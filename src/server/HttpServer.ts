import express from 'express';
import BpmnToSvg from "../BpmnToSvg";
import {IndexPostRoute} from "./routes/IndexPostRoute";
import {IndexGetRoute} from "./routes/IndexGetRoute";

export default class HttpServer {

    private readonly server: express.Express;
    private readonly port: number;
    private readonly host: string;

    private readonly application: BpmnToSvg;

    constructor(application: BpmnToSvg) {
        this.application = application;

        this.port = Number(process.env.HTTP_PORT) || 8080;
        this.host = process.env.HTTP_HOST || '0.0.0.0';
        this.server = express();
        this.injectLogger();
        this.rawBodyMiddlware();
        this.registerRoutes();
        this.bind();
    }

    public bind(): void {
        this.server.listen(this.port, this.host, () => {
            this.application.getLogger().info(`The http server is up and running on ${this.host}:${this.port}`)
        });
    }

    private registerRoutes() {
        this.server.get('/:base64', IndexGetRoute(this.application))
        this.server.post('/', IndexPostRoute(this.application))
    }

    private injectLogger() {
        this.server.use(this.application.getLogger().getExpressLogger());
    }

    private rawBodyMiddlware() {
        this.server.use(function(req, res, next) {
            req.body = '';
            req.setEncoding('utf8');

            req.on('data', function(chunk) {
                req.body += chunk;
            });

            req.on('end', function() {
                next();
            });
        });
    }

}
