// ブキ読み込み
const weapons = [
    { no: 0, ja: 'わかばシューター', en: 'Splattershot Jr.', type: 'shooter' },
    { no: 10, ja: 'スプラシューター', en: 'Splattershot Jr.', type: 'shooter' },
    { no: 20, ja: 'ボールドマーカー', en: 'Sploosh-o-matic', type: 'shooter' },
    { no: 30, ja: 'シャープマーカー', en: 'Splash-o-matic', type: 'shooter' },
    { no: 40, ja: 'プロモデラーMG', en: 'Aerospray MG', type: 'shooter' },
    { no: 50, ja: 'N-ZAP85', en: "N-ZAP '85", type: 'shooter' },
    { no: 60, ja: '.52ガロン', en: '.52 Gal', type: 'shooter' },
    { no: 70, ja: '.96ガロン', en: '.96 Gal', type: 'shooter' },
    { no: 80, ja: 'プライムシューター', en: 'Splattershot Pro', type: 'shooter' },
    { no: 90, ja: 'ジェットスイーパー', en: 'Jet Squelcher', type: 'shooter' },
    { no: 100, ja: 'L3リールガン', en: 'L-3 Nozzlenose', type: 'shooter' },
    { no: 110, ja: 'H3リールガン', en: 'H-3 Nozzlenose', type: 'shooter' },
    { no: 120, ja: 'ボトルガイザー', en: 'Squeezer', type: 'shooter' },

    { no: 1000, ja: 'ノヴァブラスター', en: 'Luna Blaster', type: 'blaster' },
    { no: 1010, ja: 'ホットブラスター', en: 'Blaster', type: 'blaster' },
    { no: 1020, ja: 'ロングブラスター', en: 'Range Blaster', type: 'blaster' },
    { no: 1030, ja: 'クラッシュブラスター', en: 'Clash Blaster', type: 'blaster' },
    { no: 1040, ja: 'ラピッドブラスター', en: 'Rapid Blaster', type: 'blaster' },
    { no: 1050, ja: 'Rブラスターエリート', en: 'Rapid Blaster Pro', type: 'blaster' },

    { no: 2000, ja: 'カーボンローラー', en: 'Carbon Roller', type: 'roller' },
    { no: 2010, ja: 'スプラローラー', en: 'Splat Roller', type: 'roller' },
    { no: 2020, ja: 'ヴァリアブルローラー', en: 'Flingza Roller', type: 'roller' },
    { no: 2030, ja: 'ダイナモローラー', en: 'Dynamo Roller', type: 'roller' },

    { no: 3000, ja: 'パブロ', en: 'Inkbrush', type: 'roller' },
    { no: 3010, ja: 'ホクサイ', en: 'Octobrush', type: 'roller' },

    { no: 4000, ja: 'スクイックリンα', en: 'Classic Squiffer', type: 'charger' },
    { no: 4010, ja: 'スプラチャージャー', en: 'Splat Charger', type: 'charger' },
    { no: 4030, ja: 'リッター4K', en: 'E-liter 4K', type: 'charger' },
    { no: 4050, ja: 'ソイチューバー', en: 'Goo Tuber', type: 'charger' },
    { no: 4060, ja: '14式竹筒銃・甲', en: 'Bamboozler 14 Mk I', type: 'charger' },

    { no: 5000, ja: 'バケットスロッシャー', en: 'Slosher', type: 'slosher' },
    { no: 5010, ja: 'ヒッセン', en: 'Tri-Slosher', type: 'slosher' },
    { no: 5020, ja: 'スクリュースロッシャー', en: 'Sloshing Machine', type: 'slosher' },
    { no: 5030, ja: 'オーバーフロッシャー', en: 'Bloblobber', type: 'slosher' },
    { no: 5040, ja: 'エクスプロッシャー', en: 'Explosher', type: 'slosher' },

    { no: 6000, ja: 'スプラスピナー', en: 'Mini Splatling', type: 'splatling' },
    { no: 6010, ja: 'バレルスピナー', en: 'Heavy Splatling', type: 'splatling' },
    { no: 6020, ja: 'ハイドラント', en: 'Hydra Splatling', type: 'splatling' },
    { no: 6030, ja: 'クーゲルシュライバー', en: 'Ballpoint Splatling', type: 'splatling' },
    { no: 6040, ja: 'ノーチラス47', en: 'Nautilus 47', type: 'splatling' },

    { no: 7000, ja: 'スパッタリー', en: 'Dapple Dualies', type: 'dualies' },
    { no: 7010, ja: 'スプラマニューバー', en: 'Splat Dualies', type: 'dualies' },
    { no: 7020, ja: 'デュアルスイーパー', en: 'Dualie Squelchers', type: 'dualies' },
    { no: 7030, ja: 'ケルビン525', en: 'Glooga Dualies', type: 'dualies' },
    { no: 7040, ja: 'クアッドホッパーブラック', en: 'Dark Tetra Dualies', type: 'dualies' },

    { no: 8000, ja: 'パラシェルター', en: 'Splat Brella', type: 'brella' },
    { no: 8010, ja: 'キャンピングシェルター', en: 'Tenta Brella', type: 'brella' },
    { no: 8020, ja: 'スパイガジェット', en: 'Undercover Brella', type: 'brella' },

    { no: 9000, ja: 'トライストリンガー', en: 'Tri-Stringer', type: 'stringer' },
    { no: 9010, ja: 'LACT-450', en: 'REEF-LUX 450', type: 'stringer' },

    { no: 10000, ja: 'ドライブワイパー', en: 'Splatana Wiper', type: 'wiper' },
    { no: 10010, ja: 'ジムワイパー', en: 'Splatana Stamper', type: 'wiper' },
];
const grizzco_weapons = [
    { no: 20000, ja: 'クマサン印のブラスター', en: 'Grizzco Blaster', type: 'grizzco' },
    { no: 20010, ja: 'クマサン印のシェルター', en: 'Grizzco Brella', type: 'grizzco' },
    { no: 20020, ja: 'クマサン印のチャージャー', en: 'Grizzco Charger', type: 'grizzco' },
    { no: 20030, ja: 'クマサン印のスロッシャー', en: 'Grizzco Slosher', type: 'grizzco' },
    { no: 20040, ja: 'クマサン印のストリンガー', en: 'Grizzco Stringer', type: 'grizzco' },
];

// ローカルストレージから読み込み
var mybingo = localStorage.getItem('mybingo');
var bingo_center = localStorage.getItem('bingo_center');
var bingo_size = localStorage.getItem('bingo_size');
var bingo_background = localStorage.getItem('bingo_background');



// 中央アイテムセレクタにブキを追加
function add_WeaponsOption() {
    const bingoCenterElement = document.getElementById('bingo-center');

    for (let w in grizzco_weapons) {
        let option = document.createElement('option');
        option.text = grizzco_weapons[w]['ja'];
        option.value = 'weapon' + grizzco_weapons[w]['no'];
        bingoCenterElement.appendChild(option);
    };
    for (let w in weapons) {
        let option = document.createElement('option');
        option.text = weapons[w]['ja'];
        option.value = 'weapon' + weapons[w]['no'];
        bingoCenterElement.appendChild(option);
    };
};


// ビンゴカード生成
function create_BingoCard() {
    let items = weapons.concat();
    bingo_center = document.getElementById('bingo-center').value;
    bingo_size = document.getElementById('bingo-size').value;
    bingo_background = document.getElementById('bingo-background').value;

    localStorage.setItem('bingo_center', bingo_center);
    localStorage.setItem('bingo_size', bingo_size);
    localStorage.setItem('bingo_background', bingo_background);

    let center_num = Math.floor(bingo_size / 2)

    const table = document.getElementById('bingo-card-table');
    table.innerHTML = '';
    document.getElementsByTagName('body')[0].className = bingo_background;
    
    if ( bingo_center.substring(0,6) == 'weapon' ) {
        let weapon_num = bingo_center.substring(6);
        var center_weapon = items[0];
        bingo_center = 'weapon';
        for (let w in items) {
            if ( items[w]['no'] == weapon_num ) {
                center_weapon = items.splice(w, 1)[0];
            }
        };
        for (let w in grizzco_weapons) {
            if ( grizzco_weapons[w]['no'] == weapon_num ) {
                center_weapon = grizzco_weapons[w];
            }
        };
    }
    mybingo = [];
    for (let row = 0; row < bingo_size; row++) {
        let tr = document.createElement('div');
        tr.className = 'tr';
        table.appendChild(tr);
        for (let colmun = 0; colmun < bingo_size; colmun++) {
            let td = document.createElement('div');
            td.className = 'td';
            let img = document.createElement('img');
            let item = '';
            if ( row == center_num && colmun == center_num ) {
                switch (bingo_center) {
                    case 'kuma':
                    case 'squid':
                        // td.style.backgroundImage = 'url(./images/'+bingo_center+'.png)';
                        img.src = './images/'+bingo_center+'.png';
                        item = bingo_center;
                        break;
                    case 'random':
                        weapon = items.splice(Math.floor(Math.random() * items.length), 1)[0];
                        // td.style.backgroundImage = 'url(./images/weapons/' + weapon['no'] + '.png)';
                        img.src = './images/weapons/' + weapon['no'] + '.png';
                        item = 'weapon' + weapon['no'];
                        break;
                    case 'weapon':
                        // td.style.backgroundImage = 'url(./images/weapons/' + center_weapon['no'] + '.png)';
                        img.src = './images/weapons/' + center_weapon['no'] + '.png';
                        item = 'weapon' + center_weapon['no'];
                    default:
                }
            } else {
                weapon = items.splice(Math.floor(Math.random() * items.length), 1)[0];
                // td.style.backgroundImage = 'url(./images/weapons/' + weapon['no'] + '.png)';
                img.src = './images/weapons/' + weapon['no'] + '.png';
                // td.style.content = 'url(./images/weapons/' + weapon['no'] + '.png)';
                item = 'weapon' + weapon['no'];
            };
            td.appendChild(img);
            td.addEventListener('click', function(){
                clickCard(row, colmun, item);
            });
            td.id = row + '-' + colmun;
            tr.appendChild(td);
            mybingo.push({row: row, colmun: colmun, item: item, done: false});
        };
    };
    localStorage.setItem('mybingo', JSON.stringify(mybingo));
    checkBingo();
};


// ビンゴカード復元
function restore_BingoCard() {
    const table = document.getElementById('bingo-card-table');
    document.getElementsByTagName('body')[0].className = bingo_background;

    let row = 0;
    let colmun = 0;
    for (let mycard in mybingo) {
        if (colmun == 0) {
            var tr = document.createElement('div');
            tr.className = 'tr';
            table.appendChild(tr);
        }
        let td = document.createElement('div');
        td.className = 'td';
        let img = document.createElement('img');

        if ( mybingo[mycard]['item'].substr(0,6) == 'weapon' ) {
            let weapon_num = mybingo[mycard]['item'].substr(6);
            let myweapon = weapons[0];
            for (let w in weapons) {
                if ( weapons[w]['no'] == weapon_num ) {
                    myweapon = weapons[w];
                }
            };
            for (let w in grizzco_weapons) {
                if ( grizzco_weapons[w]['no'] == weapon_num ) {
                    myweapon = grizzco_weapons[w];
                }
            };
            img.src = './images/weapons/' + myweapon['no'] + '.png';
        } else {
            img.src = './images/'+mybingo[mycard]['item']+'.png';
        }
        if (mybingo[mycard]['done']) {
            td.classList.add('done');
        } else {
            td.classList.remove('done');
        }
        td.appendChild(img);
        td.addEventListener('click', function(){
            clickCard(mybingo[mycard]['row'], mybingo[mycard]['colmun'], mybingo[mycard]['item']);
        });
        td.id = row + '-' + colmun;
        tr.appendChild(td);

        
        colmun++;
        if (colmun >= bingo_size) {
            colmun = 0;
            row++;
        }
    };
    checkBingo();
}


// ビンゴクリック
function clickCard(row, colmun, item) {
    console.log(row);
    console.log(colmun);
    console.log(item);
    let mycard = document.getElementById(row + '-' + colmun);
    console.log(mycard)
    if (mycard.classList.contains('done')) {
        mycard.classList.remove('done');
        mybingo[row * bingo_size + colmun]['done'] = false;
    } else {
        mycard.classList.add('done');
        mybingo[row * bingo_size + colmun]['done'] = true;
    }
    checkBingo();
    localStorage.setItem('mybingo', JSON.stringify(mybingo));
}


// ビンゴになったかチェック
function checkBingo() {
    for (let k in mybingo) {
        let mycard = document.getElementById(mybingo[k]['row'] + '-' + mybingo[k]['colmun']);
        mycard.classList.remove('reach');
        mycard.classList.remove('bingo');
    }
    let bingo_count = 0;
    let reach_count = 0;
    for (let row = 0; row < bingo_size; row++) {
        var done_count = 0;
        for (let colmun = 0; colmun < bingo_size; colmun++) {
            if (mybingo[row * bingo_size + colmun]['done']) {
                done_count++;
            }
        }
        if (done_count == bingo_size-1) {
            console.log('リーチ');
            reach_count++;
            for (let colmun = 0; colmun < bingo_size; colmun++) {
                let mycard = document.getElementById(row + '-' + colmun);
                if (!mycard.classList.contains('done')) {
                    mycard.classList.add('reach');
                }
            }
        } else if (done_count == bingo_size) {
            console.log('ビンゴ');
            bingo_count++;
            for (let colmun = 0; colmun < bingo_size; colmun++) {
                let mycard = document.getElementById(row + '-' + colmun);
                mycard.classList.add('bingo');
            }
        }
    }
    for (let colmun = 0; colmun < bingo_size; colmun++) {
        var done_count = 0;
        for (let row = 0; row < bingo_size; row++) {
            if (mybingo[row * bingo_size + colmun]['done']) {
                done_count++;
            }
        }
        if (done_count == bingo_size-1) {
            console.log('リーチ');
            reach_count++;
            for (let row = 0; row < bingo_size; row++) {
                let mycard = document.getElementById(row + '-' + colmun);
                if (!mycard.classList.contains('done')) {
                    mycard.classList.add('reach');
                }
            }
        } else if (done_count == bingo_size) {
            console.log('ビンゴ');
            bingo_count++;
            for (let row = 0; row < bingo_size; row++) {
                let mycard = document.getElementById(row + '-' + colmun);
                mycard.classList.add('bingo');
            }
        }
    }
    var done_count = 0;
    for (let row = 0; row < bingo_size; row++) {
        if (mybingo[row * bingo_size + row]['done']) {
            done_count++;
        }
    }
    if (done_count == bingo_size-1) {
        console.log('リーチ');
        reach_count++;
        for (let row = 0; row < bingo_size; row++) {
            let mycard = document.getElementById(row + '-' + row);
            if (!mycard.classList.contains('done')) {
                mycard.classList.add('reach');
            }
        }
    } else if (done_count == bingo_size) {
        console.log('ビンゴ');
        bingo_count++;
        for (let row = 0; row < bingo_size; row++) {
            let mycard = document.getElementById(row + '-' + row);
            mycard.classList.add('bingo');
        }
    }
    var done_count = 0;
    for (let row = 0; row < bingo_size; row++) {
        if (mybingo[row * bingo_size + (bingo_size - 1 - row)]['done']) {
            done_count++;
        }
    }
    if (done_count == bingo_size-1) {
        console.log('リーチ');
        reach_count++;
        for (let row = 0; row < bingo_size; row++) {
            let mycard = document.getElementById(row + '-' + (bingo_size - 1 - row));
            if (!mycard.classList.contains('done')) {
                mycard.classList.add('reach');
            }
        }
    } else if (done_count == bingo_size) {
        console.log('ビンゴ');
        bingo_count++;
        for (let row = 0; row < bingo_size; row++) {
            let mycard = document.getElementById(row + '-' + (bingo_size - 1 - row));
            mycard.classList.add('bingo');
        }
    }

    const bingo_ele = document.getElementById('is-bingo-message');
    if (bingo_count > 0) {
        if (bingo_count == 1) {
            bingo_ele.innerHTML = 'BINGO !!';
        } else {
            bingo_ele.innerHTML = bingo_count + ' BINGO !!!';
        }
    } else {
        bingo_ele.innerHTML = '';
    }
    const reach_ele = document.getElementById('is-reach-message');
    if (reach_count > 0) {
        if (reach_count == 1) {
            reach_ele.innerHTML = 'リーチ';
        } else {
            reach_ele.innerHTML = reach_count + ' リーチ !';
        }
    } else {
        reach_ele.innerHTML = '';
    }
}


// ローカルストレージから値を取得してフォームに反映
function loadLocalStorage() {
    if (bingo_center) {
        document.getElementById('bingo-center').value = bingo_center;
    };
    if (bingo_size) {
        document.getElementById('bingo-size').value = bingo_size;
    };
    if (bingo_background) {
        document.getElementById('bingo-background').value = bingo_background;
    };
    if (mybingo) {
        mybingo = JSON.parse(mybingo);
        restore_BingoCard();
    } else {
        create_BingoCard();
    };
};


// 横幅最大をWindowの縦サイズにする
function setWindowSize() {
    let windowsize = window.innerHeight;
    document.getElementById('contents').style.cssText = 'max-width : ' + (windowsize * 0.95) + 'px;';
}


// 実行
window.onload = function() {
    setWindowSize();
    add_WeaponsOption();
    loadLocalStorage();
    // window.addEventListener('resize', setWindowSize);
};