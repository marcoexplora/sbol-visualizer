/*
    This files is from https://github.com/udp/visbol-js ( minor edited )

 Copyright (C) 2015 James McLaughlin.  All rights reserved.

  Redistribution and use in source and binary forms, with or without
  modification, are permitted provided that the following conditions
  are met:

  1. Redistributions of source code must retain the above copyright
     notice, this list of conditions and the following disclaimer.

  2. Redistributions in binary form must reproduce the above copyright
     notice, this list of conditions and the following disclaimer in the
     documentation and/or other materials provided with the distribution.

  THIS SOFTWARE IS PROVIDED BY THE AUTHOR AND CONTRIBUTORS ``AS IS'' AND
  ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
  IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
  ARE DISCLAIMED.  IN NO EVENT SHALL THE AUTHOR OR CONTRIBUTORS BE LIABLE
  FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
  DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS
  OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION)
  HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT
  LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY
  OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF
  SUCH DAMAGE.

*/
var soToGlyphType = require('./soToGlyphType')
var soToTopology = require('./soToTopology')

//var sbolmeta = require('sbolmeta')

var URI = require('sboljs').URI

var sha1 = require('sha1');

function getDisplayList(componentDefinition, config, share) {
    var segments = [
        getDisplayListSegment(componentDefinition, config, share)
    ]
    segments = recurseGetDisplayList(componentDefinition, segments, config, share)


    return {
        version: 1,
        components: [{
            segments: segments
        }]
    }

}

function recurseGetDisplayList(componentDefinition, segments, config, share) {
    sortedSubComponents(componentDefinition).forEach((component) => {

        if (component.definition && !(component.definition instanceof URI) &&
            component.definition.uri) {
            if (component.definition.components.length === 0) return segments

            var segment = getDisplayListSegment(component.definition, config, share)

            if (segment.sequence.length > 0) {
                if (segments.filter(function (e) {
                    return e.name == segment.name;
                }).length === 0) {
                    segments.push(segment)
                }
            }
            segments = recurseGetDisplayList(component.definition, segments, config, share)
        }

    })
    return segments
}

function getDisplayListSegment(componentDefinition, config, share) {
    var displayName = componentDefinition.displayId

    if (componentDefinition.name != '' && componentDefinition.name != componentDefinition.displayId) {
        displayName += ' (' + componentDefinition.name + ')'
    }

    var types = componentDefinition.types
    var topologies = []

    types.forEach((type) => {
        var so = (type + '').match(/SO.([0-9]+)/g)

        if (!so || !so.length)
            return

        var soCode = so[0].split('_').join(':')

        var topology = soToTopology(soCode)

        if (topology)
            topologies.push(topology)
    })

    if (componentDefinition.sequenceAnnotations.length === 0) {

        var glyph = 'unspecified'
        var name = componentDefinition.name != '' ? componentDefinition.name : componentDefinition.displayId
        var roles = componentDefinition.roles
        var uri = componentDefinition.uri.toString()

        if (config && uri.startsWith(config.get('databasePrefix'))) {
            if (uri.startsWith(config.get('databasePrefix') + 'user/') && share) {
                uri = '/' + uri.replace(config.get('databasePrefix'), '') + '/' + sha1('synbiohub_' + sha1(uri) + config.get('shareLinkSalt')) + '/share'
            } else {
                uri = '/' + uri.replace(config.get('databasePrefix'), '')
            }
        }

        var propriety = {}
        propriety['item'] = 'Component'
        if (componentDefinition.displayId) propriety['Identifier'] = componentDefinition.displayId
        if (componentDefinition.name) propriety['Name'] = componentDefinition.name
        if (componentDefinition.description) propriety['Description'] = componentDefinition.description

        roles.forEach((role) => {
            var igemPartPrefix = 'http://wiki.synbiohub.org/wiki/Terms/igem#partType/'
            var igemFeaturePrefix = 'http://wiki.synbiohub.org/wiki/Terms/igem#feature/'
            var soPrefix = 'http://identifiers.org/so/'

            if (role.toString().indexOf(igemPartPrefix) === 0) {

                propriety['iGEM Part Type'] = role.toString().slice(igemPartPrefix.length)

            } else if (role.toString().indexOf(igemFeaturePrefix) === 0) {

                propriety['iGEM Feature Type'] = role.toString().slice(igemFeaturePrefix.length)

            } else if (role.toString().indexOf(soPrefix) === 0) {

                var soTerm = role.toString().slice(soPrefix.length).split('_').join(':')
                propriety['sequenceOntology'] = soTerm
                //propriety['Role'] = sbolmeta.sequenceOntology[soTerm].name

            }

            var so = (role + '').match(/SO.([0-9]+)/g)

            if (!so || !so.length)
                return

            var soCode = so[0].split('_').join(':')

            var glyphType = soToGlyphType(soCode)

            if (glyphType)
                glyph = glyphType;
            else
                glyph = 'no-glyph-assigned';

            propriety['glyphType'] = glyph;


        })

        return {
            log: "1b",
            name: displayName,
            sequence: [{
                strand: "positive",
                type: glyph,
                id: componentDefinition.uri + '',
                name: name,
                uri: uri,
                propriety: propriety
            }],
            topologies: topologies
        }
    }

    return {
        name: displayName,
        sequence: sortedSequenceAnnotations(componentDefinition).map((sequenceAnnotation,_index) => {

            var glyph = 'unspecified'

            var name = sequenceAnnotation.name != '' ? sequenceAnnotation.name : sequenceAnnotation.displayId

            if (name.length > 12) {
                name = name.substring(0, 12) + '...'
            }

            var roles = sequenceAnnotation.roles

            var uri = ''
            var propriety = {}

            if (sequenceAnnotation.component && sequenceAnnotation.component != '') {

                var component = sequenceAnnotation.component
                propriety['element'] = 'Component'
                if (component.definition && !(component.definition instanceof URI) &&
                    component.definition.uri) {

                    roles = roles.concat(component.definition.roles)

                    name = component.definition.name != '' ? component.definition.name : component.definition.displayId

                    uri = component.definition.uri.toString()

                    if (config && uri.startsWith(config.get('databasePrefix'))) {
                        if (uri.startsWith(config.get('databasePrefix') + 'user/') && share) {
                            uri = '/' + uri.replace(config.get('databasePrefix'), '') + '/' + sha1('synbiohub_' + sha1(uri) + config.get('shareLinkSalt')) + '/share'
                        } else {
                            uri = '/' + uri.replace(config.get('databasePrefix'), '')
                        }
                    }

                    if (component.definition.displayId) propriety['Identifier'] = component.definition.displayId
                    if (component.definition.name) propriety['Name'] = component.definition.name
                    if (component.definition.description) propriety['Description'] = component.definition.description
                    if (component.definition.components) propriety['components'] = getDisplayListSegment(component.definition).sequence
                    //if (component.definition.sequences) propriety['Sequences'] = component.definition.sequences
                } else {
                    uri = component.definition.toString()

                    if (config && uri.startsWith(config.get('databasePrefix'))) {
                        if (uri.startsWith(config.get('databasePrefix') + 'user/') && share) {
                            uri = '/' + uri.replace(config.get('databasePrefix'), '') + '/' + sha1('synbiohub_' + sha1(uri) + config.get('shareLinkSalt')) + '/share'
                        } else {
                            uri = '/' + uri.replace(config.get('databasePrefix'), '')
                        }
                    }
                }

            } else {
                propriety = {}
                propriety['item'] = 'Feature'
                if (sequenceAnnotation.displayId) propriety['Identifier'] = sequenceAnnotation.displayId
                if (sequenceAnnotation.name)  propriety['Name'] = sequenceAnnotation.name
                if (sequenceAnnotation.description) propriety['Description'] = sequenceAnnotation.description
                window.sqA = sequenceAnnotation
            }


            if (roles.length === 0) {

                glyph = 'unspecified'

            } else {

                roles.forEach((role) => {
                    var igemPartPrefix = 'http://wiki.synbiohub.org/wiki/Terms/igem#partType/'
                    var igemFeaturePrefix = 'http://wiki.synbiohub.org/wiki/Terms/igem#feature/'
                    var soPrefix = 'http://identifiers.org/so/'

                    if (role.toString().indexOf(igemPartPrefix) === 0) {

                        propriety['iGEM Part Type'] = role.toString().slice(igemPartPrefix.length)

                    } else if (role.toString().indexOf(igemFeaturePrefix) === 0) {

                        propriety['iGEM Feature Type'] = role.toString().slice(igemFeaturePrefix.length)

                    } else if (role.toString().indexOf(soPrefix) === 0) {

                        var soTerm = role.toString().slice(soPrefix.length).split('_').join(':')
                        propriety['sequenceOntology'] = soTerm
                        //propriety['Role'] = sbolmeta.sequenceOntology[soTerm].name

                    }

                    var so = (role + '').match(/SO.([0-9]+)/g)

                    if (!so || !so.length)
                        return

                    var soCode = so[0].split('_').join(':')

                    var glyphType = soToGlyphType(soCode)

                    if (glyphType)
                        glyph = glyphType;
                    else
                        glyph = 'no-glyph-assigned'
                })
            }

            var strand = 'positive'

            sequenceAnnotation.ranges.forEach((range) => {
                if (range.orientation) {
                    propriety['Orientation'] = range.orientation.toString().replace('http://sbols.org/v2#', '')
                    propriety['Direction'] =  propriety['Orientation'] === 'inline' ? 'FW' : 'RV'
                    if (range.orientation.toString() === 'http://sbols.org/v2#reverseComplement') strand = 'negative'
                }
                propriety['start'] = range.start
                propriety['end'] = range.end
            })

            sequenceAnnotation.cuts.forEach((cut) => {
                if (cut.orientation) {
                    propriety['Orientation'] = cut.orientation.toString().replace('http://sbols.org/v2#', '')
                    propriety['Direction'] =  propriety['Orientation'] === 'inline' ? 'FW' : 'RV'
                    if (cut.orientation.toString() === 'http://sbols.org/v2#reverseComplement') strand = 'negative'
                }
                propriety['cut_at'] = cut.at
            })

            sequenceAnnotation.genericLocations.forEach((genericLocation) => {
                if (genericLocation.orientation) {
                    propriety['Orientation'] = genericLocation.orientation.toString().replace('http://sbols.org/v2#', '')
                    propriety['Direction'] =  propriety['Orientation'] === 'inline' ? 'FW' : 'RV'
                    if (genericLocation.orientation.toString() === 'http://sbols.org/v2#reverseComplement') strand = 'negative'
                }
            })



            return {
                log: "1c",
                SBOL : propriety.sequenceOntology,
                strand: strand,
                type: glyph,
                id: sequenceAnnotation.uri + '',
                pk: `${_index}`,
                name: name,
                uri: uri,
                propriety: propriety
            }
        }),
        topologies: topologies
    }
}

function sortedSequenceAnnotations(componentDefinition) {

    return componentDefinition.sequenceAnnotations.sort((a, b) => {

        if (a.ranges.length > 0 && b.ranges.length > 0) {
            if (start(a) === start(b)) {
                return end(a) - end(b)
            } else {
                return start(a) - start(b)
            }
        } else if (a.component && b.component) {
            return position(componentDefinition, a.component, {}) - position(componentDefinition, b.component, {})
        }
        return start(a) - start(b)

    })

    function start(sequenceAnnotation) {

        var minStart = sequenceAnnotation.ranges.length > 0 ? sequenceAnnotation.ranges[0].start : 0
        for (var i = 0; i < sequenceAnnotation.ranges.length; i++) {
            if (sequenceAnnotation.ranges[i].start < minStart)
                minStart = sequenceAnnotation.ranges[i].start
        }
        return minStart

    }

    function end(sequenceAnnotation) {


        var maxEnd = sequenceAnnotation.ranges.length > 0 ? sequenceAnnotation.ranges[0].end : 0
        for (var i = 0; i < sequenceAnnotation.ranges.length; i++) {
            if (sequenceAnnotation.ranges[i].end < maxEnd)
                maxEnd = sequenceAnnotation.ranges[i].end
        }
        return maxEnd

    }

    // TODO: note that cycle of sequenceConstraints creates infinite loop
    function position(componentDefinition, component, visited) {

        var curPos = 0
        if (visited[component.uri]) return curPos
        componentDefinition.sequenceConstraints.forEach((sequenceConstraint) => {
            sequenceConstraint.link()
            if (sequenceConstraint.restriction.toString() === 'http://sbols.org/v2#precedes') {
                if (sequenceConstraint.object.uri.toString() === component.uri.toString()) {
                    visited[component.uri] = true
                    var subPos = position(componentDefinition, sequenceConstraint.subject, visited)
                    if (subPos + 1 > curPos)
                        curPos = subPos + 1
                }
            }
        })
        return curPos

    }

}

function sortedSubComponents(componentDefinition) {

    return sortedSequenceAnnotations(componentDefinition).map((sequenceAnnotation) => {

        return sequenceAnnotation.component

    })

}


module.exports = getDisplayList
