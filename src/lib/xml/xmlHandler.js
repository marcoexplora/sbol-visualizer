const xmlHandler = {
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