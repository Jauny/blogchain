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

	function submitPost(string content) public {
		var postId = posts.length;
		if (postId == 0) {
			postId = 1;
		}
		var post = posts[postId];
		post.id = postId;
		post.owner = msg.sender;
		post.content = content;
		post.createdAt = now;

		postsById[post.id] = post;
		postsByUser[msg.sender].push(post.id);
	}

	function editPost(uint id, string content) public {
		var post = postsById[id];
		
		require(post.owner == msg.sender);

		post.content = content;
	}

	function getPost(uint id) public view returns (Post post) {
		return postsById[id];
	}

	function getPostsByUser(address user) public view returns (Post[]) {
		var ids = postsByUser[user];
		Post[] memory userPosts;

		for (uint i = 0; i < ids.length; i++) {
			userPosts[i] = postsById[ids[i]];
		}

		return userPosts;
	}
}
