const xmlHandler = {
    convertXml: (xml) => {
        const sbolDataLayer = {}
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(xml.toLowerCase(), "text/xml");

        sbolDataLayer.header = {
            partID: xmlHandler.xmlFind(xmlDoc, "sbol:displayId"),
            name: xmlHandler.xmlFind(xmlDoc, "name"),
            alternativeName: xmlHandler.xmlFind(xmlDoc, "description"),
            version: "",
            division: "",
            parentSequence: "",
        };
        sbolDataLayer.annotations = [];

        const dnaComponents = xmlDoc.getElementsByTagName(
            "sbol:componentdefinition"
        );
        const annotations = [];
        const displayids = xmlHandler
            .xmlFindAll(xmlDoc, "sbol:displayid")
            .filter((id) => {
                return /([id]+[\d]+_+[\d]+)/g.test(id);
            });

        for (let i = 0; i < dnaComponents.length; i++) {
            const component = dnaComponents[i];
            const role = xmlHandler.xmlFind(component, "sbol:role", "rdf:resource");
            const sbolIndex = xmlHandler.xmlFind(component, "sbol:displayid");
            const displayIdposition = displayids.filter((id) => {
                return id.startsWith(`${sbolIndex}_`);
            });
            const index = displayIdposition.toString().replace(`${sbolIndex}_`, "");

            // console.log(`
            // i : ${i},
            // role : ${role}
            // sbolIndex : ${sbolIndex}
            // displayIdposition : ${displayIdposition}
            // index : ${index}
            // `);

            const dataLayerSingleComponent = {
                SBOL: xmlHandler.extractSO(role),
                direction: "--",
                start: 0,
                end: 0,
                index: xmlHandler.extractIndexVal(sbolIndex),
                name: xmlHandler.xmlFind(component, "sbol:displayid"),
                notes: "",
                pk: index,
                role_id: 0,
            };
            annotations[i] = dataLayerSingleComponent;
        }
        // Sorting by pk values
        sbolDataLayer.annotations = annotations
            .sort((a, b) => {
                return (
                    xmlHandler.extractIndexVal(a.pk) - xmlHandler.extractIndexVal(b.pk)
                );
            })
            .filter((item) => {
                return item.name != "id1"; //todo: discuss with bioteam
            });
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
            if (parsedElement.hasAttribute(attribute)) {
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