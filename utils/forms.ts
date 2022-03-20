export function formDataToURLString(formData: FormData) {
    const data = [...formData.entries()];
    const asString = data
        .map(x => `${encodeURIComponent(x[0])}=${encodeURIComponent(x[1])}`)
        .join('&');
    return asString;
}

export function objectToURLString(object: any) {
    return Object.keys(object)
        .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(object[key])}`)
        .join('&')
}