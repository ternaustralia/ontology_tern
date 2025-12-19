from rdflib import BNode, Namespace, URIRef
from rdflib.namespace import RDF, RDFS

import pytest

SH = Namespace("http://www.w3.org/ns/shacl#")

NON_CONSTRAINT_PREDICATES = {
    RDF.type,
    SH.path,
    SH.name,
    SH.description,
    SH.message,
    SH.order,
    SH.severity,
    SH["group"],
    SH.deactivated,
}

NODE_SHAPES_WITHOUT_TARGET = {
    URIRef("https://w3id.org/tern/shapes/tern/Dataset"),
    URIRef("https://w3id.org/tern/shapes/tern/Distribution"),
    URIRef("https://w3id.org/tern/shapes/tern/ManagedFeature"),
    URIRef("urn:shape:Observation-hasFeatureOfInterest-Sample"),
    URIRef("urn:shape:Sampling-hasResult-Site-sdo-spatial"),
}

NODE_SHAPES_WITHOUT_PROPERTY = {
    URIRef("https://w3id.org/tern/shapes/tern/Distribution"),
    URIRef("urn:shape:Activity"),
    URIRef("urn:shape:Observation-hasFeatureOfInterest-Sample"),
}

PROPERTY_SHAPES_ALLOW_EMPTY_CONSTRAINTS = {
    URIRef("https://w3id.org/tern/shapes/tern/dcterms-identifier"),
    URIRef("https://w3id.org/tern/shapes/tern/tern-climateCode"),
}

def _iter_node_shapes(graph):
    return sorted({s for s in graph.subjects(RDF.type, SH.NodeShape)}, key=str)


def _iter_property_shapes(graph):
    typed_shapes = {s for s in graph.subjects(RDF.type, SH.PropertyShape)}
    referenced_shapes = {o for o in graph.objects(None, SH.property)}
    return sorted(typed_shapes | referenced_shapes, key=str)


def test_node_shapes_have_label_target_class_and_property(shapes_graph):
    node_shapes = _iter_node_shapes(shapes_graph)
    assert node_shapes, "No sh:NodeShape definitions found"

    for shape in node_shapes:
        assert shapes_graph.value(shape, RDFS.label), f"{shape} is missing rdfs:label"

        target_triples = []
        for predicate in (SH.targetClass, SH.targetNode, SH.targetObjectsOf, SH.targetSubjectsOf):
            target_triples.extend(shapes_graph.objects(shape, predicate))
        if shape not in NODE_SHAPES_WITHOUT_TARGET:
            assert target_triples, f"{shape} is missing SHACL targets"

        properties = list(shapes_graph.objects(shape, SH.property))
        if shape not in NODE_SHAPES_WITHOUT_PROPERTY:
            assert properties, f"{shape} is missing sh:property declarations"


def test_node_shapes_reference_property_shapes_with_unique_paths(shapes_graph):
    property_shapes = set(_iter_property_shapes(shapes_graph))

    for shape in _iter_node_shapes(shapes_graph):
        properties = list(shapes_graph.objects(shape, SH.property))
        path_to_shapes = {}
        for prop in properties:
            assert (
                prop in property_shapes
            ), f"{shape} references {prop} which is not typed as sh:PropertyShape"

            path = shapes_graph.value(prop, SH.path)
            path_to_shapes.setdefault(path, []).append(prop)

        for path, shapes in path_to_shapes.items():
            assert len(shapes) == 1, f"{shape} has multiple property shapes for sh:path {path}"


def test_property_shapes_have_required_fields(shapes_graph):
    property_shapes = _iter_property_shapes(shapes_graph)
    assert property_shapes, "No sh:PropertyShape definitions found"

    for shape in property_shapes:
        path = shapes_graph.value(shape, SH.path)
        assert path is not None, f"{shape} is missing sh:path"

        if shape not in PROPERTY_SHAPES_ALLOW_EMPTY_CONSTRAINTS:
            assert _has_constraints(shapes_graph, shape), f"{shape} is missing constraint predicates"

        description = shapes_graph.value(shape, SH.description)
        assert description, f"{shape} is missing sh:description"

        message = shapes_graph.value(shape, SH.message)
        assert message, f"{shape} is missing sh:message"

        _assert_cardinality_numbers(shapes_graph, shape)


def _assert_cardinality_numbers(graph, shape):
    min_count = graph.value(shape, SH.minCount)
    max_count = graph.value(shape, SH.maxCount)

    min_value = min_count.toPython() if min_count is not None else None
    max_value = max_count.toPython() if max_count is not None else None

    if min_count is not None:
        assert isinstance(min_value, int), f"{shape} has non-integer sh:minCount"

    if max_count is not None:
        assert isinstance(max_value, int), f"{shape} has non-integer sh:maxCount"

    if min_value is not None and max_value is not None:
        assert min_value <= max_value, f"{shape} has sh:minCount > sh:maxCount"


def _has_constraints(graph, shape):
    for predicate, _ in graph.predicate_objects(shape):
        if predicate in NON_CONSTRAINT_PREDICATES:
            continue
        if str(predicate).startswith(str(SH)):
            return True
    return False
