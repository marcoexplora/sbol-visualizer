import xmlHandler from "@/lib/xml/xmlHandler.js"
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
  it('convert id to numbers', () => {
    const id = 'id12'
    expect(
      xmlHandler.extractIndexVal(id)
    ).toEqual("12")
  })
})



describe('XML parser', () => {

  it('can I get element attribute by TagName', () => {
    const stringXml = examples.convas_symbioks_org['xml'];

    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(stringXml.toLowerCase(), "text/xml");

    expect(
      xmlHandler.xmlFind(xmlDoc, "sbol:displayid")
    ).toEqual("test_from_synbioks_org_canvas")
  })

  it('XML', () => {
    const stringXml = examples.convas_symbioks_org['xml'];

    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(stringXml.toLowerCase(), "text/xml");

    expect(
      xmlHandler.xmlFindAll(xmlDoc, "sbol:displayid")
    ).toEqual(examples.convas_symbioks_org['displayIdvalues'])
  })

})

