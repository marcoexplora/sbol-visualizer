const sbolParser = {
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
     * return a JSON compatibel with bio-parser
     * @param {<Object>}  sbolDataLayer obj
     * @returns {Object} Json compatible with bio-parsers
     */
    exportToJson: (sbolDataLayer) => {

        let result = {}

        if(typeof sbolDataLayer.header.name != 'undefined'){
            result.name = sbolDataLayer.header.name;
        }

        if(typeof sbolDataLayer.sequence  != 'undefined' && sbolDataLayer.sequence !='' ){
            result.sequence = sbolDataLayer.sequence;
            result.size = result.sequence.length;
            result.cicular = 'false';
        }

        if(typeof sbolDataLayer.header.partID  != 'undefined' ){
            result.partID = sbolDataLayer.header.partID;
        }

        return result
    }

}

export default sbolParser