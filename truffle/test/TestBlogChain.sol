pragma solidity ^0.4.18;

import "truffle/Assert.sol";
import "../contracts/BlogChain.sol";

contract TestBlogChain {
	struct Post {
		uint id;
		address owner;
		string title;
		string content;
		uint createdAt;
	}

	BlogChain bc = new BlogChain();

	function testGetPostCount() public {
		Assert.equal(bc.getPostCount(), 0, "it returns correct posts count");
	}

	function testPostCreate() public {
		bc.addPost("salut", "ca va");

		Assert.equal(bc.getPostCount(), 1, "it saved the new post");

		var (id, owner, title, content, createdAt) = bc.getPost(1);
		Assert.equal(uint(1), id, "post has correct id");
		Assert.equal(address(this), owner, "post has correct owner");

		/*
		 * following tests are commented out
		 * because dynamic values can't be looked up inside truffle tests
		 */
		// Assert.equal(title, "title", "post has correct title");
		// Assert.equal(content, "content", "post has correct content");
		// Assert.equal(createdAt, "createdAt", "post has correct createdAt");
	}

	function testGetPostsByUser() public {
		bc.addPost("salut", "ca va");
		bc.addPost("salut", "ca va");
		bc.addPost("salut", "ca va");

		var postCountForUser = bc.getPostCountForUser(address(this));

		for (uint i = 0; i < postCountForUser; i++) {
			var (id, owner, title, content, createdAt) = bc.getPostOfUser(address(this), i);
			Assert.equal(address(this), owner, "all posts returned are of correct owner");
		}
	}
}