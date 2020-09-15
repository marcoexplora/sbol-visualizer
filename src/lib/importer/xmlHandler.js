const xmlHandler = {
    convertXml: (xml) => {
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
        };

        sbolDataLayer.annotations = [];
        sbolDataLayer.annotations = xmlHandler.SequenceAnnotation(ComponentDefinition, xmlDoc)

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
    SequenceAnnotation: (ComponentDefinition, xmlDoc) => {
        const annotations = [];
        const ids = [];



        // Handle sbol:Component
        const dnaComponents = ComponentDefinition.getElementsByTagName(
            "sbol:Component"
        );

        const ExternalData = []

        for (let i = 0; i < dnaComponents.length; i++) {
            const definition_id = xmlHandler.xmlFind_startWith(dnaComponents[i], "sbol:definition", "rdf:resource", "https://synbiohub.org/public/igem/");
            const ElemComponentDefinition = xmlHandler.xmlFindElement_startWith(xmlDoc, "sbol:ComponentDefinition", "rdf:about", definition_id);
            const ExternalSO = xmlHandler.xmlFind_startWith(ElemComponentDefinition, "sbol:role", "rdf:resource", "http://identifiers.org/so/SO:")
            const ExternalIndex = xmlHandler.xmlFind(ElemComponentDefinition, "sbol:displayId");

            ExternalData[ExternalIndex] = ({
                'displayId': ExternalIndex,
                'role': ExternalSO,
                'sbol': xmlHandler.extractSO(ExternalSO)
            });
        }

        // handle sbol:SequenceAnnotation
        const SequenceAnnotation = ComponentDefinition.getElementsByTagName(
            "sbol:SequenceAnnotation"
        );

        for (let i = 0; i < SequenceAnnotation.length; i++) {
            const component = SequenceAnnotation[i];

            let role = "SO:0000110";
            const seqAnnRole = xmlHandler.xmlFind_startWith(component, "sbol:role", "rdf:resource", "http://identifiers.org/so/SO:");

            const sbolIndex = xmlHandler.xmlFind(component, "sbol:displayId");
            const sbolTitle = xmlHandler.xmlFind(component, "dcterms:title");

            if (typeof seqAnnRole == 'undefined' && typeof ExternalData[sbolTitle].role === 'string') {
                role = ExternalData[sbolTitle].role
            } else if (typeof seqAnnRole == 'string') {
                role = seqAnnRole;
            }


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
                };
                if (xmlHandler.isAvalidSingleComponent(dataLayerSingleComponent)) {
                    annotations.push(dataLayerSingleComponent);
                }
            }
        }
        // sorted by start
        const sortedAnnotations = annotations.sort((a, b) => {
            return a.start - b.start
        })
        return sortedAnnotations
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