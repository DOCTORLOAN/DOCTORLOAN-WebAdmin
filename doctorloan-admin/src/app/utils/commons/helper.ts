export function objectToFormData(obj: any, formData?: FormData, parentKey?: string): FormData {
  formData = formData || new FormData();

  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      let propName = parentKey ? `${parentKey}[${key}]` : key;
      const value = obj[key];
      if(value===null||value===undefined)
        continue;
      if (value instanceof File) {
        // If it's a File, append directly to the FormData
        formData.append(propName, value);
      } else if (value instanceof Blob) {
        
        // If it's a Blob, treat it as a File and append to FormData
        formData.append(propName, value);
      } else if (typeof value === 'object' && value !== null) {
        // If it's a nested object, recursively convert to FormData
        objectToFormData(value, formData, propName);
      } else {
        // For primitive types, append as usual
        formData.append(propName, value);
      }
    }
  }

  return formData;
}