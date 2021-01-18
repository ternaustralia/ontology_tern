# TERN Ontology

Online Documentation: https://ternaustralia.github.io/ontology_tern/


## Building the documentation

In the directory of `docs/`, run:

```
docker run --rm -it --name pylode -e ONTOLOGY_FILE=tern.ttl -e OPTIONS="--css true" -v ${PWD}:/pyLODE/src/pylode/input edmondchuc/pylode
```

## Cleaning the TopBraid OWL2SHACL output

We use TopBraid Composer for the OWL2SHACL feature where a SHACL file containing shapes is generated from the OWL ontology. Running this docker container performs some post-processing on the SHACL file such as adding `sh:targetClass` to each `sh:NodeShape`. 

```
docker run --rm --name tbc-shacl-cleaner -e SHACL_FILE="tern.shapes.ttl" -v ${PWD}:/home/input edmondchuc/tbc-shacl-cleaner
```


## Making modifications

- Bump the version number in the ontology, the version information, and the modified date. 
- Enter the new changes into `CHANGELOG.md` following the conventions of semantic versioning. 

Each version should:
- List its release date in the above format.
- Group changes to describe their impact on the project, as follows:
- `Added` for new features.
- `Changed` for changes in existing functionality.
- `Deprecated` for once-stable features removed in upcoming releases.
- `Removed` for deprecated features removed in this release.
- `Fixed` for any bug fixes.
- `Security` to invite users to upgrade in case of vulnerabilities.


## Contact

**Edmond Chuc**  
e.chuc@uq.edu.au  
