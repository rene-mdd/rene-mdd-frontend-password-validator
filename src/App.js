import React from 'react';

import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      errorMsg: "",
      successMsg: "",
      passwordType: true
    }
    // this.passwordTypeFunc = this.passwordTypeFunc.bind(this);
    this.regex = "@%+/'!#$^?:,(){}[]~-_.";
  }
  usernameFunc(e) {
    this.setState({ username: e.target.value })
  }

  passwordFunc(e) {
    this.setState({ password: e.target.value })
  }

  // passwordTypeFunc(e) {
  //  console.log(this.state.passwordType)
  // }


  signupFunc(e) {
    //username validation
    e.preventDefault();
    let addPassword = [];
    if (this.state.password !== "") {
      for (var i = 0; i < this.state.password.length; i++) {
        addPassword.push(this.state.password[i] === this.state.password[i].toUpperCase())
        console.log(addPassword)
      }
    }
    const str = this.state.password;
    const regularExSymbols = RegExp(/[-!$%^&*()_+|~=`{}\[\]:";#'<>?,.\/]/, 'g');
    const regularExNumbers = RegExp(/[0-9]/);
    const resultExNumbers = regularExNumbers.test(str);
    const resultSymbols = regularExSymbols.test(str);
    const usernameAlone = this.state.username.split("@")[0];

    switch (true) {
      case this.state.username === "":
        this.setState({
          errorMsg: "User name is required my friend",
          successMsg: ""
        });
        break;
      case !this.state.username.includes("@"):
        this.setState({
          errorMsg: "We need a valid Email address",
          successMsg: ""
        })
        break;
      case this.state.password === "":
        this.setState({
          errorMsg: "Password is required",
          successMsg: ""
        })
        break;
      case !addPassword.includes(true):
        console.log(!addPassword.includes(true))
        this.setState({
          errorMsg: "For password you need at least one uppercase letter",
          successMsg: ""
        });
        break;
      case !resultSymbols:
        this.setState({
          errorMsg: "You must have at least one special character",
          successMsg: ""
        });
        break;
      case !resultExNumbers:
        this.setState({
          errorMsg: "You need to have a number",
          successMsg: ""
        })
        break;
      case this.state.password.length < 8:
        this.setState({
          errorMsg: "The password must have at least 8 characters",
          successMsg: ""
        })
        break;
      case this.state.password.includes(usernameAlone):
        this.setState({
          errorMsg: "The password can't contain the username",
          successMsg: ""
        })
        break;
      default: this.setState({
        successMsg: `Congrats ${usernameAlone}! You user have been created.`,
        errorMsg: ""
      })
    }

   
  }

  render() {
    return (
      <div className="App">
        <form>
          <label htmlFor="user">
            Username <br />
            <input name={this.state.username} id="pass" value={this.state.username} onChange={(e) => { this.usernameFunc(e) }} />
          </label>
          <label htmlFor="pass">
            Password <br />
            <input type={this.state.passwordType} name={this.state.password} id="pass" value={this.state.password} onChange={(e) => { this.passwordFunc(e) }} />
          </label>
          <label>
            <input type="radio" onClick={this.passwordTypeFunc} selected={this.state.passwordType} />
          </label>
          <button type="submit" onClick={(e) => { this.signupFunc(e) }}>Signup</button>
          <p>{this.state.errorMsg}{this.state.successMsg}</p>
        </form>

      </div>
    );
  }
}

export default App;
