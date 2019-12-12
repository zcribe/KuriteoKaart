import React, {Component} from 'react';
import {Marker} from "react-native-maps";

const COORDINATE_REVERSE_URL = 'http://www.maaamet.ee/rr/geo-lest/url/?xy='; // Usage link + x,y

class CustomMarker extends Component {
    constructor(props) {
        super(props);

        this.state = {
            coordinateLat: 59.43,
            coordinateLong: 24.75,
        };

        this.coordinateLestToXY = this.coordinateLestToXY.bind(this);
        this.coordinatesFormat = this.coordinatesFormat.bind(this);
    }

    componentDidMount() {
        this.coordinatesFormat()
    }

    coordinatesFormat() {
        // Truncate coordinate, handle header row exception
        let lest_y = this.props.data[21];
        let lest_x = this.props.data[22];

        if (lest_y.length === 15) {
            lest_y = lest_y.slice(0, 7);
            lest_x = lest_x.slice(0, 6);
            this.coordinateLestToXY(lest_x, lest_y);
        }
    }

    coordinateLestToXY(x, y) {
        // Convert L-EST standard coordinates to Google xy
        fetch(`${COORDINATE_REVERSE_URL}${x},${y}`)
            .then((response) => response.text())
            .then((coordinatesMixed) => {
                let coordinatesSplit = coordinatesMixed.split(',');
                this.setState({coordinateLat:parseFloat(coordinatesSplit[0]), coordinateLong:parseFloat(coordinatesSplit[1])})
            })
    }


    render() {
        return (
            <Marker
                coordinate={{latitude: this.state.coordinateLat, longitude: this.state.coordinateLong}} key={this.props.data[0]}
                description={`Kuupäev: ${this.props.data[1]} Aeg: ${this.props.data[2]} Koht: ${this.props.data[17]}`}
                title={this.props.data[6]}
            />

        );
    }
}

export default CustomMarker;