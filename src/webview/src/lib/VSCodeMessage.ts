
declare const acquireVsCodeApi: Function;

interface VSCodeApi {
    getState: () => any;
    setState: (newState: any) => any;
    postMessage: (message: any) => void;
}

class VSCode {
    private readonly vscodeApi: VSCodeApi = acquireVsCodeApi();

    /**
     * Send message to the extension framework.
     * @param message
     */
    public postMessage(message: any): void {
        this.vscodeApi.postMessage(message);
    }

    /**
     * Add listener for messages from extension framework.
     * @param callback called when extensions sends message
     * @returns function to clean up message listener.
     */
    public onMessage(callback: (message: any) => void): () => void {
        window.addEventListener('message', callback);
        return () => window.removeEventListener('message', callback);
    }
}

export const VSCodeMessage: VSCode = new VSCode();
