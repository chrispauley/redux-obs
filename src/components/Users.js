import React from 'react';
import {connect} from "react-redux";
import {User} from "./User";
import {fetchUserAction} from "../actions/userActions";

export function Users(props) {
    var userStore = props.userReducer;
    return (
        <div>
            <ul>
                {userStore.users.map(login =>
                    <li key={login}>
                    {login}
                    <button type="button" onClick={() =>
                        props.loadUser(login)}>Load user</button>
                </li>)}
            </ul>
            {userStore.loading && <p>Please wait!</p>}
            {userStore.current && <User {...userStore.current}/>}
        </div>
    )
}

function mapState(state) {
    return state;
}

function mapDispatch(dispatch) {
    return {
        loadUser: (login) => dispatch(fetchUserAction(login))
    }
}

export default connect(mapState, mapDispatch)(Users);
