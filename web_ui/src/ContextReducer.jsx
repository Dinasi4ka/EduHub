export {appContextReducer};

function appContextReducer(data, action) {
    switch (action.type) {
        case 'Login':
            const loginData = {
                login: action.data
            }
            return {...data, ...loginData}
        case 'User':
            const user = {
                ...action.data
            }
            return {...data, ...user}
        case 'AnotherUser':
            const anotherUser = {
                anotherUser: action.data
            }
            return {...data, ...anotherUser}
        case 'GroupMeet':
            const groupMeet = {
                joinGroup: action.data
            }
            return {...data, ...groupMeet}
        case 'TutorMeets':
            const tutorMeets = {
                tutorMeets: action.data
            }
            return {...data, ...tutorMeets}
        default:
            return data;
    }
}
