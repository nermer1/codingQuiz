/**
 *
 * #. 문제 처리 방법
 *
 * < 처리 방식 >
 *
 * 1. 계산식 맨 앞 숫자는 제일 큰 숫자
 *  => 맨 앞자리는 무조건 양수
 *
 * 2. 다 쓴 사칙연산은 "X"로 치환
 *
 * 3. 큰 숫자 순으로 재배열
 * ex) [2, 4, 5, 8, 3] => [8, 5, 4, 3, 2]
 *
 * 4. 인덱스 설정
 * (1) 곱하기, 더하기, +나누기(나누기 앞에 +가 붙은 경우)의 경우
 * arr1_index++;로 다음 인덱스로 이동(arr1_index: 처리방식 1번의 맨 앞에 큰 숫자가 인덱스 0이므로, 인덱스 1부터 ++)
 *
 * (2) 빼기, -나누기의 경우
 * reverseIndex--;로 전 인덱스로 이동(reverseIndex: 마지막 인덱스 4부터 --)
 *
 *
 *
 * < 우선 순위 >
 *
 * 1. 곱하기 > 더하기(나눗셈, 뺄셈 유무 체크) > 뺄셈(나눗셈 유무 체크) > 나눗셈(뺄셈, 덧셈 유무 체크)
 *
 * (1) 곱하기
 * 숫자가 큰 순서대로 곱하기
 *
 * (2) 더하기(나눗셈, 뺄셈 유무 체크)
 * 나눗셈이 없는 경우: 그냥 "더하기"
 * 나눗셈이 있는 경우: 뺄셈이 있는 경우: 그냥 "더하기"
 *                                 이유1: 최소값(나눗셈한 값)을 빼줘야 최대값이 나오기 때문에 나누기한 값 앞에 "-"가 있어야 함(1이하의 값만 나옴)
 *                  뺄셈이 없는 경우: 더하기 1개 남기고 "더하기"
 *                                 이유1: 나누기 앞에 "+"를 붙이기 위함.
 *
 * (3) 뺄셈(나눗셈 유무 체크)
 * 나눗셈이 없는 경우: 그냥 "빼기"
 * 나눗셈이 있는 경우: 빼기 1개 남기고 "빼기"
 *                  이유1: 최소값(나눗셈한 값)을 빼줘야 최대값이 나오기 때문에 나누기한 값 앞에 "-"가 있어야 함(1이하의 값만 나옴)
 *
 *                  빼기가 여러개일 시 제일 작은 값부터 빼기
 *                  이유1: ex)a>b>c>d, ["/", "-", "-"]
 *                        가장 큰 값: a-d-(c/b)
 *
 * (4) 나눗셈(뺄셈, 덧셈 유무 체크)
 *                     ex) a>b>c
 * 뺄셈이 있는 경우: -c/a/b (최소값을 빼줘야 최대값)
 * 덧셈이 있는 경우: +a/b/c (최대값을 더해줘야 최대값)
 *       없는 경우: 그냥 "나누기"
 *
 * +나눗셈끼리 먼저 계산 후 앞에 덧셈 또는 뺄셈 붙이기
 *
 *
 *
 * < 결과 값 >
 *
 * 0보다 클 경우 : 버림
 * ("1.56" => "1")
 *
 * 0보다 작을 경우 : 올림
 * ("-1.56" => "-1")
 *

 *
 */


function calculator(arr1, arr2) {
    var arr1_index = 1;//인덱스 1부터 시작
    var reverseIndex = 4;//arr1 마지막 인덱스
    var test = "";// 계산식
    var maxValue = 0;//결과값
    var truncateMaxValue = 0;//결과값(버림)
    var arr2_count = {};//사칙연산 개수

    //내림차순 정렬
    arr1.sort(function (a, b) {
        return b - a;
    });

    //사칙연산 개수(ex. arr2_count = {/: 1, -: 1, *: 1, +: 1})
    arr2.forEach((x) => {
        arr2_count[x] = (arr2_count[x] || 0) + 1;
    });

    console.log("arr1(내림차순): " + arr1);
    console.log("사용 전 arr2: " + arr1);

    maxValue = arr1[0];
    test += maxValue;//계산식

    /** -----곱셈 유무----- */
    if (arr2.some(arr2Value => arr2Value === "*")) {
        for (var i = 0; i < arr2.length; i++) {
            if (arr2[i] === "*") {
                matchArithmeticOperation(arr2[i], arr1_index);
                arr1_index++;
                arr2[i] = "X";
            }
        }
    }

    /** -----덧셈 유무----- */
    if (arr2.some(arr2Value => arr2Value === "+")) {
        var plusCount = arr2_count['+'];// "+" 개수

        if (arr2.some(arr2Value => arr2Value === "/")) {// 나눗셈 유무
            if (arr2.some(arr2Value => arr2Value === "-")) {// 뺄셈 유무
                plusFn(arr2, arr1_index);
            } else {
                for (var i = 0; i < arr2.length; i++) {
                    if (plusCount > 1 && arr2[i] === "+") {
                        matchArithmeticOperation(arr2[i], arr1_index);
                        arr1_index++;
                        arr2[i] = "X";
                        plusCount--;
                    }

                }
            }
        } else {
            plusFn(arr2, arr1_index);
        }
    }

    function plusFn(arr2, arr1_index_plus) {
        var plusIndex = arr1_index_plus;
        for (var i = 0; i < arr2.length; i++) {
            if (arr2[i] === "+") {
                matchArithmeticOperation(arr2[i], plusIndex);
                plusIndex++;
                arr1_index++;
                arr2[i] = "X";
            }
        }
    }


    /** -----뺄셈 유무----- */

    if (arr2.some(arr2Value => arr2Value === "-")) {
        var minusCount = arr2_count['-'];

        if (arr2.some(arr2Value => arr2Value === "/")) { // 나눗셈 유무
            for (var i = 0; i < arr2.length; i++) {
                if (minusCount > 1 && arr2[i] === "-") {
                    matchArithmeticOperation(arr2[i], reverseIndex);
                    reverseIndex--;
                    arr2[i] = "X";
                    minusCount--;
                }
            }
        } else {
            minusFn(arr2, arr1_index);
        }
    }

    function minusFn(arr2, arr1_index_minus) {
        var minusIndex = arr1_index_minus;
        for (var i = 0; i < arr2.length; i++) {
            if (arr2[i] === "-") {
                matchArithmeticOperation(arr2[i], minusIndex);
                minusIndex++;
                arr1_index++;
                arr2[i] = "X";
            }
        }
    }

    /** -----나눗셈 유무----- */
    if (arr2.some(arr2Value => arr2Value === "/")) {
        var divisionCount = arr2_count['/'];

        if (arr2.some(arr2Value => arr2Value === "-")) {// 뺄셈 유무
            var minusIndex = arr2.indexOf('-');
            var divisionIndex = arr2.indexOf('/');

            //divisionCount: 나누기 개수 보내서 계산 함수에서 처리
            matchArithmeticOperation(arr2[divisionIndex], arr1_index, "minus", reverseIndex, divisionCount);
            arr2[minusIndex] = "X";
        } else if (arr2.some(arr2Value => arr2Value === "+")) {// 덧셈 유무
            var plusIndex = arr2.indexOf('+');
            var divisionIndex = arr2.indexOf('/');

            matchArithmeticOperation(arr2[divisionIndex], arr1_index, "plus", reverseIndex, divisionCount);
            arr2[plusIndex] = "X";
        } else {// "+", "-" 가 없는 경우""
            var divisionIndex = arr2.indexOf('/');

            matchArithmeticOperation(arr2[divisionIndex], arr1_index, "none", reverseIndex, divisionCount);
        }

        for (var i = 0; i < arr2.length; i++) {
            if (arr2[i] === "/") {
                arr2[i] = "X";
            }
        }
    }


    /** 계산 함수
     *
     *  matchArithmeticOperation(value, arr1_index, minus, reverseIndex, divisionCount)
     *
     *  value:               arr2 값(*, +, -, /)
     *  arr1_index:          arr1 인덱스 1부터 ++
     *  minus:               나눗셈 처리 시 빨셈/덧셈 유무
     *  reverseIndex:        arr1 마지막 인덱스 4부터 --
     *  divisionCount:       반복문을 위한 나눗셈 개수
     *
     */
    function matchArithmeticOperation(value, arr1_index, minus, reverseIndex, divisionCount) {
        // 곱하기
        if (value === "*") {
            maxValue *= arr1[arr1_index];
            test += value + arr1[arr1_index];
        }
        // 더하기
        if (value === "+") {
            maxValue += arr1[arr1_index];
            test += value + arr1[arr1_index];
        }
        // 빼기
        if (value === "-") {
            maxValue -= arr1[arr1_index];
            test += value + arr1[arr1_index];
        }
        // 나누기(나눗셈 한방에 계산 후 덧셈, 뺄셈 붙이기)
        if (value === "/") {
            if (minus === "minus") {//나눗셈 앞에 마이너스를 붙여야 할 때
                var calculateDivision = arr1[reverseIndex];//나눗셈 계산 값
                test += "-" + arr1[reverseIndex];

                for (var i = 0; i < divisionCount; i++) {
                    calculateDivision /= arr1[arr1_index];
                    test += "/" + arr1[arr1_index];
                    arr1_index++;
                }
                maxValue -= calculateDivision;
            }
            if (minus === "plus") {
                var calculateDivision = arr1[arr1_index];
                test += "+" + arr1[arr1_index];
                arr1_index++;

                for (var i = 0; i < divisionCount; i++) {
                    calculateDivision /= arr1[arr1_index];
                    test += "/" + arr1[arr1_index];
                    arr1_index++;
                }
                maxValue += calculateDivision;
            }
            if (minus === "none") {
                for (var i = 0; i < divisionCount; i++) {
                    maxValue /= arr1[arr1_index];
                    test += "/" + arr1[arr1_index];
                    arr1_index++;
                }

            }
        }
    }

    //0 이상 버림, 0 미만 올림
    truncateMaxValue = maxValue < 0 ? Math.ceil(maxValue) : Math.floor(maxValue);

    console.log("사용 후 arr2: " + arr2);
    console.log("계산식: " + test);
    console.log("값: " + maxValue);

    return truncateMaxValue;
}

var arr1 = [2, 3, 7, 9, 5];
var arr2 = ['/', "-", "-", "-"];

console.log("값(버림): " + calculator(arr1, arr2));