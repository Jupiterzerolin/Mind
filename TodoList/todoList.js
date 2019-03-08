const vm = new Vue({
	el: '#app',
	directives: {
		// 获取焦点
		focus(el, bindings) {
			if (bindings.value) {
				el.focus();
			}
		}
	},
	// 响应式数据
	data: {
		todos: [],
		title: '',
		cur: '',
		hash:''
	},
	// 生命周期函数，表示一个示例从始至终的过程
	created() {
		this.todos = JSON.parse(localStorage.getItem('data')) || this.todos;
		this.hash = window.location.hash.slice(2) || 'all';
		window.addEventListener('hashchange', ()=>{ this.hash = window.location.hash.slice(2)},false)
	},
	watch: {
		//本地存储
		todos: {
			handler() {
				localStorage.setItem('data', JSON.stringify(this.todos));
			},
			deep: true//深度监控
		}
	},
	computed: {
		// 根据不同的组件计算并显示相关事项数据
			filterTodos(){
				if(this.hash ==='all') return this.todos;
				if(this.hash ==='finished') return this.todos.filter(item=>item.isSelected);
				if(this.hash === 'unfinish') return this.todos.filter(item=>!item.isSelected);
				return this.todos
			},
			count() {
				// 待办事项数量
				return this.todos.filter(item => !item.isSelected).length
			},
		},
	methods: {
		// 添加功能；判空；置空
		add() {
			var value = this.title && this.title.trim();
			if (!value) {
				return;
			}
			this.todos.push({
				isSelected: false,
				title: this.title
			});
			this.title = '';
		},
		remove(todo) {
			// 	删除待办事项
			this.todos = this.todos.filter(item => item !== todo);
		},
		remember(todo) {
			
			this.cur = todo;
		},
		ok() {
			this.cur = '';
		}
		}	
})
