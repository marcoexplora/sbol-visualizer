import soToGlyphType from './soToGlyphType'
import soToGenBankName from './soToGenBankName'
import SBOLDocument from "sboljs";

const sbolParser = {
    /**
     * Returns SbolJs Javascript Obj parsed from file
     * @param {string} local SBOL.xml file
     * @returns {object} SbolJs parsed file
     */
    loadFile: (filePath) => {
        //loadRDF
        return new Promise((resolve, reject) => {
            SBOLDocument.loadRDFFile(filePath, function (err, doc) {
                resolve(doc)
            })
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
            DNAsequence = sbolParser.findEncodedSequence(mainComponentSequences);
        }
        if (doc._sequences.length > 0 && DNAsequence === '') {
            //  Search in sequences the sequence with encoding DNA
            DNAsequence = sbolParser.findEncodedSequence(doc._sequences);
        }
        if (typeof DNAsequence !== 'undefined' && DNAsequence !== '') {
            return DNAsequence;
        } else {
            return '';
        }
    },
    /**
     * return a JSON compatible with bio-parser
     * @param {Object}  sbolDataLayer obj
     * @returns {Object} Json compatible with bio-parsers
     */
    exportToJson: (sbolDataLayer) => {

        let result = {}

        if (typeof sbolDataLayer.header.name !== 'undefined') {
            result.name = sbolDataLayer.header.partID;
        }

        if (typeof sbolDataLayer.sequence !== 'undefined' && sbolDataLayer.sequence != '') {
            result.sequence = sbolDataLayer.sequence;
            result.size = result.sequence.length;
            result.cicular = 'false';
        }

        if (typeof sbolDataLayer.header.partID !== 'undefined') {
            result.partID = sbolDataLayer.header.partID;
        }

        if (typeof sbolDataLayer.header.mutableDescription !== 'undefined' && sbolDataLayer.header.mutableDescription !== '') {
            result.description = sbolDataLayer.header.mutableDescription;
        }

        const featuresExtract = (elementList, parent) => {
            let visit = [{
                id: `seq_${sbolDataLayer.header.partID}`,
                name: 'source',
                type: 'source',
                start: 0,
                end: result.sequence.length -1
            }];
            if (typeof parent == 'undefined') {
                parent = 'root';
            }

            for (let idx = 0; idx < elementList.length; idx++) {
                const el = elementList[idx];

                let index = el['index'];
                if (typeof index === 'undefined') {
                    index = `${idx}_${parent}_${el.name}_(${el.propriety.start | 0}..${el.propriety.end | 0})`
                }

                let strand = 1;
                // support modules
                if (typeof el.propriety.Feature != 'undefined' && el.propriety.Feature.Orientation !== 'inline') {
                    strand = -1;
                }
                // support modules
                const _start = typeof  el.propriety.Feature != 'undefined' ? el.propriety.Feature.Location.start -1 | 0 : 0
                const _end = typeof  el.propriety.Feature != 'undefined' ? el.propriety.Feature.Location.end -1 | 0 : 0
                visit.push({
                    id: index,
                    name: el.name,
                    description: soToGlyphType(el.SBOL),
                    type: soToGenBankName(el.SBOL),
                    strand: strand,
                    start: _start,
                    end: _end
                })

                if (el.propriety.hasOwnProperty('components') && el.propriety.components.length > 0) {
                    const childVisit = featuresExtract(el.propriety.components, el.name);
                    childVisit.forEach((el) => {
                        visit.push(el)
                    })
                }


            }

            return visit
        }
        if (typeof sbolDataLayer.annotations !== 'undefined' && sbolDataLayer.annotations !== '') {
            result.features = featuresExtract(sbolDataLayer.annotations)
        }

        return result
    }

}

export default sbolParser