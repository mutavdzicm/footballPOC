import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";
import { SvgUri } from "react-native-svg";

import SwitchSelector from "react-native-switch-selector";
import { HelveticaText } from "../components/StyledText";

import API from "../API";

export default function DetailsScreen({ route, navigation }) {
  const { id } = route.params;
  const [homeRankData, setHomeRankData] = useState(null);
  const [awayRankData, setAwayRankData] = useState(null);
  const [displayedRankData, setDisplayedRankData] = useState(null);
  const [teamData, setTeamData] = useState({});

  // API calls
  async function fetchRankings() {
    const res = await API.get(
      "/v2/competitions/2021/standings?standingType=HOME"
    );
    const table = res.data && res.data.standings[0].table;
    setHomeRankData(table);
    setDisplayedRankData(table);
    const resAway = await API.get(
      "/v2/competitions/2021/standings?standingType=AWAY"
    );
    setAwayRankData(resAway.data && resAway.data.standings[0].table);
  }
  async function fetchTeamDetails(_id) {
    const res = await API.get(`v2/teams/${_id}`);
    setTeamData(res.data);
  }
  useEffect(() => {
    fetchTeamDetails(id);
    fetchRankings("HOME");
  }, []);

  const currentTeamData =
    displayedRankData === null
      ? null
      : displayedRankData.find(item => item.team.id === id);
  let {
    playedGames,
    won,
    draw,
    lost,
    points,
    goalsFor,
    goalsAgainst,
    goalDifference
  } = currentTeamData || {};
  let { crestUrl, address, venue, email, website, founded } = teamData || {};

  const options = [
    { label: "home", value: 1 },
    { label: "away", value: 0 }
  ];
  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
      >
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <View style={styles.backBtn}>
            <Ionicons name="ios-arrow-back" size={23} color="black" />
            <Text style={styles.backTxt}>Back</Text>
          </View>
        </TouchableOpacity>
        <View style={styles.teamContent}>
          <SvgUri
            style={styles.teamLogo}
            width="105px"
            height="120px"
            uri={crestUrl}
          />
          <View style={styles.teamInfo}>
            <View style={styles.teamRow}>
              <Image
                source={require("../assets/images/address.png")}
                style={styles.teamico}
              />
               <HelveticaText>{address}</HelveticaText>
            </View>
            <View style={styles.teamRow}>
              <Image
                source={require("../assets/images/stadium.png")}
                style={styles.teamico}
              />
               <HelveticaText >{venue}</HelveticaText>
            </View>
            <View style={styles.teamRow}>
              <Image
                source={require("../assets/images/website.png")}
                style={styles.teamico}
              />
               <HelveticaText >{website}</HelveticaText>
            </View>
            <View style={styles.teamRow}>
              <Image
                source={require("../assets/images/mail.png")}
                style={styles.teamico}
              />
               <HelveticaText >{email}</HelveticaText>
            </View>
            <View style={styles.teamRow}>
              <Image
                source={require("../assets/images/year.png")}
                style={styles.teamico}
              />
               <HelveticaText >{founded}</HelveticaText>
            </View>
          </View>
        </View>
        <SwitchSelector
          onPress={value =>
            value
              ? setDisplayedRankData(homeRankData)
              : setDisplayedRankData(awayRankData)
          }
          options={options}
          initial={0}
          textColor="#707070"
          selectedColor="#FFFFFF"
          buttonColor="#transparent"
          borderRadius={9}
          hasPadding
          height={28}
          style={{
            width: 146,
            marginLeft: "auto",
            marginRight: "auto",
            marginTop: 64,
            marginBottom: 23
          }}
          selectedTextContainerStyle={{
            backgroundColor: "#00d8ff",
            borderColor: "#00d8ff",
            borderRadius: 9,
            overflow: "visible",
            height: 29,
            marginTop: -1
          }}
        />
        {/* HOME AWAY */}
        <View>
          <View style={styles.gamesRow}>
            <HelveticaText style={styles.gamesTxt}>Played games</HelveticaText>
            <HelveticaText style={StyleSheet.flatten([styles.gamesTxt, styles.transp])}>{playedGames}</HelveticaText>
          </View>
          <View style={styles.gamesRow}>
            <HelveticaText style={styles.gamesTxt}>Won games</HelveticaText>
            <HelveticaText style={StyleSheet.flatten([styles.gamesTxt, styles.transp])}>{won}</HelveticaText>
          </View>
          <View style={styles.gamesRow}>
            <HelveticaText style={styles.gamesTxt}>Draw games</HelveticaText>
            <HelveticaText style={StyleSheet.flatten([styles.gamesTxt, styles.transp])}>{draw}</HelveticaText>
          </View>
          <View style={styles.gamesRow}>
            <HelveticaText style={styles.gamesTxt}>Lost games</HelveticaText>
            <HelveticaText style={StyleSheet.flatten([styles.gamesTxt, styles.transp])}>{lost}</HelveticaText>
          </View>
          <View style={styles.gamesRow}>
            <HelveticaText style={styles.gamesTxt}>Goal for</HelveticaText>
            <HelveticaText style={StyleSheet.flatten([styles.gamesTxt, styles.transp])}>{goalsFor}</HelveticaText>
          </View>
          <View style={styles.gamesRow}>
            <HelveticaText style={styles.gamesTxt}>Goal against</HelveticaText>
            <HelveticaText style={StyleSheet.flatten([styles.gamesTxt, styles.transp])}>{goalsAgainst}</HelveticaText>
          </View>
          <View style={styles.gamesRow}>
            <HelveticaText style={styles.gamesTxt}>Goal difference</HelveticaText>
            <HelveticaText style={StyleSheet.flatten([styles.gamesTxt, styles.transp])}>{goalDifference}</HelveticaText>
          </View>
          <View style={styles.gamesRow}>
            <HelveticaText style={styles.gamesTxt}>Points</HelveticaText>
            <HelveticaText style={StyleSheet.flatten([styles.gamesTxt, styles.transp])}>{points}</HelveticaText>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  contentContainer: {
    paddingTop: 60,
    paddingLeft: 20,
    paddingRight: 20
  },
  backBtn: {
    flexDirection: "row"
  },
  backTxt: {
    fontSize: 20,
    fontWeight: "bold",
    paddingLeft: 6,
    lineHeight: 23
  },
  teamLogo: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  teamContent: {
    marginTop: 50,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  teamInfo: {
    maxWidth: "65%"
  },
  teamRow: {
    flexDirection: "row",
    marginBottom: 12
  },
  teamico: {
    height: 20,
    width: 20,
    marginRight: 9
  },
  gamesRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 13,
    borderBottomWidth: 1,
    borderColor: "#F0F0F0"
  },
  gamesTxt: {
    fontSize: 20,
    fontWeight: "bold"
  },
  transp: {
    opacity: 0.7
  }
});
