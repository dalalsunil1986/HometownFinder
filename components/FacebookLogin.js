/**
 * Created by sharafat on 2/20/16.
 */
'use strict';
import React, {
    AppRegistry,
    Component,
    StyleSheet,
    Text,
    View
    } from 'react-native';

import FBLogin from 'react-native-facebook-login';

import BaseComponent from './BaseComponent';


class FacebookLogin extends BaseComponent {

    constructor(props) {
        super(props);

        this._bind('onFacebookLogin', 'navigateToMap');
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.welcome}>
                    Welcome to HometownFinder!
                </Text>

                <FBLogin permissions={['email', 'user_friends', 'user_hometown']}
                         onLogin={this.onFacebookLogin}
                         onLogout={function(e){console.log(e);}}
                         onError={function(e){console.log(e);alert('Error!');}}
                         onPermissionsMissing={function(e){console.log(e);alert('Error!')}}
                    />
            </View>
        );
    }

    onFacebookLogin(data) {
        var user = {
            id: data.profile.id,
            name: data.profile.name,
            hometown: null,
            imageUrl: 'https://graph.facebook.com/' + data.profile.id + '/picture',
            friends: [],
            token: data.token
        };

        var facebookLoginObject = this;

        fetch('https://graph.facebook.com/v2.5/me?fields=hometown%2Cfriends%7Bname%2Chometown%7D&access_token=' + user.token)
            .then(function (response) {
                return response.json();
            }).then(function (data) {
                if (data.hasOwnProperty('hometown')) {
                    user.hometown = {
                        id: data.hometown.id,
                        name: data.hometown.name
                    };
                }

                if (data.hasOwnProperty('friends')) {
                    for (var i = 0; i < data.friends.data.length; i++) {
                        var friend = data.friends.data[i];
                        if (friend.hasOwnProperty('hometown')) {
                            user.friends.push({
                                id: friend.id,
                                name: friend.name,
                                key: user.friends.length,
                                imageUrl: 'https://graph.facebook.com/' + friend.id + '/picture',
                                hometown: {
                                    id: friend.hometown.id,
                                    name: friend.hometown.name
                                }
                            });
                        }
                    }
                }

                facebookLoginObject.navigateToMap(user);
            });
    }

    navigateToMap(user) {
        this.props.navigator.push({
            id: 'hometownMarker',
            user: user
        });
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF'
    },
    welcome: {
        fontSize: 18,
        marginBottom: 30
    }
});

module.exports = FacebookLogin;
