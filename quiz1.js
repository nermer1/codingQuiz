/**
 * 문자엹 특수문자 제거
 * 특문제거만 문자열 문자단위 정렬
 * 
 * 처리프로세스 - 전처리
 * 문자열 특수문자, 공백 제거
 * 문자하나씩 쪼개서 배열로 생성
 * 배열 정렬
 * A 배열, B 배열 문자열을 {문자열: 동일갯수} 형태로 가공
 * 가공된 데이터 A(A기준)와 B key가 동일한지, 동일하다면 A의 key 값과 B의 key 값을 비교하여 맞는 개수를 카운팅하여 비율계산한다.
 */
function matchingPercent(str1, str2) {
	let percent = getPercent(str1, str2);
    console.log(percent);
	return percent;
}

function getPercent(str1, str2) {
    const s1 = new CompareString(str1).getData();
    const s2 = new CompareString(str2).getData();
    const ratioCalc = (a, b) => {
        // 비율계산
        return (a / b * 100).toFixed(2);
    }
    const same = (a, b) => {
        // 동일한 값 계산
        return Object.keys(a).reduce((cnt, key) => {
            return cnt += (!b.hasOwnProperty(key))? 0 : (a[key] > b[key])? b[key] : a[key];
        }, 0);
    }
    return ratioCalc(same(s1.data, s2.data), s1.len);
}

class CompareString {
    #str;
    #data;

    constructor(str) {
        this.#str = this.#remove(str);
        this.#data = this.#proc(this.#str);
    }

    getData() {
        return {
            len: this.#str.length,
            data: this.#data
        }
    }

    #remove(str) {
        return str.replace(/[^ㄱ-힇\w]/g, '');
    }

    #proc(str) {
        return str            
            .split('')
            .sort()
            .reduce((a, b) => {
                if(!a.hasOwnProperty(b)) a[b] = 1;
                else a[b]++;
                return a;
            }, {});
    }
}

matchingPercent('RE: [유니포스트] [풍산] 께서 요청하신 "PEACE 세금계산서 처리 오류 " 처리내역 안내', 'RE: [유니포스트] [풍산] 께서 요청하신 "PEACE 세금계산서 처리 오류 " 처리내역 안내');