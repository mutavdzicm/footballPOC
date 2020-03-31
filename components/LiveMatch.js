import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';


const LiveMatch = ({ match }) => {

    return (
        <View style={styles.container}>
            <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
                <Image
                    style={styles.team}
                    source={{uri: match.home.img}}
                />
                <View>
                    <Text style={styles.score}>
                        {match.home.score} : {match.away.score}
                    </Text>
                    <Text style={styles.time}>
                        time: { match.minute }
                    </Text>
                </View>
                <Image
                    style={styles.team}
                    source={{uri: match.away.img}}
                />
            </ScrollView>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: '100%',
        backgroundColor: '#fff',
    },
    contentContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        paddingTop: 40,
    },
    team: {
        width: 120,
        height: 120,
        resizeMode: 'contain'
    },
    time: {
        textAlign: 'center',
        fontSize: 20,
        fontWeight: 'bold',
        color: '#707070'
    },
    score: {
        textAlign: 'center',
        fontSize: 40,
        fontWeight: 'bold',
        color: '#707070'
    }
});

export default LiveMatch
