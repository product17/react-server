'use strict';

var theList = {'Elena Donio' : '4.jpg',
'Kellie Zimmerman' : '7.jpg',
'Steve Singh' : '19.jpg',
'Barry Padgett' : '20.jpg',
'Prashanth Adhikari' : '21.jpg',
'Concur' : '23.png',
'Katherine Sullivan' : '24.png',
'Doug Bechtold' : '26.jpg',
'Christopher Juneau' : '32.jpg',
'Nancy Lyons Callahan' : '35.jpg',
'Ellen Trotochaud' : '43.jpg',
'Jessica Pankov' : '44.jpg',
'Michael Eberhard' : '52.jpg',
'Jessica Staley' : '57.jpg',
'anita.marsh' : '65.jpeg',
'Matt Lewis' : '75.jpg',
'Eoin Landers' : '79.jpg',
'Belinda.Zinicola' : '80.jpg',
'Christopher J. Dwyer' : '82.jpg',
'Peter Remnant' : '84.jpg',
'Clare Wilson' : '91.jpg',
'Visage' : '93.jpeg',
'PETetaz' : '96.jpg',
'JohnDietz' : '97.jpeg',
'AlistairKent' : '99.jpg',
'Brian Veloso' : '106.jpeg',
'AmolKasbekar' : '107.jpeg',
'KatyB' : '117.jpg',
'michelleschmetzer' : '119.jpg',
'Candice.Vu' : '120.jpg',
'Tim.MacDonald' : '121.jpeg',
'Chris.Ismael' : '122.png',
'Jess Skelton' : '123.jpg',
'SeanPikeIDC' : '125.jpeg',
'John.Coovert' : '126.jpg',
'Jeff.Chan' : '127.jpeg',
'mithun.dhar' : '129.jpg',
'Jody.Wilkins' : '130.jpg',
'Dwayne.Alicie' : '132.jpg',
'amy.padgett' : '133.jpg',
'Tricia.Manning.Smith' : '134.jpg',
'mike.lamparella' : '135.jpg',
'kendra.walters' : '137.jpg',
'alyciabolling' : '138.jpg',
'phillip.johnston' : '139.jpg',
'kelly.colman' : '141.jpg',
'jodi.koskella' : '142.jpg',
'clea.blockey' : '144.jpg',
'Bzur.Haun' : '145.jpg',
'Chris.Doxey' : '147.jpg',
'Debra.Moss' : '150.jpg',
'Sean.Gagne' : '151.jpg',
'Brian.Tarble' : '153.jpg',
'Jerame.Thurik' : '155.jpg',
'Deepak.Seth' : '156.jpg',
'Robb.Nielsen' : '157.jpg',
'chris.trudeau@concur.com' : '158.jpeg',
'Linda.McAllister' : '160.jpg',
'Tina.Weirauch' : '161.jpg',
'linh.ho' : '162.jpg',
'Dan.Ruch' : '164.jpeg',
'arpan.joshi' : '165.jpeg',
'Julie.Pearl' : '166.jpg',
'Tim.Csontos' : '167.jpg',
'Tabitha.Dunn' : '168.jpg',
'Rick.Price' : '169.jpg',
'Carinab' : '171.jpg',
'Howard.Dierking' : '172.jpg',
'Nicole.Holmes' : '173.jpg',
'Carolyns' : '174.jpg',
'Al.Kinisky' : '175.jpg',
'Ralph.Colunga' : '177.jpg',
'Tyler.Dikman' : '179.jpg',
'Joe.Healy' : '180.jpg',
'Stephanie.Bull' : '181.jpg',
'Kevin.Sequeira' : '184.png',
'Steve.Sedgwick' : '185.jpg',
'Marko.Leppavuori' : '186.jpg',
'Aarong' : '189.jpg',
'Tracy' : '191.jpg',
'Emilio.Bernal' : '192.png',
'Andrew.Carriere' : '193.jpg',
'Bob.Preston' : '194.jpg',
'Noam.Guzman' : '195.jpg',
'Caroline.Heckathorn' : '196.jpg',
'Erin.Rinker' : '197.png',
'Nic.Hepton' : '198.jpg',
'Jeff Winton' : '199.jpg',
'Joe.Ng' : '201.jpg',
'Theresa.Ripp' : '203.jpg',
'Ryan.Crowe' : '205.jpg',
'Sam.Brenner' : '206.jpg',
'virginia.miller' : '207.jpg',
'Quincy.Smith' : '208.jpg',
'Stephanie.ValletSandre' : '211.jpg',
'Jay.Sethna' : '213.png'};

var _ = require('lodash');

var list = [];
_.forOwn(theList, function (value, key) {
  if (!key) {
    return;
  }
  list.push({
    key: key,
    path: 'https://www.concur.com/blog/wp-content/uploads/userphoto/' + value,
    name: value,
  })
  return;
});

var fs = require('fs'),
    request = require('request');

var download = function(uri, filename, callback){
  request.head(uri, function(err, res, body){
    console.log('content-type:', res.headers['content-type']);
    console.log('content-length:', res.headers['content-length']);

    request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
  });
};

list.forEach(function (item, i) {
	download(item.path, 'z_images/' + item.name, function () {
		console.log('done');
	});
});



