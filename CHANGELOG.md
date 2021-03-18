# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).


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