from rdflib import SH, SKOS, Graph, Literal, URIRef
from rdflib.collection import Collection


def _get_label(uri: URIRef, g: Graph):
    label = g.value(uri, SKOS.prefLabel)
    if label is None:
        raise RuntimeError(f"No label found for node {uri}.")
    return label


def get_expected_values_str(uri: URIRef, g: Graph, lookups: Graph) -> str:
    list_value = g.value(uri, SH["in"])
    c = Collection(g, list_value)
    str_value = ""

    if len(c) > 0:
        if len(c) == 1:
            item = c[0]
            label = _get_label(item, lookups)
            str_value += f"link:{item}[{label}]"
        else:
            for i, item in enumerate(c):
                uri = None
                if isinstance(item, URIRef):
                    label = _get_label(item, lookups)
                    uri = str(item)
                elif isinstance(item, Literal):
                    label = item.n3()
                if label is None:
                    raise ValueError(f"Could not find label for {item}.")

                if i + 1 == len(c):
                    if uri:
                        str_value += f"- link:{uri}[{label}]"
                    else:
                        str_value += f"- `{label}`"
                else:
                    if uri:
                        str_value += f"- link:{uri}[{label}] +\n"
                    else:
                        str_value += f"- `{label}` +\n"

    return str_value
