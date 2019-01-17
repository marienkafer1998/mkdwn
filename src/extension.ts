import { ExtensionContext } from 'vscode';
import * as markdown from './markdown';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: ExtensionContext) {
	markdown.activate(context);
}

// this method is called when your extension is deactivated
export function deactivate() {}
