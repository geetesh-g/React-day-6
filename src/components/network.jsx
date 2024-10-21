/* 

Befor going in to actual coding part lets learn about this concept 

useEffect :- It is a Hook provided by React that handles the sideEffects or effects

SideEffects :- To know about sideEffect first we have to understand Pure function 

Pure function :- pure functions are the funtions which do not create effect 
which means that they do not goes out of their scope for any execution and also returs
same output for same input everytime 

Ex. 
1. function Add (a ,b) {
     return a + b;
   }

Add(3,4);

2 . function addNum (num) {
      return num + 10
    }

    addNum(20) ; It will always return 30 that's why it is a pure function



Now we'll be looking for function those are not pure and they create effect
These are the functions those goes out of their function scope to perform tasks or they returns differnt output for same input sometimes

Ex.
1. 
async function fetchData() {
  const res = await fetch(baseURL);
  const data =  await res.json()
  return data
} 

Above function goes out of it's  function scope for fetch the data that's why it is not a pure function and it creates an effect

For handling such kind of function we use useEffect hook

*/

// --------------------------------------------------------------

/*

Phase 1 :-

Build an application that'll fetch the posts data from json placeholder api on mount and displays the same onto UI
Maintain loading and error state as well in addition to maintaining data state
Showcase loading indicator when API request is still pending
Showcase error message if API request fails
Showcase the list of posts if the API request is successfull

Phase 2 :- 

Add pagination to the above built application; so basically you also maintain page state.
There will be a previous button and next button clicking on which will change page state to page-1 and page+1 accordingly. The current page number should be displayed in between
Previous button should be disabled if we are in page 1.
Next button should be disabled if we are in last page.
Every time user clicks on different page; you should get and display data related to that page only. Data related to a particular page, one can get by using _page param

Learning Objectives :-

Mount Phase
Update Phase
useEffect

*/

//---------------------------------------------------------------

import { useEffect, useState } from "react";
import "../App.css";

function Post() {
	const [posts, setPosts] = useState([]);
	const [page, setPage] = useState(1);
	const [totalCount, setTotalCount] = useState(10);
	useEffect(() => {
		fetchPost(page);
	}, [page]);

	const fetchPost = async (page) => {
		try {
			const res = await fetch(
				`https://jsonplaceholder.typicode.com/posts?_limit=10&_page=${page}`
			);
			if (res.ok) {
				const count = res.headers.get("X-Total-Count");
				setTotalCount(count);
				const data = await res.json();
				setPosts(data);
			}
		} catch (error) {
			console.log(error.message);
		}
		console.log(totalCount);
	};

	const handleClick = (val) => {
		const newPage = val + page;
		setPage(newPage);
	};

	return (
		<div>
			<h1>Post Data</h1>
			<ul>
				{posts.map((post) => {
					return (
						<li key={post.id}>
							{post.id} {post.title}
						</li>
					);
				})}
			</ul>
			<div className="pagination">
				<button disabled={page <= 1} onClick={() => handleClick(-1)}>
					{" "}
					&lt; Prev
				</button>
				<button>{page}</button>
				<button
					disabled={page >= totalCount / 10}
					onClick={() => handleClick(1)}
				>
					Next &gt;{" "}
				</button>
			</div>
		</div>
	);
}

export default Post;
