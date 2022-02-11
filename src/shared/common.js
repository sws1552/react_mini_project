export const idCheck = (checkId) => {
    let _reg = /^[A-Za-z0-9]{4,20}$/;

    return _reg.test(checkId);
}


