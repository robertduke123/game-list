import React, { Component } from 'react';
import ParticlesBg from 'particles-bg'
import Nav from './components/Nav';
import SignIn from './components/SignIn';
import Register from './components/Register';
import Search from './components/Search';
import Main from './components/Main';
import Graph from './components/Graph';
import 'bootstrap/dist/css/bootstrap.css';
import 'tachyons'
import './App.css';



class App extends Component {
  constructor() {
    super()
    this.state = { 
    authorization: '',
    search: '',
    log: [],
    personalList: {},
    graphSeg:{
      started: 0,
      finish: 0,
      complete: 0
    },
    isThere: true,
    route: 'signin',
    isSignedIn: false,
    user: {
      id: '',
      name: '',
      email: '',
      password: ''
    }
   } 
  }

  loadPersonal = (data) => {
    fetch('http://localhost:3000/pers', {
                method: 'put',
                headers: {'Content-Type': 'application/Json'},
                body: JSON.stringify({
                    id: data.id,
                })
            })
            .then(res => res.json())
            .then(data => {
              let obj = Object.assign({}, data)
              this.setState({personalList : obj})
            })
            // console.log(this.state);
  }

  loadUser = (data) => {
    this.setState({user: {
      id: data.id,
      name: data.name,
      email: data.email,
    }})
    this.setState({log: data.log})
    this.setState({graphSeg: {
      started: (data.started) - 1,
      finish: (data.finish) - 1,
      complete: (data.complete) - 1
    }})
    // console.log(this.state);
  }



  onRouteChange = (route, isSignedIn) => {
    this.setState({route: route})
    this.setState({isSignedIn: isSignedIn})
  }

   onChange = (e) => {
    this.setState({search: e.target.value})
   }

   onSearch = (e) => {
      let item = this.state.search
      let itemSearch = this.state.search.replace(/\s/g, '-').toLocaleLowerCase()

        fetch('http://localhost:3000/search', {
          method: 'PUT',
          headers: {'Content-Type': 'application/Json'},
          body: JSON.stringify({
            itemSearch: itemSearch
          })
        })
            .then(result => result.json())
            .then(data => {
              console.log(data);
               if(data.slug === itemSearch) {
              if( !this.state.log.includes(item)) {
                if(this.state.search.length > 0) {
                  if(this.state.log.length > 0) {
                    this.setState(prevState => ({
                      log: [...prevState.log, item],
                      personalList: {...prevState.personalList,
                       [this.state.log.length] : {
                          name: item, 
                          completion: 'started',
                          image: data.background_image
                        }},
                      graphSeg:{
                        started: prevState.graphSeg.started + 1,
                        finish: prevState.graphSeg.finish,
                        complete: prevState.graphSeg.complete
                      },
                      isThere: true
                    }))
                  } else {
                    this.setState({log: [item]})
                    this.setState({personalList: { 
                      0 :{
                      name: item, 
                      completion: 'started',
                      image: data.background_image
                      }
                  }})
                    this.setState({graphSeg:{
                        started: 1,
                        finish: 0,
                        complete: 0
                      }})
                    this.setState({isThere: true})                
                }      
              }                
              this.setState({search: ''})
              document.querySelector('#search').value = ''      
            } 
            } else {
              // console.log('n/a please try again');
              this.setState(prevState => ({
                ...prevState,
                isThere: false
              }))
            }
            fetch('http://localhost:3000/entries', {
                method: 'put',
                headers: {'Content-Type': 'application/Json'},
                body: JSON.stringify({
                    id: this.state.user.id,
                    user: this.state.user.name,
                    name: item,
                    image: data.background_image
                })
            })
            .then(res => res.json())
            // .then(console.log)
          })
          // console.log(this.state.personalList);
           
          
        // console.log(this.state);
    }
    
  
    onActive = (e, ver) => {
    let selected = e.target.parentNode.previousSibling.previousSibling.innerText

    let newLog = []
    this.state.log.forEach(name => { let newName = name.charAt(0).toUpperCase() + name.slice(1)
      newLog.push(newName)});
      console.log(newLog);

    let number = newLog.indexOf(selected)
    let name = this.state.log[number]
    let currentStart = this.state.graphSeg.started
    let currentFinish = this.state.graphSeg.finish
    let currentComplete = this.state.graphSeg.complete    

    console.log(name, number);
    
    if(ver === 'one' && this.state.personalList[number].completion !== 'started') { 
      let newItem = {name: name,
        completion: 'started'} 
      if(this.state.personalList[number].completion === 'finish') {
        let newGraph = {
           started: currentStart + 1,
           finish: currentFinish - 1,
           complete: currentComplete
          }               
        this.setState(prevState => ({
        personalList : {
          ...prevState.personalList,
          [number] : {
            ...prevState.personalList[number],
            name: name,
            completion: newItem.completion,
            
          }        
        },
        graphSeg: {
            started: newGraph.started,
            finish: newGraph.finish,
            complete: newGraph.complete
          }
      }))
    } else if(this.state.personalList[number].completion === 'complete') {
        let newGraph = {
           started: currentStart + 1,
           finish: currentFinish,
           complete: currentComplete - 1
          }               
        this.setState(prevState => ({
        personalList : {
          ...prevState.personalList,
          [number] : {
            ...prevState.personalList[number],
            name: name,
            completion: newItem.completion,
            
          }        
        },
        graphSeg: {
            started: newGraph.started,
            finish: newGraph.finish,
            complete: newGraph.complete
          }
      }))
    }      
    fetch('http://localhost:3000/select', {
          method: 'put',
          headers: {'Content-Type': 'application/Json'},
          body: JSON.stringify({
              id: this.state.user.id,
              name: name,
              completion: newItem.completion
          })
      })
      .then(res => res.json())   
  
    } else if (ver === 'two' && this.state.personalList[number].completion !== 'finish') {      
      let newItem = {name: name,
        completion: 'finish'} 
      if(this.state.personalList[number].completion === 'started') {
        let newGraph = {
           started: currentStart - 1,
           finish: currentFinish + 1,
           complete: currentComplete
          }               
        this.setState(prevState => ({
        personalList : {
          ...prevState.personalList,
          [number] : {
            ...prevState.personalList[number],
            name: name,
            completion: newItem.completion,
            
          }        
        },
        graphSeg: {
            started: newGraph.started,
            finish: newGraph.finish,
            complete: newGraph.complete
          }
      }))
    } else if(this.state.personalList[number].completion === 'complete') {
        let newGraph = {
           started: currentStart,
           finish: currentFinish + 1,
           complete: currentComplete - 1
          }               
        this.setState(prevState => ({
        personalList : {
          ...prevState.personalList,
          [number] : {
            ...prevState.personalList[number],
            name: name,
            completion: newItem.completion,
            
          }        
        },
        graphSeg: {
            started: newGraph.started,
            finish: newGraph.finish,
            complete: newGraph.complete
          }
      }))
    }  
    fetch('http://localhost:3000/select', {
            method: 'put',
            headers: {'Content-Type': 'application/Json'},
            body: JSON.stringify({
                id: this.state.user.id,
                name: name,
                completion: newItem.completion
            })
        })
        .then(res => res.json())
    } else if (ver === 'three' && this.state.personalList[number].completion !== 'complete') {        
      let newItem = {name: name,
        completion: 'complete'} 
      if(this.state.personalList[number].completion === 'started') {
        let newGraph = {
           started: currentStart - 1,
           finish: currentFinish,
           complete: currentComplete + 1
          }               
        this.setState(prevState => ({
        personalList : {
          ...prevState.personalList,
          [number] : {
            ...prevState.personalList[number],
            name: name,
            completion: newItem.completion,
            
          }        
        },
        graphSeg: {
            started: newGraph.started,
            finish: newGraph.finish,
            complete: newGraph.complete
          }
      }))
    } else if(this.state.personalList[number].completion === 'finish') {
        let newGraph = {
           started: currentStart,
           finish: currentFinish - 1,
           complete: currentComplete + 1
          }               
        this.setState(prevState => ({
        personalList : {
          ...prevState.personalList,
          [number] : {
            ...prevState.personalList[number],
            name: name,
            completion: newItem.completion,
            
          }        
        },
        graphSeg: {
            started: newGraph.started,
            finish: newGraph.finish,
            complete: newGraph.complete
          }
      }))
    }  
    fetch('http://localhost:3000/select', {
            method: 'put',
            headers: {'Content-Type': 'application/Json'},
            body: JSON.stringify({
                id: this.state.user.id,
                name: name,
                completion: newItem.completion
            })
        })
        .then(res => res.json())
    }    
    // console.log(this.state)  
  }
  
  itemDelete = (e) => {
    let item = e.target.previousSibling.innerHTML
    let log = this.state.log 
    let newLog = []
    log.forEach(name => { let newName = name.charAt(0).toUpperCase() + name.slice(1)
      newLog.push(newName)});
    let index = newLog.indexOf(item)
    let name = log[index]
    let pers = this.state.personalList
    let select = pers[index].completion

    fetch('http://localhost:3000/log_delete', {
      method: 'put',
            headers: {'Content-Type': 'application/Json'},
            body: JSON.stringify({
                id: this.state.user.id,
                name: name,
                select: select
            })
      })
      .then(res => res.json())

      fetch('http://localhost:3000/pers_delete', {
      method: 'delete',
            headers: {'Content-Type': 'application/Json'},
            body: JSON.stringify({
                id: this.state.user.id,
                name: name
            })
      })
      .then(res => res.json())

    log.splice(log.indexOf(name), 1)
    delete pers[index]
    let newPers = {}
    let count = 0
    log.forEach(item => {
      newPers[count] = {}
      count++
    })
    count = 0
    Object.keys(pers).forEach(item => {
      newPers[count] = pers[item]
      count++
    })

   this.setState({log: log})
   this.setState({personalList: newPers})
   this.setState(prevState => ({
    graphSeg: {
      ...prevState.graphSeg,
      [select]: prevState.graphSeg[select] - 1
    } 
   }))
  }

  render() { 
    return (
      <div className='container'>
       <ParticlesBg  id='bg' type="cobweb" color='#ffffff' bg={true}/>
       <Nav signedIn={this.state.isSignedIn} onRouteChange={this.onRouteChange} user={this.state.user}/>
       {this.state.route === 'signin' ? 
          <SignIn loadUser={this.loadUser} loadPersonal={this.loadPersonal} onRouteChange={this.onRouteChange}/> :
          this.state.route === 'register' ?
          <Register loadUser={this.loadUser} loadPersonal={this.loadPersonal} onRouteChange={this.onRouteChange}/> :  
          <div className='App'>         
            <div className='left-cont'>
              <Search onChange={this.onChange} onSearch={this.onSearch}  isThere={this.state.isThere}/>
              <Main pers={this.state.personalList} onActive={this.onActive} log={this.state.log} itemDelete={this.itemDelete}/>
            </div>          
              <Graph graphSeg={this.state.graphSeg} log={this.state.log}/>              
          </div>
       }
        
      </div>
      

    );
  }
}
 
export default App;