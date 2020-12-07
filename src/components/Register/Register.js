import React, { Component } from 'react'
import { routes, DATABASE_URL } from '../../App'

class Register extends Component {

    constructor(props) {
        super(props);
        this.state = {
            inputName: '',
            inputEmail: '',
            inputPassword: ''
        }
    }

    onNameChange = (event) => {
        this.setState({ inputName: event.target.value })
    }

    onEmailChange = (event) => {
        this.setState({ inputEmail: event.target.value })
    }

    onPasswordChange = (event) => {
        this.setState({ inputPassword: event.target.value })
    }

    onSubmit = async () => {
        const { inputName, inputEmail, inputPassword } = this.state;
        const response = await fetch(`${DATABASE_URL}/register`, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: inputName,
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
                            <legend className="f1 fw6 ph0 mh0">Register</legend>
                            <div className="mv3">
                                <label className="db fw6 lh-copy f6" htmlFor="name">Name</label>
                                <input
                                    className="pa2 input-reset ba bg-transparent hover-bg-black hover-white "
                                    type="name"
                                    name="name"
                                    id="name"
                                    onChange={this.onNameChange} />
                            </div>
                            <div className="mt3">
                                <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                                <input
                                    className="pa2 input-reset ba bg-transparent hover-bg-black hover-white "
                                    type="email"
                                    name="email-address"
                                    id="email-address"
                                    onChange={this.onEmailChange} />
                            </div>
                            <div className="mv3">
                                <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                                <input
                                    className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white "
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
                                value="Register"
                                onClick={this.onSubmit} />
                        </div>
                    </div>
                </main>
            </article>

        );
    }
}

export default Register;
