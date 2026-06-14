import React, {useReducer, useContext} from 'react';
import {appContextReducer} from './ContextReducer.jsx'

export {useApp, useAppDispatch, AppProvider};

const initAppData = {
    login: null,
};

const AppContext = React.createContext();
const AppDispatchContext = React.createContext();

function AppProvider({children}) {

    const [appData, dispatch] = useReducer(appContextReducer, initAppData);
    return (
        <AppContext.Provider value={appData}>
            <AppDispatchContext.Provider value={dispatch}>
                {children}
            </AppDispatchContext.Provider>
        </AppContext.Provider>
    );
};

function useApp() {
    return useContext(AppContext);
}

function useAppDispatch() {
    return useContext(AppDispatchContext);
}