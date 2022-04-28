# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

**Note: This changelog is no longer maintained. Please see https://github.com/ternaustralia/ontology_tern/releases changelog details.**

## [0.4.0] - 2022-02-01

### Added

- Import of ssn extension
- tern:ObservationCollection
- tern-org:Organization as one of the value types of prov:wasAttributedTo on tern:Sampling and tern:Observation
- sosa:madeBySensor to tern:Observation
- sosa:madeBySampler to tern:Sampling
- tern:observationType to tern:Observation
- tern:samplingType to tern:Sampling
- tern:Distribution
- tern:Dataset
- Add description
  - void:inDataset
  - tern:attribute
  - tern:hasSimpleValue
  - tern:hasValue
  - tern:isAttributeOf
- tern:Integer
- tern:Float
- tern:System
  - Add new property called tern:systemType
  - Added property tern:systemType and dcterms:type
- tern:Sampler
  - SHACL constraints added

### Changed

- prov:wasAttributedTo on activities (Observation, Sampling) change to prov:wasAssociatedWith
- All classes may have dcterms:type. There should be no cardinality here.
- tern:Observation
  - sosa:hasResult sh:class is an AND between tern:Value and tern:Result.
- tern:Result no longer a subclass of tern:Value

### Removed

- Import of datatype vocabulary
- tern:isAttributeOf a sub-property of ssn:isPropertyOf because the TopBraid Composer diagram view is inferring that the range of values is sosa:FeatureOfInterest.
- Some OWL restrictions as it doubles up in the diagram view in TopBraid Composer with the SHACL constraints.
- Slowly remove OWL restrictions as they are unused besides expressing the OWL side of the model. More in favour of SHACL now.
- void:inDataset
  - Remove sh:minCount = 1 and sh:maxCount = 1
- tern:Count
- tern:QuantitativeRange
- tern:Percent
- tern:PercentRange
- tern:QuantitativeMeasure
- tern:Plot
- tern:Instrument
- tern:Concept

## [0.3.2] - 2021-09-22

### Added

- sosa:isSampleOf is now a transitive property
- Classes ManagedFeature, Plot, Quadrat, Transect, RDFDataset, Value
- Properties hasSimpleValue, hasValue
- tern:Taxon class

### Removed

- tern:siteType
- References to Site directly on Sampling and Observation
- Duplicate properties in subclasses (they already exist in parent classes)

## [0.3.1] - 2021-07-29

### Added

- sh:NodeShape and sh:PropertyShape are now directly on the owl:Class instead of in a separate file.
- tern:Transect class and node shape
- tern:Attribute, tern:hasAttribute and tern:isAttributeOf are now subclasses and subproperties of SSN
- inverse properties to tern:isSiteOf and tern:isSiteVisitOf to tern:hasSite and tern:hasSiteVisit

## [0.3.0] - 2021-07-16

### Removed

- Specialised classes of tern:Site
- Removed dependency on the Datatype vocabulary and redefined the datatype classes in this ontology with a few minor tweaks
- Removed other unused classes such as AutomaticWeatherStation, SAR, SoilProfile, PropertyValue, etc

## [0.2.3] - 2021-05-17

### Added

- tern:Method OWL restrictions for tern:hasParameter, tern:hasCategoricalCollection, schema:timeRequired and skos:note

### Changed

- tern:equipment expected datatype changed from xsd:string to skos:Concept
- tern:instructions expected datatype changed from xsd:string to rdf:Seq

## [0.2.2] - 2021-04-20

### Added

- tern:AusPlotsRangelandsSite
- tern:AusPlotsForestsSite

## [0.2.1] - 2021-03-18

### Added

- tern:purpose to tern:FluxTower
- dcterms:type to tern:Instrument
- schema:serialNumber to tern:Method

## [0.2.0] - 2021-02-19

### Added

- tern:domain
- tern:FeatureOfInterest

### Changed

- Ontology description
- Ontology organisation metadata - use schema.org's https for pylode generation
- tern:hadSubActivity -> tern:hasSubActivity
- tern:wasSubActivityOf -> tern:isSubActivityOf
- Label of tern:Site from "Site" to "Ecological Site"

## [0.1.3] - 2021-01-06

### Added

- tern:methodType added to tern:Procedure
- tern:SoilProfile and tern:SoilHorizon class with new properties tern:soilClassification and tern:soilHorizon

## [0.1.2] - 2020-12-07

### Added

- tern:DigitalCamera rdfs:subClassOf tern:Sampler
- tern:Sampler rdfs:subClassOff tern:Instrument
- tern:Instrument
- tern:PhenologyCamera
- tern:RadiationSensor
- tern:Radiometer
- tern:SAR
- tern:Sensor
- tern:Spectroradiometer

### Changed

- tern:Method definition - added "in water or in space".

## [0.1.1] - 2020-11-23

### Added

- tern:CosmOzStation

## [0.1.0] - 2020-11-03

### Changed

- Moved almost all classes and properties from the plot: namespace to tern:

### Added

- tern:DerivedObservation
- tern:TERNDerivedObservation

## [0.0.6] - 2020-07-06

### Added

- plot:globalVocabulary

## [0.0.5] - 2020-07-01

### Removed

- plot:upperParameter
- plot:datasetParameter

### Added

- plot:globalValue

## [0.0.4] - 2020-06-16

### Added

- plot:weight
- plot:SamplingPoint subclass of tern-loc:Point

## [0.0.3] - 2020-05-27

### Removed

- plot:Site restrictions for plot:mapScale, plot:mapsheetName and plot:mapsheetNumber

### Added

- plot:PropertyValue
- plot:Site restriction on schema:additionalProperty
- plot:area and plot:dimension
- plot:width and plot:length
- plot:Dimension
- plot:siteDescription and plot:locationDescription
- plot:Transect
- plot:SamplingPoint
- plot:transectDirection
- plot:transectStart
- plot:transectEnd
- plot:hasSamplingPoint
- plot:isSamplingPointOf

## [0.0.2] - 2020-05-18

### Changed

- plot:Site label from "Site and location" to "Site"
- plot: label from "The PLOT ontology" to The Plot Ontology"

### Added

- class restrictions for plot:Site
- class restrictions for plot:SiteVisit
- class restrictions for sosa:Observation
- class restrictions for sosa:ObservableProperty
- class restrictions for sosa:Procedure
- class restrictions for ssn:Input
- class restrictions for sosa:Result
- class restrictions for data:Boolean
- class restrictions for data:Count
- class restrictions for data:QuantitativeMeasure
- class restrictions for data:QuantitativeRange
- class restrictions for data:Text
- class restrictions for data:Percent
- class restrictions for data:PercentRange
- class restrictions for sosa:ObservationCollection
- class restrictions for sosa:Sample
- class restrictions for sosa:Sampling
- class restrictions for plot:SiteStratum
- class restrictions for plot:SiteTaxon
- class restrictions for plot:SiteStratumTaxon
- plot:datasetParameter
- plot:upperParameter

## [0.0.1] - 2019-06-19

### Added

- Initial release - created by Simon Cox
