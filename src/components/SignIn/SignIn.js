import React, { Component } from 'react'
import { routes, DATABASE_URL } from '../../App'
class SignIn extends Component {

    constructor(props) {
        super(props);
        this.state = {
            inputEmail: '',
            inputPassword: ''
        };
    }



    onEmailChange = (event) => {
        this.setState({ inputEmail: event.target.value })
    }

    onPasswordChange = (event) => {
        this.setState({ inputPassword: event.target.value })
    }

    onSubmit = async () => {
        const { inputEmail, inputPassword } = this.state;
        const response = await fetch(`${DATABASE_URL}/signin`, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: inputEmail,
                password: inputPassword
            })
        })
        const data = await response.json()

        if (response.status === 200) {
            this.props.loadUser(data);
            this.props.onRouteChange(routes[1]);
        } else {
            console.log(data)
        }
    }

    render() {

        return (
            <article className="br3 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw6 center shadow-5">
                <main className="pa4 black-80">
                    <div className="measure">
                        <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                            <legend className="f1 fw6 ph0 mh0">Sign In</legend>
                            <div className="mt3">
                                <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                                <input
                                    className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                                    type="email"
                                    name="email-address"
                                    id="email-address"
                                    onChange={this.onEmailChange} />
                            </div>
                            <div className="mv3">
                                <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                                <input
                                    className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                                    type="password"
                                    name="password"
                                    id="password"
                                    onChange={this.onPasswordChange} />
                            </div>
                        </fieldset>
                        <div className="">
                            <input
                                className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                                type="submit"
                                value="Sign in"
                                onClick={this.onSubmit} />
                        </div>
                        <div className="lh-copy mt3">
                            <p href="#0" className="f6 link dim black db pointer " onClick={() => this.props.onRouteChange(routes[2])}>Register</p>
                        </div>
                    </div>
                </main>
            </article>
        );

    }
}

export default SignIn;
