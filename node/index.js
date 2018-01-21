const express = require('express');
const app = express();

app.set('view engine', 'pug');
app.use(express.static('public'));

const posts = [
	{id: 1, title: 'this is the first post', content: 'not sure what to say here'},
	{id: 2, title: 'another post', content: 'still no clue lol'},
	{id: 3, title: 'wow I\'m really keeping this up', content: 'this is about keeping it up!'}
];

app.get('/', (req, res) => {
	res.render('index', {name: 'jon', posts});
});

app.get('/post/:id', (req, res) => {
	const post = posts[req.params.id - 1];
	res.render('post', {post});
})

app.listen(3000, () => console.log('listening on port 3000!'))