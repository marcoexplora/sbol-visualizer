const xmlHandler = {
    convertXml: (xml) => {
        const sbolDataLayer = {}
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(xml, "text/xml");

        sbolDataLayer.header = {
            partID: xmlHandler.xmlFind(xmlDoc, "sbol:displayId"),
            name: xmlHandler.xmlFind(xmlDoc, "dcterms:title"),
            alternativeName: xmlHandler.xmlFind(xmlDoc, "dcterms:description"),
            version: xmlHandler.xmlFind(xmlDoc, "sbol:version"),
            creator: xmlHandler.xmlFind(xmlDoc, "dc:creator"),
            parentSequence: xmlHandler.xmlFind(xmlDoc, "sbh:mutableProvenance"),
        };
        sbolDataLayer.annotations = [];

        const dnaComponents = xmlDoc.getElementsByTagName(
            "sbol:SequenceAnnotation"
        );
        const annotations = [];
        const ids = []
        for (let i = 0; i < dnaComponents.length; i++) {
            const component = dnaComponents[i];
            const role = xmlHandler.xmlFind(component, "sbol:role", "rdf:resource");
            const sbolIndex = xmlHandler.xmlFind(component, "sbol:displayId");
            if (!ids.includes(sbolIndex)) {
                ids.push(sbolIndex)

                const directionResource = xmlHandler.xmlFind(component, "sbol:orientation", "rdf:resource")

                // https://dissys.github.io/sbol-owl/sbol-owl.html#Orientation
                // inline c, reverseComplement c
                // <sbol:orientation rdf:resource="http://sbols.org/v2#inline"/>
                let direction = "--";
                if (directionResource == "http://sbols.org/v2#inline") {
                    direction = 'FW'
                }
                if (directionResource == "http://sbols.org/v2#reverseComplement") {
                    direction = 'BW'
                }
                console.log(`directionResource${directionResource}`)


                const index = `${i}_${sbolIndex}`;

                //                 console.log(`
                // i : ${i},
                // role : ${role}
                // sbolIndex : ${sbolIndex}
                // displayIdposition : 
                // index : ${index},
                // pd : ${xmlHandler.extractIndexVal(sbolIndex)}

                //             `);

                const dataLayerSingleComponent = {
                    SBOL: xmlHandler.extractSO(role),
                    direction: direction,
                    start: xmlHandler.xmlFind(component, "sbol:start"),
                    end: xmlHandler.xmlFind(component, "sbol:end"),
                    index: xmlHandler.extractIndexVal(sbolIndex),
                    name: xmlHandler.xmlFind(component, "sbol:displayId"),
                    notes: "",
                    pk: xmlHandler.extractIndexVal(sbolIndex),
                    role_id: 0,
                };
                annotations[ids.length - 1] = dataLayerSingleComponent;
            }
        }
        // Sorting by pk values
        sbolDataLayer.annotations = annotations
        console.log(annotations)
        return sbolDataLayer

    },
    xmlFallback: (parsedElement, fallbackString, attribute) => {
        if (typeof attribute == "undefined") {
            if (
                typeof parsedElement[0] == "undefined" ||
                typeof parsedElement[0].childNodes[0] == "undefined"
            ) {
                return fallbackString;
            } else {
                return parsedElement[0].childNodes[0].nodeValue;
            }
        } else {
            if (
                Object.prototype.toString.call(parsedElement) == "[object HTMLCollection]"
            ) {
                parsedElement = parsedElement[0];
            }
            if (typeof parsedElement != 'undefined' && parsedElement.hasAttribute(attribute)) {
                return parsedElement.attributes[attribute].value;
            } else {
                return fallbackString;
            }
        }
    },

    xmlFind: (ParseXml, elementTagName, attribute) => {
        return xmlHandler.xmlFallback(
            ParseXml.getElementsByTagName(elementTagName),
            "",
            attribute
        );
    },
    xmlFindAll: (ParseXml, elementTagName, attribute) => {

        const allDOMelement = ParseXml.getElementsByTagName(elementTagName);
        const result = []

        for (let i = 0; i < allDOMelement.length; i++) {
            const component = allDOMelement[i];
            result[i] = xmlHandler.xmlFallback(
                [component],
                "",
                attribute
            );

        }
        return result
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