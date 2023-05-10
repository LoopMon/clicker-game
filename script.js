const ball = document.querySelector('#ball')
const countPS = document.querySelector('#PS')
const countClicks = document.querySelector('#clicks')
const item1 = document.querySelector('#item-1')
const item2 = document.querySelector('#item-2')
let pointsPerSecond
let clicksPerSecond
let points
let costAutoClick
let costClick
let interval

if (!!localStorage.getItem('points')) {
    pointsPerSecond = +localStorage.getItem('pointsPerSecond')
    clicksPerSecond = +localStorage.getItem('clicksPerSecond')
    points = +localStorage.getItem('points')
    costAutoClick = +localStorage.getItem('costAutoClick')
    costClick = +localStorage.getItem('costClick')

    ball.textContent = points
    countPS.textContent = pointsPerSecond
    countClicks.textContent = clicksPerSecond
    item1.textContent = costAutoClick
    item2.textContent = costClick
} else {
    localStorage.setItem('pointsPerSecond', 0)
    localStorage.setItem('clicksPerSecond', 1)
    localStorage.setItem('costAutoClick', 50)
    localStorage.setItem('costClick', 10)
    localStorage.setItem('points', 0)

    pointsPerSecond = +localStorage.getItem('pointsPerSecond')
    clicksPerSecond = +localStorage.getItem('clicksPerSecond')
    costAutoClick = +localStorage.getItem('costAutoClick')
    costClick = +localStorage.getItem('costClick')
    points = +localStorage.getItem('points')
}


ball.addEventListener('mousedown', function () {
    this.classList.add('click')
    points += clicksPerSecond
    localStorage.setItem('points', points)
    this.textContent = points
})
ball.addEventListener('mouseup', function () {
    this.classList.remove('click')
})

item1.addEventListener('click', () => {
    if (points >= costAutoClick) {
        points -= costAutoClick
        costAutoClick += 50
        item1.innerText = costAutoClick
        ball.textContent = points
        pointsPerSecond += 1
        countPS.textContent = pointsPerSecond
    }
})

item2.addEventListener('click', () => {
    if (points >= costClick) {
        points -= costClick
        costClick += 10
        item2.innerText = costClick
        ball.textContent = points
        clicksPerSecond += 1
        countClicks.textContent = clicksPerSecond
    }
})

interval = setInterval(() => {
    points += pointsPerSecond
    ball.textContent = points

    localStorage.setItem('pointsPerSecond', pointsPerSecond)
    localStorage.setItem('clicksPerSecond', clicksPerSecond)
    localStorage.setItem('costAutoClick', costAutoClick)
    localStorage.setItem('costClick', costClick)
    localStorage.setItem('points', points)
}, 1000)