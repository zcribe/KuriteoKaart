import React, {Component} from 'react';
import {Text, StyleSheet} from "react-native";
import {Callout, Marker} from "react-native-maps";
import Constants from "expo-constants";

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

                if (!isNaN(parseFloat(coordinatesSplit[0]))) {
                    this.setState({
                        coordinateLat: parseFloat(coordinatesSplit[0]),
                        coordinateLong: parseFloat(coordinatesSplit[1])
                    })
                }
            })
    }


    render() {
        return (
            <Marker
                coordinate={{latitude: this.state.coordinateLat, longitude: this.state.coordinateLong}}
                key={this.props.data[0]}
            >
                <Callout>
                    <Text style={styles.heading}>{this.props.data[6]}</Text>
                    <Text style={styles.law}>{this.props.data[10]} {this.props.data[11]} {this.props.data[13]}</Text>
                    <Text>{this.props.data[1]} {this.props.data[2]}</Text>
                    <Text>{this.props.data[19]}, {this.props.data[20]}</Text>
                    <Text>{this.props.data[17]}</Text>

                </Callout>
            </Marker>

        );
    }
}

const styles = StyleSheet.create({
        heading: {
            fontWeight: '700',
            fontSize: 20
        },
        law: {
            fontWeight: '100',
            fontSize: 8
        }
    });

export default CustomMarker;