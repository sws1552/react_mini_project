// id 조건 : 숫자 혹은 영어로만 4글자 이상
export const idCheck = (checkId) => {
    let _reg = /^[A-Za-z0-9]{4,20}$/;

    return _reg.test(checkId);
}

// 한글, 숫자, 영어 중 10글자 이하
export const nicknameCheck = (nickname) => {
    let _reg = /^[a-zA-Z0-9ㄱ-ㅎ가-힣]{1,10}$/
    return _reg.test(nickname);
}

// 숫자, 영어, 특수문자 중 8글자 이상
export const passwordCheck = (password) => {
    let _reg = /^[a-zA-Z0-9$`~!@$!%*#^?&\\(\\)\-_=+]{8,}$/
    return _reg.test(password);
}

