import React, { Component} from 'react';

class Register extends Component{

    constructor(props) {
        super(props)
        this.state = {
            name: '',
            email: '',
            password: ''
        }
    }

    onNameChange = (e) => {
        this.setState({name : e.target.value})
    }

    onEmailChange = (e) => {
        this.setState({email : e.target.value})
    }

    onPasswordChange = (e) => {
        this.setState({password : e.target.value})
    }

    onSubmitRegister = (e) => {
        e.preventDefault()
        fetch(
            // 'http://localhost:3000/register'
        'https://game-list-backend.onrender.com/register'
        , {
            method: 'post',
            headers: {'Content-Type': 'application/Json'},
            body: JSON.stringify({
                name: this.state.name,
                email: this.state.email,
                password: this.state.password
            })
        })
        .then(res => res.json())
        .then(user => {
            if(user.id){
                // this.props.loadUser(user)
                // this.props.loadPersonal(user)
                this.props.onRouteChange('signin', false)
            }
        })
    }

    render() {
        return(
        <div className="br3 ba bw1 b--white-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
            <main className="pa4 white-80">
                <form className="measure">
                    <fieldset id="register" className="ba b--transparent ph0 mh0">
                    <legend className="f1 fw6 ph0 mh0">Register</legend>
                    <div className="mt3">
                        <label className="db fw6 lh-copy f6" htmlFor="name">Name</label>
                        <input 
                        className="pa2 br2 input-reset ba bg-transparent hover-bg-white text-white hover-white w-100" 
                        type="name" 
                        name="name"  
                        id="name"
                        onChange={this.onNameChange}
                        />
                    </div>
                    <div className="mt3">
                        <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                        <input 
                        className="pa2 br2 input-reset ba bg-transparent hover-bg-white hover-white text-white w-100" 
                        type="email" 
                        name="email-address"  
                        id="email-address"
                        onChange={this.onEmailChange}
                        />
                    </div>
                    <div className="mv3">
                        <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                        <input 
                        className="b pa2 br2 input-reset ba bg-transparent hover-bg-white hover-white text-white w-100" 
                        type="password" 
                        name="password"  
                        id="password"
                        onChange={this.onPasswordChange}
                        />
                    </div>
                    </fieldset>
                    <div className="">
                    <input 
                        className="b br2 ph3 pv2 input-reset ba b--white white bg-transparent grow pointer f6 dib" 
                        type="submit" 
                        value="Register"
                        onClick={this.onSubmitRegister}
                        />
                    </div>
                </form>
            </main>
        </div>
    )
}
    }

export default Register