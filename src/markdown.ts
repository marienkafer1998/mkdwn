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
    return wrapSelection('**');
}

function switchItalic() {
    let pointer = workspace.getConfiguration('markdown.extension.italic').get<string>('pointer');
    return wrapSelection(pointer);
}

function switchCodeSpan() {
    return wrapSelection('`');
}

function switchStrikethrough() {
    return wrapSelection('~~');
}

function wrapSelection(Pattern: string) {

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
            return wrapping(editor, cursor, wordRange, false, Pattern);
            
        } else { // Text is selected
            return wrapping(editor, cursor, selection, true, Pattern);
        }
    }
}

function wrapping(editor, cursor, range, isSelected, Pattern)
 {
    let promise: Thenable<boolean>;
    let text = editor.document.getText(range);
    let newCursor: Position;

    if (isWrapped(text, Pattern)) {
        // delete patterns from selection     
        promise = replaceText(range, text.substr(Pattern.length, text.length - Pattern.length - Pattern.length));
    }
    else {
        // add patterns around selection
        promise = replaceText(range, Pattern + text + Pattern);
    }
    return promise;
}

function replaceText(range, text) {
    let editor = window.activeTextEditor;
    return editor.edit(edit => {
        edit.replace(range, text);
    });
}

function isWrapped(text, Pattern): boolean {     //is selection is wrapped
    return text.startsWith(Pattern) && text.endsWith(Pattern);    
}