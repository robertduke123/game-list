import React, {Component} from 'react';

class SignIn extends Component{

    constructor(props) {
        super(props)
        this.state = {
            signInEmail: '',
            signInPassword: ''
        }
    }

    onEmailChange = (e) => {
        this.setState({signInEmail : e.target.value})
    }

    onPasswordChange = (e) => {
        this.setState({signInPassword : e.target.value})
    }

    onSubmitSignIn = (e) => {
        e.preventDefault()
        // console.log(e.target.innerHTML);
        if(e.target.innerHTML === 'Demo') {
            // console.log('tested');
            fetch(
                // 'http://localhost:3000/signin'
            'https://game-list-backend.onrender.com/signin'
            , {
                method: 'post',
                headers: {'Content-Type': 'application/Json'},
                body: JSON.stringify({
                    email: 'Demo',
                    password: 'N/A'
                })
            })
            .then(res => res.json())
            .then(
                user => {
                if(user.id){
                    this.props.loadUser(user)
                    this.props.loadPersonal(user)
                    this.props.onRouteChange('home')
                    // console.log(user.name);
                }
            }
            )
        } else {
            fetch(
                // 'http://localhost:3000/signin'
            'https://game-list-backend.onrender.com/signin'
            , {
                method: 'post',
                headers: {'Content-Type': 'application/Json'},
                body: JSON.stringify({
                    email: this.state.signInEmail,
                    password: this.state.signInPassword
                })
            })
            .then(res => res.json())
            .then(
                user => {
                if(user.id){
                    this.props.loadUser(user)
                    this.props.loadPersonal(user)
                    this.props.onRouteChange('home')
                    // console.log(user.name);
                }
            }
            )
        }
    }

    render() {

        const {onRouteChange} = this.props

        return(
        <div id='sign' className="br4 ba bw1 b--white-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
            <main className="pa4 white-80">
                <form className="measure">
                    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                    <legend className="f1 fw6 ph0 mh0">Sign In</legend>
                    <div className="mt3">
                        <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                        <input                         
                        className="pa2 br2 input-reset ba bg-transparent hover-bg-black text-white hover-white w-100" 
                        type="email" 
                        name="email-address"  
                        id="email-address"
                        onChange={this.onEmailChange}
                        />
                    </div>
                    <div className="mv3">
                        <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                        <input 
                        className="b pa2 br2 input-reset ba bg-transparent hover-bg-black text-white hover-white w-100" 
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
                        value="Sign in"
                        onClick={this.onSubmitSignIn}
                        />
                    </div>
                    <div className="lh-copy mt3">
                    <p 
                        href="#0" 
                        className="f6 link dim white db"
                        style={{cursor: 'pointer'}}
                        onClick={() => onRouteChange('register', false)}
                        >Register</p>

                    <p 
                        href="#0" 
                        className="b br2 ph3 pv2 input-reset ba b--white white bg-transparent grow pointer f6 dib"
                        style={{cursor: 'pointer'}}
                        onClick={this.onSubmitSignIn}
                        >Demo</p>
                    </div>
                </form>
            </main>
        </div>
    )
}
    }

    export default SignIn