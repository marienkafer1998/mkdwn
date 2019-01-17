import { commands, ExtensionContext, Position, Range, Selection, TextEditor, window, workspace } from 'vscode';

export function activate(context: ExtensionContext) {
    context.subscriptions.push(
        commands.registerCommand('markdown.extension.editing.switchBold', switchBold),
        commands.registerCommand('markdown.extension.editing.switchItalic', switchItalic),
        commands.registerCommand('markdown.extension.editing.switchCodeSpan', switchCodeSpan),
        commands.registerCommand('markdown.extension.editing.switchStrikethrough', switchStrikethrough),
    );
}

function switchBold() {
    return Wrapping('**');
}

function switchItalic() {
    let pointer = workspace.getConfiguration('markdown.extension.italic').get<string>('pointer');
    return Wrapping(pointer);
}

function switchCodeSpan() {
    return Wrapping('`');
}

function switchStrikethrough() {
    return Wrapping('~~');
}


function Wrapping(Pattern: string) {
    //

}

function addPattern(range, text) {
    //to add pattern if selection is not wrapped
}

function deletePattern(range, text) {
    //to delete pattern if selection is wrapped
}

function isWrapped(text, Pattern): boolean {
    return true;
    //is selection is wrapped

}

