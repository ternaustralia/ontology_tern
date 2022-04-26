import pytest

from rdflib import Graph, URIRef

from src.property_shape.get_class_type import get_class_type_as_str

data = """
@prefix sh: <http://www.w3.org/ns/shacl#> .
@prefix tern: <https://w3id.org/tern/ontologies/tern/> .
@prefix rdfs: <http://www.w3.org/2000/01/rdf-schema#> .
@prefix xsd: <http://www.w3.org/2001/XMLSchema#> .
@prefix sosa: <http://www.w3.org/ns/sosa/> .
@prefix tern-shapes: <https://w3id.org/tern/shapes/tern/> .
@prefix time: <http://www.w3.org/2006/time#> .
@prefix reg: <http://purl.org/linked-data/registry#> .
@prefix skos: <http://www.w3.org/2004/02/skos/core#> .

<urn:shape:1>
    a sh:PropertyShape ;
    sh:description "Link to a member of a collection of observations that share the same value for one or more of the characteristic properties." ;
    sh:minCount 1 ;
    sh:name "sosa:hasMember" ;
    sh:nodeKind sh:IRI ;
    sh:or (
            [
                sh:class tern:Observation
            ]
            [
                sh:class tern:ObservationCollection
            ]
        ) ;
    sh:path sosa:hasMember ;
.

<urn:shape:2>
    a sh:PropertyShape ;
    sh:description "The result time is the instant of time when the Observation, Actuation or Sampling activity was completed." ;
    sh:maxCount 1 ;
    sh:message "The datatype of result time must be an `xsd:date`, `xsd:dateTime` or `xsd:dateTimeStamp`." ;
    sh:name "tern:resultDateTime" ;
    sh:or (
            [
                sh:datatype xsd:dateTime
            ]
            [
                sh:datatype xsd:date
            ]
            [
                sh:datatype xsd:dateTimeStamp
            ]
        ) ;
    sh:path tern:resultDateTime ;
.

<urn:shape:3>
    a sh:PropertyShape ;
    sh:description "Error of measurement (±)." ;
    sh:maxCount 1 ;
    sh:name "tern:uncertainty" ;
    sh:nodeKind sh:Literal ;
    sh:or (
            [
                sh:datatype xsd:integer
            ]
            [
                sh:datatype xsd:double
            ]
        ) ;
    sh:path tern:uncertainty ;
.

tern-shapes:Instant
    a sh:NodeShape ;
    rdfs:label "Instant" ;
    sh:message "One or more of [`time:inXSDDate`, `time:inXSDDateTimeStamp`, `time:inXSDgYear`, `time:inXSDgYearMonth`, `time:inTimePosition`, and `time:inDateTime`] _MUST_ be present." ;
    sh:or (
            [
                sh:property [
                        sh:minCount 1 ;
                        sh:path time:inDateTime
                    ]
            ]
            [
                sh:property [
                        sh:minCount 1 ;
                        sh:path time:inTimePosition
                    ]
            ]
            [
                sh:property [
                        sh:minCount 1 ;
                        sh:path time:inXSDDate
                    ]
            ]
            [
                sh:property [
                        sh:minCount 1 ;
                        sh:path time:inXSDDateTimeStamp
                    ]
            ]
            [
                sh:property [
                        sh:minCount 1 ;
                        sh:path time:inXSDgYear
                    ]
            ]
            [
                sh:property [
                        sh:minCount 1 ;
                        sh:path time:inXSDgYearMonth
                    ]
            ]
        ) ;
    sh:property
        tern-shapes:time-Instant-inDateTime ,
        tern-shapes:time-inTimePosition ;
    sh:targetClass time:Instant ;
.

tern-shapes:time-inTimePosition ;
    reg:status reg:statusStable ;
    skos:prefLabel "in time position" ;
    sh:name "time:inTimePosition" ;
    sh:class time:TimePosition ;
    sh:path time:inTimePosition ;
    sh:maxCount 1 ;
    sh:nodeKind sh:BlankNodeOrIRI ;
    sh:description "Position of a time instant expressed as a `TimePosition`." ;
    sh:message "Value _MUST_ be an instance of `time:TimePosition`. Maximum of one value is allowed for this property. The value node _MUST_ be a blank node or IRI." ;
.

tern-shapes:time-Instant-inDateTime
    a sh:PropertyShape ;
    reg:status reg:statusStable ;
    skos:prefLabel "in date-time" ;
    sh:name "time:inDateTime" ;
    sh:datatype xsd:dateTime ;
    sh:nodeKind sh:Literal ;
    sh:path time:inDateTime ;
    sh:maxCount 1 ;
    sh:description "Position of an instant, expressed using a structured description." ;
    sh:message "Value _MUST_ be a literal with the datatype `xsd:dateTime`. Maximum of one value is allowed for this property." ;
.
"""


def get_tests():
    g = Graph()
    g.parse(data=data, format="turtle")

    property_shapes = [
        (
            URIRef("urn:shape:1"),
            g.cbd(URIRef("urn:shape:1")),
            "link:https://w3id.org/tern/ontologies/tern/Observation[`tern:Observation`] +\nlink:https://w3id.org/tern/ontologies/tern/ObservationCollection[`tern:ObservationCollection`]",
        ),
        (
            URIRef("urn:shape:2"),
            g.cbd(URIRef("urn:shape:2")),
            "link:http://www.w3.org/2001/XMLSchema#dateTime[`xsd:dateTime`] +\nlink:http://www.w3.org/2001/XMLSchema#date[`xsd:date`] +\nlink:http://www.w3.org/2001/XMLSchema#dateTimeStamp[`xsd:dateTimeStamp`]",
        ),
        (
            URIRef("urn:shape:3"),
            g.cbd(URIRef("urn:shape:3")),
            "link:http://www.w3.org/2001/XMLSchema#integer[`xsd:integer`] +\nlink:http://www.w3.org/2001/XMLSchema#double[`xsd:double`]",
        ),
        (
            URIRef("https://w3id.org/tern/shapes/tern/time-Instant-inDateTime"),
            g.cbd(URIRef("https://w3id.org/tern/shapes/tern/time-Instant-inDateTime")),
            "link:http://www.w3.org/2001/XMLSchema#dateTime[`xsd:dateTime`]",
        ),
        (
            URIRef("https://w3id.org/tern/shapes/tern/time-inTimePosition"),
            g.cbd(URIRef("https://w3id.org/tern/shapes/tern/time-inTimePosition")),
            "link:http://www.w3.org/2006/time#TimePosition[`time:TimePosition`]",
        ),
    ]
    for p in property_shapes:
        yield p


@pytest.mark.parametrize("uri, graph, expected", get_tests())
def test_get_class_type_as_str(uri: URIRef, graph: Graph, expected: str):
    result = get_class_type_as_str(uri, graph)
    assert result == expected
