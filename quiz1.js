/**
 * 두 문자열의 특문, 공백을 제거한 뒤
 * 두 문자열을 반복하면서 str1의 문자가 str2의 문자가 있는지 체크
 * 문자가 존재한다면 해당 str2 의 인덱스를 배열에 담아 해당 배열에 있는
 * 인덱스는 사용했다고 판단하여 진행
 */

/**
 * 두 문자열 비교 및 일치하는 퍼센트를 리턴하는 함수
 * @param str1
 * @param str2
 * @returns {`${string}%`}
 */
const matchingPercent = (str1, str2) => {
    let matchSum = 0;
    const reg = /[`~!@#$%^&*()_|+\-=?;:'",.<>{}\[\]\\\/ ]/gim;
    const matchIndexArr = [];
    const replaceStr1 = str1.replace(reg, '');
    const replaceStr2 = str2.replace(reg, '');

    for (let str1Index = 0; str1Index < replaceStr1.length; str1Index++) {
        for (let str2Index = 0; str2Index < replaceStr2.length; str2Index++) {
            if (replaceStr1[str1Index] === replaceStr2[str2Index]) {
                if (!matchIndexArr.some(isMatchItem => isMatchItem === str2Index)) {
                    matchIndexArr.push(str2Index);
                    matchSum++;
                    break;
                }
            }
        }
    }

    return `${((matchSum / replaceStr1.length) * 100).toFixed(2)}%`;
}

/**
 * 문자열 뒤집는 함수 (테스트용으로 만듬)
 * ex) 가나다 -> 다나가
 * @param str
 * @returns {*}
 */
const reverseString = (str) => {
    return str.split("").reverse().join("");
}

const str1 = 'RE: [유니포스트] [풍산] 께서 요청하신 "PEACE 세금계산서 처리 오류 " 처리내역 안내';
const str2 = '[유니포스트] [풍산] 께서 요청하신 "PEACE 세금계산서 처리 오류 " 처리내역 안내'

console.log(matchingPercent(str1, str2));