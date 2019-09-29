const axios = require('axios');
module.exports = {
	home: (req, res) => {
		res.redirect('/posts');
	},
	showPosts: async (req, res) => {
		try {
			let page = !req.query.page ? 1 : parseInt(req.query.page);
			let response = await axios.get('https://jsonplaceholder.typicode.com/posts');
			let posts = response.data.filter((post) => post.userId === page);
			res.render('pages', { posts: posts, page: page });
		} catch (e) {
			res.render('pages/404', {
				page: 'Internal error',
				title: '500',
				message: 'Oops, Something went wrong'
			});
		}
	},
	showSinglePost: async (req, res) => {
		try {
			let result = await axios.get(`https://jsonplaceholder.typicode.com/posts/${req.params.post}`);
			if (!result) {
				res.render('pages/404', {
					page: 'Not Found',
					title: '404',
					message: 'We could not find this Post'
				});
			}
			res.render('pages/post', { post: result.data });
		} catch (e) {
			res.render('pages/404', {
				page: 'Internal Error',
				message: 'Oops, Someting went wrong',
				title: '500'
			});
		}
	},

	notFound: (req, res) => {
		res.render('pages/404', {
			page: 'Not found!!',
			title: '404',
			message: 'Oops!, Page Not Found'
		});
	}
};
