import {Handler} from 'express';
import BpmnToSvg from "../../BpmnToSvg";

export const IndexPostRoute = (application: BpmnToSvg): Handler => {

    return async (req, res) => {
        const body = req.body;
        if (body === '') {
            return res.status(400).send('Missing body payload!');
        }
        try {
            const converter = await application.getConverters().acquire();
            const svg = await converter.convert(application, body);
            res.type('image/svg+xml').status(200).send(svg);
        } catch (e) {
            res.status(400).send(e);
        }
    }

}
