/* 맵 */
const mapSize = 5;
let playerPosition = {x: 0, y: 0};

// 맵과 상태 관리
const mapElement = document.getElementById("map");
const statusElement = document.getElementById("status");

// 이벤트 좌표
const events = [
	{x: 1, y: 0, message: "우리는 집 근처 편의점에서 처음 만났어요.<br>그때부터 매일같이 따뜻한 밥을 챙겨주었죠.", className: "special-cu"},
	{x: 3, y: 1, message: "추운 겨울 토토는 주차장에 머무르곤 했는데,<br>어느 날 하루 아침에 토토는 사라져버렸어요.", className: "special-park"},
	{x: 3, y: 3, message: "수소문 끝에 경기도 안산에서 토토를 봤다는 연락을 받았어요.<br>토토는 자동차 엔진룸에 들어가 고속도로를 탄 것 같았어요.", className: "special-ansan"},
	{x: 4, y: 4, message: "좋은 분들의 도움 덕분에 토토는 무사히 저희 집으로 왔고,<br>저의 소중하고 사랑스러운 고양이 토토가 되었답니다.", className: "special-house"}
];

// 맵 생성
function createMap() {
	mapElement.innerHTML = ""; // 기존 맵 초기화

	for (let row = 0; row < mapSize; row++) {
		for (let col = 0; col < mapSize; col++) {
			const tile = document.createElement("div");
			tile.classList.add("tile");
			tile.dataset.x = col;
			tile.dataset.y = row;

			// 이벤트 좌표 이미지 추가
			const event = events.find(e => e.x === col && e.y === row);
			if (event) {
				tile.classList.add("event", event.className);
			}

			// 토토 아이콘
			if (playerPosition.x === col && playerPosition.y === row) {
				const playerIcon = document.createElement("img");
				playerIcon.src = "./images/story/toto.png"; // 토토 아이콘
				tile.appendChild(playerIcon);
			}

			mapElement.appendChild(tile);
		}
	}

	checkEvent(playerPosition.x, playerPosition.y);
}

// 이벤트 체크
function checkEvent(x, y) {
	const event = events.find(e => e.x === x && e.y === y);
	if (event) {
		statusElement.innerHTML = `${event.message}`;
	} else {
		statusElement.innerHTML = "토토를 방향키로 이동시켜 보세요.";
	}
}

// 아이콘 이동
function movePlayer(direction) {
	const {x, y} = playerPosition;

	// 방향에 따라 이동
	switch (direction) {
		case "left":
			if (x > 0) playerPosition.x--;
			break;
		case "right":
			if (x < mapSize - 1) playerPosition.x++;
			break;
		case "up":
			if (y > 0) playerPosition.y--;
			break;
		case "down":
			if (y < mapSize - 1) playerPosition.y++;
			break;
	}

	createMap();
}

// 방향키 이벤트 리스너
document.addEventListener("keydown", (event) => {
	if (event.key === "ArrowLeft") {
		movePlayer("left");
	} else if (event.key === "ArrowRight") {
		movePlayer("right");
	} else if (event.key === "ArrowUp") {
		movePlayer("up");
	} else if (event.key === "ArrowDown") {
		movePlayer("down");
	}
	event.preventDefault();
});

createMap();

// 별 동적 생성
const starContainer = document.querySelector('.stars-container');

// 별 100개
for (let i = 0; i < 100; i++) {
	const star = document.createElement('div');
	star.classList.add('star');
	// 랜덤 위치 설정
	const x = Math.random() * 100;
	const y = Math.random() * 100;
	star.style.top = `${y}vh`;
	star.style.left = `${x}vw`;
	star.style.animationDelay = `${Math.random() * 2}s`;
	starContainer.appendChild(star);
}

// 메뉴 스크롤 이동
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
	anchor.addEventListener('click', function (e) {
		e.preventDefault();
		const targetId = this.getAttribute('href').substring(1);
		const targetElement = document.getElementById(targetId);
		window.scrollTo({
			top: targetElement.offsetTop - 60, // 메뉴 높이 제외
			behavior: 'smooth',
		});
	});
});

// 챗봇
const responses = {
	'이름': '제 이름은 토토에요.',
	'생일': '2021.06.01 (수의사 선생님과 추측)',
	'품종': '스트릿 출신으로 삼색이입니다.',
	'성별': '여아 (삼색이는 99.9% 여아입니다.)',
	'성격': '순둥이, 쫄보, 엄마바라기에요.',
	'좋아하는것': '장난감 (작은 벌레 낚싯대, 스네이크 낚싯대), 음식 (닭), 사람 (엄마)',
	'싫어하는것': '음식 (영양제, 특히 오메가3를 츄르에 타서 먹이면 바로 뱉어버려요), 사람 (목소리나 동작이 크고 저음의 남자를 무서워해요)',
	'수면시간': '사람의 패턴과 맞춰져있는데, 밥이나 간식을 먹고 나면 그루밍하고 꿀잠을 자요. 집사가 없으면 하루종일 자요.'
};

function showAnswer(question) {
	const chatBox = document.querySelector('.chat-box');

	// 챗본 오른쪽
	const userMessage = document.createElement('p');
	userMessage.classList.add('user-message');
	userMessage.textContent = question;
	chatBox.appendChild(userMessage);

	// 챗본 왼쪽
	const botMessage = document.createElement('p');
	botMessage.classList.add('bot-message');
	botMessage.textContent = responses[question];
	chatBox.appendChild(botMessage);

	// 화면 스크롤
	//chatBox.scrollTop = chatBox.scrollHeight;
}

// 팝업 열기
function openPopup(imageSrc) {
	const popup = document.getElementById('popup');
	const popupImage = document.getElementById('popup-image');
	popupImage.src = imageSrc;
	popup.classList.add('show');
}

// 팝업 닫기
function closePopup() {
	const popup = document.getElementById('popup');
	popup.classList.remove('show');
}

// 갤러리 이미지 이벤트 리스너
const galleryItems = document.querySelectorAll('.gallery-image-container');
galleryItems.forEach(item => {
	item.addEventListener('click', function () {
		const imageSrc = item.querySelector('img').src;
		openPopup(imageSrc);
	});
});

// 팝업 바깥영역 클릭 시 팝업 닫기
document.getElementById('popup').addEventListener('click', function (e) {
	if (e.target === this) {
		closePopup();
	}
});
