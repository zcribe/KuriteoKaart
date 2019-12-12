import React, {Component} from "react";
import {StyleSheet, View} from 'react-native';
import Constants from 'expo-constants';
import MapView from "react-native-map-clustering";
import CustomMarker from "./CustomMarker";
import Papa from "papaparse"
import {Marker} from "react-native-maps";


const INITIAL_REGION = {
    // Roughly Estonia
    latitude: 59.43,
    longitude: 24.75,
    latitudeDelta: 8.5,
    longitudeDelta: 8.5
};

const DATA_URL = 'https://opendata.smit.ee/ppa/csv/vara_1.csv'; //https://opendata.riik.ee/andmehulgad/varavastased-syyteod/


class Map extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: null,
            dataLoaded: false,
            loading: true

        };

        this.fetchData = this.fetchData.bind(this);
        this.createMarker = this.createMarker.bind(this);
        this.generateMarkers = this.generateMarkers.bind(this);

    }

    componentDidMount() {
        this.fetchData();
        this.setState({loading: false})
    }

    componentWillUnmount() {
        this.setState({loading: true})
    }


    generateMarkers() {
        // Bulk marker generation
        if (this.state.dataLoaded) {
            const dataset = this.state.data;
            return dataset.map((data) => this.createMarker(data))
        }
    }


    createMarker(data) {
        // Single marker generation
        return <CustomMarker data={data} key={data[0] + data[1]}/>
    }


    fetchData() {
        // Consume API with CSV format and convert into JSON
        const parseConfig = {
            worker: true,
            stream: false,
            download: true,
            preview: 200,
            complete: (result) => {
                this.setState({data: result.data, dataLoaded: true});
            },
        };
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
                    {this.generateMarkers()}

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