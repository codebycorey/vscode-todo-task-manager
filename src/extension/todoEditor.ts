import * as vscode from 'vscode';

export class TodoEditorProvider implements vscode.CustomEditorProvider<any> {
    // onDidChangeCustomDocument()

    private readonly _onDidChangeCustomDocument = new vscode.EventEmitter<vscode.CustomDocumentEditEvent<any>>();
    public readonly onDidChangeCustomDocument = this._onDidChangeCustomDocument.event;

    async openCustomDocument(uri: vscode.Uri, openContext: vscode.CustomDocumentOpenContext, _token: vscode.CancellationToken): Promise<any> {
        // const document: PawDrawDocument = await PawDrawDocument.create(uri, openContext.backupId, {
        //     getFileData: async () => {
        //         const webviewsForDocument = Array.from(this.webviews.get(document.uri));
        //         if (!webviewsForDocument.length) {
        //             throw new Error('Could not find webview to save for');
        //         }
        //         const panel = webviewsForDocument[0];
        //         const response = await this.postMessageWithResponse<number[]>(panel, 'getFileData', {});
        //         return new Uint8Array(response);
        //     }
        // });

        // const listeners: vscode.Disposable[] = [];

        // listeners.push(
        //     document.onDidChange((e) => {
        //         // Tell VS Code that the document has been edited by the use.
        //         this._onDidChangeCustomDocument.fire({
        //             document,
        //             ...e
        //         });
        //     })
        // );

        // listeners.push(
        //     document.onDidChangeContent((e) => {
        //         // Update all webviews when the document changes
        //         for (const webviewPanel of this.webviews.get(document.uri)) {
        //             this.postMessage(webviewPanel, 'update', {
        //                 edits: e.edits,
        //                 content: e.content
        //             });
        //         }
        //     })
        // );

        // document.onDidDispose(() => disposeAll(listeners));

        return '';
    }

    async resolveCustomEditor(document: any, webviewPanel: vscode.WebviewPanel, _token: vscode.CancellationToken): Promise<void> {
        // Add the webview to our internal set of active webviews
        // this.webviews.add(document.uri, webviewPanel);

        // // Setup initial content for the webview
        // webviewPanel.webview.options = {
        //     enableScripts: true
        // };
        // webviewPanel.webview.html = this.getHtmlForWebview(webviewPanel.webview);

        // webviewPanel.webview.onDidReceiveMessage((e) => this.onMessage(document, e));

        // // Wait for the webview to be properly ready before we init
        // webviewPanel.webview.onDidReceiveMessage((e) => {
        //     if (e.type === 'ready') {
        //         if (document.uri.scheme === 'untitled') {
        //             this.postMessage(webviewPanel, 'init', {
        //                 untitled: true
        //             });
        //         } else {
        //             this.postMessage(webviewPanel, 'init', {
        //                 value: document.documentData
        //             });
        //         }
        //     }
        // });
    }

    public saveCustomDocument(document: any, cancellation: vscode.CancellationToken): Thenable<void> {
        return document.save(cancellation);
    }

    public saveCustomDocumentAs(document: any, destination: vscode.Uri, cancellation: vscode.CancellationToken): Thenable<void> {
        return document.saveAs(destination, cancellation);
    }

    public revertCustomDocument(document: any, cancellation: vscode.CancellationToken): Thenable<void> {
        return document.revert(cancellation);
    }

    public backupCustomDocument(
        document: any,
        context: vscode.CustomDocumentBackupContext,
        cancellation: vscode.CancellationToken
    ): Thenable<vscode.CustomDocumentBackup> {
        return document.backup(context.destination, cancellation);
    }
}
