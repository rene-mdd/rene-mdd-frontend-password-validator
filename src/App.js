import React from 'react';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      passwordType: false,
      passwordVisibility: 'password',
      username: "",
      password: "",
      errorMsg: "",
      successMsg: ""

    }
    this.regex = "@%+/'!#$^?:,(){}[]~-_.";
  }
  usernameFunc(e) {
    this.setState({ username: e.target.value })
  }

  passwordFunc(e) {
    this.setState({ password: e.target.value })
  }

  passwordTypeFunc(e) {
    e.preventDefault();
    this.setState(prevState => ({
      passwordType: !prevState.passwordType
    }))

    if (this.state.passwordVisibility === 'password') {
      this.setState({ passwordVisibility: 'text' })
    } else { this.setState({ passwordVisibility: 'password' }) }


  }

  validationFunction(values) {
    this.setState({ ...values })
    console.log(values)
  }

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
    const regularExSymbols = RegExp(/[-!$%^&*()_+|~=`{}[\]:";#'<>?,./]/, 'g');
    const regularExNumbers = RegExp(/[0-9]/);
    const resultExNumbers = regularExNumbers.test(str);
    const resultSymbols = regularExSymbols.test(str);
    const usernameAlone = this.state.username.split("@")[0];

    switch (true) {
      case this.state.username === "":
        this.validationFunction(
          {
            errorMsg: "User name is required my friend",
            successMsg: ""
          }
        )

        break;
      case !this.state.username.includes("@"):
        this.validationFunction(
          {
            errorMsg: "We need a valid Email address",
            successMsg: ""
          })

        break;
      case this.state.password === "":
        this.validationFunction(
          {
            errorMsg: "Password is required",
            successMsg: ""
          })

        break;
      case !addPassword.includes(true):
        this.validationFunction(
          {
            errorMsg: "For password you need at least one uppercase letter",
            successMsg: ""
          })

        break;
      case !resultSymbols:
        this.validationFunction(
          {
            errorMsg: "You must have at least one special character",
            successMsg: ""
          })
        break;
      case !resultExNumbers:
        this.validationFunction(
          {
            errorMsg: "You need to have a number",
            successMsg: ""
          })
        break;
      case this.state.password.length < 8:
        this.validationFunction(
          {
            errorMsg: "The password must have at least 8 characters",
            successMsg: ""
          })

        break;
      case this.state.password.includes(usernameAlone):
        this.validationFunction(
          {
            errorMsg: "The password can't contain the username",
            successMsg: ""
          })
        break;
      default: this.validationFunction(
        {
          errorMsg: `Congrats ${usernameAlone}! You user have been created.`,
          successMsg: ""
        })
    }


  }

  render() {
    return (
      <div className="App">
        <form>
          <label htmlFor="user">
            Username <br />
            <input
              name={this.state.username} id="pass"
              value={this.state.username}
              onChange={(e) => { this.usernameFunc(e) }} />
          </label>
          <label htmlFor="pass">
            Password <br />
            <input
              type={this.state.passwordVisibility}
              name={this.state.password} id="pass"
              value={this.state.password.toString()}
              onChange={(e) => { this.passwordFunc(e) }} />
          </label>
          <label className='show-button'>
            <button
              className='eye'
              onClick={(e) => { this.passwordTypeFunc(e) }}
              value={this.state.passwordType} />
            <span>Show password</span>
          </label>
          <button
            type="submit"
            onClick={(e) => { this.signupFunc(e) }}>Sign up</button>
          <p>{this.state.errorMsg}{this.state.successMsg}</p>
        </form>

      </div>
    );
  }
}

export default App;
