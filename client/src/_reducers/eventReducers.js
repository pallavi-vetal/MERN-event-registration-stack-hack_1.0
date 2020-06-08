import {
    REGISTER_EVENT
   } from "../_constants/authConst";
   
   const initialState = {
     
   };
   
   export default function(state = initialState, action) {
     switch (action.type) {
        case REGISTER_EVENT:
            return{
                ...state,
                registrationID:action.payload
            }    
       default:
         return state;
     }
   }