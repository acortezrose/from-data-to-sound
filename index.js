const scribble = require('scribbletune');

// example data
// const data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1];
var s1 = [116, 461, 305, 226, 36, 92];
var s2 = [120, 103, 178, 256, 111, 281, 33, 124, 199, 198];
var s3 = [169, 158, 148, 73, 73];
var s4 = [129, 117, 40, 40, 180];
var s5 = [68];
var s6 = [326];
var s7 = [108];
const privacypolicy = [s1, s2, s3, s4, s5, s6, s7];

var i;
for(i = 0; i < privacypolicy.length; i++){
	var data = [];

	for(var j = 0; j < privacypolicy[i].length; j++){
		data.push(privacypolicy[i][j] % 10);
	}
	console.log(data);

	const min = Math.min(...data);
	const octaves = [...Array(5)].map((d, i) => i + 1); // [1, 2, 3, 4, 5]

	// creates array of notes like 'c1', 'd1', 'e1', 'gb1', 'ab1', 'bb1', 'c2', ...
	const notes = octaves.reduce((res, octave) =>
	  res.concat(scribble.scale('c', 'whole tone', octave, false))
	, []);

	const midiData = scribble.clip({
	  notes: data.map(value => notes[value - min]),
	  pattern: 'x',
	  noteLength: 8 / data.length,
	});

	// write the MIDI file 🎵🎵🎵
	scribble.midi(midiData, 'section' + i.toString() + '.mid');
}
