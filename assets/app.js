/*
 * Code được phát triển bởi Sĩ Ben :)))
 * @github: https://github.com/dangtiensi
 */

const game = {
	limit: 25,
	array: Array(),
	chuaxet: Array(),
	start: {x: 1, y: 1},
	end: {x: 25, y: 25},
	open: Array(),
	close: Array(),
	dfs: Array(),
	ready: false,
	current: {x: 1, y: 1},
	success: true,
	win: true,
	time: 15, // 15 giây
	createArray: function()
	{
		for(let y = 0; y < this.limit; y++)
		{
			this.array[y] = Array();
			for(let x = 0; x < this.limit; x++)
			{
				this.array[y][x] = 0;
			}
		}
		for(let y = 0; y < this.limit; y++)
		{
			this.chuaxet[y] = Array();
			for(let x = 0; x < this.limit; x++)
			{
				this.chuaxet[y][x] = 0;
			}
		}
	},
	randomArray: function()
	{
		for(let i = 0; i < this.limit; i++)
		{
			if((i + 1) % 2 == 0 && i < (this.limit - 1))
			{
				for(let j = i; j < (this.limit - i); j++)
				{
					this.array[i][j] = (j % this.randMeCung(2) == 0 ? this.randMeCung() : 1);
					this.array[this.limit - i - 1][j] = (j % 2 == 0 ? this.randMeCung() : 1);
				}
				for(let j = i; j < (this.limit - i); j++)
				{
					this.array[j][i] = (j % this.randMeCung(2) == 0 ? this.randMeCung() : 1);
					this.array[j][this.limit - i - 1] = (j % 2 == 0 ? this.randMeCung() : 1);
				}
			}
		}
		do
		{
			this.end = {x: (this.randMeCung(this.limit - 1) + 1), y: (this.randMeCung(this.limit - 1) + 1)};
		}
		while(this.stopPoint(this.end) == true || this.tinhKhoangCach(this.start, this.end) <= (this.limit / 2) || this.end.x < (this.limit / 2) || this.end.y < (this.limit / 2));
	},
	tinhKhoangCach: function(start = {x: 0, y: 0}, end = {x: 0, y: 0})
	{
		return Math.sqrt(Math.pow((end.x - start.x), 2) + Math.pow((end.y - start.y), 2));
	},
	randMeCung: function(max = 1)
	{
		return Math.floor(Math.random() * Math.floor(max + 1));
	},
	BFS: function(point = {x: 0, y: 0})
	{
		if(this.close.length === 0)
			this.close.push({
				range: this.tinhKhoangCach(this.start, this.end),
				parent_x: 0,
				parent_y: 0,
				x: this.start.x,
				y: this.start.y
			});

		if((point.x+1) <= this.limit && this.stopPoint({x: (point.x+1), y: point.y}) == false && this.isPoint(this.open, {x: (point.x+1), y: point.y}) == false)
		{
			this.open.push({
				range: this.tinhKhoangCach({x: (point.x+1), y: point.y}, this.end),
				parent_x: point.x,
				parent_y: point.y,
				x: (point.x+1),
				y: point.y
			});
		}

		if((point.x-1) > 0 && this.stopPoint({x: (point.x-1), y: point.y}) == false && this.isPoint(this.open, {x: (point.x-1), y: point.y}) == false)
		{
			this.open.push({
				range: this.tinhKhoangCach({x: (point.x-1), y: point.y}, this.end),
				parent_x: point.x,
				parent_y: point.y,
				x: (point.x-1),
				y: point.y
			});
		}

		if((point.y+1) <= this.limit && this.stopPoint({x: point.x, y: (point.y+1)}) == false && this.isPoint(this.open, {x: point.x, y: (point.y+1)}) == false)
		{
			this.open.push({
				range: this.tinhKhoangCach({x: point.x, y: (point.y+1)}, this.end),
				parent_x: point.x,
				parent_y: point.y,
				x: point.x,
				y: (point.y+1)
			});
		}

		if((point.y-1) > 0 && this.stopPoint({x: point.x, y: (point.y-1)}) == false && this.isPoint(this.open, {x: point.x, y: (point.y-1)}) == false)
		{
			this.open.push({
				range: this.tinhKhoangCach({x: point.x, y: (point.y-1)}, this.end),
				parent_x: point.x,
				parent_y: point.y,
				x: point.x,
				y: (point.y-1)
			});
		}

		let min = this.searchMin(this.open, point);

		while(this.isPoint(this.close, min) == true)
		{
			min = this.searchMin(this.open, point);
			this.removePoint(this.open, min);

			if(this.open.length == 0)
			{
				this.success = false;
				return [];
			}
		}

		if(min.x !== this.end.x || min.y !== this.end.y)
		{
			this.close.push(min);
			return this.BFS(min);
		}

		this.close.push({
			range: 0,
			parent_x: point.x,
			parent_y: point.y,
			x: this.end.x,
			y: this.end.y
		});

		return this.close;
	},
	DFS: function(point = {x: 0, y: 0})
	{

		this.chuaxet[point.y - 1][point.x - 1] = 1;

		if((point.x+1) <= this.limit && this.stopPoint({x: (point.x+1), y: point.y}) == false && this.chuaxet[point.y - 1][point.x] == 0)
		{
			this.dfs.push({
				parent_x: point.x,
				parent_y: point.y,
				x: (point.x+1),
				y: point.y
			});
		}

		if((point.x-1) > 0 && this.stopPoint({x: (point.x-1), y: point.y}) == false && this.chuaxet[point.y - 1][point.x - 2] == 0)
		{
			this.dfs.push({
				parent_x: point.x,
				parent_y: point.y,
				x: (point.x-1),
				y: point.y
			});
		}

		if((point.y+1) <= this.limit && this.stopPoint({x: point.x, y: (point.y+1)}) == false && this.chuaxet[point.y][point.x - 1] == 0)
		{
			this.dfs.push({
				parent_x: point.x,
				parent_y: point.y,
				x: point.x,
				y: (point.y+1)
			});
		}

		if((point.y-1) > 0 && this.stopPoint({x: point.x, y: (point.y-1)}) == false && this.chuaxet[point.y - 2][point.x - 1] == 0)
		{
			this.dfs.push({
				parent_x: point.x,
				parent_y: point.y,
				x: point.x,
				y: (point.y-1)
			});
		}

		let i = 0, stop = false, uutien = false, current;

		while(stop == false)
		{
			if(i == this.dfs.length - 1)
				stop = true;

			current = this.dfs[i];

			if(this.chuaxet[current.y - 1][current.x - 1] == 0)
				stop = true;

			i++;
		}

		if(this.chuaxet[current.y - 1][current.x - 1] == 1)
		{
			this.success = false;
			return [];
		}

		if((current.x !== this.end.x || current.y !== this.end.y))
			return this.DFS(current);

		return this.dfs;
	},
	loTrinh: function(array = [])
	{
		if(this.array.length == 0)
			return [];
		let loTrinh = Array(), current = this.end, stop = false;
		while(stop == false)
		{
			for(let i = 0; i < array.length; i++)
			{
				if(current.x == array[i].x && current.y == array[i].y)
				{
					loTrinh.push(current);
					current = {x: array[i].parent_x, y: array[i].parent_y};
					break;
				}
			}
			if(current.x == this.start.x && current.y == this.start.y)
			{
				loTrinh.push(this.start);
				stop = true;
			}
		}
		loTrinh.reverse();
		return loTrinh;
	},
	reset: function()
	{
		this.open = Array();
		this.close = Array();
		this.dfs = Array();
		this.success = true;
		for(let y = 0; y < this.limit; y++)
		{
			this.chuaxet[y] = Array();
			for(let x = 0; x < this.limit; x++)
				this.chuaxet[y][x] = 0;
		}
	},
	searchMin: function(arr = {}, current = {})
	{
		if(arr.length === 0)
			return null;

		let t = this, point = t.start, min = null;

		for(let i = 0; i < arr.length; i++)
		{
			if(arr[i].parent_x == current.x && arr[i].parent_y == current.y)
			{
				if(min == null)
				{
					min = arr[i].range;
					point = arr[i];
				}
				if(arr[i].range < min)
				{
					min = arr[i].range;
					point = arr[i];
				}
			}
		}

		if(point !== t.start)
			return point;

		return arr[0];
	},
	removePoint: function(arr, point = {x: 0, y: 0})
	{
		arr.forEach(function(item, index)
		{
			if(item.x == point.x && item.y == point.y)
				arr.splice(index, 1);
		});
	},
	isPoint: function(arr = Array(), point = {x: 0, y: 0})
	{
		for(let i = 0; i < arr.length; i++)
			if(typeof arr[i] !== 'undefined')
				if(arr[i].x == point.x && arr[i].y == point.y)
					return true;
		return false;
	},
	stopPoint: function(point = {x: 0, y: 0})
	{
		if(this.array[point.y-1][point.x-1] == 1)
			return true;
		return false;
	},
	outputArray: function()
	{
		let t = this;
		let content = document.getElementById("game");
		content.innerHTML = '';
		let dong = '';
		t.array.forEach(function(item, y)
		{
			item.forEach(function(val, x)
			{
				dong += '<li title="x: ' + (x+1) + ', y: ' + (y+1) + '" data-x="' + (x+1) + '" data-y="' + (y+1) + '" data-val="' + val + '"></li>';
			});
			content.innerHTML += '<ul>' + dong + '</ul>';
			dong = '';
		});
		document.querySelector('#game>ul>li[data-x="' + t.start.x + '"][data-y="' + t.start.y + '"]').classList.add('start');
		document.querySelector('#game>ul>li[data-x="' + t.start.x + '"][data-y="' + t.start.y + '"]').classList.add('here');
		document.querySelector('#game>ul>li[data-x="' + t.end.x + '"][data-y="' + t.end.y + '"]').classList.add('end');
	},
	runTimer: function()
	{
		let t = this;
	    var timer = t.time, minutes, seconds, display = document.getElementById('time');
	    let inter = setInterval(() =>
	    {
	        minutes = parseInt(timer / 60, 10);
	        seconds = parseInt(timer % 60, 10);

	        minutes = minutes < 10 ? "0" + minutes : minutes;
	        seconds = seconds < 10 ? "0" + seconds : seconds;

	        if(minutes >= 0 && seconds >= 0)
	        	display.textContent = minutes + ":" + seconds;

	        if(minutes == 0 && seconds == 0)
	       	{
	       		t.win = false;
	       		alert('Bạn đã thua! Vui lòng xem lại đường đi để thắng.');
	       		document.querySelector('#game>ul>li[data-x="' + t.current.x + '"][data-y="' + t.current.y + '"]').classList.remove('here');
	       		document.getElementById('setting').classList.remove('hidden');
	       		document.getElementById('startgame').classList.add('hidden');
				t.runGiaiThuat();
	    		clearInterval(inter);
	       	}

	        if (--timer < 0)
	            timer = t.time;
	    }, 1000);
	},
	newGame: function()
	{
		document.getElementById('new').onclick = () =>
		{
			let t = this;

			let rand = document.getElementById('random'), size = document.getElementById('size');

			if(!isNaN(parseInt(size.value)))
			{
				t.limit = parseInt(size.value);
			}

			if(t.limit < 5 || t.limit > 25)
			{
				alert('Vui lòng nhập kích thước mê cung >= 5 và <= 25');
				return false;
			}

			t.createArray();

			if(rand.value == '1')
			{
				t.randomArray();
			}

			t.outputArray();

			if(rand.value == '0')
			{
				const point = document.querySelectorAll('#game>ul>li[data-val="0"]');
				point.forEach(function(item, index)
				{
					item.onclick = () => 
					{

						if(t.array[item.dataset.y-1][item.dataset.x-1] == 1)
							t.array[item.dataset.y-1][item.dataset.x-1] = 0;
						else
							t.array[item.dataset.y-1][item.dataset.x-1] = 1;

						console.log("vitri = (" + item.dataset.x + "," + item.dataset.y + ")");
						item.classList.toggle('stop');
					};
				});
			}

			document.getElementById('menu').classList.add('hidden');
			document.getElementById('controller').classList.remove('hidden');
			document.getElementById('game').classList.remove('hidden');
		};

	},
	runGiaiThuat: function()
	{
		let t = this;

		t.reset();

		let opt = document.getElementById('option');

		if(opt.value == "")
		{
			alert("Vui lòng chọn giải thuật!");
			return false;
		}
		
		let step = (opt.value == 'dfs' ? t.DFS(t.start) : t.BFS(t.start));

		if(t.success == false)
		{
			alert("Mê cung không có đường để đi!");
			return false;
		}

		console.log(step);
		console.log(t.chuaxet);

		step = t.loTrinh(step);

		step.forEach(function(item, index)
		{
			setTimeout(() =>
			{
				if(step[index-1] !== undefined)
				{
					let active = document.querySelector('#game>ul>li[data-x="' + step[index-1].x + '"][data-y="' + step[index-1].y + '"]');
					active.classList.add('active');
					active.classList.remove('here');
				}
				document.querySelector('#game>ul>li[data-x="' + item.x + '"][data-y="' + item.y + '"]').classList.add('here');
				if(item.x == t.end.x && item.y == t.end.y)
					t.win = true;
			}, 200*index);
		});
	},
	run: function()
	{
		let t = this;
		document.getElementById('test').onclick = () =>
		{
			t.runGiaiThuat();
		};
		document.getElementById('reset').onclick = () =>
		{
			window.location.reload();
		};
		document.getElementById('run').onclick = () =>
		{
			let opt = document.getElementById('option');

			if(opt.value == "")
			{
				alert("Vui lòng chọn giải thuật!");
				return false;
			}

			if(t.win == false)
			{
				alert('Lượt chơi chưa kết thúc!');
				return false;
			}
			t.current = {x: 1, y: 1};
			alert('Nhấn nút [w], [S], [A], [D] để di chuyển player!');
			t.outputArray();
			document.getElementById('setting').classList.toggle('hidden');
			document.getElementById('startgame').classList.toggle('hidden');
			game.runTimer();
			window.onkeypress = (e) =>
			{
				if(t.win == false)
					return false;

				if(e.code == "KeyA" && (t.current.x - 1) > 0 && this.stopPoint({x: (t.current.x - 1), y: t.current.y}) == false)
				{
					document.querySelector('#game>ul>li[data-x="' + t.current.x + '"][data-y="' + t.current.y + '"]').classList.remove('here');
					t.current = {x: (t.current.x - 1), y: t.current.y};
				}

				if(e.code == "KeyD" && (t.current.x + 1) <= this.limit && this.stopPoint({x: (t.current.x + 1), y: t.current.y}) == false)
				{
					document.querySelector('#game>ul>li[data-x="' + t.current.x + '"][data-y="' + t.current.y + '"]').classList.remove('here');
					t.current = {x: (t.current.x + 1), y: t.current.y};
				}

				if(e.code == "KeyW" && (t.current.y - 1) > 0 && this.stopPoint({x: t.current.x, y: (t.current.y - 1)}) == false)
				{
					document.querySelector('#game>ul>li[data-x="' + t.current.x + '"][data-y="' + t.current.y + '"]').classList.remove('here');
					t.current = {x: t.current.x, y: (t.current.y - 1)};
				}

				if(e.code == "KeyS" && (t.current.y + 1) <= this.limit && this.stopPoint({x: t.current.x, y: (t.current.y + 1)}) == false)	
				{
					document.querySelector('#game>ul>li[data-x="' + t.current.x + '"][data-y="' + t.current.y + '"]').classList.remove('here');
					t.current = {x: t.current.x, y: (t.current.y + 1)};
				}

				document.querySelector('#game>ul>li[data-x="' + t.current.x + '"][data-y="' + t.current.y + '"]').classList.add('here');

				if(t.current.x == t.end.x && t.current.y == t.end.y)
				{
					alert('chúc mừng! bạn đã giành thắng.');
					window.location.reload();
				}
			};
		};
	}
};
game.newGame();
game.run();