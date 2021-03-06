import {Handler} from 'express';
import BpmnToSvg from "../../BpmnToSvg";

export const IndexGetRoute = (application: BpmnToSvg): Handler => {

    /**
     * Check if the passed text is base64 encoded
     * Because Buffer#from with base64 ignores all non base64 characters, toString('base64') on the decoded text
     * will return a different text if there are any non-valid characters for base64.
     * @param text The text to check against base64.
     */
    const isBase64 = (text: string): boolean => {
        return Buffer.from(text, 'base64').toString('base64') === text;
    }

    return async (req, res) => {
        try {
            if(!isBase64(req.params.base64)) {
                return res.status(400).send('Passed parameter is invalid base64!');
            }
            const xml = Buffer.from(req.params.base64, 'base64').toString('utf-8')
            const converter = await application.getConverters().acquire();
            const svg = await converter.convert(application, xml);
            application.getConverters().release(converter);
            res.type('image/svg+xml').status(200).send(svg);
        } catch (e) {
            res.status(400).send(e);
        }
    }

}
