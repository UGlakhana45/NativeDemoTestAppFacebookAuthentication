import {View, Text, StyleSheet, Image} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  AccessToken,
  LoginButton,
  Settings,
  LoginManager,
  Profile,
} from 'react-native-fbsdk-next';

// Ask for consent first if necessary
// Possibly only do this for iOS if no need to handle a GDPR-type flow

const App = () => {
  const [profilePicture, setProfilePicture] = useState('');
  useEffect(() => {
    Settings.setAppID('1421742441977274');
    Settings.initializeSDK();
  });

  return (
    <View style={styles.facebook}>
      <LoginButton
        onLoginFinished={(error, result) => {
          if (error) {
            console.log('login has error: ' + result.error);
          } else if (result.isCancelled) {
            console.log('login is cancelled.');
          } else {
            AccessToken.getCurrentAccessToken().then(data => {
              console.log(data.accessToken.toString());
            });

            const currentProfile = Profile.getCurrentProfile().then(function (
              currentProfile,
            ) {
              if (currentProfile) {
                console.log(currentProfile);
                setProfilePicture(currentProfile.imageURL);
              }
            });
          }
        }}
        onLogoutFinished={() => {
          console.log('logout.');
          setProfilePicture('');
        }}
      />
      {profilePicture !== '' && (
        <Image source={{uri: profilePicture}} style={styles.profileImage} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  facebook: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileImage: {
    height: 300,
    width: 300,
    marginVertical: 50,
  },
});

export default App;
