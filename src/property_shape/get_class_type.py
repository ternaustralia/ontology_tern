from typing import List, Tuple, Union

from rdflib import BNode, Graph, URIRef
from jinja2 import Template

prefix_cache = {"https://w3id.org/tern/ontologies/tern/": "tern"}


def get_base_uri_and_local_name(uri: URIRef) -> Tuple[str, str]:
    local_name = uri.split("#")[-1].split("/")[-1]
    base_uri = uri.split(local_name)[0]
    return base_uri, local_name


def get_curie(uri: URIRef) -> str:
    base_uri, local_name = get_base_uri_and_local_name(uri)
    prefix = prefix_cache.get(base_uri)
    if prefix is None:
        # Use the last segment of the base URI as the prefix
        prefix = base_uri.rstrip("/").split("/")[-1].lower()
        prefix_cache[base_uri] = prefix
    return f"{prefix}:{local_name}"


def get_class_type_as_str(uri: Union[BNode, URIRef], g: Graph) -> str:
    class_types = get_class_and_datatype_types(uri, g)

    class_types_str = ""
    for i, class_type in enumerate(class_types):
        curie = get_curie(class_type)
        if i + 1 == len(class_types):
            class_types_str += f"link:{class_type}[`{curie}`]"
        else:
            class_types_str += f"link:{class_type}[`{curie}`] +\n"
    return class_types_str


def get_class_and_datatype_types(uri: Union[BNode, URIRef], g: Graph) -> List[URIRef]:
    template = Template(
        """
        PREFIX sh: <http://www.w3.org/ns/shacl#>
        PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
        SELECT DISTINCT ?class_type ?uri
        where {
            {% if is_blank_node %}
            BIND(BNODE("{{ uri }}") AS ?uri)
            {% else %}
            BIND(<{{ uri }}> AS ?uri)
            {% endif %}

            {
                ?uri sh:datatype ?class_type
            }
            UNION {
                ?uri sh:class ?class_type
            }
            UNION {
                ?uri ?p ?o .
                OPTIONAL {
                    ?o rdf:rest*/rdf:first ?oo .
                    ?oo ?ppp ?class_type .

                }
                FILTER(?ppp = sh:datatype && ?class_type != "" || ?ppp = sh:class && ?class_type != "")
            }

        }
    """
    )
    query = template.render(uri=uri, is_blank_node=isinstance(uri, BNode))
    results = g.query(query)
    class_types = []
    for row in results:
        class_type = row["class_type"]
        class_types.append(class_type)

    return class_types
