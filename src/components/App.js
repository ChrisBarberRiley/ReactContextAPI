import React, { Component } from 'react';
import { Provider, Consumer } from '../Context/MyContext'

const Nav = () => <LoginForm /> 

class LoginForm extends Component {
    render() {
        return <Consumer>
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
        </Consumer>
    }
}

class App extends Component {
    render() {
        return (
        <Provider>
            <div className="App">
                <Consumer>
                    {({ state: { viewer } }) => (
                        <h1>{viewer ? `Welcome ${viewer}` : 'Log in yo'}</h1>
                    )}
                </Consumer>
                <Nav />
            </div>
        </Provider>
        );
    }
}

export default App;
