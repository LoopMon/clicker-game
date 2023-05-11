function formatarNumero(n) {
    if (n >= 1000) {
        n = '' + n

        let cd = n.slice(1, n.length).length

        for (let key in casas) {
            if (casas[key].includes(cd)) {
                aux = +('1e' + casas[key][0])
                n = +n
                n = (n / aux).toFixed(2)
                n = n + key
                break
            }
        }
        return n
    }

    return n
}

const casas = {
    k: [3, 4, 5],
    M: [6, 7, 8],
    B: [9, 10, 11],
    T: [12, 13, 14]
}

const ball = document.querySelector('#ball')
const countPS = document.querySelector('#PS')
const countClicks = document.querySelector('#clicks')
const item1 = document.querySelector('#item-1')
const item2 = document.querySelector('#item-2')
const item3 = document.querySelector('#item-3')

let pointsPerSecond
let clicksPerSecond
let costAutoClick
let costClick
let cost2xAutoClick
let points

let interval

if (!!localStorage.getItem('points')) {
    pointsPerSecond = +localStorage.getItem('pointsPerSecond')
    clicksPerSecond = +localStorage.getItem('clicksPerSecond')
    points = +localStorage.getItem('points')
    costAutoClick = +localStorage.getItem('costAutoClick')
    costClick = +localStorage.getItem('costClick')
    cost2xAutoClick = +localStorage.getItem('cost2xAutoClick')

    ball.textContent = formatarNumero(points)
    countPS.textContent = formatarNumero(pointsPerSecond)
    countClicks.textContent = formatarNumero(clicksPerSecond)
    item1.textContent = formatarNumero(costAutoClick)
    item2.textContent = formatarNumero(costClick)
    item3.textContent = formatarNumero(cost2xAutoClick)
} else {
    localStorage.setItem('pointsPerSecond', 0)
    localStorage.setItem('clicksPerSecond', 1)
    localStorage.setItem('costAutoClick', 50)
    localStorage.setItem('costClick', 10)
    localStorage.setItem('points', 0)
    localStorage.setItem('cost2xAutoClick', 1000)

    pointsPerSecond = +localStorage.getItem('pointsPerSecond')
    clicksPerSecond = +localStorage.getItem('clicksPerSecond')
    costAutoClick = +localStorage.getItem('costAutoClick')
    costClick = +localStorage.getItem('costClick')
    points = +localStorage.getItem('points')
    cost2xAutoClick = +localStorage.getItem('cost2xAutoClick')

    ball.textContent = formatarNumero(points)
    countPS.textContent = formatarNumero(pointsPerSecond)
    countClicks.textContent = formatarNumero(clicksPerSecond)
    item1.textContent = formatarNumero(costAutoClick)
    item2.textContent = formatarNumero(costClick)
    item3.textContent = formatarNumero(cost2xAutoClick)
}


ball.addEventListener('mousedown', function () {
    this.classList.add('click')
    points += clicksPerSecond
    localStorage.setItem('points', points)
    this.textContent = formatarNumero(points)
})

ball.addEventListener('mouseup', function () {
    this.classList.remove('click')
})

item1.addEventListener('click', () => {
    if (points >= costAutoClick) {
        points -= costAutoClick
        costAutoClick += 50
        item1.innerText = formatarNumero(costAutoClick)
        ball.textContent = formatarNumero(points)
        pointsPerSecond += 1
        countPS.textContent = formatarNumero(pointsPerSecond)
    }
})

item2.addEventListener('click', () => {
    if (points >= costClick) {
        points -= costClick
        costClick += 10
        item2.innerText = formatarNumero(costClick)
        ball.textContent = formatarNumero(points)
        clicksPerSecond += 1
        countClicks.textContent = formatarNumero(clicksPerSecond)
    }
})

item3.addEventListener('click', () => {
    if (points >= cost2xAutoClick) {
        points -= cost2xAutoClick
        cost2xAutoClick *= 10

        item3.textContent = formatarNumero(cost2xAutoClick)
        pointsPerSecond *= 2
        countPS.textContent = formatarNumero(pointsPerSecond)
        ball.textContent = formatarNumero(points)
    }
})


interval = setInterval(() => {
    points += pointsPerSecond
    ball.textContent = formatarNumero(points)

    localStorage.setItem('pointsPerSecond', pointsPerSecond)
    localStorage.setItem('clicksPerSecond', clicksPerSecond)
    localStorage.setItem('costAutoClick', costAutoClick)
    localStorage.setItem('cost2xAutoClick', cost2xAutoClick)
    localStorage.setItem('costClick', costClick)
    localStorage.setItem('points', points)
}, 1000)
