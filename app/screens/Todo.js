import React, { Component } from 'react'
import { FlatList, Alert } from 'react-native';
import {Container, Content, Text, Input, View, Item, Footer, FooterTab, Button} from 'native-base'

import { connect } from 'react-redux';
import { fetchHeroes, createHeroes } from '../components/actions/heroes';

class Todo extends Component {

    static navigationOptions = {
        title: 'TODO APP',
        headerTitleStyle :{ textAlign: 'center', flexGrow: 1, color:'white'},
        headerTintColor: 'white',
        headerStyle: {
            backgroundColor: 'green'
        },
        style: {
            paddingLeft: 5,
            paddingRight: 0,
        },
    }

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            age: '18 Tahun',
        };
      }

    componentDidMount() {
        this.props.dispatch(fetchHeroes());
    }
    
      Next = () => {
          this.props.dispatch(createHeroes(this.state));
      }

    render(){
        const heroes = this.props.heroes;

        if(this.state.name == ''){
            submitButton=(
            <Button block style={{backgroundColor: 'green'}}
            disabled >
                <Text style={{fontSize:15, color: 'white'}}>ADD</Text>
            </Button>)
        }else{
            submitButton=(
                <Button block style={{backgroundColor:'green'}}
                onPress={() => Alert.alert(
                'Success!',
                'Success save to database.',
                [
                    {text: 'OK', onPress: () => this.Next( this.setState({
                        value : ''
                    }))}
                ])}
                > 
                    <Text style={{fontSize:15, color: 'white'}}>ADD</Text>  
            </Button>)}

        return(

    <Container>
        <Content style={{top:20}}>
           
            <Item>
                <Input 
                    placeholder="Input text here ..." value={this.state.value}
                    onChangeText={(name) => this.setState({name})}
                />
            </Item>
        </Content>
        <Footer> 
            <FooterTab>
                {submitButton}
            </FooterTab>
        </Footer>
    </Container>
    
     );
    }
}

const mapStateToProps = (state) => {
    return{
        heroes : state.heroes.heroes
    }
}
export default connect(mapStateToProps)(Todo);