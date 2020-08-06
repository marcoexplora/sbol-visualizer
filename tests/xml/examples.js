const examples = {

    convas_symbioks_org: {
        xml: `<?xml version="1.0" ?>
<rdf:RDF xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#" xmlns:sbol="http://sbols.org/v2#" xmlns:dcterms="http://purl.org/dc/terms/" xmlns:prov="http://www.w3.org/ns/prov#" xmlns:om="http://www.ontology-of-units-of-measure.org/resource/om-2/" xmlns:SBOLCanvas="https://sbolcanvas.org/">
  <sbol:ModuleDefinition rdf:about="https://sbolcanvas.org/test_from_synbioks_org_canvas">
    <sbol:persistentIdentity rdf:resource="https://sbolcanvas.org/test_from_synbioks_org_canvas"/>
    <sbol:displayId>test_from_synbioks_org_canvas</sbol:displayId>
    <sbol:functionalComponent>
      <sbol:FunctionalComponent rdf:about="https://sbolcanvas.org/test_from_synbioks_org_canvas/id1_2">
        <sbol:persistentIdentity rdf:resource="https://sbolcanvas.org/test_from_synbioks_org_canvas/id1_2"/>
        <sbol:displayId>id1_2</sbol:displayId>
        <sbol:definition rdf:resource="https://sbolcanvas.org/id1"/>
        <sbol:access rdf:resource="http://sbols.org/v2#public"/>
        <sbol:direction rdf:resource="http://sbols.org/v2#inout"/>
      </sbol:FunctionalComponent>
    </sbol:functionalComponent>
  </sbol:ModuleDefinition>
  <sbol:ComponentDefinition rdf:about="https://sbolcanvas.org/id17">
    <sbol:persistentIdentity rdf:resource="https://sbolcanvas.org/id17"/>
    <sbol:displayId>id17</sbol:displayId>
    <sbol:type rdf:resource="http://www.biopax.org/release/biopax-level3.owl#DnaRegion"/>
    <sbol:role rdf:resource="http://identifiers.org/so/SO:0001955"/>
  </sbol:ComponentDefinition>
  <sbol:ComponentDefinition rdf:about="https://sbolcanvas.org/id11">
    <sbol:persistentIdentity rdf:resource="https://sbolcanvas.org/id11"/>
    <sbol:displayId>id11</sbol:displayId>
    <sbol:type rdf:resource="http://www.biopax.org/release/biopax-level3.owl#DnaRegion"/>
    <sbol:role rdf:resource="http://identifiers.org/so/SO:0000031"/>
  </sbol:ComponentDefinition>
  <sbol:ComponentDefinition rdf:about="https://sbolcanvas.org/id15">
    <sbol:persistentIdentity rdf:resource="https://sbolcanvas.org/id15"/>
    <sbol:displayId>id15</sbol:displayId>
    <sbol:type rdf:resource="http://www.biopax.org/release/biopax-level3.owl#DnaRegion"/>
    <sbol:role rdf:resource="http://identifiers.org/so/SO:0000299"/>
  </sbol:ComponentDefinition>
  <sbol:ComponentDefinition rdf:about="https://sbolcanvas.org/id19">
    <sbol:persistentIdentity rdf:resource="https://sbolcanvas.org/id19"/>
    <sbol:displayId>id19</sbol:displayId>
    <sbol:type rdf:resource="http://www.biopax.org/release/biopax-level3.owl#DnaRegion"/>
    <sbol:role rdf:resource="http://identifiers.org/so/SO:0001687"/>
  </sbol:ComponentDefinition>
  <sbol:ComponentDefinition rdf:about="https://sbolcanvas.org/id7">
    <sbol:persistentIdentity rdf:resource="https://sbolcanvas.org/id7"/>
    <sbol:displayId>id7</sbol:displayId>
    <sbol:type rdf:resource="http://www.biopax.org/release/biopax-level3.owl#DnaRegion"/>
    <sbol:role rdf:resource="http://identifiers.org/so/SO:0000139"/>
  </sbol:ComponentDefinition>
  <sbol:ComponentDefinition rdf:about="https://sbolcanvas.org/id5">
    <sbol:persistentIdentity rdf:resource="https://sbolcanvas.org/id5"/>
    <sbol:displayId>id5</sbol:displayId>
    <sbol:type rdf:resource="http://www.biopax.org/release/biopax-level3.owl#DnaRegion"/>
    <sbol:role rdf:resource="http://identifiers.org/so/SO:0000316"/>
  </sbol:ComponentDefinition>
  <sbol:ComponentDefinition rdf:about="https://sbolcanvas.org/id13">
    <sbol:persistentIdentity rdf:resource="https://sbolcanvas.org/id13"/>
    <sbol:displayId>id13</sbol:displayId>
    <sbol:type rdf:resource="http://www.biopax.org/release/biopax-level3.owl#DnaRegion"/>
    <sbol:role rdf:resource="http://identifiers.org/so/SO:0000553"/>
  </sbol:ComponentDefinition>
  <sbol:ComponentDefinition rdf:about="https://sbolcanvas.org/id3">
    <sbol:persistentIdentity rdf:resource="https://sbolcanvas.org/id3"/>
    <sbol:displayId>id3</sbol:displayId>
    <sbol:type rdf:resource="http://www.biopax.org/release/biopax-level3.owl#DnaRegion"/>
    <sbol:role rdf:resource="http://identifiers.org/so/SO:0000167"/>
  </sbol:ComponentDefinition>
  <sbol:ComponentDefinition rdf:about="https://sbolcanvas.org/id1">
    <sbol:persistentIdentity rdf:resource="https://sbolcanvas.org/id1"/>
    <sbol:displayId>id1</sbol:displayId>
    <sbol:type rdf:resource="http://www.biopax.org/release/biopax-level3.owl#DnaRegion"/>
    <sbol:role rdf:resource="http://identifiers.org/so/SO:0000110"/>
    <sbol:component>
      <sbol:Component rdf:about="https://sbolcanvas.org/id1/id11_5">
        <sbol:persistentIdentity rdf:resource="https://sbolcanvas.org/id1/id11_5"/>
        <sbol:displayId>id11_5</sbol:displayId>
        <sbol:access rdf:resource="http://sbols.org/v2#public"/>
        <sbol:definition rdf:resource="https://sbolcanvas.org/id11"/>
      </sbol:Component>
    </sbol:component>
    <sbol:component>
      <sbol:Component rdf:about="https://sbolcanvas.org/id1/id9_3">
        <sbol:persistentIdentity rdf:resource="https://sbolcanvas.org/id1/id9_3"/>
        <sbol:displayId>id9_3</sbol:displayId>
        <sbol:access rdf:resource="http://sbols.org/v2#public"/>
        <sbol:definition rdf:resource="https://sbolcanvas.org/id9"/>
      </sbol:Component>
    </sbol:component>
    <sbol:component>
      <sbol:Component rdf:about="https://sbolcanvas.org/id1/id15_7">
        <sbol:persistentIdentity rdf:resource="https://sbolcanvas.org/id1/id15_7"/>
        <sbol:displayId>id15_7</sbol:displayId>
        <sbol:access rdf:resource="http://sbols.org/v2#public"/>
        <sbol:definition rdf:resource="https://sbolcanvas.org/id15"/>
      </sbol:Component>
    </sbol:component>
    <sbol:component>
      <sbol:Component rdf:about="https://sbolcanvas.org/id1/id17_8">
        <sbol:persistentIdentity rdf:resource="https://sbolcanvas.org/id1/id17_8"/>
        <sbol:displayId>id17_8</sbol:displayId>
        <sbol:access rdf:resource="http://sbols.org/v2#public"/>
        <sbol:definition rdf:resource="https://sbolcanvas.org/id17"/>
      </sbol:Component>
    </sbol:component>
    <sbol:component>
      <sbol:Component rdf:about="https://sbolcanvas.org/id1/id3_1">
        <sbol:persistentIdentity rdf:resource="https://sbolcanvas.org/id1/id3_1"/>
        <sbol:displayId>id3_1</sbol:displayId>
        <sbol:access rdf:resource="http://sbols.org/v2#public"/>
        <sbol:definition rdf:resource="https://sbolcanvas.org/id3"/>
      </sbol:Component>
    </sbol:component>
    <sbol:component>
      <sbol:Component rdf:about="https://sbolcanvas.org/id1/id7_4">
        <sbol:persistentIdentity rdf:resource="https://sbolcanvas.org/id1/id7_4"/>
        <sbol:displayId>id7_4</sbol:displayId>
        <sbol:access rdf:resource="http://sbols.org/v2#public"/>
        <sbol:definition rdf:resource="https://sbolcanvas.org/id7"/>
      </sbol:Component>
    </sbol:component>
    <sbol:component>
      <sbol:Component rdf:about="https://sbolcanvas.org/id1/id5_2">
        <sbol:persistentIdentity rdf:resource="https://sbolcanvas.org/id1/id5_2"/>
        <sbol:displayId>id5_2</sbol:displayId>
        <sbol:access rdf:resource="http://sbols.org/v2#public"/>
        <sbol:definition rdf:resource="https://sbolcanvas.org/id5"/>
      </sbol:Component>
    </sbol:component>
    <sbol:component>
      <sbol:Component rdf:about="https://sbolcanvas.org/id1/id19_9">
        <sbol:persistentIdentity rdf:resource="https://sbolcanvas.org/id1/id19_9"/>
        <sbol:displayId>id19_9</sbol:displayId>
        <sbol:access rdf:resource="http://sbols.org/v2#public"/>
        <sbol:definition rdf:resource="https://sbolcanvas.org/id19"/>
      </sbol:Component>
    </sbol:component>
    <sbol:component>
      <sbol:Component rdf:about="https://sbolcanvas.org/id1/id13_6">
        <sbol:persistentIdentity rdf:resource="https://sbolcanvas.org/id1/id13_6"/>
        <sbol:displayId>id13_6</sbol:displayId>
        <sbol:access rdf:resource="http://sbols.org/v2#public"/>
        <sbol:definition rdf:resource="https://sbolcanvas.org/id13"/>
      </sbol:Component>
    </sbol:component>
    <sbol:sequenceAnnotation>
      <sbol:SequenceAnnotation rdf:about="https://sbolcanvas.org/id1/id1Annotation7">
        <sbol:persistentIdentity rdf:resource="https://sbolcanvas.org/id1/id1Annotation7"/>
        <sbol:displayId>id1Annotation7</sbol:displayId>
        <sbol:location>
          <sbol:GenericLocation rdf:about="https://sbolcanvas.org/id1/id1Annotation7/location7">
            <sbol:persistentIdentity rdf:resource="https://sbolcanvas.org/id1/id1Annotation7/location7"/>
            <sbol:displayId>location7</sbol:displayId>
            <sbol:orientation rdf:resource="http://sbols.org/v2#inline"/>
          </sbol:GenericLocation>
        </sbol:location>
        <sbol:component rdf:resource="https://sbolcanvas.org/id1/id17_8"/>
      </sbol:SequenceAnnotation>
    </sbol:sequenceAnnotation>
    <sbol:sequenceAnnotation>
      <sbol:SequenceAnnotation rdf:about="https://sbolcanvas.org/id1/id1Annotation4">
        <sbol:persistentIdentity rdf:resource="https://sbolcanvas.org/id1/id1Annotation4"/>
        <sbol:displayId>id1Annotation4</sbol:displayId>
        <sbol:location>
          <sbol:GenericLocation rdf:about="https://sbolcanvas.org/id1/id1Annotation4/location4">
            <sbol:persistentIdentity rdf:resource="https://sbolcanvas.org/id1/id1Annotation4/location4"/>
            <sbol:displayId>location4</sbol:displayId>
            <sbol:orientation rdf:resource="http://sbols.org/v2#inline"/>
          </sbol:GenericLocation>
        </sbol:location>
        <sbol:component rdf:resource="https://sbolcanvas.org/id1/id11_5"/>
      </sbol:SequenceAnnotation>
    </sbol:sequenceAnnotation>
    <sbol:sequenceAnnotation>
      <sbol:SequenceAnnotation rdf:about="https://sbolcanvas.org/id1/id1Annotation6">
        <sbol:persistentIdentity rdf:resource="https://sbolcanvas.org/id1/id1Annotation6"/>
        <sbol:displayId>id1Annotation6</sbol:displayId>
        <sbol:location>
          <sbol:GenericLocation rdf:about="https://sbolcanvas.org/id1/id1Annotation6/location6">
            <sbol:persistentIdentity rdf:resource="https://sbolcanvas.org/id1/id1Annotation6/location6"/>
            <sbol:displayId>location6</sbol:displayId>
            <sbol:orientation rdf:resource="http://sbols.org/v2#inline"/>
          </sbol:GenericLocation>
        </sbol:location>
        <sbol:component rdf:resource="https://sbolcanvas.org/id1/id15_7"/>
      </sbol:SequenceAnnotation>
    </sbol:sequenceAnnotation>
    <sbol:sequenceAnnotation>
      <sbol:SequenceAnnotation rdf:about="https://sbolcanvas.org/id1/id1Annotation2">
        <sbol:persistentIdentity rdf:resource="https://sbolcanvas.org/id1/id1Annotation2"/>
        <sbol:displayId>id1Annotation2</sbol:displayId>
        <sbol:location>
          <sbol:GenericLocation rdf:about="https://sbolcanvas.org/id1/id1Annotation2/location2">
            <sbol:persistentIdentity rdf:resource="https://sbolcanvas.org/id1/id1Annotation2/location2"/>
            <sbol:displayId>location2</sbol:displayId>
            <sbol:orientation rdf:resource="http://sbols.org/v2#inline"/>
          </sbol:GenericLocation>
        </sbol:location>
        <sbol:component rdf:resource="https://sbolcanvas.org/id1/id9_3"/>
      </sbol:SequenceAnnotation>
    </sbol:sequenceAnnotation>
    <sbol:sequenceAnnotation>
      <sbol:SequenceAnnotation rdf:about="https://sbolcanvas.org/id1/id1Annotation5">
        <sbol:persistentIdentity rdf:resource="https://sbolcanvas.org/id1/id1Annotation5"/>
        <sbol:displayId>id1Annotation5</sbol:displayId>
        <sbol:location>
          <sbol:GenericLocation rdf:about="https://sbolcanvas.org/id1/id1Annotation5/location5">
            <sbol:persistentIdentity rdf:resource="https://sbolcanvas.org/id1/id1Annotation5/location5"/>
            <sbol:displayId>location5</sbol:displayId>
            <sbol:orientation rdf:resource="http://sbols.org/v2#inline"/>
          </sbol:GenericLocation>
        </sbol:location>
        <sbol:component rdf:resource="https://sbolcanvas.org/id1/id13_6"/>
      </sbol:SequenceAnnotation>
    </sbol:sequenceAnnotation>
    <sbol:sequenceAnnotation>
      <sbol:SequenceAnnotation rdf:about="https://sbolcanvas.org/id1/id1Annotation8">
        <sbol:persistentIdentity rdf:resource="https://sbolcanvas.org/id1/id1Annotation8"/>
        <sbol:displayId>id1Annotation8</sbol:displayId>
        <sbol:location>
          <sbol:GenericLocation rdf:about="https://sbolcanvas.org/id1/id1Annotation8/location8">
            <sbol:persistentIdentity rdf:resource="https://sbolcanvas.org/id1/id1Annotation8/location8"/>
            <sbol:displayId>location8</sbol:displayId>
            <sbol:orientation rdf:resource="http://sbols.org/v2#inline"/>
          </sbol:GenericLocation>
        </sbol:location>
        <sbol:component rdf:resource="https://sbolcanvas.org/id1/id19_9"/>
      </sbol:SequenceAnnotation>
    </sbol:sequenceAnnotation>
    <sbol:sequenceAnnotation>
      <sbol:SequenceAnnotation rdf:about="https://sbolcanvas.org/id1/id1Annotation1">
        <sbol:persistentIdentity rdf:resource="https://sbolcanvas.org/id1/id1Annotation1"/>
        <sbol:displayId>id1Annotation1</sbol:displayId>
        <sbol:location>
          <sbol:GenericLocation rdf:about="https://sbolcanvas.org/id1/id1Annotation1/location1">
            <sbol:persistentIdentity rdf:resource="https://sbolcanvas.org/id1/id1Annotation1/location1"/>
            <sbol:displayId>location1</sbol:displayId>
            <sbol:orientation rdf:resource="http://sbols.org/v2#inline"/>
          </sbol:GenericLocation>
        </sbol:location>
        <sbol:component rdf:resource="https://sbolcanvas.org/id1/id5_2"/>
      </sbol:SequenceAnnotation>
    </sbol:sequenceAnnotation>
    <sbol:sequenceAnnotation>
      <sbol:SequenceAnnotation rdf:about="https://sbolcanvas.org/id1/id1Annotation3">
        <sbol:persistentIdentity rdf:resource="https://sbolcanvas.org/id1/id1Annotation3"/>
        <sbol:displayId>id1Annotation3</sbol:displayId>
        <sbol:location>
          <sbol:GenericLocation rdf:about="https://sbolcanvas.org/id1/id1Annotation3/location3">
            <sbol:persistentIdentity rdf:resource="https://sbolcanvas.org/id1/id1Annotation3/location3"/>
            <sbol:displayId>location3</sbol:displayId>
            <sbol:orientation rdf:resource="http://sbols.org/v2#inline"/>
          </sbol:GenericLocation>
        </sbol:location>
        <sbol:component rdf:resource="https://sbolcanvas.org/id1/id7_4"/>
      </sbol:SequenceAnnotation>
    </sbol:sequenceAnnotation>
    <sbol:sequenceAnnotation>
      <sbol:SequenceAnnotation rdf:about="https://sbolcanvas.org/id1/id1Annotation0">
        <sbol:persistentIdentity rdf:resource="https://sbolcanvas.org/id1/id1Annotation0"/>
        <sbol:displayId>id1Annotation0</sbol:displayId>
        <sbol:location>
          <sbol:GenericLocation rdf:about="https://sbolcanvas.org/id1/id1Annotation0/location0">
            <sbol:persistentIdentity rdf:resource="https://sbolcanvas.org/id1/id1Annotation0/location0"/>
            <sbol:displayId>location0</sbol:displayId>
            <sbol:orientation rdf:resource="http://sbols.org/v2#inline"/>
          </sbol:GenericLocation>
        </sbol:location>
        <sbol:component rdf:resource="https://sbolcanvas.org/id1/id3_1"/>
      </sbol:SequenceAnnotation>
    </sbol:sequenceAnnotation>
    <sbol:sequenceConstraint>
      <sbol:SequenceConstraint rdf:about="https://sbolcanvas.org/id1/id1Constraint3">
        <sbol:persistentIdentity rdf:resource="https://sbolcanvas.org/id1/id1Constraint3"/>
        <sbol:displayId>id1Constraint3</sbol:displayId>
        <sbol:restriction rdf:resource="http://sbols.org/v2#precedes"/>
        <sbol:subject rdf:resource="https://sbolcanvas.org/id1/id9_3"/>
        <sbol:object rdf:resource="https://sbolcanvas.org/id1/id7_4"/>
      </sbol:SequenceConstraint>
    </sbol:sequenceConstraint>
    <sbol:sequenceConstraint>
      <sbol:SequenceConstraint rdf:about="https://sbolcanvas.org/id1/id1Constraint4">
        <sbol:persistentIdentity rdf:resource="https://sbolcanvas.org/id1/id1Constraint4"/>
        <sbol:displayId>id1Constraint4</sbol:displayId>
        <sbol:restriction rdf:resource="http://sbols.org/v2#precedes"/>
        <sbol:subject rdf:resource="https://sbolcanvas.org/id1/id7_4"/>
        <sbol:object rdf:resource="https://sbolcanvas.org/id1/id11_5"/>
      </sbol:SequenceConstraint>
    </sbol:sequenceConstraint>
    <sbol:sequenceConstraint>
      <sbol:SequenceConstraint rdf:about="https://sbolcanvas.org/id1/id1Constraint2">
        <sbol:persistentIdentity rdf:resource="https://sbolcanvas.org/id1/id1Constraint2"/>
        <sbol:displayId>id1Constraint2</sbol:displayId>
        <sbol:restriction rdf:resource="http://sbols.org/v2#precedes"/>
        <sbol:subject rdf:resource="https://sbolcanvas.org/id1/id5_2"/>
        <sbol:object rdf:resource="https://sbolcanvas.org/id1/id9_3"/>
      </sbol:SequenceConstraint>
    </sbol:sequenceConstraint>
    <sbol:sequenceConstraint>
      <sbol:SequenceConstraint rdf:about="https://sbolcanvas.org/id1/id1Constraint5">
        <sbol:persistentIdentity rdf:resource="https://sbolcanvas.org/id1/id1Constraint5"/>
        <sbol:displayId>id1Constraint5</sbol:displayId>
        <sbol:restriction rdf:resource="http://sbols.org/v2#precedes"/>
        <sbol:subject rdf:resource="https://sbolcanvas.org/id1/id11_5"/>
        <sbol:object rdf:resource="https://sbolcanvas.org/id1/id13_6"/>
      </sbol:SequenceConstraint>
    </sbol:sequenceConstraint>
    <sbol:sequenceConstraint>
      <sbol:SequenceConstraint rdf:about="https://sbolcanvas.org/id1/id1Constraint1">
        <sbol:persistentIdentity rdf:resource="https://sbolcanvas.org/id1/id1Constraint1"/>
        <sbol:displayId>id1Constraint1</sbol:displayId>
        <sbol:restriction rdf:resource="http://sbols.org/v2#precedes"/>
        <sbol:subject rdf:resource="https://sbolcanvas.org/id1/id3_1"/>
        <sbol:object rdf:resource="https://sbolcanvas.org/id1/id5_2"/>
      </sbol:SequenceConstraint>
    </sbol:sequenceConstraint>
    <sbol:sequenceConstraint>
      <sbol:SequenceConstraint rdf:about="https://sbolcanvas.org/id1/id1Constraint6">
        <sbol:persistentIdentity rdf:resource="https://sbolcanvas.org/id1/id1Constraint6"/>
        <sbol:displayId>id1Constraint6</sbol:displayId>
        <sbol:restriction rdf:resource="http://sbols.org/v2#precedes"/>
        <sbol:subject rdf:resource="https://sbolcanvas.org/id1/id13_6"/>
        <sbol:object rdf:resource="https://sbolcanvas.org/id1/id15_7"/>
      </sbol:SequenceConstraint>
    </sbol:sequenceConstraint>
    <sbol:sequenceConstraint>
      <sbol:SequenceConstraint rdf:about="https://sbolcanvas.org/id1/id1Constraint7">
        <sbol:persistentIdentity rdf:resource="https://sbolcanvas.org/id1/id1Constraint7"/>
        <sbol:displayId>id1Constraint7</sbol:displayId>
        <sbol:restriction rdf:resource="http://sbols.org/v2#precedes"/>
        <sbol:subject rdf:resource="https://sbolcanvas.org/id1/id15_7"/>
        <sbol:object rdf:resource="https://sbolcanvas.org/id1/id17_8"/>
      </sbol:SequenceConstraint>
    </sbol:sequenceConstraint>
    <sbol:sequenceConstraint>
      <sbol:SequenceConstraint rdf:about="https://sbolcanvas.org/id1/id1Constraint8">
        <sbol:persistentIdentity rdf:resource="https://sbolcanvas.org/id1/id1Constraint8"/>
        <sbol:displayId>id1Constraint8</sbol:displayId>
        <sbol:restriction rdf:resource="http://sbols.org/v2#precedes"/>
        <sbol:subject rdf:resource="https://sbolcanvas.org/id1/id17_8"/>
        <sbol:object rdf:resource="https://sbolcanvas.org/id1/id19_9"/>
      </sbol:SequenceConstraint>
    </sbol:sequenceConstraint>
  </sbol:ComponentDefinition>
  <sbol:ComponentDefinition rdf:about="https://sbolcanvas.org/id9">
    <sbol:persistentIdentity rdf:resource="https://sbolcanvas.org/id9"/>
    <sbol:displayId>id9</sbol:displayId>
    <sbol:type rdf:resource="http://www.biopax.org/release/biopax-level3.owl#DnaRegion"/>
    <sbol:role rdf:resource="http://identifiers.org/so/SO:0000627"/>
  </sbol:ComponentDefinition>
  <SBOLCanvas:Layout rdf:about="https://sbolcanvas.org/id7_Layout">
    <sbol:persistentIdentity rdf:resource="https://sbolcanvas.org/id7_Layout"/>
    <sbol:displayId>id7_Layout</sbol:displayId>
    <SBOLCanvas:objectRef rdf:resource="https://sbolcanvas.org/id7"/>
    <SBOLCanvas:nodeGlyph>
      <SBOLCanvas:NodeGlyph rdf:about="https://sbolcanvas.org/id7_Layout/NodeGlyph_11">
        <SBOLCanvas:x>0.0</SBOLCanvas:x>
        <SBOLCanvas:y>0.0</SBOLCanvas:y>
        <SBOLCanvas:width>0.0</SBOLCanvas:width>
        <SBOLCanvas:height>0.0</SBOLCanvas:height>
        <SBOLCanvas:displayId>container</SBOLCanvas:displayId>
      </SBOLCanvas:NodeGlyph>
    </SBOLCanvas:nodeGlyph>
    <SBOLCanvas:nodeGlyph>
      <SBOLCanvas:NodeGlyph rdf:about="https://sbolcanvas.org/id7_Layout/NodeGlyph_12">
        <SBOLCanvas:x>0.0</SBOLCanvas:x>
        <SBOLCanvas:y>0.0</SBOLCanvas:y>
        <SBOLCanvas:width>0.0</SBOLCanvas:width>
        <SBOLCanvas:height>0.0</SBOLCanvas:height>
        <SBOLCanvas:displayId>backbone</SBOLCanvas:displayId>
      </SBOLCanvas:NodeGlyph>
    </SBOLCanvas:nodeGlyph>
  </SBOLCanvas:Layout>
  <SBOLCanvas:Layout rdf:about="https://sbolcanvas.org/id5_Layout">
    <sbol:persistentIdentity rdf:resource="https://sbolcanvas.org/id5_Layout"/>
    <sbol:displayId>id5_Layout</sbol:displayId>
    <SBOLCanvas:objectRef rdf:resource="https://sbolcanvas.org/id5"/>
    <SBOLCanvas:nodeGlyph>
      <SBOLCanvas:NodeGlyph rdf:about="https://sbolcanvas.org/id5_Layout/NodeGlyph_8">
        <SBOLCanvas:x>0.0</SBOLCanvas:x>
        <SBOLCanvas:y>0.0</SBOLCanvas:y>
        <SBOLCanvas:width>0.0</SBOLCanvas:width>
        <SBOLCanvas:height>0.0</SBOLCanvas:height>
        <SBOLCanvas:displayId>container</SBOLCanvas:displayId>
      </SBOLCanvas:NodeGlyph>
    </SBOLCanvas:nodeGlyph>
    <SBOLCanvas:nodeGlyph>
      <SBOLCanvas:NodeGlyph rdf:about="https://sbolcanvas.org/id5_Layout/NodeGlyph_9">
        <SBOLCanvas:x>0.0</SBOLCanvas:x>
        <SBOLCanvas:y>0.0</SBOLCanvas:y>
        <SBOLCanvas:width>0.0</SBOLCanvas:width>
        <SBOLCanvas:height>0.0</SBOLCanvas:height>
        <SBOLCanvas:displayId>backbone</SBOLCanvas:displayId>
      </SBOLCanvas:NodeGlyph>
    </SBOLCanvas:nodeGlyph>
  </SBOLCanvas:Layout>
  <SBOLCanvas:Layout rdf:about="https://sbolcanvas.org/id15_Layout">
    <sbol:persistentIdentity rdf:resource="https://sbolcanvas.org/id15_Layout"/>
    <sbol:displayId>id15_Layout</sbol:displayId>
    <SBOLCanvas:objectRef rdf:resource="https://sbolcanvas.org/id15"/>
    <SBOLCanvas:nodeGlyph>
      <SBOLCanvas:NodeGlyph rdf:about="https://sbolcanvas.org/id15_Layout/NodeGlyph_23">
        <SBOLCanvas:x>0.0</SBOLCanvas:x>
        <SBOLCanvas:y>0.0</SBOLCanvas:y>
        <SBOLCanvas:width>0.0</SBOLCanvas:width>
        <SBOLCanvas:height>0.0</SBOLCanvas:height>
        <SBOLCanvas:displayId>container</SBOLCanvas:displayId>
      </SBOLCanvas:NodeGlyph>
    </SBOLCanvas:nodeGlyph>
    <SBOLCanvas:nodeGlyph>
      <SBOLCanvas:NodeGlyph rdf:about="https://sbolcanvas.org/id15_Layout/NodeGlyph_24">
        <SBOLCanvas:x>0.0</SBOLCanvas:x>
        <SBOLCanvas:y>0.0</SBOLCanvas:y>
        <SBOLCanvas:width>0.0</SBOLCanvas:width>
        <SBOLCanvas:height>0.0</SBOLCanvas:height>
        <SBOLCanvas:displayId>backbone</SBOLCanvas:displayId>
      </SBOLCanvas:NodeGlyph>
    </SBOLCanvas:nodeGlyph>
  </SBOLCanvas:Layout>
  <SBOLCanvas:Layout rdf:about="https://sbolcanvas.org/test_from_synbioks_org_canvas_Layout">
    <sbol:persistentIdentity rdf:resource="https://sbolcanvas.org/test_from_synbioks_org_canvas_Layout"/>
    <sbol:displayId>test_from_synbioks_org_canvas_Layout</sbol:displayId>
    <SBOLCanvas:objectRef rdf:resource="https://sbolcanvas.org/test_from_synbioks_org_canvas"/>
    <SBOLCanvas:nodeGlyph>
      <SBOLCanvas:NodeGlyph rdf:about="https://sbolcanvas.org/test_from_synbioks_org_canvas_Layout/NodeGlyph_2">
        <SBOLCanvas:x>164.0</SBOLCanvas:x>
        <SBOLCanvas:y>192.0</SBOLCanvas:y>
        <SBOLCanvas:width>450.0</SBOLCanvas:width>
        <SBOLCanvas:height>100.0</SBOLCanvas:height>
        <SBOLCanvas:displayId>id1_2</SBOLCanvas:displayId>
      </SBOLCanvas:NodeGlyph>
    </SBOLCanvas:nodeGlyph>
    <SBOLCanvas:id1_Reference rdf:resource="https://sbolcanvas.org/id1_Layout"/>
  </SBOLCanvas:Layout>
  <SBOLCanvas:Layout rdf:about="https://sbolcanvas.org/id3_Layout">
    <sbol:persistentIdentity rdf:resource="https://sbolcanvas.org/id3_Layout"/>
    <sbol:displayId>id3_Layout</sbol:displayId>
    <SBOLCanvas:objectRef rdf:resource="https://sbolcanvas.org/id3"/>
    <SBOLCanvas:nodeGlyph>
      <SBOLCanvas:NodeGlyph rdf:about="https://sbolcanvas.org/id3_Layout/NodeGlyph_5">
        <SBOLCanvas:x>0.0</SBOLCanvas:x>
        <SBOLCanvas:y>0.0</SBOLCanvas:y>
        <SBOLCanvas:width>0.0</SBOLCanvas:width>
        <SBOLCanvas:height>0.0</SBOLCanvas:height>
        <SBOLCanvas:displayId>container</SBOLCanvas:displayId>
      </SBOLCanvas:NodeGlyph>
    </SBOLCanvas:nodeGlyph>
    <SBOLCanvas:nodeGlyph>
      <SBOLCanvas:NodeGlyph rdf:about="https://sbolcanvas.org/id3_Layout/NodeGlyph_6">
        <SBOLCanvas:x>0.0</SBOLCanvas:x>
        <SBOLCanvas:y>0.0</SBOLCanvas:y>
        <SBOLCanvas:width>0.0</SBOLCanvas:width>
        <SBOLCanvas:height>0.0</SBOLCanvas:height>
        <SBOLCanvas:displayId>backbone</SBOLCanvas:displayId>
      </SBOLCanvas:NodeGlyph>
    </SBOLCanvas:nodeGlyph>
  </SBOLCanvas:Layout>
  <SBOLCanvas:Layout rdf:about="https://sbolcanvas.org/id1_Layout">
    <sbol:persistentIdentity rdf:resource="https://sbolcanvas.org/id1_Layout"/>
    <sbol:displayId>id1_Layout</sbol:displayId>
    <SBOLCanvas:objectRef rdf:resource="https://sbolcanvas.org/id1"/>
    <SBOLCanvas:nodeGlyph>
      <SBOLCanvas:NodeGlyph rdf:about="https://sbolcanvas.org/id1_Layout/NodeGlyph_2">
        <SBOLCanvas:x>164.0</SBOLCanvas:x>
        <SBOLCanvas:y>192.0</SBOLCanvas:y>
        <SBOLCanvas:width>450.0</SBOLCanvas:width>
        <SBOLCanvas:height>100.0</SBOLCanvas:height>
        <SBOLCanvas:displayId>container</SBOLCanvas:displayId>
      </SBOLCanvas:NodeGlyph>
    </SBOLCanvas:nodeGlyph>
    <SBOLCanvas:nodeGlyph>
      <SBOLCanvas:NodeGlyph rdf:about="https://sbolcanvas.org/id1_Layout/NodeGlyph_3">
        <SBOLCanvas:x>0.0</SBOLCanvas:x>
        <SBOLCanvas:y>50.0</SBOLCanvas:y>
        <SBOLCanvas:width>450.0</SBOLCanvas:width>
        <SBOLCanvas:height>1.0</SBOLCanvas:height>
        <SBOLCanvas:displayId>backbone</SBOLCanvas:displayId>
      </SBOLCanvas:NodeGlyph>
    </SBOLCanvas:nodeGlyph>
    <SBOLCanvas:nodeGlyph>
      <SBOLCanvas:NodeGlyph rdf:about="https://sbolcanvas.org/id1_Layout/NodeGlyph_4">
        <SBOLCanvas:x>0.0</SBOLCanvas:x>
        <SBOLCanvas:y>0.0</SBOLCanvas:y>
        <SBOLCanvas:width>50.0</SBOLCanvas:width>
        <SBOLCanvas:height>100.0</SBOLCanvas:height>
        <SBOLCanvas:displayId>id3_1</SBOLCanvas:displayId>
      </SBOLCanvas:NodeGlyph>
    </SBOLCanvas:nodeGlyph>
    <SBOLCanvas:id3_Reference rdf:resource="https://sbolcanvas.org/id3_Layout"/>
    <SBOLCanvas:nodeGlyph>
      <SBOLCanvas:NodeGlyph rdf:about="https://sbolcanvas.org/id1_Layout/NodeGlyph_7">
        <SBOLCanvas:x>50.0</SBOLCanvas:x>
        <SBOLCanvas:y>0.0</SBOLCanvas:y>
        <SBOLCanvas:width>50.0</SBOLCanvas:width>
        <SBOLCanvas:height>100.0</SBOLCanvas:height>
        <SBOLCanvas:displayId>id5_2</SBOLCanvas:displayId>
      </SBOLCanvas:NodeGlyph>
    </SBOLCanvas:nodeGlyph>
    <SBOLCanvas:id5_Reference rdf:resource="https://sbolcanvas.org/id5_Layout"/>
    <SBOLCanvas:nodeGlyph>
      <SBOLCanvas:NodeGlyph rdf:about="https://sbolcanvas.org/id1_Layout/NodeGlyph_13">
        <SBOLCanvas:x>100.0</SBOLCanvas:x>
        <SBOLCanvas:y>0.0</SBOLCanvas:y>
        <SBOLCanvas:width>50.0</SBOLCanvas:width>
        <SBOLCanvas:height>100.0</SBOLCanvas:height>
        <SBOLCanvas:displayId>id9_3</SBOLCanvas:displayId>
      </SBOLCanvas:NodeGlyph>
    </SBOLCanvas:nodeGlyph>
    <SBOLCanvas:id9_Reference rdf:resource="https://sbolcanvas.org/id9_Layout"/>
    <SBOLCanvas:nodeGlyph>
      <SBOLCanvas:NodeGlyph rdf:about="https://sbolcanvas.org/id1_Layout/NodeGlyph_10">
        <SBOLCanvas:x>150.0</SBOLCanvas:x>
        <SBOLCanvas:y>0.0</SBOLCanvas:y>
        <SBOLCanvas:width>50.0</SBOLCanvas:width>
        <SBOLCanvas:height>100.0</SBOLCanvas:height>
        <SBOLCanvas:displayId>id7_4</SBOLCanvas:displayId>
      </SBOLCanvas:NodeGlyph>
    </SBOLCanvas:nodeGlyph>
    <SBOLCanvas:id7_Reference rdf:resource="https://sbolcanvas.org/id7_Layout"/>
    <SBOLCanvas:nodeGlyph>
      <SBOLCanvas:NodeGlyph rdf:about="https://sbolcanvas.org/id1_Layout/NodeGlyph_16">
        <SBOLCanvas:x>200.0</SBOLCanvas:x>
        <SBOLCanvas:y>0.0</SBOLCanvas:y>
        <SBOLCanvas:width>50.0</SBOLCanvas:width>
        <SBOLCanvas:height>100.0</SBOLCanvas:height>
        <SBOLCanvas:displayId>id11_5</SBOLCanvas:displayId>
      </SBOLCanvas:NodeGlyph>
    </SBOLCanvas:nodeGlyph>
    <SBOLCanvas:id11_Reference rdf:resource="https://sbolcanvas.org/id11_Layout"/>
    <SBOLCanvas:nodeGlyph>
      <SBOLCanvas:NodeGlyph rdf:about="https://sbolcanvas.org/id1_Layout/NodeGlyph_19">
        <SBOLCanvas:x>250.0</SBOLCanvas:x>
        <SBOLCanvas:y>0.0</SBOLCanvas:y>
        <SBOLCanvas:width>50.0</SBOLCanvas:width>
        <SBOLCanvas:height>100.0</SBOLCanvas:height>
        <SBOLCanvas:displayId>id13_6</SBOLCanvas:displayId>
      </SBOLCanvas:NodeGlyph>
    </SBOLCanvas:nodeGlyph>
    <SBOLCanvas:id13_Reference rdf:resource="https://sbolcanvas.org/id13_Layout"/>
    <SBOLCanvas:nodeGlyph>
      <SBOLCanvas:NodeGlyph rdf:about="https://sbolcanvas.org/id1_Layout/NodeGlyph_22">
        <SBOLCanvas:x>300.0</SBOLCanvas:x>
        <SBOLCanvas:y>0.0</SBOLCanvas:y>
        <SBOLCanvas:width>50.0</SBOLCanvas:width>
        <SBOLCanvas:height>100.0</SBOLCanvas:height>
        <SBOLCanvas:displayId>id15_7</SBOLCanvas:displayId>
      </SBOLCanvas:NodeGlyph>
    </SBOLCanvas:nodeGlyph>
    <SBOLCanvas:id15_Reference rdf:resource="https://sbolcanvas.org/id15_Layout"/>
    <SBOLCanvas:nodeGlyph>
      <SBOLCanvas:NodeGlyph rdf:about="https://sbolcanvas.org/id1_Layout/NodeGlyph_25">
        <SBOLCanvas:x>350.0</SBOLCanvas:x>
        <SBOLCanvas:y>0.0</SBOLCanvas:y>
        <SBOLCanvas:width>50.0</SBOLCanvas:width>
        <SBOLCanvas:height>100.0</SBOLCanvas:height>
        <SBOLCanvas:displayId>id17_8</SBOLCanvas:displayId>
      </SBOLCanvas:NodeGlyph>
    </SBOLCanvas:nodeGlyph>
    <SBOLCanvas:id17_Reference rdf:resource="https://sbolcanvas.org/id17_Layout"/>
    <SBOLCanvas:nodeGlyph>
      <SBOLCanvas:NodeGlyph rdf:about="https://sbolcanvas.org/id1_Layout/NodeGlyph_28">
        <SBOLCanvas:x>400.0</SBOLCanvas:x>
        <SBOLCanvas:y>0.0</SBOLCanvas:y>
        <SBOLCanvas:width>50.0</SBOLCanvas:width>
        <SBOLCanvas:height>100.0</SBOLCanvas:height>
        <SBOLCanvas:displayId>id19_9</SBOLCanvas:displayId>
      </SBOLCanvas:NodeGlyph>
    </SBOLCanvas:nodeGlyph>
    <SBOLCanvas:id19_Reference rdf:resource="https://sbolcanvas.org/id19_Layout"/>
  </SBOLCanvas:Layout>
  <SBOLCanvas:Layout rdf:about="https://sbolcanvas.org/id17_Layout">
    <sbol:persistentIdentity rdf:resource="https://sbolcanvas.org/id17_Layout"/>
    <sbol:displayId>id17_Layout</sbol:displayId>
    <SBOLCanvas:objectRef rdf:resource="https://sbolcanvas.org/id17"/>
    <SBOLCanvas:nodeGlyph>
      <SBOLCanvas:NodeGlyph rdf:about="https://sbolcanvas.org/id17_Layout/NodeGlyph_26">
        <SBOLCanvas:x>0.0</SBOLCanvas:x>
        <SBOLCanvas:y>0.0</SBOLCanvas:y>
        <SBOLCanvas:width>0.0</SBOLCanvas:width>
        <SBOLCanvas:height>0.0</SBOLCanvas:height>
        <SBOLCanvas:displayId>container</SBOLCanvas:displayId>
      </SBOLCanvas:NodeGlyph>
    </SBOLCanvas:nodeGlyph>
    <SBOLCanvas:nodeGlyph>
      <SBOLCanvas:NodeGlyph rdf:about="https://sbolcanvas.org/id17_Layout/NodeGlyph_27">
        <SBOLCanvas:x>0.0</SBOLCanvas:x>
        <SBOLCanvas:y>0.0</SBOLCanvas:y>
        <SBOLCanvas:width>0.0</SBOLCanvas:width>
        <SBOLCanvas:height>0.0</SBOLCanvas:height>
        <SBOLCanvas:displayId>backbone</SBOLCanvas:displayId>
      </SBOLCanvas:NodeGlyph>
    </SBOLCanvas:nodeGlyph>
  </SBOLCanvas:Layout>
  <SBOLCanvas:Layout rdf:about="https://sbolcanvas.org/id9_Layout">
    <sbol:persistentIdentity rdf:resource="https://sbolcanvas.org/id9_Layout"/>
    <sbol:displayId>id9_Layout</sbol:displayId>
    <SBOLCanvas:objectRef rdf:resource="https://sbolcanvas.org/id9"/>
    <SBOLCanvas:nodeGlyph>
      <SBOLCanvas:NodeGlyph rdf:about="https://sbolcanvas.org/id9_Layout/NodeGlyph_14">
        <SBOLCanvas:x>0.0</SBOLCanvas:x>
        <SBOLCanvas:y>0.0</SBOLCanvas:y>
        <SBOLCanvas:width>0.0</SBOLCanvas:width>
        <SBOLCanvas:height>0.0</SBOLCanvas:height>
        <SBOLCanvas:displayId>container</SBOLCanvas:displayId>
      </SBOLCanvas:NodeGlyph>
    </SBOLCanvas:nodeGlyph>
    <SBOLCanvas:nodeGlyph>
      <SBOLCanvas:NodeGlyph rdf:about="https://sbolcanvas.org/id9_Layout/NodeGlyph_15">
        <SBOLCanvas:x>0.0</SBOLCanvas:x>
        <SBOLCanvas:y>0.0</SBOLCanvas:y>
        <SBOLCanvas:width>0.0</SBOLCanvas:width>
        <SBOLCanvas:height>0.0</SBOLCanvas:height>
        <SBOLCanvas:displayId>backbone</SBOLCanvas:displayId>
      </SBOLCanvas:NodeGlyph>
    </SBOLCanvas:nodeGlyph>
  </SBOLCanvas:Layout>
  <SBOLCanvas:Layout rdf:about="https://sbolcanvas.org/id13_Layout">
    <sbol:persistentIdentity rdf:resource="https://sbolcanvas.org/id13_Layout"/>
    <sbol:displayId>id13_Layout</sbol:displayId>
    <SBOLCanvas:objectRef rdf:resource="https://sbolcanvas.org/id13"/>
    <SBOLCanvas:nodeGlyph>
      <SBOLCanvas:NodeGlyph rdf:about="https://sbolcanvas.org/id13_Layout/NodeGlyph_20">
        <SBOLCanvas:x>0.0</SBOLCanvas:x>
        <SBOLCanvas:y>0.0</SBOLCanvas:y>
        <SBOLCanvas:width>0.0</SBOLCanvas:width>
        <SBOLCanvas:height>0.0</SBOLCanvas:height>
        <SBOLCanvas:displayId>container</SBOLCanvas:displayId>
      </SBOLCanvas:NodeGlyph>
    </SBOLCanvas:nodeGlyph>
    <SBOLCanvas:nodeGlyph>
      <SBOLCanvas:NodeGlyph rdf:about="https://sbolcanvas.org/id13_Layout/NodeGlyph_21">
        <SBOLCanvas:x>0.0</SBOLCanvas:x>
        <SBOLCanvas:y>0.0</SBOLCanvas:y>
        <SBOLCanvas:width>0.0</SBOLCanvas:width>
        <SBOLCanvas:height>0.0</SBOLCanvas:height>
        <SBOLCanvas:displayId>backbone</SBOLCanvas:displayId>
      </SBOLCanvas:NodeGlyph>
    </SBOLCanvas:nodeGlyph>
  </SBOLCanvas:Layout>
  <SBOLCanvas:Layout rdf:about="https://sbolcanvas.org/id19_Layout">
    <sbol:persistentIdentity rdf:resource="https://sbolcanvas.org/id19_Layout"/>
    <sbol:displayId>id19_Layout</sbol:displayId>
    <SBOLCanvas:objectRef rdf:resource="https://sbolcanvas.org/id19"/>
    <SBOLCanvas:nodeGlyph>
      <SBOLCanvas:NodeGlyph rdf:about="https://sbolcanvas.org/id19_Layout/NodeGlyph_29">
        <SBOLCanvas:x>0.0</SBOLCanvas:x>
        <SBOLCanvas:y>0.0</SBOLCanvas:y>
        <SBOLCanvas:width>0.0</SBOLCanvas:width>
        <SBOLCanvas:height>0.0</SBOLCanvas:height>
        <SBOLCanvas:displayId>container</SBOLCanvas:displayId>
      </SBOLCanvas:NodeGlyph>
    </SBOLCanvas:nodeGlyph>
    <SBOLCanvas:nodeGlyph>
      <SBOLCanvas:NodeGlyph rdf:about="https://sbolcanvas.org/id19_Layout/NodeGlyph_30">
        <SBOLCanvas:x>0.0</SBOLCanvas:x>
        <SBOLCanvas:y>0.0</SBOLCanvas:y>
        <SBOLCanvas:width>0.0</SBOLCanvas:width>
        <SBOLCanvas:height>0.0</SBOLCanvas:height>
        <SBOLCanvas:displayId>backbone</SBOLCanvas:displayId>
      </SBOLCanvas:NodeGlyph>
    </SBOLCanvas:nodeGlyph>
  </SBOLCanvas:Layout>
  <SBOLCanvas:Layout rdf:about="https://sbolcanvas.org/id11_Layout">
    <sbol:persistentIdentity rdf:resource="https://sbolcanvas.org/id11_Layout"/>
    <sbol:displayId>id11_Layout</sbol:displayId>
    <SBOLCanvas:objectRef rdf:resource="https://sbolcanvas.org/id11"/>
    <SBOLCanvas:nodeGlyph>
      <SBOLCanvas:NodeGlyph rdf:about="https://sbolcanvas.org/id11_Layout/NodeGlyph_17">
        <SBOLCanvas:x>0.0</SBOLCanvas:x>
        <SBOLCanvas:y>0.0</SBOLCanvas:y>
        <SBOLCanvas:width>0.0</SBOLCanvas:width>
        <SBOLCanvas:height>0.0</SBOLCanvas:height>
        <SBOLCanvas:displayId>container</SBOLCanvas:displayId>
      </SBOLCanvas:NodeGlyph>
    </SBOLCanvas:nodeGlyph>
    <SBOLCanvas:nodeGlyph>
      <SBOLCanvas:NodeGlyph rdf:about="https://sbolcanvas.org/id11_Layout/NodeGlyph_18">
        <SBOLCanvas:x>0.0</SBOLCanvas:x>
        <SBOLCanvas:y>0.0</SBOLCanvas:y>
        <SBOLCanvas:width>0.0</SBOLCanvas:width>
        <SBOLCanvas:height>0.0</SBOLCanvas:height>
        <SBOLCanvas:displayId>backbone</SBOLCanvas:displayId>
      </SBOLCanvas:NodeGlyph>
    </SBOLCanvas:nodeGlyph>
  </SBOLCanvas:Layout>
</rdf:RDF>`
        , displayIdvalues: ["test_from_synbioks_org_canvas", "id1_2", "id17", "id11", "id15", "id19", "id7", "id5", "id13", "id3", "id1", "id11_5", "id9_3", "id15_7", "id17_8", "id3_1", "id7_4", "id5_2", "id19_9", "id13_6", "id1annotation7", "location7", "id1annotation4", "location4", "id1annotation6", "location6", "id1annotation2", "location2", "id1annotation5", "location5", "id1annotation8", "location8", "id1annotation1", "location1", "id1annotation3", "location3", "id1annotation0", "location0", "id1constraint3", "id1constraint4", "id1constraint2", "id1constraint5", "id1constraint1", "id1constraint6", "id1constraint7", "id1constraint8", "id9", "id7_layout", "id5_layout", "id15_layout", "test_from_synbioks_org_canvas_layout", "id3_layout", "id1_layout", "id17_layout", "id9_layout", "id13_layout", "id19_layout", "id11_layout"]

    }
}

export default examples