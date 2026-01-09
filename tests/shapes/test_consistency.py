from pathlib import Path

from rdflib import Namespace, URIRef
from rdflib.collection import Collection
from rdflib.namespace import RDF
import yaml

SH = Namespace("http://www.w3.org/ns/shacl#")

IGNORED_TARGET_CLASSES = {
    URIRef("http://www.w3.org/2006/time#Instant"),
    URIRef("https://w3id.org/tern/ontologies/tern/Deployment"),
    URIRef("https://w3id.org/tern/ontologies/tern/MeasurementRange"),
    URIRef("https://w3id.org/tern/ontologies/tern/RDFDataset"),
    URIRef("https://w3id.org/tern/ontologies/tern/Sample"),
    URIRef("https://w3id.org/tern/ontologies/tern/SiteVisit"),
    URIRef("https://w3id.org/tern/ontologies/tern/Taxon"),
    URIRef("https://w3id.org/tern/ontologies/tern/VerticalExtent"),
}


def _load_spec():
    spec_path = Path(__file__).resolve().parent / "spec.yaml"
    return yaml.safe_load(spec_path.read_text())


def _as_list(value):
    if value is None:
        return []
    if isinstance(value, list):
        return value
    return [value]


def _normalize_entry(entry):
    or_constraints = entry.get("or", {})
    return (
        entry.get("path"),
        entry.get("min_count"),
        entry.get("max_count"),
        entry.get("node_kind"),
        tuple(sorted(_as_list(entry.get("class")))),
        tuple(sorted(_as_list(entry.get("datatype")))),
        tuple(sorted(_as_list(or_constraints.get("class")))),
        tuple(sorted(_as_list(or_constraints.get("datatype")))),
    )


def _normalize_spec_entries(entries):
    return {_normalize_entry(entry) for entry in entries}


def _property_entry_from_shape(graph, prop_shape):
    entry = {}

    path = graph.value(prop_shape, SH.path)
    if isinstance(path, URIRef):
        entry["path"] = str(path)

    node_kind = graph.value(prop_shape, SH.nodeKind)
    if isinstance(node_kind, URIRef):
        entry["node_kind"] = str(node_kind)

    classes = sorted({str(value) for value in graph.objects(prop_shape, SH["class"])})
    if classes:
        entry["class"] = classes if len(classes) > 1 else classes[0]

    datatypes = sorted({str(value) for value in graph.objects(prop_shape, SH.datatype)})
    if datatypes:
        entry["datatype"] = datatypes if len(datatypes) > 1 else datatypes[0]

    min_count = graph.value(prop_shape, SH.minCount)
    if min_count is not None:
        entry["min_count"] = min_count.toPython()

    max_count = graph.value(prop_shape, SH.maxCount)
    if max_count is not None:
        entry["max_count"] = max_count.toPython()

    or_node = graph.value(prop_shape, SH["or"])
    if or_node is not None:
        items = list(Collection(graph, or_node))
        or_classes = sorted(
            {
                str(graph.value(item, SH["class"]))
                for item in items
                if graph.value(item, SH["class"]) is not None
            }
        )
        or_datatypes = sorted(
            {
                str(graph.value(item, SH["datatype"]))
                for item in items
                if graph.value(item, SH["datatype"]) is not None
            }
        )
        or_entry = {}
        if or_classes:
            or_entry["class"] = or_classes if len(or_classes) > 1 else or_classes[0]
        if or_datatypes:
            or_entry["datatype"] = or_datatypes if len(or_datatypes) > 1 else or_datatypes[0]
        if or_entry:
            entry["or"] = or_entry

    return entry


def _iter_required_property_shapes(graph, node_shape):
    for prop_shape in graph.objects(node_shape, SH.property):
        min_count = graph.value(prop_shape, SH.minCount)
        if min_count is None:
            continue
        min_value = min_count.toPython()
        if isinstance(min_value, int) and min_value >= 1:
            yield prop_shape


def test_spec_target_classes_match_graph(shapes_graph):
    spec = _load_spec()
    target_classes = spec.get("target_classes", {})

    spec_classes = {URIRef(value) for value in target_classes.keys()}
    graph_classes = set(shapes_graph.objects(None, SH.targetClass))

    extra_classes = (graph_classes - spec_classes) - IGNORED_TARGET_CLASSES
    missing_classes = spec_classes - graph_classes
    assert not extra_classes, f"Spec is missing target classes: {sorted(extra_classes)}"
    assert not missing_classes, f"Spec includes unknown target classes: {sorted(missing_classes)}"


def test_spec_required_properties_match_graph(shapes_graph):
    spec = _load_spec()
    target_classes = spec.get("target_classes", {})

    class_to_shapes = {}
    for node_shape in shapes_graph.subjects(RDF.type, SH.NodeShape):
        for target_class in shapes_graph.objects(node_shape, SH.targetClass):
            class_to_shapes.setdefault(target_class, set()).add(node_shape)

    for class_uri, expectations in target_classes.items():
        target_class = URIRef(class_uri)
        node_shapes = class_to_shapes.get(target_class, set())

        expected_entries = _normalize_spec_entries(expectations.get("required_properties", []))
        actual_entries = set()

        for node_shape in node_shapes:
            for prop_shape in _iter_required_property_shapes(shapes_graph, node_shape):
                entry = _property_entry_from_shape(shapes_graph, prop_shape)
                if entry:
                    actual_entries.add(_normalize_entry(entry))

        missing_entries = expected_entries - actual_entries
        extra_entries = actual_entries - expected_entries
        assert not missing_entries, f"{target_class} missing required property entries"
        assert not extra_entries, f"{target_class} has unexpected required property entries"
