const PassengerPlane = require('./Planes/PassengerPlane');
const MilitaryPlane = require('./Planes/MilitaryPlane');
const MilitaryType = require('./models/militaryType');
const ExperimentalPlane = require('./Planes/ExperimentalPlane.js');

class Airport {

    getPassengerPlane() {
        return this.planes.filter(plane => plane instanceof PassengerPlane);
    }

    getMilitaryPlanes() {
        return this.planes.filter(plane => plane instanceof MilitaryPlane);
    }

    getPassengerPlaneWithMaxPassengersCapacity() {
        let passengerPlanes = this.getPassengerPlanes();
        return passengerPlanes.reduce((prevPlane, currentPlane) => {
          return currentPlane.getPassengersCapacity() > prevPlane.getPassengersCapacity() ? currentPlane : prevPlane;
        });
    }

    getTransportMilitaryPlanes() {
        let militaryPlanes = this.getMilitaryPlanes();
        return militaryPlanes.filter(plane => plane.getMilitaryType() === MilitaryType.TYPETRANSPORT);
    }


    getBomberMilitaryPlanes() {
        let militaryPlanes = this.getMilitaryPlanes();
        return militaryPlanes.filter(plane => plane.getMilitaryType() === MilitaryType.BOMBER);
    }

    constructor(planes) {
        this.planes = planes;
    }

    getExperimentalPlanes() {
        return this.planes.filter(plane => plane instanceof ExperimentalPlane);
    }


    sortByMaxDistance() {
        this.planes.sort((planeA, planeB) => (planeA.getMaxFlightDistance() > planeB.getMaxFlightDistance()) ? 1 : -1);
        return this;
      }
      sortByMaxSpeed() {
        this.planes.sort((planeA, planeB) => planeA.getMaxSpeed() - planeB.getMaxSpeed());
        return this;
      }
      
      sortByMinLoadCapacity() {
        this.planes.sort((planeA, planeB) => planeA.getMinLoadCapacity() - planeB.getMinLoadCapacity());
        return this;
      }
      
      getPlanes() {
        return this.planes;
      }

    static print(planes) {
        return JSON.stringify(planes);
    }
}

module.exports = Airport;
