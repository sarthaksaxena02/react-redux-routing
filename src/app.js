import React, { Component }  from 'react'
import ReactDOM,{ render } from 'react-dom'
import { createStore,combineReducers } from 'redux'
import App from './components/App';
import VisibleCards from './components/VisibleCards'
import Sidebar from './components/Sidebar';
import { Provider } from 'react-redux';
import { Router, Route, browserHistory } from 'react-router'
import { syncHistoryWithStore, routerReducer } from 'react-router-redux'
import * as reducers from './reducers';
reducers.routing=routerReducer;

import * as localStore from './localStore';
import NewCardModal from './components/NewCardModal';
import EditCardModal from './components/EditCardModal';

// const store=createStore(function(state,action){
// 	switch(action.type){
// 		case 'ADD_CARD':
// 			let newCard=Object.assign({},action.data,{
// 				score:1,
// 				id:+new Date
// 			});
// 			return Object.assign({},state,{
// 				cards:state.cards ? state.cards.concat([newCard]) : [newCard]
// 			});
// 		default:
// 			return state || {cards:[]};  
// 	}
// }); 

//add decks
//show add deck
//hide add deck
  

 // decks={state.decks}
 // addingDeck={state.addingDeck}

 // addDeck={name=> store.dispatch(addDeck(name))}
 // showAddDeck={()=> store.dispatch(showAddDeck())}
 // hideAddDeck={()=> store.dispatch(hideAddDeck())}






// const store=createStore(combineReducers({
// 	cards,
// 	decks,
// 	addingDeck
// }));

const store=createStore(combineReducers(reducers),localStore.get());
const history=syncHistoryWithStore(browserHistory,store);

// store.subscribe(()=>{
// 	console.log(store.getState());
// });

// store.dispatch({
// 	type:'ADD_CARD',
// 	data: {
// 		front:'front',
// 		back:'back'
// 	}
// });

// store.dispatch({
// 	type:'ADD_CARD',
// 	data: {}
// });




const routes=(

	<Route path='/' component={App}>
		<Route path='/deck/:deckId' component={VisibleCards}>
			<Route path='/deck/:deckId/new' component={NewCardModal}/>
			<Route path='/deck/:deckId/edit/:cardId' component={EditCardModal}/>
		</Route>
	</Route>

);

function run(){ 
	let state=store.getState();
	localStore.set(state,['decks','cards']);

	//console.log(state);
	render(<Provider store={store}>
		<Router history={history}>
			{routes}
		</Router>
		
	</Provider>,document.getElementById('root'));
}

run();

store.subscribe(run);











// window.show=()=>store.dispatch(showAddDeck());
// window.hide=()=>store.dispatch(hideAddDeck());
// window.add=()=>store.dispatch(addDeck(new Date().toString()));
