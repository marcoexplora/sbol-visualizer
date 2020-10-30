import SBOLDocument from 'sboljs';
import getDisplayList from "./getDisplayList"


const xmlHandler = {
    pupulateHeader: (doc)=> {
        const mainComponetDefinition = doc.componentDefinitions[0];
        const annotations =  mainComponetDefinition._annotations
        return {
            partID: mainComponetDefinition._displayId,
            name: mainComponetDefinition._name,
            alternativeName: "",
            version: mainComponetDefinition._version,
            creator: xmlHandler.queryAnnotation(mainComponetDefinition._annotations,'http://purl.org/dc/elements/1.1/creator'),
            parentSequence: "sbh:mutableProvenance",
            persistentIdentity: mainComponetDefinition._persistentIdentity,
            wasDerivedFrom: "",
            wasGeneratedBy: "rdf:resource",
            mutableDescription: xmlHandler.queryAnnotation(mainComponetDefinition._annotations,'http://wiki.synbiohub.org/wiki/Terms/synbiohub#mutableDescription'),
            ComponentSequences : mainComponetDefinition.sequences ? mainComponetDefinition.sequences : ""
        }
    },
    populateAnnotations: (doc) => {

        const visbolDisplayListElements = getDisplayList(doc.componentDefinitions[0]).components[0].segments[0].sequence;

        const component = {
            segments: []
        }

        doc.componentDefinitions.forEach(function(componentDefinition) {
            component.segments = component.segments.concat(getDisplayList(componentDefinition).components[0].segments[0])
        })
        window.composedComponent = component;
        window.doc = doc;

        if (visbolDisplayListElements.length > 0){
            return  visbolDisplayListElements.map(
                (component, index) => {

                    /*
                            id: "https://synbiohub.org/public/igem/BBa_I20282/annotation1962295/1"
                            name: "BBa_B0034"
                            propriety:
                            Description: "RBS (Elowitz 1999) -- defines RBS efficiency"
                            Identifier: "BBa_B0034"
                            Name: "BBa_B0034"
                            Orientation: "inline"
                            Role: "ribosome_entry_site"
                            element: "Component"
                            end: 12
                            iGEM Part Type: "RBS"
                            sequenceOntology: "SO:0000139"
                            start: 1
                     */

                    return {
                        name: component.name,
                        SBOL: component.propriety.sequenceOntology,
                        start: component.propriety.start,
                        end: component.propriety.end,
                        pk: index,
                        index: index,
                        direction: component.propriety.Orientation === 'inline' ? 'FW' : 'RV',
                        sbolDescription: component.Description,
                        mutableDescription: ''
                    };
                }
            )
        }

        /*
            const dataLayerSingleComponent = {
                SBOL: xmlHandler.extractSO(role),
                direction: direction,
                start: xmlHandler.xmlFind(component, "sbol:start"),
                end: xmlHandler.xmlFind(component, "sbol:end"),
                index: xmlHandler.extractIndexVal(sbolIndex),
                name: sbolTitle,
                notes: "",
                pk: xmlHandler.extractIndexVal(sbolIndex),
                role_id: 0,
                sbolDescription :sbolDescription,
                mutableDescription : mutableDescription
            };
        */

    },
    convertXml: (xml) => {
        return new Promise((resolve, reject) => {
            {
                const sbolDataLayer = {}
                SBOLDocument.loadRDF(xml, function (err, doc) {
                    doc.serializeJSON();
                    sbolDataLayer.header = xmlHandler.pupulateHeader(doc);
                    sbolDataLayer.annotations = [];
                    sbolDataLayer.annotations = xmlHandler.populateAnnotations(doc);
                    window.sbolDataLayer = sbolDataLayer
                    resolve(sbolDataLayer)
                });

            }
        });
    },
    queryAnnotation : (Annontations,filter) => {
        const candidate = Annontations.filter( (annotation) => {
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