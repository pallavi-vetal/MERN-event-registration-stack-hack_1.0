import {  SET_CURRENT_USER, USER_LOADING ,REGISTER_EVENT ,FETCH_FEEDBACKS} from "../_constants/authConst";
const isEmpty = require('is-empty');
const initialState ={
    isAuthenticated:false,
    user:{

    },
    loading:false
}
export default function(state = initialState,action){
    switch(action.type){
        case USER_LOADING:
            return{
                    ...state,
                    loading:true,
            };
        case SET_CURRENT_USER:
            return {
                ...state,
                isAuthenticated:!isEmpty(action.payload),
                user:action.payload
            }
        case REGISTER_EVENT:
            return{
                ...state,
                registrationID:action.payload
            }  
        case FETCH_FEEDBACKS:
            return{
                ...state,
                feedbacks:action.payload
            }       
        default:
            return state;        
    }

}