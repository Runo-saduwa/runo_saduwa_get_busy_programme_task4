const button = document.querySelector('button');
const commentField = document.querySelector('.comment-field');
const commentsContainer = document.querySelector('.comments');
const alertBox = document.querySelector('.alert');

document.addEventListener('DOMContentLoaded', function() {
	loadItems();
});

function loadItems() {
	if (localStorage.getItem('comments')) {
		let pageId = parseInt(commentsContainer.dataset.id);
		console.log(pageId);
		let comments = JSON.parse(localStorage.getItem('comments'));
		console.log(comments);

		let pageComments = comments.filter((comment) => comment.commentId == pageId);

		pageComments.forEach(function(item) {
			addItem(item.comment);
		});
	}
}

button.addEventListener('click', (e) => {

	e.preventDefault();

	const comment = commentField.value;
	const commentId = e.target.dataset.id;
	const commentObj = {
		commentId,
		comment
	};

	if(comment === ''){
		alertBox.classList.remove('d-none');
		setTimeout(() => {
			alertBox.classList.add('d-none');
		}, 3000)
	} else {
		if (!localStorage.getItem('comments')) {
			let comments = [];
			comments.push(commentObj);
			localStorage.setItem('comments', JSON.stringify(comments));
			addItem(commentObj.comment);
		} else {
			let comments = JSON.parse(localStorage.getItem('comments'));
			comments.push(commentObj);
			localStorage.setItem('comments', JSON.stringify(comments));
			addItem(commentObj.comment);
		}
	}

	
});

function addItem(value) {
	const div = document.createElement('div');
	div.classList.add('my-3');
	div.innerHTML = `
	<div class="card">
  <div class="card-body">
    <h5>Anonymous</h5>
    ${value}
  </div>
</div>
	`;

	commentsContainer.appendChild(div);
}
