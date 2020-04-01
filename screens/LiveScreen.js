import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import LiveMatch from "../components/LiveMatch";


const LiveScreen = () => {
    const [livescore, setLivescore] = useState({matches: []});

    useEffect(() => {
        const socket = new WebSocket('ws://vasilie.net:42069/girodins-livescore');

        socket.onmessage = e => {
            setLivescore(JSON.parse(e.data));
        };

        return () => socket.close();
    }, []);

    const renderLiveScores = () => livescore.matches.map(match => <LiveMatch key={ match.title } match={ match } />);

    return (
      <View style={styles.container}>
          <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
              <Image
                  style={styles.banner}
                  source={require('../assets/images/heroImage.png')}
              />
              <Text style={styles.header}>
                  LIVE SCORES
              </Text>
              {
                  livescore && renderLiveScores()
              }
          </ScrollView>
      </View>
  );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: '100%',
        backgroundColor: '#fff',
    },
    banner: {
        width: '100%',
    },
    header: {
        textAlign: 'center',
        fontSize: 30,
        fontWeight: 'bold',
        marginTop: 40,
        color: '#707070'
    }
});

export default LiveScreen;
