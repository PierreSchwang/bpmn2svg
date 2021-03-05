import BpmnToSvg from "../BpmnToSvg";

export default interface IBpmnConverter {

    /**
     * Internal logic for converting the bpmn model to a pretty svg.
     * The returned value must be an svg in xml.
     * @param application The base application
     * @param rawXml The raw xml of the bpmn model.
     */
    convert(application: BpmnToSvg, rawXml: string): Promise<String>;

}
