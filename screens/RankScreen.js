import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Image,
  TouchableOpacity,
  View,
  FlatList
} from "react-native";

import { HelveticaText } from "../components/StyledText";

import API from "../API";

export default function RankScreen({ navigation }) {
  const [rankData, setRankData] = useState({});

  const fetchRankings = async () => await API.get("/v2/competitions/2021/standings/");

  useEffect(() => {
    fetchRankings()
        .then(success => setRankData(success.data))
        .catch(error => console.log(error))
  }, []);

  return (
    <View style={styles.container}>
        <Image
          source={require("../assets/images/heroImage.png")}
          style={styles.image}
        />

        <View style={styles.row}>
          <HelveticaText
            style={StyleSheet.flatten([styles.item, styles.header])}
          >
            #
          </HelveticaText>
          <HelveticaText style={StyleSheet.flatten([styles.header, styles.teamName])}>CLUB</HelveticaText>
          <HelveticaText
            style={StyleSheet.flatten([styles.item, styles.header])}
          >
            PG
          </HelveticaText>
          <HelveticaText
            style={StyleSheet.flatten([styles.item, styles.header])}
          >
            WG
          </HelveticaText>
          <HelveticaText
            style={StyleSheet.flatten([styles.item, styles.header])}
          >
            DG
          </HelveticaText>
          <HelveticaText
            style={StyleSheet.flatten([styles.item, styles.header])}
          >
            LG
          </HelveticaText>
          <HelveticaText
            style={StyleSheet.flatten([styles.item, styles.header])}
          >
            P
          </HelveticaText>
        </View>

        <FlatList
          data={rankData.standings && rankData.standings[0].table}
          renderItem={({ item }) => {
            const {
              position,
              team,
              playedGames,
              won,
              draw,
              lost,
              points
            } = item;

            return (
              <TouchableOpacity
                onPress={() => navigation.navigate("Details", { id: team.id })}
              >
                <View style={styles.row}>
                  <HelveticaText style={styles.position}>
                    {position}.
                  </HelveticaText>
                  <HelveticaText style={styles.teamName}>
                    {team.name}
                  </HelveticaText>
                  <HelveticaText style={styles.item}>
                    {playedGames}
                  </HelveticaText>
                  <HelveticaText style={styles.item}>{won}</HelveticaText>
                  <HelveticaText style={styles.item}>{draw}</HelveticaText>
                  <HelveticaText style={styles.item}>{lost}</HelveticaText>
                  <HelveticaText style={styles.item}>{points}</HelveticaText>
                </View>
              </TouchableOpacity>
            );
          }}
          keyExtractor={item => item.team.id.toString()}
        />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  contentContainer: {
    paddingTop: 0
  },
  header: {
    fontSize: 18,
    fontWeight: "bold"
  },
  image: {
    width: "100%"
  },
  row: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    paddingLeft: 5,
    paddingTop: 7,
    paddingBottom: 7,
    borderBottomColor: "#F0F0F0",
    borderBottomWidth: 1
  },
  item: {
    width: "10%",
    textAlign: "center",
    fontSize: 14
  },
  position: {
    width: "10%",
    textAlign: "center",
    fontSize: 14,
    fontWeight: "bold"
  },
  teamName: {
    width: "40%"
  }
});
