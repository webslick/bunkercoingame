import ActionTypes from '../constants';
import moment from 'moment';
// import images from '../../assets/images';
// const {
//   fon_0,
//   fon_1,
//   fon_2, 
// } = images
 
const initialState = {
  editpage: { edit: false, pageId: null },
  backgrounds: ['none'],
  backgroundselect: 0,

  OneBlockArea: '',  
  OneBlockInputTitle: '',  
  OneBlockOneInput: '',
  OneBlockTwoInput: '', 

  TwoBlockArea: '',  
  TwoBlockInputTitle: '',   
  TwoBlockOneInput: '',
  TwoBlockTwoInput: '', 

  ThreeBlockArea: '',     
  registartion_tel: '',
  birthdate: moment().format("YYYY-MM-DD HH:mm"),
  deathdate: moment().format("YYYY-MM-DD HH:mm"),
  initialDeath: '',
  nationality: '',
  birthlocation: '',
  deathlocation: '',
  epity: '',
  children: '',
  secondhalf: '',
  career: '',
  education: '',  
  coment_consult: '',  
  byer_consult_tel: '',  
  byer_consult_initial: '',  
  msg_main_popup: '',  
  byer_files: []
};

export default function pageinfo(state = initialState, { type, payload }) { 
 
  switch (type) {
    case ActionTypes.PAGEINFO_DEATH_INITIAL:
      return {
        ...state,
        initialDeath: payload
      }; 
    case ActionTypes.PAGEINFO_BYER_FILE:
      return {
        ...state,
        byer_files: payload
      }; 
    case ActionTypes.PAGEINFO_BYER_DEL_FILE:
      let tempArrFiles = state.byer_files;
      let clearArr = tempArrFiles.filter((item) => (item.file.name !== payload))

      return {
        ...state,
        byer_files: clearArr
      }; 
    case ActionTypes.PAGEINFO_POPUP_MAIN:
      return {
        ...state,
        msg_main_popup: payload
      }; 
    case ActionTypes.PAGEINFO_DEATH_DATE:
      return {
        ...state,
        deathdate: payload
      }; 
    case ActionTypes.PAGEINFO_BIRTH_DATE:
      return {
        ...state,
        birthdate: payload
      }; 
    case ActionTypes.PAGEINFO_NATIONALITY:
      return {
        ...state,
        nationality: payload
      }; 
    case ActionTypes.PAGEINFO_BIRTH_LOCATION:
      return {
        ...state,
        birthlocation: payload
      };  
    case ActionTypes.PAGEINFO_DEATH_LOCATION:
      return {
        ...state,
        deathlocation: payload
      }; 
    case ActionTypes.PAGEINFO_EPITY:
      return {
        ...state,
        epity: payload
      }; 
    case ActionTypes.PAGEINFO_CHILDREN:
      return {
        ...state,
        children: payload
      }; 
    case ActionTypes.PAGEINFO_SECOND_HALF:
      return {
        ...state,
        secondhalf: payload
      }; 
    case ActionTypes.PAGEINFO_CAREER:
      return {
        ...state,
        career: payload
      }; 
    case ActionTypes.PAGEINFO_EDUCATION:
      return {
        ...state,
        education: payload
      };  

      case ActionTypes.PAGEINFO_CONSULT_BYER_INITIAL:
        return {
          ...state,
          byer_consult_initial: payload
        }; 
      case ActionTypes.PAGEINFO_CONSULT_BYER_TEL:
        return {
          ...state,
          byer_consult_tel: payload
        }; 
      case ActionTypes.PAGEINFO_REGESTRATION_TEL:
        return {
          ...state,
          registartion_tel: payload
        }; 

      case ActionTypes.PAGEINFO_CONSULT_COMENT:
        return {
          ...state,
          coment_consult: payload
        }; 

      case ActionTypes.PAGEINFO_EDITPAGE:
        return {
          ...state,
          editpage: payload
        }; 

      case ActionTypes.PAGEINFO_BACKGROUNDSELECT:
        return {
          ...state,
          backgroundselect: payload
        };  

        case ActionTypes.PAGEINFO_ONEBLOCKAREA:
          return {
            ...state,
            OneBlockArea: payload
          }; 

        case ActionTypes.PAGEINFO_ONEBLOCKINPUTTITLE:
          return {
            ...state,
            OneBlockInputTitle: payload
          }; 
          
        case ActionTypes.PAGEINFO_ONEBLOCKONEINPUT:
          return {
            ...state,
            OneBlockOneInput: payload
          };
 
        case ActionTypes.PAGEINFO_ONEBLOCKTWOINPUT:
          return {
            ...state,
            OneBlockTwoInput: payload
          };
 
        case ActionTypes.PAGEINFO_TWOBLOCKAREA:
          return {
            ...state,
            TwoBlockArea: payload
          }; 

        case ActionTypes.PAGEINFO_TWOBLOCKINPUTTITLE:
          return {
            ...state,
            TwoBlockInputTitle: payload
          }; 

        case ActionTypes.PAGEINFO_TWOBLOCKONEINPUT:
          return {
            ...state,
            TwoBlockOneInput: payload
          };
 
        case ActionTypes.PAGEINFO_TWOBLOCKTWOINPUT:
          return {
            ...state,
            TwoBlockTwoInput: payload
          }; 

        case ActionTypes.PAGEINFO_THREEBLOCKAREA:
          return {
            ...state,
            ThreeBlockArea: payload
          }; 
 
    default:
      return state;
  }
}
