import Buttons from './components/button';
import React, { Component   } from 'react';
import { StyleSheet, Text, View, Button} from 'react-native';

const buttons = [
  ['CLR', 'DEL'],
  ['7','8','9','+'],
  ['4','5','6','-'],
  ['1','2','3','/'],
  ['0','.','=','*']
];

export default class App extends React.Component{

  constructor(){
    super()
    this.initialState = {
      displayValue : '0',
      operator : null,
      numberOne : '',
      numberTwo : '',
      next : false
    }
    this.state = this.initialState;
  }

  renderButtons() {
    const layouts  = buttons.map((buttonRows,index)=>{
      const rowItem = buttonRows.map((buttonItem,buttonIndex) => {
        return <Buttons 
          value={buttonItem}
          handleOnPress={this.handleInput.bind(this, buttonItem)}
          key={'buttonIndex'}
        />
      });
      return <View
      style = {styles.inputRow}
      key={'row-'+index}>{rowItem}</View>
    });
    return layouts
  }

    handleInput = (input) => {
      const { displayValue ,operator, numberOne, numberTwo, next } = this.state;

      switch (input) {
        case '0':
        case '1':
        case '2':
        case '3':
        case '4':
        case '5':
        case '6':
        case '7':
        case '8':
        case '9':
          this.setState({
            displayValue : (displayValue == 0) ? input : displayValue + input
          })
          if(!next){
            this.setState({
                numberOne:numberOne+input
            })
          }else{
            this.setState({
              numberTwo:numberTwo+input
          })
          }
          break;
        case '+':
        case '-':
        case '*':
        case '/':
          this.setState({
            next : true,
            operator: input,
            displayValue : (operator !== null ? displayValue.substr(0 , displayValue.length -1) : displayValue) + input
          })
          break;
        case '.':
          const dot = displayValue.toString().slice(-1)
          this.setState({
            displayValue : dot !== '.' ? displayValue + input : displayValue
          })
          if(!next){
            this.setState({
                numberOne:numberOne+input
            })
          }else{
            this.setState({
              numberTwo:numberTwo+input
          })
          }
          break;
        case '=':
          const result = eval(numberOne + operator + numberTwo)
          this.setState({
            displayValue : result,
            numberOne : result,
            numberTwo : '',
            operator : null,
            next : false
          })
          break;
        case 'CLR' :
          this.setState(this.initialState);
          break;
        case 'DEL':
          const string = displayValue.toString();
          const deletedString = string.substr(0, string.length -1);
          const length = string.length;
          this.setState({
            displayValue : length == 1 ? '0' : deletedString,
            numberOne : length == 1 ? '' : deletedString
          })
      }
    }

  render(){
    return (
      <View style = {styles.container}>
          <View style= {styles.resultContainer}>
              <Text style = {styles.result}>
                {this.state.displayValue}
              </Text>
          </View>
          <View style= {styles.inputContainer}>
              {this.renderButtons()}
          </View>
      </View>


    );
  }
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
  },
  resultContainer : {
    flex:6,
    backgroundColor : 'black',
    justifyContent : 'center'
  },
  inputContainer : {
    flex:8,
    backgroundColor : 'black'
  },
  result : {
    color: 'white',
    fontSize : 60,
    fontWeight : 'bold',
    paddingTop : 20,
    marginTop : 180,
    textAlign : 'right'
  },
  inputRow : {
    flex : 1,
    flexDirection : 'row'
  }
});


// heading:{
  //   fontSize : 20,
  //   textAlign : 'center',
  //   marginTop : 40,
  // },
  // input:{
  //   backgroundColor : 'grey',
  //   margin : 2,
  //   borderColor : 'black',
  //   //borderRadius : 10
  // }



// constructor(props){
  //   super(props);
  //   this.state={
  //     first : null,
  //     second : null,
  //     total : null
  //   }
  // }

  // onAddition(){
  //   const {first,second} = this.state

  //   const total = Number(first) + Number(second)
  //   this.setState({total : total})
  // }

  // onSubtraction(){
  //   const {first,second} = this.state

  //   const total = Number(first) - Number(second)
  //   this.setState({total : total})
  // }

  // onMultiplication(){
  //   const {first,second} = this.state

  //   const total = Number(first) * Number(second)
  //   this.setState({total : total})
  // }

  // onDivision(){
  //   const {first,second} = this.state

  //   const total = Number(first) / Number(second)
  //   this.setState({total : total})
  // }


  // <View style={styles.container}>
      //   <Text style={styles.heading}>Basic Calculator</Text>
      //   <TextInput style={styles.input} placeholder="  write 1st number" value={this.state.first} onChangeText={text => this.setState({first:text})}/>
      //   <TextInput style={styles.input} placeholder="  write 2nd number" value={this.state.second} onChangeText={text => this.setState({second:text})}/>
      //   <Button style={styles.buttons} color = "#841550" title="+" onPress = {this.onAddition.bind(this)}/>
      //   <Button style={styles.buttons} color = "#841550" title="-" onPress = {this.onSubtraction.bind(this)}/>
      //   <Button style={styles.buttons} color = "#841550" title="*" onPress = {this.onMultiplication.bind(this)}/>
      //   <Button style={styles.buttons} color = "#841550" title="/" onPress = {this.onDivision.bind(this)}/>
      //   <Text>Ans is {this.state.total}</Text>
      // </View>
