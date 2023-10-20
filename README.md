# codingQuiz

### 공통 규칙
```text
1. 각 문제 제출은 {id} branch를 생성해서 quiz{번호}.js 파일명으로 제출
2. 로직 작성 전 설계에 대한 프로세스 작성, 발표 시 프로세스 설명
```
<br>

---

### Quiz 1. 2개의 문자열이 얼마나 일치하는가?

날짜: 2023.10.06<br>
제출자: 김재현<br>
난이도: ☆☆☆☆★<br>

```text
quiz 규칙

두개의 문자열이 얼마나 일치하는지를 나타내는 메서드를 만들고싶다.
matchingPercent 매개변수는 str1, str2 문자열을 받는다.
일치하는 값은 퍼센트로 변수 percent에 담아 반환.
percent값이 소수점 단위로 떨어지는 경우는 2자리(반올림)까지 표기한다.
matchingPercent외에 필요한 함수는 얼마든지 추가가능.
특수문자 와 공백은 삭제
비율은 문자열 1번째 기준
캐릭터 비교, 순서 상관 없음
구글링 및 chatGpt 등 AI 검색 금지
```

```text
인자값 예시)
문자열1 - 'RE: [유니포스트] [풍산] 께서 요청하신 "PEACE 세금계산서 처리 오류 " 처리내역 안내'
문자열2 - '[유니포스트] [풍산] 께서 요청하신 "PEACE 세금계산서 처리 오류 " 처리내역 안내'
```

```javascript
function matchingPercent(str1: String, str2: String) {
	let percent: int = 0;
	// 작성하시오
	return percent;
}
```

---

### Quiz 2. 랜덤으로 나오는 숫자 [ 1 - 9 ], 사칙연산 [ + - * / ] 으로 최댓값 만들기

날짜: 2023.10.20<br>
제출자: 김승규<br>
난이도: ☆☆☆☆★<br>

```text
quiz 규칙

랜덤으로 나오는 숫자, 사칙연산으로 가장 최댓값을 만들어보자.
calculator 매개변수는 arr1, arr2은(는) 배열.
arr1은(는) 1-9 까지 숫자 랜덤 (숫자 중복 가능).
arr2은(는) 사칙연산( + - * / ) 랜덤 (부호 중복 가능).
숫자 및 부호 전부 사용.
최댓값을 변수 maxValue에 담아 반환.
calculator 외에 필요한 함수는 얼마든지 추가 가능.
구글링 및 chatGpt 등 AI 검색 금지
```

```text
인자값 예시)
arr1 - ['2', '3', '7', '9' ,'5']
arr2 - ['+', '-', '*', '/' ]
```

```javascript
function calculator(arr1, arr2) {
	let maxValue = 0;
	// 작성하시오
	return maxValue;
}
```

---