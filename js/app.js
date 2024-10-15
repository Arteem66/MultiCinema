const API_KEY = 'b3afde03-62f5-4871-802f-e8438c09e5ab'
const API_URL_POPULAR =
	'https://kinopoiskapiunofficial.tech/api/v2.2/films?top?type=TOP_100_POPULAR_FILMS&page=1'
const API_URL_BEAST =
	'https://kinopoiskapiunofficial.tech/api/v2.2/films?top?type=TOP_100_POPULAR_FILMS&page=1'

GET_POPULAR_FILMS(API_URL_POPULAR)
GET_BEAST_FILMS(API_URL_BEAST)

async function GET_POPULAR_FILMS(URL) {
	const resp = await fetch(URL, {
		headers: {
			'X-API-KEY': API_KEY,
			'accept': 'application/json',
		},
	})
	const respData = await resp.json()

	showPopularFilms(respData)
}

async function GET_BEAST_FILMS(URL) {
	const resp = await fetch(URL, {
		headers: {
			'X-API-KEY': API_KEY,
			'accept': 'application/json',
		},
	})
	const respData = await resp.json()

	showBeastFilms(respData)
}

function showBeastFilms(data) {
	const beastFilmBox = document.querySelector('.kino-later-list')
	const beastFilm = getRandomFilm(data.films, 1)

	beastFilmBox.innerHTML = `
    <img src='${beastFilm.posterUrlPreview}' class='later-img'
    alt = '${beastFilm.nameRu}'>
    <a href="https://www.kinopoisk.ru/film/${beastFilm.filmId}" class="button later-item-button">Посмотреть</a>
  `
}

function showPopularFilms(data) {
	const filmList = document.querySelector('.kino-later-list')
	const threeFilms = getRandomFilm(data.films, 3)

	threeFilms.forEach(item => {
		const filmItem = document.createElement('li')
		filmItem.classList.add('later-item')
		filmItem.innerHTML = `
          <img src='${item.posterUrlPreview}' class='later-img'
          alt = '${item.nameRu}'>
          <a href="https://www.kinopoisk.ru/film/${item.filmId}" class="button later-item-button">Посмотреть</a>`
		filmList.appendChild(filmItem)
	})
}

let getRandomFilm = (arr, n) => {
	let resultArray = []
	let array = arr.slice()

	for (let i = 0; i < n; i += 1) {
		resultArray.push(
			array.splice(Math.floor(Math.random() * array.length), 1)[0]
		)
	}

	return resultArray
}