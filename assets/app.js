const game = {
	limit: 25,
	array: Array(),
	start: {x: 1, y: 1},
	end: {x: 25, y: 25},
	open: Array(),
	close: Array(),
	success: true,
	taoMeCung: function()
	{
		for(let y = 0; y < this.limit; y++)
		{
			for(let x = 0; x < this.limit; x++)
			{
				if(typeof this.array[y] == 'undefined')
					this.array[y] = [];
				this.array[y][x] = 0;
			}
		}
	},
	DFS: function(point = {x: 0, y: 0})
	{
		let soDuong = 0, current;

		if((point.x+1) <= this.limit && this.diemDung({x: (point.x+1), y: point.y}) == false)
		{
			this.open.push({x: (point.x+1), y: point.y});
			soDuong++;
		}

		if((point.x-1) > 0 && this.diemDung({x: (point.x-1), y: point.y}) == false)
		{
			this.open.push({x: (point.x-1), y: point.y});
			soDuong++;
		}

		if((point.y+1) <= this.limit && this.diemDung({x: point.x, y: (point.y+1)}) == false)
		{
			this.open.push({x: point.x, y: (point.y+1)});
			soDuong++;
		}

		if((point.y-1) > 0 && this.diemDung({x: point.x, y: (point.y-1)}) == false)
		{
			this.open.push({x: point.x, y: (point.y-1)});
			soDuong++;
		}

		if(soDuong == 0)
			return this.close;

		if(this.close.length == 0)
			current = this.start;
		else
		{
			for(let i = 0; i < this.open.length; i++)
			{
				if(this.isDiem(this.close, this.open[i]) == false)
				{
					current = this.open[i];
					break;
				}
			}
		}

		if((current.x !== this.end.x || current.y !== this.end.y) && this.isDiem(this.close, current) == false)
		{
			this.close.push(current);
			this.xoaDiem(this.open, current);
			return this.DFS(current);
		}

		this.close.push(this.end);
		return this.close;
	},
	BFS: function(point = {x: 0, y: 0})
	{
		let soDuong = 0, min;

		if((point.x+1) <= this.limit && this.diemDung({x: (point.x+1), y: point.y}) == false)
		{
			this.open.push({x: (point.x+1), y: point.y});
			soDuong++;
		}

		if((point.x-1) > 0 && this.diemDung({x: (point.x-1), y: point.y}) == false)
		{
			this.open.push({x: (point.x-1), y: point.y});
			soDuong++;
		}

		if((point.y+1) <= this.limit && this.diemDung({x: point.x, y: (point.y+1)}) == false)
		{
			this.open.push({x: point.x, y: (point.y+1)});
			soDuong++;
		}

		if((point.y-1) > 0 && this.diemDung({x: point.x, y: (point.y-1)}) == false)
		{
			this.open.push({x: point.x, y: (point.y-1)});
			soDuong++;
		}

		if(soDuong == 0)
			return this.close;

		if(this.close.length == 0)
			this.close.push(this.start);

		min = this.timMin(this.open);

		while(this.isDiem(this.close, min) !== false)
		{
			this.xoaDiem(this.open, min);
			min = this.timMin(this.open);

			if(this.isDiem(this.close, min) == true && soDuong == 1)
			{
				this.success = false;
				return this.close;
			}
		}

		if((min.x !== this.end.x || min.y !== this.end.y) && this.isDiem(this.close, min) == false)
		{
			this.close.push(min);
			return this.BFS(min);
		}

		this.close.push(this.end);
		return this.close;
	},
	loTrinh: function()
	{
		const option = document.getElementById('option');
		let duongdi;
		if(option.value == 'bfs')
		{
			duongdi = this.BFS(this.start);
		}
		else
		{
			duongdi = this.DFS(this.start);
		}
		return this.close;
	},
	reset: function()
	{
		this.open = Array();
		this.close = Array();
		this.success = true;
	},
	/* Heuristic */
	timMin: function(arr)
	{
		let t = this;
		let min = this.khoangCach(this.start, this.end), point = this.start;
		arr.forEach(function(item, index)
		{
			if(t.khoangCach(item, t.end) < min)
			{
				min = t.khoangCach(item, t.end);
				point = item;
			}
		});
		return point;
	},
	xoaDiem: function(arr, point = {x: 0, y: 0})
	{
		arr.forEach(function(item, index)
		{
			if(item.x == point.x && item.y == point.y)
				arr.splice(index, 1);
		});
	},
	isDiem: function(arr = Array(), point = {x: 0, y: 0})
	{
		for(let i = 0; i < arr.length; i++)
			if(typeof arr[i] !== 'undefined')
				if(arr[i].x == point.x && arr[i].y == point.y)
					return true;
		return false;
	},
	diemDung: function(point = {x: 0, y: 0})
	{
		if(this.array[point.y-1][point.x-1] == 1)
			return true;
		return false;
	},
	khoangCach: function(start = {x: 0, y: 0}, end = {x: 0, y: 0})
	{
		return Math.pow((start.x - end.x), 2) + Math.pow((start.y - end.y), 2);
	},
	randMeCung: function(max = 1)
	{
		return Math.floor(Math.random() * Math.floor(max + 1));
	},
	xuatMeCung: function()
	{
		let content = document.getElementById("game");
		content.innerHTML = '';
		let dong = '';
		this.array.forEach(function(item, y){
			item.forEach(function(val, x){
				dong += '<li title="(X,Y) => (' + (x+1) + ',' + (y+1) + ')" data-x="' + (x+1) + '" data-y="' + (y+1) + '" data-val="' + val + '"></li>';
			});
			content.innerHTML += '<ul>' + dong + '</ul>';
			dong = '';
		});
	},
	run: function()
	{
		this.taoMeCung();
		this.xuatMeCung();
		let qrStart = document.querySelector('#game>ul>li[data-x="' + this.start.x + '"][data-y="' + this.start.y + '"]'), qrEnd = document.querySelector('#game>ul>li[data-x="' + this.end.x + '"][data-y="' + this.end.y + '"]');
		qrStart.classList.add('start');
		qrEnd.classList.add('end');
		const point = document.querySelectorAll('#game>ul>li[data-val="0"]');
		point.forEach(function(item, index)
		{
			item.onclick = () => 
			{
				if(game.array[item.dataset.y-1][item.dataset.x-1] == 1)
					game.array[item.dataset.y-1][item.dataset.x-1] = 0;
				else
					game.array[item.dataset.y-1][item.dataset.x-1] = 1;
				console.log("vitri = (" + item.dataset.x + "," + item.dataset.y + ")");
				item.classList.toggle('stop');
			};
		});
		document.getElementById('run').onclick = () =>
		{
			this.reset();
			let duongdi = this.loTrinh();
			if(this.success == false)
			{
				alert("Không có đường đi!");
			}
			duongdi.forEach(function(item, index)
			{
				setTimeout(() =>
				{
					if(duongdi[index-1] !== undefined)
					{
						let active = document.querySelector('#game>ul>li[data-x="' + duongdi[index-1].x + '"][data-y="' + duongdi[index-1].y + '"]');
						active.classList.add('active');
						active.classList.remove('here');
					}
					document.querySelector('#game>ul>li[data-x="' + item.x + '"][data-y="' + item.y + '"]').classList.add('here');
					console.log('Đã đi qua vị trí (x,y) => (' + item.x + ',' + item.y + ')');
				}, 100*index);
			});
			console.log(this.open);
			console.log(this.close);
		};
	}
};
game.run();