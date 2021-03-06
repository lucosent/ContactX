import React from 'react';
import { Component } from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import { WebBrowser } from 'expo';

import { MonoText } from '../components/StyledText';

import { List, ListItem, SearchBar } from 'react-native-elements';
import { MaterialIcons } from '@expo/vector-icons';

const sampleContact=[
    {
      name: 'Amy Farha',
      picture:{
        thumbnail:'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
      },
      email: 'amy@gmail.com',
      rating:3,
      performan:3.5,
    },
    {
      name: 'Chris Jackson',
      picture:{
        thumbnail: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
      },
      email: 'chris@gmail.com',
      rating:5,
      performan:4,
    },
];

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    header: (
          <View style={{
              marginBottom: 0,
              backgroundColor:'#009688',
              }}>
            <Text style={{
              fontSize: 35,
                color: 'white',
                lineHeight: 60,
                textAlign:'left',
                marginLeft: 10,
              }}>ContactX</Text>
          </View>
        ),
  };

constructor(props) {
    super(props);

    this.state = {
      loading: false,
      data: [],
      page: 1,
      seed: 1,
      error: null,
      refreshing: false,
    };
  }

  renderSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: "86%",
          backgroundColor: "#CED0CE",
          marginLeft: "14%"
        }}
      />
    );
  };

  renderHeader = () => {
    return <SearchBar placeholder="Type Here..." lightTheme round />;
  };

  renderFooter = () => {
    if (!this.state.loading) return null;

    return (
      <View
        style={{
          paddingVertical: 20,
          borderTopWidth: 1,
          borderColor: "#CED0CE"
        }}
      >
        <ActivityIndicator animating size="large" />
      </View>
    );
  };

  componentDidMount() {
    this.makeRemoteRequest();
  }


  makeRemoteRequest = () => {
    var loopdata= new Array()
    for(i=0;i<sampleContact.length;i++){
      loopdata.push(sampleContact[i]);
    }
    this.setState({data:loopdata});

  };



  // handleLoadMore = () => {
  //   this.setState(
  //     {
  //       page: this.state.page + 1
  //     },
  //     () => {
  //       this.makeRemoteRequest();
  //     }
  //   );
  // };


  render() {
    return (
      <View style={styles.container}>

      <TouchableOpacity onPress={()=>{
        this.props.navigation.navigate("newContact")
      }} style={{position: 'absolute', bottom: 8, right: 8, width: 64, aspectRatio: 1 ,zIndex:1000,}}>
        <View style={{backgroundColor: 'red',shadowOpacity: 0.2, shadowOffset: {width: 0, height: 2}, shadowColor: 'black',  borderRadius: 32, flex: 1, justifyContent: 'center', alignItems: 'center',}}>
              <MaterialIcons name="add" size={32} color="white" />
        </View>
      </TouchableOpacity>

      <List containerStyle={{ borderTopWidth: 0, marginTop: 0, borderBottomWidth: 0 }}>
      <FlatList

        data={this.state.data}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={()=>{
            this.props.navigation.navigate("detailsScreen",{title:`${item.name}`})
          }}><ListItem

            roundAvatar
            title={`${item.name}`}
            subtitle={item.email}
            avatar={{ uri: item.picture.thumbnail }}
            containerStyle={{ borderBottomWidth: 0.3 }}
           /></TouchableOpacity>
        )}
          keyExtractor={item => item.email}
          ItemSeparatorComponent={this.renderSeparator}
          ListHeaderComponent={this.renderHeader}
          ListFooterComponent={this.renderFooter}
          refreshing={this.state.refreshing}
          onEndReachedThreshold={50}
      />
    </List>
      </View>
    );
  }

  _maybeRenderDevelopmentModeWarning() {
    if (__DEV__) {
      const learnMoreButton = (
        <Text onPress={this._handleLearnMorePress} style={styles.helpLinkText}>
          Learn more
        </Text>
      );

      return (
        <Text style={styles.developmentModeText}>
          Development mode is enabled, your app will be slower but you can use
          useful development tools. {learnMoreButton}
        </Text>
      );
    } else {
      return (
        <Text style={styles.developmentModeText}>
          You are not in development mode, your app will run at full speed.
        </Text>
      );
    }
  }

  _handleLearnMorePress = () => {
    WebBrowser.openBrowserAsync(
      'https://docs.expo.io/versions/latest/guides/development-mode'
    );
  };

  _handleHelpPress = () => {
    WebBrowser.openBrowserAsync(
      'https://docs.expo.io/versions/latest/guides/up-and-running.html#can-t-see-your-changes'
    );
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  developmentModeText: {
    marginBottom: 20,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center',
  },
  contentContainer: {
    paddingTop: 10,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 10,
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10,
  },
  barContainer: {
    marginTop: 10,
    marginBottom: 0,
    backgroundColor:'#009688',
  },
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightText: {
    color: 'rgba(96,100,109, 0.8)',
  },
  codeHighlightContainer: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center',
  },
  titleText: {
    fontSize: 35,
    color: 'white',
    lineHeight: 60,
    textAlign:'left',
    marginLeft: 10,
  },
  tabBarInfoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
    alignItems: 'center',
    backgroundColor: '#fbfbfb',
    paddingVertical: 20,
  },
  tabBarInfoText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    textAlign: 'center',
  },
  navigationFilename: {
    marginTop: 5,
  },
  helpContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
});
