const xmlHandler = {
    convertXml: (xml) => {
        const sbolDataLayer = {}
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(xml, "text/xml");
        window.xmlDoc = xmlDoc;
        sbolDataLayer.header = {
            partID: xmlHandler.xmlFind(xmlDoc, "sbol:displayId"),
            name: xmlHandler.xmlFind(xmlDoc, "dcterms:title"),
            alternativeName: xmlHandler.xmlFind(xmlDoc, "dcterms:description"),
            version: xmlHandler.xmlFind(xmlDoc, "sbol:version"),
            creator: xmlHandler.xmlFind(xmlDoc, "dc:creator"),
            parentSequence: xmlHandler.xmlFind(xmlDoc, "sbh:mutableProvenance"),
            persistentIdentity: xmlHandler.xmlFind(xmlDoc, "sbol:persistentIdentity", "rdf:resource"),
            wasDerivedFrom: xmlHandler.xmlFind(xmlDoc, "prov:wasDerivedFrom", "rdf:resource"),
            wasGeneratedBy: xmlHandler.xmlFind(xmlDoc, "prov:wasGeneratedBy", "rdf:resource"),
        };

        sbolDataLayer.annotations = [];

        const dnaComponents = xmlDoc.getElementsByTagName(
            "sbol:SequenceAnnotation"
        );
        const annotations = [];
        const ids = []
        for (let i = 0; i < dnaComponents.length; i++) {
            const component = dnaComponents[i];
            // <sbol:definition rdf:resource="https://synbiohub.org/public/igem/BBa_B0034/1"/>
            //    -->  <sbol:ComponentDefinition rdf:about="https://synbiohub.org/public/igem/BBa_I20282/1">
            //
            const sboldetails = xmlHandler.xmlFind_startWith(component, "sbol:definition", "rdf:resource", "https://synbiohub.org/public/igem/");

            const role = xmlHandler.xmlFind_startWith(component, "sbol:role", "rdf:resource", "http://identifiers.org/so/SO:");

            const sbolIndex = xmlHandler.xmlFind(component, "sbol:displayId");
            if (!ids.includes(sbolIndex)) {
                ids.push(sbolIndex)

                const directionResource = xmlHandler.xmlFind(component, "sbol:orientation", "rdf:resource")

                let direction = "--";
                if (directionResource == "http://sbols.org/v2#inline") {
                    direction = 'FW'
                }
                if (directionResource == "http://sbols.org/v2#reverseComplement") {
                    direction = 'RV'
                }
                console.log(`directionResource${directionResource}`)

                console.log(`
                i : ${i},
                role : ${role}
                sbolIndex : ${sbolIndex}
                displayIdposition : 
                directionResource : ${directionResource},
                pd : ${xmlHandler.extractIndexVal(sbolIndex)}

                            `);

                const dataLayerSingleComponent = {
                    SBOL: xmlHandler.extractSO(role),
                    direction: direction,
                    start: xmlHandler.xmlFind(component, "sbol:start"),
                    end: xmlHandler.xmlFind(component, "sbol:end"),
                    index: xmlHandler.extractIndexVal(sbolIndex),
                    name: xmlHandler.xmlFind(component, "dcterms:title"),
                    notes: "",
                    pk: xmlHandler.extractIndexVal(sbolIndex),
                    role_id: 0,
                };
                if (xmlHandler.isAvalidSingleComponent(dataLayerSingleComponent)) {
                    annotations.push(dataLayerSingleComponent);
                }
            }
        }
        // Sorting by pk values
        sbolDataLayer.annotations = annotations
        return sbolDataLayer

    },
    isAvalidSingleComponent: (dataLayerSingleComponent) => {
        if (dataLayerSingleComponent.SBOL == "") {
            return false
        }

        if (typeof dataLayerSingleComponent.SBOL == undefined) {
            return false
        }
        return true
    },
    xmlFallback: (parsedElement, fallbackString, attribute) => {

        if (
            Object.prototype.toString.call(parsedElement) == "[object HTMLCollection]"
        ) {
            parsedElement = parsedElement[0];
        }


        if (typeof attribute === "undefined") {
            if (
                typeof parsedElement === "undefined" ||
                typeof parsedElement.childNodes[0] === "undefined"
            ) {
                return fallbackString;
            } else {
                return parsedElement.childNodes[0].nodeValue;
            }
        } else {

            if (typeof parsedElement != 'undefined' && parsedElement.hasAttribute(attribute)) {
                return parsedElement.attributes[attribute].value;
            } else {
                return fallbackString;
            }
        }
    },
    testElement: (parsedElement, attribute) => {

        if (
            Object.prototype.toString.call(parsedElement) == "[object HTMLCollection]"
        ) {
            parsedElement = parsedElement[0];
        }


        if (typeof attribute === "undefined") {
            if (
                typeof parsedElement === "undefined" ||
                typeof parsedElement.childNodes[0] === "undefined"
            ) {
                return false
            } else {
                return true
            }
        } else {

            if (typeof parsedElement != 'undefined' && parsedElement.hasAttribute(attribute)) {
                return true
            } else {
                return false
            }
        }
    },
    xmlFind_startWith: (ParseXml, elementTagName, attribute, startWith) => {
        return xmlHandler.xmlFindAll_startWith(ParseXml, elementTagName, attribute, startWith)[0]
    },
    xmlFindAllElement_startWith: (ParseXml, elementTagName, attribute, startWith) => {

        const allDOMelement = ParseXml.getElementsByTagName(elementTagName);
        const result = []

        for (let i = 0; i < allDOMelement.length; i++) {
            const component = allDOMelement[i];
            const proposed = xmlHandler.xmlFallback(
                component,
                "",
                attribute
            );
            if (proposed.startsWith(startWith)) {
                result.push(component)
            }


        }
        return result
    },
    xmlFindElement_startWith: (ParseXml, elementTagName, attribute, startWith) => {
        return xmlHandler.xmlFindAllElement_startWith(ParseXml, elementTagName, attribute, startWith)[0]
    },
    xmlFindAll_startWith: (ParseXml, elementTagName, attribute, startWith) => {

        const allDOMelement = ParseXml.getElementsByTagName(elementTagName);
        const result = []

        for (let i = 0; i < allDOMelement.length; i++) {
            const component = allDOMelement[i];
            const proposed = xmlHandler.xmlFallback(
                component,
                "",
                attribute
            );
            if (proposed.startsWith(startWith)) {
                result.push(proposed)
            }


        }
        return result
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
            const proposed = xmlHandler.xmlFallback(
                component,
                "",
                attribute
            );
            result.push(proposed)

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