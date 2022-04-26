from dataclasses import dataclass
from operator import attrgetter
from typing import Callable, List
from pathlib import Path

from jinja2 import Template
from rdflib import SH, SKOS, Graph, URIRef
from src.namespaces import REG

from src.templates.status import get_status
from src import property_shape


def get_graph(filepath: str) -> Graph:
    graph = Graph()
    graph.parse(filepath)
    return graph


@dataclass
class TemplateSettings:
    template: Template
    target_path: str
    callable: Callable


@dataclass
class ClassTemplateOptions:
    uri: str
    adoc_identifier: str
    curie: str
    ontology_file: str
    shapes_file: str


@dataclass
class ClassTemplateSettings(TemplateSettings):
    options: ClassTemplateOptions
    lookups: Graph


@dataclass
class Property:
    uri: str
    property_shape_uri: str
    curie: str
    status: str
    label: str
    definition: str
    implementation: str
    cardinality: str
    node_kind: str
    scope_note: str
    # datatype_of_value: str = ""
    class_type: str
    expected_values: str = ""


def get_class_properties(
    template_details: ClassTemplateSettings, shapes_graph: Graph, lookups: Graph
) -> List:
    properties = []

    node_shape_uri = template_details.options.uri
    property_shapes = list(shapes_graph.objects(URIRef(node_shape_uri), SH.property))
    property_shapes.sort()

    for property_shape_uri in property_shapes:
        uri = shapes_graph.value(property_shape_uri, SH.path)
        curie = shapes_graph.value(property_shape_uri, SH.name)
        status_uri = shapes_graph.value(property_shape_uri, REG.status)
        try:
            status = get_status(status_uri)
        except ValueError as err:
            raise ValueError(f"{err} for property shape {property_shape_uri}") from err
        label = shapes_graph.value(property_shape_uri, SKOS.prefLabel)
        description = shapes_graph.value(property_shape_uri, SH.description)
        scope_note = shapes_graph.value(property_shape_uri, SKOS.scopeNote)
        message = shapes_graph.value(property_shape_uri, SH.message)
        cardinality = property_shape.get_cardinality(property_shape_uri, shapes_graph)
        node_kind = property_shape.get_node_kind_as_str(
            property_shape_uri, shapes_graph
        )
        class_type = property_shape.get_class_type_as_str(
            property_shape_uri, shapes_graph
        )
        expected_values = property_shape.get_expected_values_str(
            property_shape_uri, shapes_graph, lookups
        )

        for item in (
            (uri, "uri"),
            (curie, "curie"),
            (status_uri, "status_uri"),
            (status, "status"),
            (label, "label"),
            (description, "description"),
            (message, "message"),
            (cardinality, "cardinality"),
            (node_kind, "node_kind"),
        ):
            if item[0] is None:
                raise ValueError(
                    f"Required value not set. {property_shape_uri} {item[1]}"
                )

        properties.append(
            Property(
                uri=uri,
                property_shape_uri=property_shape_uri,
                curie=curie,
                status=status,
                label=label,
                definition=description,
                scope_note=scope_note,
                implementation=message,
                cardinality=cardinality,
                node_kind=node_kind,
                class_type=class_type,
                expected_values=expected_values,
            )
        )
        # print(properties[-1])

    return properties


def create_file(template_details: ClassTemplateSettings):
    uri, adoc_identifier, curie, ontology_file, shapes_file = attrgetter(
        "uri", "adoc_identifier", "curie", "ontology_file", "shapes_file"
    )(template_details.options)
    lookups = template_details.lookups

    g = get_graph(ontology_file)
    shapes_graph = get_graph(shapes_file)

    class_uri = shapes_graph.value(uri, SH.targetClass)
    status_uri = g.value(class_uri, REG.status)
    label = g.value(class_uri, SKOS.prefLabel)
    definition = g.value(class_uri, SKOS.definition)
    requirement = shapes_graph.value(uri, SH.message)
    scope_note = g.value(class_uri, SKOS.scopeNote)

    for item in (
        (class_uri, "class_uri"),
        (status_uri, "status_uri"),
        (label, "label"),
        (definition, "definition"),
    ):
        if item[0] is None:
            raise ValueError(f"Required value not set. {uri} {item[1]}")

    properties = get_class_properties(template_details, shapes_graph, lookups)

    templated_value = template_details.template.render(
        adoc_identifier=adoc_identifier,
        curie=curie,
        class_uri=class_uri,
        status=get_status(status_uri),
        label=label,
        definition=definition,
        requirement=requirement,
        scope_note=scope_note,
        properties=properties,
    )

    # Write to file
    target_path = Path(template_details.target_path)
    path = Path(str(target_path).replace(str(target_path.name), ""))
    path.mkdir(exist_ok=True)
    with open(template_details.target_path, "w", encoding="utf-8") as f:
        f.write(templated_value)
