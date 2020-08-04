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

    extractSO: text => {
        if (typeof text != 'undefined') {
            return text.toUpperCase().match(/([so:]+[\d]+)/gi)[0];
        }
    },
    extractIndexVal: text => {
        if (typeof text != 'undefined') {
            return text.toUpperCase().match(/([\d]+)/gi)[0];
        }
    }

}
export default xmlHandler