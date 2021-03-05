import HttpServer from "./server/HttpServer";
import Logger from "./logging/Logger";
import TypedPool from "./lib/TypedPool";
import IBpmnConverter from "./bpmn/IBpmnConverter";
import PuppeteerBpmnConverter from "./bpmn/PuppeteerBpmnConverter";

export default class BpmnToSvg {

    private readonly logger: Logger;
    private http: HttpServer | undefined;

    private readonly converters: TypedPool<IBpmnConverter>;

    constructor() {
        this.logger = new Logger();
        this.converters = new TypedPool<IBpmnConverter>(
            () => BpmnToSvg.createConverter(), 1, 10, () => {
                this.http = new HttpServer(this);
            })
    }

    public getLogger(): Logger {
        return this.logger;
    }

    private static createConverter(): Promise<IBpmnConverter> {
        return new Promise<IBpmnConverter>(async (resolve) => {
            const implementation = new PuppeteerBpmnConverter();
            await implementation.buildBrowser();
            resolve(implementation);
        });
    }

    public getConverters() {
        return this.converters;
    }

}
