const vscode = require('vscode');
const express = require('express');
const { getWebviewContent } = require('./webview/webviewContent');
const { getInitialData } = require('./webview/dataUtils');
const { getMilestoneWebviewContent } = require('./webview/webview1Content');
// main code
let submissionData;
let currentPanel;


function activate(context) {
    console.log('Congratulations, your extension "deepflow" is now active!');

    // Retrieve submission data from global state or initialize it
    submissionData = context.globalState.get('submissionData') || getInitialData();

    

    function updateSubmissionData() {
        const today = new Date().toDateString();
        if (submissionData[today]) {
            submissionData[today]++;
        } else {
            submissionData[today] = 1;
        }

        // Save updated data to global state
        context.globalState.update('submissionData', submissionData);

        // Notify user of successful submission with buttons
        vscode.window.showInformationMessage(
            "Submission successful!",
            "Show Graph",
            "Show Milestones"
        ).then(selection => {
            if (selection === "Show Graph") {
                vscode.commands.executeCommand('deepflow.showGraph');
            } else if (selection === "Show Milestones") {
                vscode.commands.executeCommand('deepflow.showMilestones');
            }
        });

        // Update the webview if it's open
        if (currentPanel) {
            currentPanel.webview.html = getWebviewContent(submissionData);
        }
    }

    // Start tracking submissions immediately
    context.subscriptions.push(vscode.workspace.onDidSaveTextDocument(updateSubmissionData));

    // Register a command to show the graph in a webview
    const showGraphCommand = vscode.commands.registerCommand('deepflow.showGraph', () => {
        if (currentPanel) {
            currentPanel.reveal(vscode.ViewColumn.One);
        } else {
            currentPanel = vscode.window.createWebviewPanel(
                'submissionGraph',
                'DeepFlow',
                vscode.ViewColumn.One,
                { enableScripts: true }
            );

            currentPanel.webview.html = getWebviewContent(submissionData);

            currentPanel.onDidDispose(() => {
                currentPanel = undefined;
            }, null, context.subscriptions);
        }
    });

    // Register the command to show the milestone webview
    const showMilestoneCommand = vscode.commands.registerCommand('deepflow.showMilestones', () => {
        const milestonePanel = vscode.window.createWebviewPanel(
            'milestoneInfo',
            'Submission Milestones',
            vscode.ViewColumn.Two,
            { enableScripts: true }
        );

        milestonePanel.webview.html = getMilestoneWebviewContent(submissionData);
    });

    context.subscriptions.push(showGraphCommand, showMilestoneCommand);
}

function deactivate() {}

module.exports = {
    activate,
    deactivate
};
