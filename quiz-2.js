/**
 *
Quiz 2. 랜덤으로 나오는 숫자 [ 1 - 9 ], 사칙연산 [ + - * / ] 으로 최댓값 만들기

날짜: 2023.10.20
제출자: 김승규
난이도: ☆☆☆☆★

quiz 규칙

랜덤으로 나오는 숫자, 사칙연산으로 가장 최댓값을 만들어보자.
calculator 매개변수는 arr1, arr2은(는) 배열.
arr1은(는) 1-9 까지 숫자 랜덤 (숫자 중복 가능).
arr2은(는) 사칙연산( + - * / ) 랜덤 (부호 중복 가능).
숫자 및 부호 전부 사용.
최댓값을 변수 maxValue에 담아 반환.
calculator 외에 필요한 함수는 얼마든지 추가 가능.
구글링 및 chatGpt 등 AI 검색 금지

인자값 예시)
arr1 - ['2', '3', '7', '9' ,'5'], [2, 3, 7, 9 ,5]
arr2 - ['+', '-', '*', '/' ]

```javascript
function calculator(arr1, arr2) {
	let maxValue = 0;
	// 작성하시오
	return maxValue;
}
 */


let arr1 = [2, 3, 7, 9 ,5];
let arr2 = ['+', '-', '*', '/'];

function calculator(arr1, arr2) {
    arr1 = arr1.sort().reverse(); // 크기순으로 정렬 후 역순 정렬

    let arr1Idx = 1; // arr1 index 체크용
    let divCnt = 0; // 나눈 횟수 체크

    let addList = arr2.filter((p) => {return p === '+'});
    let subList = arr2.filter((p) => {return p === '-'});
    let mulList = arr2.filter((p) => {return p === '*'});
    let divList = arr2.filter((p) => {return p === '/'});
    
	let maxValue = arr1[0]; // 최대값

    for(let i = 0; i < mulList.length; i++){
        maxValue = maxValue * arr1[arr1Idx];
        arr1Idx++; // arr1순서대로 계산용
    }

    for(let i = 0; i < divList.length; i++){
        maxValue = maxValue / arr1[arr1.length - 1 - i]; // 맨 뒤에있는 제일 작은 수 기준으로 나누기
        arr1Idx++; // arr1 순서 계산용
        divCnt++; // 나눈 횟수 체크 이후 arr1 순서 계산하는데 사용
    }

    for(let i = 0; i < addList.length; i++){ 
        maxValue = maxValue + arr1[arr1Idx - divCnt]; // arr1 순서에서 위의 나눈 횟수 만큼의 arr1 자릿수 계산 ex) 2번 나눈 경우 수가 제일 작은 맨 뒤 뒷자리 수는 사용 불가능
        arr1Idx++; // arr1 순서 계산용
    }

    for(let i = 0; i < subList.length; i++){
        maxValue = maxValue - arr1[arr1Idx - divCnt]; // arr1 순서에서 위의 나눈 횟수 만큼의 arr1 자릿수 계산 ex) 2번 나눈 경우 수가 제일 작은 맨 뒤 뒷자리 수는 사용 불가능
        arr1Idx++; // arr1 순서 계산용
    }

    console.debug(maxValue); 

	return maxValue; // 결과
}


calculator(arr1, arr2);