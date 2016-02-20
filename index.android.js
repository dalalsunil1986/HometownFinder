'use strict';
import React, {
    AppRegistry,
    Component,
    Navigator
    } from 'react-native';

import FacebookLogin from './components/FacebookLogin';
import HometownMarker from './components/HometownMarker';

class HometownFinder extends Component {

    render() {
        return (
            <Navigator
                initialRoute={{id: 'fbLogin'}}
                renderScene={this.navigatorRenderScene}/>
        );
    }

    navigatorRenderScene(route, navigator) {
        switch (route.id) {
            case 'fbLogin':
                return (<FacebookLogin navigator={navigator} title="first"/>);
            case 'hometownMarker':
                return (<HometownMarker user={route.user} title="second"/>);
        }
    }
}

AppRegistry.registerComponent('HometownFinder', () => HometownFinder);
