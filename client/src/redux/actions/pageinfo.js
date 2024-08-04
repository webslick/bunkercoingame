import ActionTypes from '../constants';
import { API_URL } from '../../config/index';
import AuthServices from '../../services/AuthServices'; 
import { set_user,change_visible_popup } from './users'
import axios from 'axios';
import api from "../../http";
 
export function setInitialDeath(initial) { 
  return {
    type: ActionTypes.PAGEINFO_DEATH_INITIAL,
    payload: initial
  }
}
 
export function setDeathDate(date) {
  return {
    type: ActionTypes.PAGEINFO_DEATH_DATE,
    payload: date
  }
}

export function setFile(date) {
  return {
    type: ActionTypes.PAGEINFO_BYER_FILE,
    payload: date
  }
}

export function delFile(filename) {
  return {
    type: ActionTypes.PAGEINFO_BYER_DEL_FILE,
    payload: filename
  }
}
export function setBirthdayDate(date) {
  return {
    type: ActionTypes.PAGEINFO_BIRTH_DATE,
    payload: date
  }
} 

export function setNationality(national) {
  return {
    type: ActionTypes.PAGEINFO_NATIONALITY,
    payload: national
  }
}
  
export function setBirthLocation(location) {
  return {
    type: ActionTypes.PAGEINFO_BIRTH_LOCATION,
    payload: location
  }
}

export function setDeathLocation(location) {
  return {
    type: ActionTypes.PAGEINFO_DEATH_LOCATION,
    payload: location
  }
}
 
export function setEpity(epity) {
  return {
    type: ActionTypes.PAGEINFO_EPITY,
    payload: epity
  }
}

export function setChildren(child) {
  return {
    type: ActionTypes.PAGEINFO_CHILDREN,
    payload: child
  }
}
 
export function setSecondHalf(half) {
  return {
    type: ActionTypes.PAGEINFO_SECOND_HALF,
    payload: half
  }
}
 
export function setCareer(career) {
  return {
    type: ActionTypes.PAGEINFO_CAREER,
    payload: career
  }
}

export function setEducation(edu) {
  return {
    type: ActionTypes.PAGEINFO_EDUCATION,
    payload: edu
  }
}


export function setConsultInitial(initial) {
  return {
    type: ActionTypes.PAGEINFO_CONSULT_BYER_INITIAL,
    payload: initial
  }
}

export function setConsultTel(tel) {
  return {
    type: ActionTypes.PAGEINFO_CONSULT_BYER_TEL,
    payload: tel
  }
}

export function setRegestratorTel(tel) {
  return {
    type: ActionTypes.PAGEINFO_REGESTRATION_TEL,
    payload: tel
  }
}

export function setConsultComent(coment) {
  return {
    type: ActionTypes.PAGEINFO_CONSULT_COMENT,
    payload: coment
  }
}


export function setPopupMainMsg(msg) {
  return {
    type: ActionTypes.PAGEINFO_POPUP_MAIN,
    payload: msg
  }
}

export function setGeneratePage(generatepage) {
  return {
    type: ActionTypes.PAGEINFO_GENERATE_PAGE,
    payload: generatepage
  }
}

export function setEditPage(edit) {
  return {
    type: ActionTypes.PAGEINFO_EDITPAGE,
    payload: edit
  }
}

export function setBackgroundSelect(select) {
  return {
    type: ActionTypes.PAGEINFO_BACKGROUNDSELECT,
    payload: select
  }
}
 
export function setOneBlockArea(txt) {
  return {
    type: ActionTypes.PAGEINFO_ONEBLOCKAREA,
    payload: txt
  }
}
 
export function setOneBlockInputTitle(txt) {
  return {
    type: ActionTypes.PAGEINFO_ONEBLOCKINPUTTITLE,
    payload: txt
  }
}
 
export function setOneBlockOneInput(txt) {
  return {
    type: ActionTypes.PAGEINFO_ONEBLOCKONEINPUT,
    payload: txt
  }
}

export function setOneBlockTwoInput(txt) {
  return {
    type: ActionTypes.PAGEINFO_ONEBLOCKTWOINPUT,
    payload: txt
  }
}
 
 
export function setTwoBlockArea(txt) {
  return {
    type: ActionTypes.PAGEINFO_TWOBLOCKAREA,
    payload: txt
  }
}
  
export function setTwoBlockInputTitle(txt) {
  return {
    type: ActionTypes.PAGEINFO_TWOBLOCKINPUTTITLE,
    payload: txt
  }
}

export function setTwoBlockOneInput(txt) {
  return {
    type: ActionTypes.PAGEINFO_TWOBLOCKONEINPUT,
    payload: txt
  }
}

export function setTwoBlockTwoInput(txt) {
  return {
    type: ActionTypes.PAGEINFO_TWOBLOCKTWOINPUT,
    payload: txt
  }
}
 
export function setThreeBlockArea(txt) {
  return {
    type: ActionTypes.PAGEINFO_THREEBLOCKAREA,
    payload: txt
  }
}
 


 
export async function uploadmedia (media,dispatch) {
  try {
    const requestOptions = {
        method: 'post',
        headers: { 
        'Content-Type': 'multipart/form-data',
        },
        media
      }; 

    const response = await axios.post(`${API_URL}/uploadmedia`, requestOptions)
 
    if(response.status === 200) { 
      // console.log(response)
    }  
  } catch (error) {
    console.log(error)
    return error.response?.status;
  }
}
 
export async function uploadphoto (photObj, dispatch) {
  try { 
    const response = await AuthServices.uploadphoto(photObj);  
 
    return response
  } catch (error) { 
    console.log(error.response?.data?.message)
    return error.response?.status;
  }
}
 
export async function editPage (page, dispatch) {
  try { 
    const response = await AuthServices.editPage(page);  
 
    return response
  } catch (error) { 
    console.log(error.response?.data?.message)
    return error.response?.status;
  }
}


export async function sendEmailServer(body,dispatch) {
 
  try {
    const requestOptions = {
        method: 'post',
        headers: { 
        'Content-Type': 'application/json',
        },
        body
      }; 
    const response = await axios.post(`${API_URL}/sendmail`, requestOptions)
 
    if(response.status === 200) { 
      dispatch(setPopupMainMsg(response.data.msg))
    }  
  } catch (error) {
    console.log(error)
    return error.response?.status;
  }
}
 
export async function uploadServer(data,dispatch) { 
  try { 
    const response = await axios.post(`${API_URL}/uploader`, data)

    if(response.status === 200) {
      // dispatch(setFileName(response.data)) 
    }  
  } catch (error) {
    console.log(error)
    return error.response?.status;
  }
}
 
export async function sendInfoServer(body,dispatch) {

  try { 
   
    const response = await api.main_api.post('/sendinfo', body)
    // console.log(response)
    // if(response.status === 200) {  
    //   // dispatch(setPopupMainMsg(response.data.msg))
    // }  
  } catch (error) {
    console.log(error)
    return error.response?.status;
  }
}
 
export async function payPages(body,dispatch) {

  try { 
   
    const response = await api.main_api.post('/productPay', body)
    console.log(response)
    if(response.status === 200) {   
      window.location.assign(response.data);
      // dispatch(setPopupMainMsg(response.data.msg))
    }  
  } catch (error) {
    console.log(error)
    return error.response?.status;
  }
}
 
export async function payReferal(body,dispatch,setOffer) {

  try {  
    const response = await api.main_api.post('/productReferalPay', body)
 
    if(response.status === 200) {     
      dispatch(set_user(response.data.user)); 
      setTimeout(() => {
        dispatch(change_visible_popup(false))
        setOffer(false);  
      }, 2000);
    }  
  } catch (error) {
    console.log(error)
    return error.response?.status;
  }
}

