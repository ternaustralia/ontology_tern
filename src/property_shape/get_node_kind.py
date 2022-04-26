from typing import Optional
from rdflib import SH, Graph, URIRef


def get_node_kind_as_str(uri: URIRef, g: Graph) -> Optional[str]:
    node_kind = g.value(uri, SH.nodeKind)

    if node_kind is None:
        return ""
    else:
        curie = str(node_kind).replace(str(SH), "sh:")
        return f"link:{node_kind}[`{curie}`]"
