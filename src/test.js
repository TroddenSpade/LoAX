import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    Button,
    ActivityIndicator


} from "react-native";
import * as quoteActions from './redux/action/getPosts'
import { connect } from 'react-redux'

const list =(posts)=>{
    for(let key in posts){
        console.log(posts[key].username);
    }
}
class ReduxAsyncApp extends Component {
    render() {
        console.log(this.props.isLoading)
        
        return (
            <View style={styles.container}>
                {this.props.isLoading ?
                    <View>
                        <Text style={{ fontSize: 24, textAlign: 'center' }}>loading:</Text>
                        <Button title="Load Quote" onPress={()=>this.props.loadQuote()} />
                    </View>
                    :
                    <View>
                        <Text style={{ fontSize: 24, textAlign: 'center' }}>this:{list(this.props.list)}</Text>
                        <Button title="Load Quote" onPress={()=>this.props.loadQuote()} />
                    </View>
                }
            </View>
        );
    }
}

function mapStateToProps(state) {
    console.log(state)

    return {
        list: state.posts.list,
        isLoading: state.posts.loading,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        loadQuote: () => dispatch(quoteActions.getPosts())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ReduxAsyncApp);



const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});