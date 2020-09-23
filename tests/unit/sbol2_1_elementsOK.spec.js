import xmlHandler from "@/lib/importer/xmlHandler.js"
import examples from "../xml/examples.js"





describe('XML parser', () => {

  it('partID ==> first sbol:displayid I found in the doc root ', () => {
    const stringXml = examples.BBa_K1080006['xml'];

    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(stringXml.toLowerCase(), "text/xml");

    expect(
      xmlHandler.xmlFind(xmlDoc, "sbol:displayid")
    ).toEqual("bba_k1080006")
  })

  // name: xmlHandler.xmlFind(xmlDoc, "dcterms:title"),
  it('name ==> dcterms:title ', () => {
    const stringXml = examples.BBa_K1080006['xml'];

    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(stringXml.toLowerCase(), "text/xml");

    expect(
      xmlHandler.xmlFind(xmlDoc, "dcterms:title")
    ).toEqual("\"plasto\"")
  })

  //   alternativeName: xmlHandler.xmlFind(xmlDoc, "dcterms:description"),
  it('alternativeName ==> dcterms:description ', () => {
    const stringXml = examples.BBa_K1080006['xml'];

    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(stringXml.toLowerCase(), "text/xml");

    expect(
      xmlHandler.xmlFind(xmlDoc, "dcterms:description")
    ).toEqual("plastocyanin")
  })

  // version: xmlHandler.xmlFind(xmlDoc, "sbol:version"),
  it('version ==> sbol:version ', () => {
    const stringXml = examples.BBa_K1080006['xml'];

    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(stringXml.toLowerCase(), "text/xml");

    expect(
      xmlHandler.xmlFind(xmlDoc, "dcterms:description")
    ).toEqual("plastocyanin")
  })

  // creator: xmlHandler.xmlFind(xmlDoc, "dc:creator"),
  it('creator ==> dc:creator ', () => {
    const stringXml = examples.BBa_K1080006['xml'];

    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(stringXml.toLowerCase(), "text/xml");

    expect(
      xmlHandler.xmlFind(xmlDoc, "dc:creator")
    ).toEqual("macquarie university")
  })

  // parentSequence: xmlHandler.xmlFind(xmlDoc, "sbh:mutableprovenance"),
  it('parentSequence ==> sbh:mutableprovenance ', () => {
    const stringXml = examples.BBa_K1080006['xml'];

    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(stringXml.toLowerCase(), "text/xml");

    expect(
      xmlHandler.xmlFind(xmlDoc, "sbh:mutableprovenance")
    ).toEqual("from genome of chlamydomonas reinhardtii")
  })


})

