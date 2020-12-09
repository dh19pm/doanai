<!DOCTYPE html>
<html>
<head>
	<title>Demo AI</title>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	<meta name="viewport" content="width=device-width, initial-scale=1" />
	<link href="./assets/app.css?v=<?php echo rand(); ?>" rel="stylesheet" type="text/css" />
</head>
<body>
<div class="wrapper">
	<div id="game"></div>
	<div class="controller">
		<select id="option">
			<option value="bfs">BFS</option>
			<option value="dfs">DFS</option>
		</select>
		<button id="run">Chạy</button>
	</div>
</div>
<script src="./assets/app.js?v=<?php echo rand(); ?>"></script>
</body>
</html>