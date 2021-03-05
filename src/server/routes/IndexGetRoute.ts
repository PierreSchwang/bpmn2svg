import {Handler} from 'express';
import BpmnToSvg from "../../BpmnToSvg";

export const IndexGetRoute = (application: BpmnToSvg): Handler => {

    return async (req, res) => {
        try {
            const xml = Buffer.from(req.params.base64, 'base64').toString('utf-8')
            const converter = await application.getConverters().acquire();
            const svg = await converter.convert(application, xml);
            res.type('image/svg+xml').status(200).send(svg);
        } catch (e) {
            res.status(400).send(e);
        }
    }

}
