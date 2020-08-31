// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import * as path from 'path';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "vscode-task-manager" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('vscode-task-manager.openTodoManager', () => {
		// Create and show panel
		const panel = vscode.window.createWebviewPanel(
			'todoManager',
			'Todo Manager',
			vscode.ViewColumn.One,
			{
				enableScripts: true
			}
		);
		// And set its HTML content
		panel.webview.html = getWebviewContent(context);
	});

	context.subscriptions.push(disposable);
}

interface AssetManifest {
    files: {
        'main.js': string;
        'main.css': string;
        'runtime-main.js': string;
        [key: string]: string;
    };
}

function getWebviewContent(context: vscode.ExtensionContext): string {
    const { extensionPath } = context;

    const webviewPath: string = path.join(extensionPath, 'dist', 'webview');
    const assetManifest: AssetManifest = require(path.join(webviewPath, 'asset-manifest.json'));

    const main: string = assetManifest.files['main.js'];
    const styles: string = assetManifest.files['main.css'];
    const runTime: string = assetManifest.files['runtime-main.js'];
    const chunk: string = Object.keys(assetManifest.files).find((key) => key.endsWith('chunk.js')) as string;

    const mainUri: vscode.Uri = vscode.Uri.file(path.join(webviewPath, main)).with({ scheme: 'vscode-resource' });
    const stylesUri: vscode.Uri = vscode.Uri.file(path.join(webviewPath, styles)).with({ scheme: 'vscode-resource' });
    const runTimeMainUri: vscode.Uri = vscode.Uri.file(path.join(webviewPath, runTime)).with({ scheme: 'vscode-resource' });
    const chunkUri: vscode.Uri = vscode.Uri.file(path.join(webviewPath, chunk)).with({ scheme: 'vscode-resource' });

    return `
        <!DOCTYPE html>
        <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Todo Task Manager</title>
                <link rel="stylesheet" type="text/css" href="${stylesUri.toString(true)}">
            </head>
            <body>
                <div id="root"></div>
                <script crossorigin="anonymous" src="${runTimeMainUri.toString(true)}"></script>
                <script crossorigin="anonymous" src="${chunkUri.toString(true)}"></script>
                <script crossorigin="anonymous" src="${mainUri.toString(true)}"></script>
            </body>
        </html>
    `;
}

// this method is called when your extension is deactivated
export function deactivate() {}
