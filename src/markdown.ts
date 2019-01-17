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

    let editor = window.activeTextEditor;
    let selections = editor.selections;

    for (let i = 0; i < selections.length; i++) {
        var selection = editor.selections[i];
        let cursor = selection.active;
        //nothing is selected, only cursor
        if (selection.isEmpty) { 
            let wordRange = editor.document.getWordRangeAtPosition(cursor);
            if (wordRange === undefined) {
                wordRange = selection;
            }
            return addPattern(editor, cursor, wordRange, false, Pattern);
            
        } else { // Text is selected
            return addPattern(editor, cursor, selection, true, Pattern);
        }
    }
}


function addPattern(editor, cursor, range, isSelected, Pattern)
 {
    //to add pattern if selection is not wrapped
}

function deletePattern(range, text) {
    //to delete pattern if selection is wrapped
}

function isWrapped(text, Pattern): boolean {
    return true;
    //is selection is wrapped

}

