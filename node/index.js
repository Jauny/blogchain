const express = require('express');
const app = express();
var bodyParser = require('body-parser');

app.set('view engine', 'pug');
app.use(express.static('public'));
app.use(bodyParser.json())

// const posts = [
// 	{id: 1, title: 'this is the first post', content: 'not sure what to say here'},
// 	{id: 2, title: 'another post', content: 'still no clue lol'},
// 	{id: 3, title: 'wow I\'m really keeping this up', content: 'this is about keeping it up!'}
// ];

const blogchainHelpers = require('./blogchain');
const web3 = blogchainHelpers.getWeb3();
const bcContract = blogchainHelpers.getContract();

const BigNumber = require('bignumber.js');

app.get('/', async (req, res) => {
  const bcInstance = await bcContract.deployed();
  const postCount = new BigNumber(await bcInstance.getPostCount.call()).toNumber();
  console.log(postCount)

  const posts = [];
  for (let i = 0; i < postCount; i++) {
    const data = await bcInstance.posts.call(i);
    const post = blogchainHelpers.loadPost(data);
    posts.push(post);
  }

	res.render('index', {name: 'jon', posts});
});

app.post('/post', async (req, res) => {
  const bcInstance = await bcContract.deployed();

  const result = await web3.eth.getAccounts((err, accounts) => {
    const account = accounts[1];

    bcInstance.addPost(req.body.title, req.body.content, {from: account, gas: 300000});
  });
  console.log(result);

  res.json('ok');
})

app.get('/post/:id', async (req, res) => {
	const bcInstance = await bcContract.deployed();
  console.log('getting post with id', req.params.id - 1);
  const data = await bcInstance.posts(req.params.id - 1);
  console.log(data);
  const post = blogchainHelpers.loadPost(data);
	res.render('post', {post});
})

app.listen(3000, () => console.log('listening on port 3000!'))