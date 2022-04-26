from rdflib import URIRef

from src.namespaces import REG


def get_status(status_uri: URIRef) -> str:
    if status_uri == REG.statusExperimental:
        return "`experimental` icon:circle-o[]"
    elif status_uri == REG.statusStable:
        return "`stable` icon:check-circle[]"
    else:
        raise ValueError(f"Unexpected status URI {status_uri}")
