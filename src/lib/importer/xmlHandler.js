import SBOLDocument from 'sboljs';
import getDisplayList from "./getDisplayList"


const xmlHandler = {
    pupulateHeader: (doc)=> {
        const mainComponetDefinition = doc.componentDefinitions[0];

        return {
            partID: mainComponetDefinition._displayId,
            name: mainComponetDefinition._name,
            alternativeName: "",
            version: mainComponetDefinition._version,
            creator: "",
            parentSequence: "sbh:mutableProvenance",
            persistentIdentity: "sbol:persistentIdentity -- rdf:resource",
            wasDerivedFrom: "",
            wasGeneratedBy: "rdf:resource",
            mutableDescription: mainComponetDefinition._description
        }
    },
    populateAnnotations: (doc) => {
        const visbolDisplayListElements = getDisplayList(doc.componentDefinitions[0]).components[0].segments[0].sequence;
        //window.visbolDisplayListElements =  getDisplayList(doc.componentDefinitions[4])
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
    convertXml: (xml) => new Promise((resolve,reject) => {
        {
            const sbolDataLayer = {}
            SBOLDocument.loadRDF(xml, function(err, doc) {
                doc.serializeJSON();
                sbolDataLayer.header = xmlHandler.pupulateHeader(doc);
                sbolDataLayer.annotations = [];
                sbolDataLayer.annotations = xmlHandler.populateAnnotations(doc);

                resolve(sbolDataLayer)
            });

        }
    }),
    old_convertXml: (xml) => {
        const sbolDataLayer = {}

        SBOLDocument.loadRDF(xml, function(err, doc) {
            window.SBOL = doc;

            sbolDataLayer.header = xmlHandler.pupulateHeader(doc);
            sbolDataLayer.annotations = [];
            sbolDataLayer.annotations = xmlHandler.populateAnnotations(doc)

        })

        return sbolDataLayer


        /*
        const sbolDataLayer = {}
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(xml, "text/xml");

        const ComponentDefinition = xmlDoc.getElementsByTagName(
            "sbol:ComponentDefinition"
        )[0];

        sbolDataLayer.header = {
            partID: xmlHandler.xmlFind(ComponentDefinition, "sbol:displayId"),
            name: xmlHandler.xmlFind(ComponentDefinition, "dcterms:title"),
            alternativeName: xmlHandler.xmlFind(ComponentDefinition, "dcterms:description"),
            version: xmlHandler.xmlFind(ComponentDefinition, "sbol:version"),
            creator: xmlHandler.xmlFind(ComponentDefinition, "dc:creator"),
            parentSequence: xmlHandler.xmlFind(ComponentDefinition, "sbh:mutableProvenance"),
            persistentIdentity: xmlHandler.xmlFind(ComponentDefinition, "sbol:persistentIdentity", "rdf:resource"),
            wasDerivedFrom: xmlHandler.xmlFind(ComponentDefinition, "prov:wasDerivedFrom", "rdf:resource"),
            wasGeneratedBy: xmlHandler.xmlFind(ComponentDefinition, "prov:wasGeneratedBy", "rdf:resource"),
            mutableDescription: xmlHandler.xmlFind(ComponentDefinition, "sbh:mutableDescription"),
        };

        sbolDataLayer.annotations = [];
        sbolDataLayer.annotations = xmlHandler.SequenceAnnotation(ComponentDefinition, xmlDoc)
        */

    },
    isAvalidSingleComponent: (dataLayerSingleComponent) => {
        if (dataLayerSingleComponent.SBOL === "") {
            return false
        }

        return typeof dataLayerSingleComponent.SBOL !== undefined;

    },
    debug: (value) => {
      console.log(value)
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