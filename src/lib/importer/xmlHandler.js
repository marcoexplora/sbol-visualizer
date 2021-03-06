import SBOLDocument from 'sboljs';

import {getDisplayListJson} from "visbol";
import sbolParser from './sbolParser';


const xmlHandler = {

    pupulateHeader: (doc) => {

        const mainComponetDefinition = doc.componentDefinitions[0];
        return {
            partID: mainComponetDefinition._displayId,
            name: mainComponetDefinition._name,
            alternativeName: "",
            version: mainComponetDefinition._version,
            creator: xmlHandler.queryAnnotation(mainComponetDefinition._annotations, 'http://purl.org/dc/elements/1.1/creator'),
            parentSequence: "sbh:mutableProvenance",
            persistentIdentity: mainComponetDefinition._persistentIdentity,
            wasDerivedFrom: "",
            wasGeneratedBy: "rdf:resource",
            mutableDescription: xmlHandler.queryAnnotation(mainComponetDefinition._annotations, 'http://wiki.synbiohub.org/wiki/Terms/synbiohub#mutableDescription'),
            ComponentSequences: mainComponetDefinition.sequences ? mainComponetDefinition.sequences : ""
        }
    },
    populateAnnotations: (doc) => {

        const visbolDisplayListElements = getDisplayListJson.getDisplayListJson(doc.componentDefinitions[0]).components[0].segments[0].sequence;

        const component = {
            segments: []
        }

        doc.componentDefinitions.forEach(function (componentDefinition) {
            component.segments = component.segments.concat(getDisplayListJson.getDisplayListJson(componentDefinition).components[0].segments[0])
        })

        if (visbolDisplayListElements.length > 0) {
            return visbolDisplayListElements.map(
                (component, index) => {
                    return {
                        log: "1a",
                        name: component.name,
                        propriety: component.propriety,
                        SBOL: component.propriety.SO,
                        pk: `${index}`,
                        sbolDescription: component.Description,
                        mutableDescription: '',
                        isComposite: component.isComposite,
                    };
                }
            )
        }

    },
    convertXml: (xml) => {
        return new Promise((resolve, reject) => {
            {
                const sbolDataLayer = {}
                SBOLDocument.loadRDF(xml, function (err, doc) {

                    try {
                        sbolDataLayer.header = xmlHandler.pupulateHeader(doc);
                        sbolDataLayer.annotations = [];
                        sbolDataLayer.annotations = xmlHandler.populateAnnotations(doc);
                        sbolDataLayer.sequence = xmlHandler.extractSequence(doc);
                        sbolDataLayer.json = sbolParser.exportToJson(sbolDataLayer);

                    } catch (error) {
                        console.error(error)
                        reject("SbolJ has triggered and error")
                    }

                    resolve(sbolDataLayer)
                });

            }
        });
    },
    findEncodedSequence: sbolParser.findEncodedSequence,
    extractSequence: sbolParser.extractSequence,
    exportToJson: sbolParser.exportToJson,
    queryAnnotation: (Annontations, filter) => {
        const candidate = Annontations.filter((annotation) => {
            return annotation.name.indexOf(filter) !== -1
        })
        return candidate.length > 0 ? candidate[0].value : ""
    },
    isAvalidSingleComponent: (dataLayerSingleComponent) => {
        if (dataLayerSingleComponent.SBOL === "") {
            return false
        }

        return typeof dataLayerSingleComponent.SBOL !== undefined;

    },
    extractSO: (text) => {
        if (typeof text != 'undefined') {
            const match = text.toUpperCase().match(/([so:]+[\d]+)/gi)
            if (match != null) {
                return text.toUpperCase().match(/([so:]+[\d]+)/gi)[0];
            } else {
                return ""
            }
        }
    },
    extractIndexVal: text => {
        if (typeof text != 'undefined') {
            const num = text.toUpperCase().match(/([\d]+)/gi)
            if (num != null) {
                return num[0];
            }

        }
    }

}
export default xmlHandler