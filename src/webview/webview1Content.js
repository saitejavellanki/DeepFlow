function getMilestoneWebviewContent(submissionData) {
    // Define milestone thresholds and titles, with background images for each arena
    const milestones = [
        { title: 'Rookie', threshold: 100, background: 'url("https://example.com/rookie-bg.jpg")' },
        { title: 'Pro', threshold: 500, background: 'url("https://example.com/pro-bg.jpg")' },
        { title: 'Expert', threshold: 1500, background: 'url("https://example.com/expert-bg.jpg")' },
        { title: 'Master', threshold: 2500, background: 'url("https://example.com/master-bg.jpg")' },
        { title: 'Knight', threshold: 3500, background: 'url("https://example.com/knight-bg.jpg")' },
        { title: 'Emperor', threshold: 5000, background: 'url("https://example.com/emperor-bg.jpg")' },
        { title: 'Titan', threshold: 10000, background: 'url("https://example.com/titan-bg.jpg")' }
    ];

    // Determine total submissions
    const totalSubmissions = Object.values(submissionData).reduce((a, b) => a + b, 0);
    
    // Generate HTML for earned milestones
    const earnedBadges = milestones
        .filter(milestone => totalSubmissions >= milestone.threshold)
        .map(milestone => `
            <div class="milestone" style="background-image: ${milestone.background};">
                <div class="milestone-info">
                    <h3>${milestone.title}</h3>
                    <p>${milestone.threshold} Submissions</p>
                    <div class="progress-bar">
                        <div class="progress" style="width: ${Math.min(100, (totalSubmissions / milestone.threshold) * 100)}%;"></div>
                    </div>
                </div>
            </div>
        `).join('');

    // Return the HTML content with enhanced styling and animations
    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Submission Milestones</title>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@500&display=swap');
        body {
            font-family: 'Orbitron', sans-serif;
            color: #f0f0f0;
            padding: 20px;
            background: linear-gradient(90deg, rgba(0,0,0,1) 17%, rgba(199,13,13,1) 100%, rgba(0,212,255,1) 100%);
            background-size: cover;
            background-position: center;
            background-attachment: fixed;
        }
        h2 {
            text-align: center;
            color: #FFA500;
            font-size: 2.5rem;
            text-shadow: 0 0 10px #FFA500, 0 0 20px #FFA500;
        }
        .milestone-container {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 20px;
        }
        .milestone {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            background-size: cover;
            background-position: center;
            padding: 30px;
            border-radius: 15px;
            box-shadow: 0 0 15px rgba(255, 215, 0, 0.6);
            width: 100%;
            max-width: 250px;
            height: 50px;
            text-align: center;
            animation: fadeIn 1s ease-in-out;
        }
        .milestone-info h3 {
            margin: 0;
            color: #FFF;
            font-size: 1.8rem;
            text-shadow: 0 0 5px #FFF;
            margin-bottom: 5px;
        }
        .milestone-info p {
            margin: 0;
            color: #ffffff;
            font-size: 1.3rem;
        }
        .progress-bar {
            background-color: rgba(255, 255, 255, 0.3);
            border-radius: 10px;
            width: 100%;
            height: 10px;
            margin-top: 10px;
            overflow: hidden;
        }
        .progress {
            height: 100%;
            background-color: #00FF00;
            transition: width 0.5s ease-in-out;
        }
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
    </style>
</head>
<body>
    <h2>Badges</h2>
    <div class="milestone-container">
        ${earnedBadges || '<p>No milestones achieved yet.</p>'}
    </div>
</body>
</html>`;
}

module.exports = {
    getMilestoneWebviewContent
};
