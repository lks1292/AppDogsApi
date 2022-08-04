
import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk"; //permite los pedidos asincronos
import rootReducer from "../Reducer";

 export  const store = createStore(rootReducer,composeWithDevTools(applyMiddleware(thunk)))

// export  const store = createStore(rootReducer,applyMiddleware(thunk))


export default store