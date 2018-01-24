pragma solidity ^0.4.18;

/**
 * The BlogChain contract is the core of the BlogChain system.
 *
 * This contract stores and serves blog posts created by users
 * who can also edit their posts later on.
 */
contract BlogChain {
	// Post is a blog post
	struct Post {
		uint id;
		address owner;
		string title;
		string content;
		uint createdAt;
	}

	Post[] public posts; // All posts
	mapping(uint => Post) postsById; // All posts by id
	mapping(address => uint[]) postsByUser; // Pointer to posts index created by this user

	address owner; // owner of this contract

	// constructor
	function BlogChain() public {
		owner = msg.sender;
	}

	function addPost(string _title, string _content) public {
		var postId = posts.length + 1;
		var post = Post(postId, msg.sender, _title, _content, now);

		posts.push(post);
		postsById[post.id] = post;
		postsByUser[post.owner].push(post.id);
	}

	// function editPost(uint id, string content) public {
	// 	var post = postsById[id];
		
	// 	require(post.owner == msg.sender);

	// 	post.content = content;
	// }

	function getPostCount() public view returns (uint) {
		return posts.length;
	}

	// function getPost(uint id) public view returns (uint, address, string, string, uint) {
	// 	var post = postsById[id];

	// 	return (post.id, post.owner, post.title, post.content, post.createdAt);
	// }

	// function getPostCountForUser(address user) public view returns (uint) {
	// 	return postsByUser[user].length;
	// }

	// function getPostOfUser(address user, uint index) public view returns (uint, address, string, string, uint) {
	// 	require(postsByUser[user].length > 0);
	// 	require(index < postsByUser[user].length);

	// 	var postId = postsByUser[user][index];
	// 	return getPost(postId);
	// }
}
