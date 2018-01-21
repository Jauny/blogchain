pragma solidity ^0.4.18;

import "truffle/Assert.sol";
import "../contracts/BlogChain.sol";

contract TestBlogChain {
	BlogChain bc = new BlogChain();
	function TestBlogChain() public {
		bc.submitPost("title", "content");
		var (id, owner, title, content, createdAt) = bc.posts(uint(1));

		Assert.equal(uint(1), id, "post has correct id");
		Assert.equal(address(0), owner, "post has correct owner");

		/*
		 * following tests are commented out
		 * because dynamic values can't be looked up inside truffle tests
		 */
		// Assert.equal(title, "title", "post has correct title");
		// Assert.equal(content, "content", "post has correct content");
		// Assert.equal(createdAt, "createdAt", "post has correct createdAt");
	}
}
