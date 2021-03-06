import {Handler} from 'express';
import BpmnToSvg from "../../BpmnToSvg";
import {UploadedFile} from "express-fileupload";

export const IndexPostRoute = (application: BpmnToSvg): Handler => {

    return async (req, res) => {
        let xml;

        let file;
        for(const fileName in req.files) {
            file = (req.files[fileName] as UploadedFile);
            break;
        }

        if (file) {
            application.getLogger().debug((file as UploadedFile).name);
            xml = (file as UploadedFile).data.toString('utf-8');
        }

        if (!xml && req.body) {
            const contentType = req.header('Content-Type');
            if (['text/plain', 'application/xml', 'text/xml'].indexOf(contentType as string) === -1) {
                return res.status(400).send('Invalid Content-Type Header!');
            }
            xml = (req.body as Buffer).toString('utf-8');
        }

        if (!xml) {
            return res.status(400).send('Missing payload (body / file)!');
        }
        try {
            const converter = await application.getConverters().acquire();
            const svg = await converter.convert(application, xml);
            application.getConverters().release(converter);
            res.type('image/svg+xml').status(200).send(svg);
        } catch (e) {
            res.status(400)
                .type('image/svg+xml')
                .send(`<text>An error occurred while generating the BPMN model (${e})</text>`);
        }

    }

}
