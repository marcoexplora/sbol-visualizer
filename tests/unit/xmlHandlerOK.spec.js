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

  it('I Get multiples elements note content [symbiohub]', () => {
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


})

