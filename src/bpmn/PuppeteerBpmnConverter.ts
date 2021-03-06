import IBpmnConverter from "./IBpmnConverter";

import {Browser, launch, Page} from "puppeteer";
import path from "path";
import BpmnToSvg from "../BpmnToSvg";

export default class PuppeteerBpmnConverter implements IBpmnConverter {

    private static indexPath = `file://${path.join(__dirname, '..', '..', 'static', 'render.html')}`;

    private browser: Browser | undefined;
    private application: BpmnToSvg;

    constructor(application: BpmnToSvg) {
        this.application = application;
    }

    public async buildBrowser() {
        const start = new Date().getMilliseconds();
        this.browser = await launch({
            args: [
                '--no-sandbox',
                '--disable-setuid-sandbox'
            ]
        });
        this.application.getLogger().debug(`Took ${
            new Date().getMilliseconds() - start
        }ms to start PuppeteerBpmnConverter instance`);
    }

    convert(application: BpmnToSvg, rawXml: string): Promise<String> {
        return new Promise<String>(async (resolve, reject) => {
            if (!this.browser) {
                application.getLogger().error("Broken BpmnConverter - Browser instance is null!")
                return reject("<text>No browser instance available to render bpmn model!</text>");
            }
            const start = new Date().getMilliseconds();
            let page: Page;
            try {
                page = await this.browser.newPage();
                await page.goto(PuppeteerBpmnConverter.indexPath);
                const response = page.$eval('#container', (container, bpmnXML, options) => {
                    container.innerHTML = bpmnXML as string;
                    /* global BpmnJS */
                    // @ts-ignore
                    const viewer = new BpmnJS({container});


                    return new Promise<string>((resolve, reject) => {
                        viewer.importXML(bpmnXML, (err: any) => {
                            if (err) {
                                return reject(err);
                            }
                            viewer.saveSVG((err: any, svg: any) => {
                                if (err) {
                                    return reject(err);
                                }
                                resolve(svg);
                            });
                        });
                    });
                }, rawXml, {});
                response
                    .catch(reason => {
                        application.getLogger().error('Failed to generate the bpmn model', reason)
                        reject('Couldn\'t evaluate bpmn viewer with provided data')
                    })
                    .then(value => resolve(value as string))
                    .finally(() => {
                        if (page) {
                            page.close();
                        }
                        application.getLogger().debug(`Generated bpmn svg model in ${
                            new Date().getMilliseconds() - start
                        }ms`);
                    })
            } catch (e) {
                application.getLogger().error(e);
                reject(e);
            }
        });
    }

}
