const jsonHandler = {
    convertJson: (json) => {

        const sbolDataLayer = {}
        const jsonName = json.name || "";
        const jsonFrindlyID = json.friendly_id || "";

        sbolDataLayer.header = {
            partID: jsonFrindlyID,
            name: jsonName,
            alternativeName: "",
            version: "",
            division: "",
            parentSequence: "",
        };
        sbolDataLayer.annotations = json.annotations || [];
        sbolDataLayer.annotations.map((a) => {
            if (a.direction) {
                a.direction = a.direction === 1 ? "FW" : "RV";
            } else {
                a.direction = "--";
            }
        });

        return sbolDataLayer
    },
}
export default jsonHandler