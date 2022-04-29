from pathlib import Path

from rdflib import Graph, Namespace

from src import ClassTemplateOptions, ClassTemplateSettings, create_file
from src.templates import class_template


TERN_SHAPES = Namespace("https://w3id.org/tern/shapes/tern/")
VOCAB_LOOKUPS = Path(__file__).parent.parent.absolute() / "docs/vocab_lookups.ttl"
lookups = Graph().parse(str(VOCAB_LOOKUPS))

template_settings = [
    ClassTemplateSettings(
        template=class_template,
        target_path="spec/source/core/class-prov:Association.adoc",
        options=ClassTemplateOptions(
            uri=TERN_SHAPES.Association,
            adoc_identifier="class-prov:Association",
            curie="prov:Association",
            ontology_file="docs/tern.ttl",
            shapes_file="docs/tern.shapes.ttl",
        ),
        callable=create_file,
        lookups=lookups,
    ),
    ClassTemplateSettings(
        template=class_template,
        target_path="spec/source/core/class-tern:Attribute.adoc",
        options=ClassTemplateOptions(
            uri=TERN_SHAPES.Attribute,
            adoc_identifier="class-tern:Attribute",
            curie="tern:Attribute",
            ontology_file="docs/tern.ttl",
            shapes_file="docs/tern.shapes.ttl",
        ),
        callable=create_file,
        lookups=lookups,
    ),
    ClassTemplateSettings(
        template=class_template,
        target_path="spec/source/core/class-prov:Attribution.adoc",
        options=ClassTemplateOptions(
            uri=TERN_SHAPES.Attribution,
            adoc_identifier="class-prov:Attribution",
            curie="prov:Attribution",
            ontology_file="docs/tern.ttl",
            shapes_file="docs/tern.shapes.ttl",
        ),
        callable=create_file,
        lookups=lookups,
    ),
    ClassTemplateSettings(
        template=class_template,
        target_path="spec/source/core/class-tern:Boolean.adoc",
        options=ClassTemplateOptions(
            uri=TERN_SHAPES.Boolean,
            adoc_identifier="class-tern:Boolean",
            curie="tern:Boolean",
            ontology_file="docs/tern.ttl",
            shapes_file="docs/tern.shapes.ttl",
        ),
        callable=create_file,
        lookups=lookups,
    ),
    ClassTemplateSettings(
        template=class_template,
        target_path="spec/source/core/class-time:Instant.adoc",
        options=ClassTemplateOptions(
            uri=TERN_SHAPES.Instant,
            adoc_identifier="class-time:Instant",
            curie="time:Instant",
            ontology_file="docs/tern.ttl",
            shapes_file="docs/tern.shapes.ttl",
        ),
        callable=create_file,
        lookups=lookups,
    ),
]
