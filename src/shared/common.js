export const idCheck = (checkId) => {
    let _reg = /[a-z|A-Z|0-9].{4,20}/;

    return _reg.test(checkId);
}


export const passwordCheck = (password) => {
    let _reg = /[a-zA-Z0-9].{8,}/
    return _reg.test(password);
}