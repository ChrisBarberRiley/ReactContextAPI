import React, { Component } from 'react';

const MyContext = React.createContext()

class Provider extends Component {
    state = {
        viewer: null
    }

    logIn = name => {
        this.setState((prevState, props) => {
            return {viewer: name}
        })
    };  

    logOut = () => this.setState({viewer:null})

    render(){
        return <MyContext.Provider value={{
            state: {
                viewer: this.state.viewer,
            },
            actions: {
                logIn: this.logIn,
                logOut: this.logOut,
            }
        }}> {this.props.children} </MyContext.Provider>
        
    }
}

const Nav = () => <LoginForm /> 

class LoginForm extends Component {
    render() {
        return <MyContext.Consumer>
            {(value) => {
                const { viewer } = value.state;
                const { logIn, logOut } = value.actions;
                return viewer ? (
                    <React.Fragment>
                        <h3>You are logged in as {viewer}</h3>
                        <button 
                            type="submit"
                            onClick={logOut}
                        >
                        Log out
                        </button>
                    </React.Fragment>
                ) : (
                    <React.Fragment>
                        <input 
                            placeholder="Name please" 
                            ref={r => (this.inputRef = r)}
                        />
                        <button
                            type="submit"
                            onClick={() => {
                                logIn(this.inputRef.value)
                            }}
                        >
                            Log in
                        </button>
                    </React.Fragment>
                )
            }}
        </MyContext.Consumer>
    }
}

class App extends Component {
    render() {
        return (
        <Provider>
            <div className="App">
                <MyContext.Consumer>
                    {({ state: { viewer } }) => (
                        <h1>{viewer ? `Welcome ${viewer}` : 'Log in yo'}</h1>
                    )}
                </MyContext.Consumer>
                <Nav />
            </div>
        </Provider>
        );
    }
}

export default App;
