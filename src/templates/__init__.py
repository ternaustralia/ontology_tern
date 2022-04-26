from jinja2 import Template

class_template = Template(
    """
[#{{ adoc_identifier }}]
==== Class: {{ curie }}

[cols="1,4"]
|===
| Property | Value

| IRI | link:{{ class_uri }}[`{{ curie }}`]
| Status | {{ status }}
| Label | {{ label }}
| Definition | {{ definition }}
{% if requirement %}| Implementation | {{ requirement }}{% endif %}
| Scope note | {{ scope_note or "" }}
|===

{% for property in properties %}
[#{{ adoc_identifier }}-{{ property.curie }}]
===== Property: {{ property.curie }}
[cols="1,4"]
|===
| Property | Value

| IRI | {{ property.uri }}[`{{ property.curie }}`]
| Shape IRI | {{ property.property_shape_uri }}
| Status | {{ property.status }}
| Label | {{ property.label }}
| Definition | {{ property.definition }}
| Scope note | {{ property.scope_note or "" }}
| Implementation | {{ property.implementation }}
| Cardinality | {{ property.cardinality }}
| Node kind | {{ property.node_kind }}
| Class type | {{ property.class_type }}
| Expected values | {{ property.expected_values }}
|===
{% endfor %}
"""
)
