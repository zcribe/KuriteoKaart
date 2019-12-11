import React, {Component} from "react";
import {StyleSheet, View} from 'react-native';
import Constants from 'expo-constants';
import MapView from "react-native-map-clustering";
import {Marker} from "react-native-maps";
import Papa from "papaparse"


const INITIAL_REGION = {
    latitude: 59.43,
    longitude: 24.75,
    latitudeDelta: 8.5,
    longitudeDelta: 8.5
};

const DATA_URL = 'https://opendata.smit.ee/ppa/csv/vara_1.csv';
const COORDINATE_REVERSE_URL = 'http://www.maaamet.ee/rr/geo-lest/url/?xy=';


class Map extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: null,

        }

        this.fetchData = this.fetchData.bind(this)
    }

    createMarker() {
        return <Marker/>
    }

    componentDidMount() {
        this.fetchData();
    }

    fetchData() {
        const parseConfig = {
            worker: true,
            stream: false,
            download: true,
            preview: 10,
            complete: (result) => {
                this.setState({data: result})
            },
        }
        if (this.state.data === null) {
            Papa.parse(
                DATA_URL, parseConfig
            )
        }
    }


    render() {

        return (
            <View styles={styles.container}>
                <MapView initialRegion={INITIAL_REGION} style={{alignSelf: 'stretch', height: '100%'}}>
                    <Marker coordinate={{latitude: 52.0, longitude: 18.2}}/>
                    <Marker coordinate={{latitude: 52.4, longitude: 18.7}}/>
                    <Marker coordinate={{latitude: 52.1, longitude: 18.4}}/>
                    <Marker coordinate={{latitude: 52.6, longitude: 18.3}}/>
                    <Marker coordinate={{latitude: 51.6, longitude: 18.0}}/>
                    <Marker coordinate={{latitude: 53.1, longitude: 18.8}}/>
                    <Marker coordinate={{latitude: 52.9, longitude: 19.4}}/>
                    <Marker coordinate={{latitude: 52.2, longitude: 21}}/>
                </MapView>
            </View>
        );
    }
}

const
    styles = StyleSheet.create({
        container: {
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#ecf0f1',
            paddingTop: Constants.statusBarHeight,
        },
    });

export default Map;