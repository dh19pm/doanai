<!DOCTYPE html>
<html>
<head>
	<title>Demo Game</title>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	<meta name="viewport" content="width=device-width, initial-scale=1" />
	<link href="./assets/app.css?v=<?php echo rand(); ?>" rel="stylesheet" type="text/css" />
</head>
<body>
<div id="menu" class="menu">
	<div class="item-menu">
		<h2>Trò Chơi Mê Cung</h2>
	</div>
	<div class="item-menu" style="text-align: center;">
		<button id="new">Game mới</button>
	</div>
	<div class="item-menu">
		<span>Random mê cung: </span>
		<select id="random">
			<option value="1">Bật</option>
			<option value="0">Tắt</option>
		</select>
	</div>
	<div class="item-menu">
		<span>Kích thước mê cung: </span>
		<input type="text" id="size" value="" placeholder="max 25">
	</div>
	<div class="item-menu" style="text-align: center;">
		<span class="copyright">Đồ án AI nhóm 5</span>
	</div>
</div>
<div id="controller" class="controller hidden">
	<div id="setting">
		<select id="option">
			<option value="">- Chọn giải thuật -</option>
			<option value="bfs">Best-first search</option>
			<option value="dfs">Depth-first search</option>
		</select>
		<button id="test">Test Giải Thuật</button>
		<button id="run">Chơi Ngay</button>
		<button id="reset">Làm Lại</button>
	</div>
	<div id="startgame" class="hidden">
		Thời gian còn lại: <span id="time">00:00</span>
	</div>
</div>
<div id="game" class="hidden"></div>
<script src="./assets/app.js?v=<?php echo rand(); ?>"></script>
</body>
</html>