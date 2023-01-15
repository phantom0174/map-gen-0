const { createNoise2D } = require('simplex-noise');
const { land } = require('./land.js');


const fs = require('fs');

const x = 200, y = 200;
const landChangeRate = Math.sqrt(x * y) / (10 * Math.log10(x + y));
const noise2D = createNoise2D();

let map = new Array(x).fill(null).map(() => new Array(y).fill(null));


async function gen_map() {
    for (let i = 0; i < x; i++) {
        for (let j = 0; j < y; j++) {
            const xArg = i * (landChangeRate / x);
            const yArg = j * (landChangeRate / y);
            let value = (noise2D(xArg, yArg) + 1) / 2;
            value = value.toFixed(2);
            map[i][j] = new land({
                x: i,
                y: j,
                value: value
            });
        }
    }
}

async function render() {
    await gen_map();

    fs.writeFileSync("./map.txt", '');
    map.forEach(line => {
        fs.writeFileSync("./map.txt", `${line.map(l => l.form).join(' ')}\n`, {
            encoding: 'utf8',
            flag: 'a+'
        });
    });
}

async function main() {
    gen_map();
    render();
}

main();
