export const deepCopyFunction = (inObject: any) => {
    let outObject, value, key : any;
  
    if (typeof inObject !== "object" || inObject === null) {
      return inObject;
    }
  
    outObject = Array();
  
    for (key in inObject) {
      value = inObject[key];  
      outObject[key] = deepCopyFunction(value);
    }
  
    return outObject;
  }