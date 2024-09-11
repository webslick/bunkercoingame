import moment from 'moment'

export const decimal = (n) => 
new Intl.NumberFormat('en', { notation: 'compact', maximumFractionDigits: 2 }).format(n);

  
function isEmpty(obj) {
  for (const prop in obj) {
    if (Object.hasOwn(obj, prop)) {
      return false;
    }
  } 
  return true;
}

export function isEmptyObject(value) {

  if (value == null) {
    // null or undefined
    return false;
  }
  if (typeof value !== 'object') {
    // boolean, number, string, function, etc.
    return false;
  }
  const proto = Object.getPrototypeOf(value);
  // consider `Object.create(null)`, commonly used as a safe map
  // before `Map` support, an empty object as well as `{}`
 
  if (proto !== null && proto !== Object.prototype) {
    return false;
  }
  return isEmpty(value);
}

export const getIOSSaveDateObj = (dateString) => {
  console.log('@!',dateString )

  if(dateString.indexOf('-') > 0) {
    
      var arr = dateString.split(/[- :]/); 
      var date = new Date(arr[0], arr[1]-1, arr[2]);  
  } else {

      var arr = dateString.split(/[. :]/);
      var date = new Date(arr[0], arr[1]-1, arr[2]);   
  }

  return date;
}