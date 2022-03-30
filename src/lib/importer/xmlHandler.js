import SBOLDocument from 'sboljs';
import getDisplayList from "./getDisplayList"



const xmlHandler = {
    pupulateHeader: (doc)=> {

        //remove this before go to production
        window.sboljs_output = doc;

        const mainComponetDefinition = doc.componentDefinitions[0];
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

        if (visbolDisplayListElements.length > 0){
            return  visbolDisplayListElements.map(
                (component, index) => {


                    return {
                        log: "1a",
                        name: component.name,
                        propriety : component.propriety,
                        SBOL: component.propriety.sequenceOntology,
                        pk: `${index}`,
                        sbolDescription: component.Description,
                        mutableDescription: '',
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

                    try{
                        sbolDataLayer.header = xmlHandler.pupulateHeader(doc);
                        sbolDataLayer.annotations = [];
                        sbolDataLayer.annotations = xmlHandler.populateAnnotations(doc);
                        sbolDataLayer.sequence =  xmlHandler.extractSequence(doc);
                        window.sbolDataLayer = sbolDataLayer
                    }catch (error){
                        console.error(error)
                        reject("SbolJ has triggered and error")
                    }

                    resolve(sbolDataLayer)
                });

            }
        });
    },
    /**
     * Returns DNA sequence if in the list of sequences povided 'undefined' otherwise
     * @param {Array.<Object>} sequences from sbolJS obj
     * @returns {string} sequence or empty string if no DNA sequence is present
     */
    findEncodedSequence: (sequences) => {
        const sequence = sequences.find((seq) => {
            return seq._encoding._parts.path === '/iubmb/misc/naseq.html';
        });
        if (typeof sequence !== 'undefined') {
            return sequence._elements;
        }
        return '';
    },
    /**
     * return DNA sequence from a sbolJS object, or empty string if no DNA sequence is present
     * @param {<Object>}  doc sbolJS obj
     * @returns {string} sequence or empty string
     */
    extractSequence: (doc) => {
        let DNAsequence = '';
        if (doc._componentDefinitions.length > 0 && doc._componentDefinitions["0"]._sequences.length > 0) {
            // Search in TopLevel component a sequence with encoding DNA
            const mainComponentSequences = doc._componentDefinitions["0"]._sequences
            DNAsequence = xmlHandler.findEncodedSequence(mainComponentSequences);
        }
        if (doc._sequences.length > 0 && DNAsequence === '') {
            //  Search in sequences the sequence with encoding DNA
            DNAsequence = xmlHandler.findEncodedSequence(doc._sequences);
        }
        if (typeof DNAsequence !== 'undefined' && DNAsequence !== '') {
            return DNAsequence;
        } else {
            return '';
        }
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