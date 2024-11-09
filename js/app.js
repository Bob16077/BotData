async function loadGameMenu(gameType) {
    const gameMenu = document.getElementById('game-menu');
    gameMenu.innerHTML = '';

    // Simulate fetching list of game files
    const gameFiles = ['blockhunt.json', 'dragonescape.json']; // Example list; replace with real data if needed

    for (const fileName of gameFiles) {
        const gameData = await fetch(`../data/${gameType}/${fileName}`).then((res) => res.json());

        // Create a game card
        const gameCard = document.createElement('div');
        gameCard.classList.add('game-card');

        // Add image if it exists
        if (gameData.img) {
            const img = document.createElement('img');
            img.src = gameData.img;
            img.alt = gameData.name;
            gameCard.appendChild(img);
        }

        // Display the game name
        const gameName = document.createElement('h2');
        gameName.textContent = gameData.name;
        gameCard.appendChild(gameName);

        // Link to leaderboard page with proper file name format
        const link = document.createElement('a');
        link.href = `game-page.html?type=${gameType}&name=${fileName.replace('.json', '')}`;
        link.textContent = 'View Leaderboard';
        gameCard.appendChild(link);

        gameMenu.appendChild(gameCard);
    }
}

async function loadLeaderboard(gameType, gameFileName) {
    const leaderboardContainer = document.getElementById('leaderboard');
    leaderboardContainer.innerHTML = '';

    const gameData = await fetch(`../data/${gameType}/${gameFileName}.json`).then((res) => res.json());

    // Set page title to game name from JSON
    document.getElementById('game-title').textContent = gameData.name;

    // Display leaderboard entries
    gameData.players.forEach((player, index) => {
        const entry = document.createElement('div');
        entry.classList.add('leaderboard-entry');
        entry.innerHTML = `
        <span class="place">${index + 1}</span>
        <span class="username">${player.username}</span>
        <span class="score">${player.score}</span>
      `;
        leaderboardContainer.appendChild(entry);
    });
}
