export const idCheck = (checkId) => {
    let _reg = /[a-z|A-Z|0-9].{4,20}/;

    return _reg.test(checkId);
}


