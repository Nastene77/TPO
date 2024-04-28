const assert = require('chai').assert;
const Plane = require('../Planes/Plane');
const MilitaryPlane = require('../Planes/MilitaryPlane');
const PassengerPlane = require('../Planes/PassengerPlane');
const Airport = require('../Airport');
const MilitaryType = require('../models/militaryType');
const ExperimentalPlane = require('../Planes/ExperimentalPlane');
const experimentalTypes = require('../models/experimentalTypes');
const classificationLevel = require('../models/classificationLevel');

describe('Checking the functionality of the class', () => {

    let planes = [
        new PassengerPlane('Boeing-737', 900, 12000, 60500, 164),
        new PassengerPlane('Boeing-737-800', 940, 12300, 63870, 192),
        new PassengerPlane('Boeing-747', 980, 16100, 70500, 242),
        new PassengerPlane('Airbus A320', 930, 11800, 65500, 188),
        new PassengerPlane('Airbus A330', 990, 14800, 80500, 222),
        new PassengerPlane('Embraer 190', 870, 8100, 30800, 64),
        new PassengerPlane('Sukhoi Superjet 100', 870, 11500, 50500, 140),
        new PassengerPlane('Bombardier CS300', 920, 11000, 60700, 196),
        new MilitaryPlane('B-1B Lancer', 1050, 21000, 80000, MilitaryType.BOMBER),
        new MilitaryPlane('B-2 Spirit', 1030, 22000, 70000, MilitaryType.BOMBER),
        new MilitaryPlane('B-52 Stratofortress', 1000, 20000, 80000, MilitaryType.BOMBER),
        new MilitaryPlane('F-15', 1500, 12000, 10000, MilitaryType.FIGHTER),
        new MilitaryPlane('F-22', 1550, 13000, 11000, MilitaryType.FIGHTER),
        new MilitaryPlane('C-130 Hercules', 650, 5000, 110000, MilitaryType.TRANSPORT),
        new ExperimentalPlane("Bell X-14", 277, 482, 500, experimentalTypes.HIGHALTITUDE, classificationLevel.SECRET),
        new ExperimentalPlane("Ryan X-13 Vertijet", 560, 307, 500, experimentalTypes.VTOL, classificationLevel.TOPSECRET)
    ];
    let planeWithMaxPassengerCapacity = new PassengerPlane('Boeing-747', 980, 16100, 70500, 242);

    it('should have military planes with transport type', () => {
        let airport = new Airport(planes);
        let transportMilitaryPlanes = airport.getTransportMilitaryPlanes();
        
        let hasTransportMilitaryPlanes = transportMilitaryPlanes.some(militaryPlane => militaryPlane.getMilitaryType() === MilitaryType.TYPETRANSPORT);
      
        assert.equal(hasTransportMilitaryPlanes, true);
      });

    it('should check passenger plane with max capacity', () => {
        let airport = new Airport(planes);
        let expectedPlaneWithMaxPassengersCapacity = airport.getPassengerPlaneWithMaxPassengersCapacity();
        assert.isFalse( expectedPlaneWithMaxPassengersCapacity == planeWithMaxPassengerCapacity);
    });


    it('should correctly sort planes by max load capacity', () => {
        console.info("TEST: should correctly sort planes by max load capacity");
    
        let airport = new Airport(planes);
        airport.sortByMaxLoadCapacity();
        let planesSortedByMaxLoadCapacity = airport.getPlanes();
    
        let nextPlaneMaxLoadCapacityIsHigherThanOrEqual = true;
        for (let i = 0; i < planesSortedByMaxLoadCapacity.length - 1; i++) {
            let currentPlane = planesSortedByMaxLoadCapacity[i];
            let nextPlane = planesSortedByMaxLoadCapacity[i + 1];
    
            if (currentPlane.getMinLoadCapacity() > nextPlane.getMinLoadCapacity()) {
                nextPlaneMaxLoadCapacityIsHigherThanOrEqual = false;
                break;
            }
        }
    
        assert.isTrue(nextPlaneMaxLoadCapacityIsHigherThanOrEqual);
    });

    it('should have at least one bomber in military planes', () => {
        let airport = new Airport(planes);
        let bomberMilitaryPlanes = airport.getBomberMilitaryPlanes();
    
        for (let militaryPlane of bomberMilitaryPlanes) {
            if (militaryPlane.getMilitaryType() === MilitaryType.BOMBER) {
                return; 
            }
        }
    
        assert.fail("There should be at least one bomber in military planes.");
    });

    it('should check that experimental planes have a classification level higher than unclassified', () => {
        let airport = new Airport(planes);
        let experimentalPlanes = airport.getExperimentalPlanes();
    
        for (let experimentalPlane of experimentalPlanes) {
            if (experimentalPlane.getClassificationLevel() === ClassificationLevel.UNCLASSIFIED) {
                assert.fail("Experimental planes should have a classification level higher than unclassified.");
            }
        }
    });

});



