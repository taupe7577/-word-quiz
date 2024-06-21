let word = "quest";
let left_count = 5;
let isSucceed = false;

main();

/**
 * 함수 실행
 */
function main() {
    init();
}

/**
 * 초기화
 */
function init() {
    // 상단 도전 가능횟수 생성

    // 퀴즈 프레임 생성
    createQuizFrame(word.length);

    // 입력 프레임 생성
    createAnswerFrame(word.length);
}

/**
 * 남은 횟수를 갱신
 */
function updateCount() {
    left_count--;

    const count_span = document.querySelector('.count');
    count_span.textContent = left_count;
}

/**
 * count 개수만큼 퀴즈 프레임 생성
 * @param {number} count 
 */
function createQuizFrame(count) {
    const row = document.createElement('div');
    for (let i = 0; i < count; i++) {
        frame = document.createElement('div');
        frame.classList.add('frame');

        row.append(frame);
    }
    const quiz_container = document.querySelector('.quiz_container');
    quiz_container.append(row);
}

/**
 * count 개수만큼 답 입력 프레임 생성
 * @param {number} count 
 */
function createAnswerFrame(count) {
    const answer_container = document.querySelector('.answer_container');
    for (let i = 0; i < count; i++) {
        frame = document.createElement('input');
        frame.setAttribute('maxlength', '1');
        frame.classList.add('frame');

        answer_container.append(frame);
    }
    const btn = document.createElement('button');
    btn.classList.add('summit');
    btn.textContent = '제출';
    answer_container.append(btn);

    btn.addEventListener('click', () => {
        // 입력 칸이 비어있을 때
        if (isEmpty()) {
            return;
        }

        // 남은 횟수가 0 이상일 때
        if (left_count > 0) {
            checkAnswer();
            if (!isSucceed) {
                createQuizFrame(word.length);
            }
        }
    })
}

/**
 * 정답확인
 */
function checkAnswer() {
    const quiz_container = document.querySelector('.quiz_container').children;;
    const quiz_frames = quiz_container[5 - left_count].querySelectorAll('.frame');
    const answer_container = document.querySelector('.answer_container');
    const answer_frames = answer_container.querySelectorAll('.frame');

    // 초성이 일치하는 경우 -> 해당하는 위치의 프레임 색을 노랑색으로 설정
    for (let i = 0; i < answer_frames.length; i++) {
        if (answer_frames[i].value !== "" && word.includes(answer_frames[i].value)) {
            quiz_frames[i].classList.add('yellow');
        }

        if (word[i] === answer_frames[i].value) {
            quiz_frames[i].classList.add('green');
            quiz_frames[i].classList.remove('yellow');
        }

        quiz_frames[i].textContent = answer_frames[i].value;
    }

    if (quiz_container[5 - left_count].querySelectorAll('.green').length === word.length) {
        isSucceed = true;
        alert('정답입니다!!!');
    }
    updateCount();
}

/**
 * 답 입력 칸이 비어있는지 롹인
 * @returns isEmpty
 */
function isEmpty() {
    const answer_container = document.querySelector('.answer_container');
    const answer_frames = answer_container.querySelectorAll('.frame');

    let isEmpty = false;

    answer_frames.forEach(frame => {
        if (frame.value === '') {
            isEmpty = true;
        }
    })

    return isEmpty;
}