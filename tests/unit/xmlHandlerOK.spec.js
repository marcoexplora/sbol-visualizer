import xmlHandler from "@/lib/importer/xmlHandler.js"
import examples from "../xml/examples.js"


describe('SO extractor', () => {
  it('Is correcting extract SO from links', () => {
    const linkWithSbol = 'http://identifiers.org/so/SO:0001955'
    expect(xmlHandler.extractSO(linkWithSbol)).toMatch('SO:0001955')
  })

  it('Is correcting extract SO from links', () => {
    const linkWithSbol = 'http://identifiers.org/so/SO:0001955/12121SO:/1212'
    expect(xmlHandler.extractSO(linkWithSbol)).toMatch('SO:0001955')
  })

  it('return empty string if SO is not presenty', () => {
    const linkWithSbol = 'http://identifiers.org/so/SO:0none55/12121SO:/1212'
    expect(xmlHandler.extractSO(linkWithSbol)).toMatch('')
  })
})


describe('extract id', () => {
  it('Convert id to numbers', () => {
    const id = 'id12'
    expect(
      xmlHandler.extractIndexVal(id)
    ).toEqual("12")
  })
})



describe('XML parser', () => {

  it('I get element attribute by TagName', () => {
    const stringXml = examples.convas_symbioks_org['xml'];

    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(stringXml.toLowerCase(), "text/xml");

    expect(
      xmlHandler.xmlFind(xmlDoc, "sbol:displayid")
    ).toEqual("test_from_synbioks_org_canvas")
  })

  it('I Get multiples elements note content', () => {
    const stringXml = examples.convas_symbioks_org['xml'];

    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(stringXml.toLowerCase(), "text/xml");

    expect(
      xmlHandler.xmlFindAll(xmlDoc, "sbol:displayid")
    ).toEqual(examples.convas_symbioks_org['displayIdvalues'])
  })

  it('I Get multiples elements note content [symbiohub] xmlFindAll', () => {
    const stringXml = examples.BBa_K1080006['xml'];

    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(stringXml.toLowerCase(), "text/xml");

    expect(
      xmlHandler.xmlFindAll(xmlDoc, "sbol:displayid")
    ).toEqual(examples.BBa_K1080006['displayIdvalues'])
  })



  it('I can retrive attribute', () => {
    const stringXml = examples.convas_symbioks_org['xml'];
    //  <sbol:direction rdf:resource="http://sbols.org/v2#inout"/>
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(stringXml.toLowerCase(), "text/xml");

    expect(
      xmlHandler.xmlFind(xmlDoc, "sbol:direction", "rdf:resource")
    ).toEqual("http://sbols.org/v2#inout")
  })



  it('I can retrive attribute xmlFindAll', () => {
    const stringXml = examples.convas_symbioks_org['xml'];
    //  <sbol:direction rdf:resource="http://sbols.org/v2#inout"/>
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(stringXml, "text/xml");

    expect(
      xmlHandler.xmlFindAll(xmlDoc, "sbol:direction", "rdf:resource")
    ).toEqual(["http://sbols.org/v2#inout"])
  })


  it('I can retrive attribute xmlFindAll', () => {
    const stringXml = examples.convas_symbioks_org['xml'];
    //  <sbol:direction rdf:resource="http://sbols.org/v2#inout"/>
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(stringXml, "text/xml");

    expect(
      xmlHandler.xmlFindAll_startWith(xmlDoc, "sbol:role", "rdf:resource", "http://identifiers.org/so/")
    ).toEqual(

      [

        "http://identifiers.org/so/SO:0001955",
        "http://identifiers.org/so/SO:0000031",
        "http://identifiers.org/so/SO:0000299",
        "http://identifiers.org/so/SO:0001687",
        "http://identifiers.org/so/SO:0000139",
        "http://identifiers.org/so/SO:0000316",
        "http://identifiers.org/so/SO:0000553",
        "http://identifiers.org/so/SO:0000167",
        "http://identifiers.org/so/SO:0000110",
        "http://identifiers.org/so/SO:0000627",
      ]
    )
  })


  it('I can retrive attribute xmlFindAll', () => {
    const stringXml = examples.convas_symbioks_org['xml'];
    //  <sbol:direction rdf:resource="http://sbols.org/v2#inout"/>
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(stringXml, "text/xml");

    expect(
      xmlHandler.xmlFind_startWith(xmlDoc, "sbol:role", "rdf:resource", "http://identifiers.org/so/")
    ).toEqual("http://identifiers.org/so/SO:0001955")
  })




})

