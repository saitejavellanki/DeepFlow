function getWebviewContent(submissionData, badgeData) {
    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Submission Graph</title>
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.0.0-rc.7/html2canvas.min.js"></script>
    <style>
        body {
            margin: 0;
            font-family: Arial, sans-serif;
            background-color: black;
            color: #fff;
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;
            padding: 20px;
        }

        h2 {
            text-align: center;
            margin-bottom: 20px;
            color: #e0e0e0;
        }

        .container {
            display: flex;
            flex-direction: column;
            align-items: center;
            max-width: 100%;
            overflow-x: visible;
        }

        .box-section {
            display: flex;
            flex-direction: row;
            align-items: flex-start;
            max-width: 100%;
            gap: 10px;
            border: 2px solid #e0e0e0;
            padding: 10px;
            border-radius: 10px;
        }

        .grid {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            grid-gap: 3px;
            max-width: 100%;
        }

        .month-label {
            writing-mode: vertical-rl;
            text-orientation: mixed;
            transform: rotate(180deg);
            margin-bottom: 5px;
            font-size: 12px;
            color: #e0e0e0;
        }

        .box {
            width: 13px;
            height: 13px;
            background-color: #3c3c3c;
            border-radius: 3px;
            position: relative;
            transition: background-color 0.3s;
        }

        .box[data-count="1"] { background-color: #d6e685; }
        .box[data-count="2"] { background-color: #8cc665; }
        .box[data-count="3"] { background-color: #44a340; }
        .box[data-count="4"] { background-color: #1e6823; }

        .tooltip {
            position: absolute;
            top: -30px;
            left: 0;
            background-color: rgba(0, 0, 0, 0.8);
            color: #fff;
            padding: 5px;
            border-radius: 3px;
            font-size: 10px;
            white-space: nowrap;
            visibility: hidden;
            transition: visibility 0.2s, opacity 0.2s ease-in-out;
            opacity: 0;
        }

        .box:hover .tooltip {
            visibility: visible;
            opacity: 1;
        }

        .chart-badge-container {
            display: flex;
            flex-direction: row;
            justify-content: center;
            align-items: flex-start;
            gap: 20px;
            width: 100%;
            max-width: 800px;
            margin-top: 20px;
        }

        .chart,
        #badges {
            flex: 1;
            max-width: none;
            width: auto;
        }

        .submission-info {
            margin: 5px 0;
            padding: 10px;
            color: white;
            font-weight: bold;
            border-radius: 5px;
            text-align: center;
        }

        .total-submissions {
            text-align: center;
            font-size: 24px;
            margin-top: 20px;
            padding: 10px;
            background-color: #3c3c3c;
            border-radius: 5px;
            box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
        }

        .badge-container {
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            gap: 10px;
        }

        .badge {
            display: flex;
            flex-direction: column;
            align-items: center;
            text-align: center;
        }

        .badge-name {
            font-size: 12px;
            color: #e0e0e0;
        }

        .hero {
    font-size: 45px;
    margin-top: 10px;
    text-align: center;
    animation: colorChange 2s linear infinite;
}

@keyframes colorChange {
    0% { color: #ff0000; } /* Red */
    25% { color: #00ff00; } /* Green */
    50% { color: #0000ff; } /* Blue */
    75% { color: #ffff00; } /* Yellow */
    100% { color: #ff0000; } /* Back to Red */
}


        .badge-title {
            color: white;
            margin-bottom: 15px;
        }

        .badge-text {
            font-size: 20px;
            color: white;
            margin-top: 10px;
            text-align: center;
        }
            .cta-title {
        font-size: 23px;
        margin-bottom: 10px;
        font-weight: bold;
    }
        .hero1{
        font-size: 30px;
        }

        .milestone-list {
            padding: 25px;
            background-color: black;
            border-radius: 20px;
            box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.3);
            text-align: center;
            font-size: 18px;
            max-width: 250px;
            width: 100%;
        }

        h3 {
            text-align: center;
            font-size: 32px;
            margin-bottom: 30px;
            color: #ffd700;
            text-transform: uppercase;
            letter-spacing: 3px;
        }

        .milestone-item {
            margin-bottom: 10px;
            padding: 5px;
            border-radius: 15px;
            display: flex;
            align-items: center;
            transition: all 0.3s ease;
            background-color: #2a2a2a;
            border: 1px solid #333;
        }

        .milestone-item:hover {
            transform: translateY(-5px);
            box-shadow: 0 15px 25px rgba(255, 215, 0, 0.2);
        }

        .milestone-item i {
            margin-right: 20px;
            color: #ffd700;
            font-size: 24px;
            transition: transform 0.3s ease;
        }

        .milestone-item:hover i {
            transform: rotate(360deg);
        }

        .milestone-text {
            flex-grow: 1;
        }

        .milestone-level {
            font-weight: bold;
            font-size: 20px;
            display: block;
            margin-bottom: 5px;
        }

        .milestone-count {
            font-size: 16px;
            opacity: 0.8;
        }
           
            
        

        @media (max-width: 600px) {
            .box-section {
                
                 display: grid;
            grid-template-columns: repeat(5, 1fr);
            grid-gap: 3px;
            max-width: 100%;
            }

            .month-label {
                writing-mode: horizontal-tb;
                transform: none;
                margin-bottom: 5px;
            }

            .box {
                width: 10px;
                height: 10px;
            }

            .submission-info {
                font-size: 12px;
            }

            .total-submissions {
                font-size: 18px;
            }
        }
            .milestone-pointer {
    position: absolute;
    left: -150px;
    top: 50%;
    transform: translateY(-50%);
    font-size: 24px;
    color: #ffd700;
    display: none; /* Keep hidden by default */
}

.milestone-item.current .milestone-pointer {
    display: block; /* Show when the milestone is current */
}
    </style>
</head>
<body>
    <h2>DeepFlow Extension</h2>

    <div class="container" id="capture-area">
        <div class="box-section" id="grid"></div>

        <div class="chart-badge-container">
            <div class="chart" id="chart">
                <h2>Submission Colors</h2>
                <div class="submission-info" style="background-color: #d6e685;">1 Submission</div>
                <div class="submission-info" style="background-color: #8cc665;">2-5 Submissions</div>
                <div class="submission-info" style="background-color: #44a340;">6-50 Submissions</div>
                <div class="submission-info" style="background-color: #1e6823;">51-100 Submissions</div>
            </div>

            <div id="badges">
                <h2 class="badge-title">Stats</h2>
                <div class="badge-container" id="badge-container"></div>
                <div id="badge-count" class="badge-text">Total Badges: <span id="total-badges"></span></div>
                <div id="active-days-count" class="badge-text">Total Days Active: <span id="total-active-days"></span></div>
                <div id="userLevel1" class="badge-text">User Level: <span id="userLevel" class="hero"></span></div>
                <div class="badge-text" style="font-size: 16px; font-weight: bold; background-color: #444; color: #fff; padding: 10px; border-radius: 5px; margin-top: 10px;">
    To see the Milestones you earned till now, use command <strong>Miles</strong> or shortcut key <strong>Ctrl + Tab</strong>.
</div>
              
                
            </div>
        </div>
    </div>

    <div id="totalSubmissions" class="total-submissions"></div>
    <div class="bug-report">
    <p>If you encounter any issues, please report them to: 
        <a href="mailto:saitejavellan@gmail.com" style="color: blue; text-decoration: underline;">
            saitejavellan@gmail.com
        </a>
    </p>
</div>
<h2 class="cta-title">Become a <span class="hero1">Titan !</span></h2>
    <div class="milestone-list">
            <h3>Milestones</h3>
            <div class="milestone-item" data-threshold="0">
                <span class="milestone-pointer">You are here --></span>
                <i class="fas fa-user-minus">➤</i>
                <div class="milestone-text">
                    <span class="milestone-level">Noob</span>
                    <span class="milestone-count">Less than 10 submissions</span>
                </div>
            </div>
            <div class="milestone-item" data-threshold="10">
                <span class="milestone-pointer">You are here --></span>
                <i class="fas fa-user-tie">➤</i>
                <div class="milestone-text">
                    <span class="milestone-level">Rookie</span>
                    <span class="milestone-count">100 submissions</span>
                </div>
            </div>
            <div class="milestone-item" data-threshold="500">
                <span class="milestone-pointer">You are here --></span>
                <i class="fas fa-user">➤</i>
                <div class="milestone-text">
                    <span class="milestone-level">Pro</span>
                    <span class="milestone-count">500 submissions</span>
                </div>
            </div>
            <div class="milestone-item" data-threshold="1500">
                <span class="milestone-pointer">You are here --></span>
                <i class="fas fa-medal">➤</i>
                <div class="milestone-text">
                    <span class="milestone-level">Expert</span>
                    <span class="milestone-count">1500 submissions</span>
                </div>
            </div>
            <div class="milestone-item" data-threshold="2500">
                <span class="milestone-pointer">You are here --></span>
                <i class="fas fa-trophy">➤</i>
                <div class="milestone-text">
                    <span class="milestone-level">Master</span>
                    <span class="milestone-count">2500 submissions</span>
                </div>
            </div>
            <div class="milestone-item" data-threshold="5000">
                <span class="milestone-pointer">You are here --></span>
                <i class="fas fa-crown">➤</i>
                <div class="milestone-text">
                    <span class="milestone-level">Emperor</span>
                    <span class="milestone-count">5000 submissions</span>
                </div>
            </div>
            <div class="milestone-item" data-threshold="10000">
                <span class="milestone-pointer">You are here --></span>
                <i class="fas fa-globe-asia">➤</i>
                <div class="milestone-text">
                    <span class="milestone-level">Titan</span>
                    <span class="milestone-count">10000 submissions</span>
                </div>
            </div>
        </div>

    <script>
   
        const gridElement = document.getElementById('grid');

        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        const currentDate = new Date();
        const currentYear = currentDate.getFullYear();

        let gridData = formatGridData(${JSON.stringify(submissionData)});
        createGrid(gridData);
        updateTotalSubmissions(${JSON.stringify(submissionData)});
        updateBadges(${JSON.stringify(badgeData)});

        function getDaysInMonth(month, year) {
            return new Date(year, month + 1, 0).getDate();
        }

        function createGrid(data) {
            gridElement.innerHTML = '';
            const yearLabel = document.createElement('div');
            yearLabel.className = 'year-label';
            yearLabel.innerText = currentYear;
            yearLabel.style.textAlign = 'center';
            yearLabel.style.marginBottom = '10px';
            yearLabel.style.fontSize = '18px';
            yearLabel.style.fontWeight = 'bold';
            gridElement.appendChild(yearLabel);

            months.forEach((month, monthIndex) => {
                const monthContainer = document.createElement('div');
                monthContainer.className = 'month-container';

                const monthLabel = document.createElement('div');
                monthLabel.className = 'month-label';
                monthLabel.innerText = month;
                monthContainer.appendChild(monthLabel);

                const monthGrid = document.createElement('div');
                monthGrid.className = 'grid';
                const numberOfDays = getDaysInMonth(monthIndex, currentYear);
                for (let i = 1; i <= numberOfDays; i++) {
                    const box = document.createElement('div');
                    box.className = 'box';
                    const dayIndex = (monthIndex * 31) + (i - 1);
                    const count = data[dayIndex] || 0;
                    box.setAttribute('data-count', getColorCategory(count));
                    const tooltip = document.createElement('div');
                    tooltip.className = 'tooltip';
                    tooltip.innerText = \`\${currentYear}-\${(monthIndex + 1).toString().padStart(2, '0')}-\${i.toString().padStart(2, '0')}: \${count > 0 ? count + ' submission(s)' : 'No submissions'}\`;
                    box.appendChild(tooltip);
                    monthGrid.appendChild(box);
                }
                monthContainer.appendChild(monthGrid);
                gridElement.appendChild(monthContainer);
            });
        }

        function getColorCategory(count) {
            if (count === 0) return "0";
            if (count === 1) return "1";
            if (count >= 2 && count <= 5) return "2";
            if (count >= 6 && count <= 50) return "3";
            return "4"; // 51-100 submissions
        }

        function updateTotalSubmissions(data) {
            const totalSubmissions = Object.values(data).reduce((sum, count) => sum + count, 0);
            document.getElementById('totalSubmissions').innerText = 'Total Submissions: ' + totalSubmissions;
            updateBadgeMilestones(totalSubmissions);
            updateActiveDaysCount(data);
            updateUserLevel(totalSubmissions);
            updateMilestonePointer(totalSubmissions);
        }
            
            function updateMilestonePointer(totalSubmissions) {
                const milestoneItems = document.querySelectorAll('.milestone-item');
                milestoneItems.forEach(item => item.classList.remove('current'));

                let currentMilestone = null;
                for (let i = milestoneItems.length - 1; i >= 0; i--) {
                    const threshold = parseInt(milestoneItems[i].getAttribute('data-threshold'));
                    if (totalSubmissions >= threshold) {
                        currentMilestone = milestoneItems[i];
                        break;
                    }
                }

                if (currentMilestone) {
                    currentMilestone.classList.add('current');
                }
            }

        function formatGridData(data) {
            const formattedData = {};
            for (const date in data) {
                const submissionDate = new Date(date);
                if (submissionDate.getFullYear() === currentYear) {
                    const day = submissionDate.getDate();
                    const month = submissionDate.getMonth();
                    const key = (month * 31) + day;
                    formattedData[key] = data[date];
                }
            }
            return formattedData;
        }

        function updateBadges(badgeData) {
            const badgeContainer = document.getElementById('badge-container');
            badgeContainer.innerHTML = '';  // Clear the container

            let totalBadges = 0;
            badgeData.forEach(badge => {
                const badgeElement = document.createElement('div');
                badgeElement.className = 'badge';
                badgeElement.innerHTML = '<div class="badge-name">' + badge.name + '</div>';
                badgeContainer.appendChild(badgeElement);
                totalBadges++;
            });
            document.getElementById('total-badges').innerText = totalBadges;
        }

        function updateUserLevel(totalBadges) {
            let level = '';

            if (totalBadges < 10) {
                level = 'None';
            } else if (totalBadges < 500) {
                level = 'Rookie';
            } else if (totalBadges < 1500) {
                level = 'Pro';
            } else if (totalBadges < 2500) {
                level = 'Expert';
            }else if (totalBadges < 3500) {
                level = 'Master';
            }else if (totalBadges < 5000) {
                level = 'Knight';
            }else if (totalBadges < 10000) {
                level = 'Emperor';
            }else {
                level = 'TITAN';
            }

            document.getElementById('userLevel').innerText = level;
        }

        function updateActiveDaysCount(data) {
            const activeDays = Object.keys(data).length;
            document.getElementById('total-active-days').innerText = activeDays;
        }

        function updateBadgeMilestones(totalSubmissions) {
            const badgeData = [];

            const badges = [
                { name: 'None', threshold: 10 },
                { name: 'Rookie', threshold: 100 },
                { name: 'Pro', threshold: 500},
                { name: 'Expert', threshold: 1500 },
                 { name: 'Master', threshold: 2500 },
                  { name: 'Emperor', threshold: 5000 },
                   { name: 'Titan', threshold: 10000 },
            ];

            badges.forEach(badge => {
                if (totalSubmissions >= badge.threshold) {
                    badgeData.push(badge);
                }
            });

            updateBadges(badgeData);
        }

        
    </script>
</body>
</html>`;
}

module.exports = {
    getWebviewContent
};