'use strict';

var obsidian = require('obsidian');
var state = require('@codemirror/state');
var view = require('@codemirror/view');
var language = require('@codemirror/language');

class SettingsTab extends obsidian.PluginSettingTab {
    plugin;
    constructor(app, plugin) {
        super(app, plugin);
        this.plugin = plugin;
    }
    arrayMove(arr, fromIndex, toIndex) {
        if (toIndex < 0 || toIndex === arr.length) {
            return;
        }
        const element = arr[fromIndex];
        arr[fromIndex] = arr[toIndex];
        arr[toIndex] = element;
    }
    addRegexSettings() {
        let desc = document.createDocumentFragment();
        desc.append('Custom Regex for specifying patterns to conceal/replace.', desc.createEl('br'), 'Check the ', desc.createEl('a', {
            href: 'https://github.com/mattcoleanderson/obsidian-dynamic-text-concealer/discussions/19',
            text: 'List of community made regex',
        }), ' Discussion for working examples. Feel free to add your own as well.');
        new obsidian.Setting(this.containerEl).setHeading().setName('Regular Expressions').setDesc(desc);
        this.plugin.settings.regexp.forEach((regex, index) => {
            const setting = new obsidian.Setting(this.containerEl)
                .addText((text) => {
                text.setValue(regex).onChange((newRegex) => {
                    if (newRegex && this.plugin.settings.regexp.contains(newRegex)) {
                        // TODO: Log Error
                        return;
                    }
                    this.plugin.settings.regexp[index] = newRegex;
                    this.plugin.saveSettings();
                    this.plugin.updateEditorExtension();
                });
            })
                .addExtraButton((button) => {
                button
                    .setIcon('up-chevron-glyph')
                    .setTooltip('Move up')
                    .onClick(() => {
                    console.log('Oh No!');
                    this.arrayMove(this.plugin.settings.regexp, index, index - 1);
                    this.plugin.saveSettings();
                    this.display();
                    this.plugin.updateEditorExtension();
                });
            })
                .addExtraButton((button) => {
                button
                    .setIcon('down-chevron-glyph')
                    .setTooltip('Move down')
                    .onClick(() => {
                    this.arrayMove(this.plugin.settings.regexp, index, index + 1);
                    this.plugin.saveSettings();
                    this.display();
                    this.plugin.updateEditorExtension();
                });
            })
                .addExtraButton((button) => {
                button
                    .setIcon('cross')
                    .setTooltip('Delete')
                    .onClick(() => {
                    this.plugin.settings.regexp.splice(index, 1);
                    this.plugin.saveSettings();
                    this.plugin.updateEditorExtension();
                    this.display();
                });
            });
            setting.infoEl.remove();
            setting.controlEl.firstElementChild?.addClass('dtc-setting');
        });
        new obsidian.Setting(this.containerEl).addButton((button) => {
            button
                .setButtonText('Add new regular expression')
                .setCta()
                .onClick(() => {
                this.plugin.settings.regexp.push('');
                this.plugin.saveSettings();
                this.display();
            });
        });
    }
    async display() {
        // This is the outtermost HTML element on the setting tab
        const { containerEl } = this;
        containerEl.empty();
        // new Setting(containerEl)
        // 	.setName('Conceal in Editing Mode')
        // 	.setDesc(
        // 		`Matched text is concealed in editing mode (live preview),
        // 		 except when cursor or selection overlaps with matched text.`,
        // 	)
        // 	.addToggle((toggle) =>
        // 		toggle.setValue(this.plugin.settings.doConcealEditMode).onChange(async (value) => {
        // 			this.plugin.settings.doConcealEditMode = value;
        // 			await this.plugin.saveSettings();
        // 			this.plugin.updateEditorExtension();
        // 		}),
        // 	);
        // this.setupMatchTable();
        this.addRegexSettings();
    }
}

class ConcealMatchDecorator extends view.MatchDecorator {
    lastSelectionFrom;
    lastSelectionTo;
    updateDeco(update, deco) {
        let updateFrom;
        let updateTo;
        if (update.docChanged) {
            ({ updateFrom, updateTo } = this.updateChanges(update));
        }
        else if (update.selectionSet) {
            ({ updateFrom, updateTo } = this.updateSelection(update));
        }
        if (updateTo && updateFrom && updateTo - updateFrom <= 1000) {
            return this['updateRange'](update.view, deco.map(update.changes), updateFrom, updateTo);
        }
        else if (update.viewportChanged) {
            return this.createDeco(update.view);
        }
        return deco;
    }
    updateChanges(update) {
        let updateFrom = 1e9;
        let updateTo = -1;
        update.changes.iterChanges((_f, _t, from, to) => {
            if (to > update.view.viewport.from && from < update.view.viewport.to) {
                updateFrom = update.state.doc.lineAt(Math.min(from, updateFrom)).from;
                updateTo = update.state.doc.lineAt(Math.max(to, updateTo)).to;
            }
        });
        return { updateFrom, updateTo };
    }
    /*
     * updateSelection returns a range to update when a selection has been made
     * to the document, suchas a moving the cursor of selecting multiple character and line
     */
    updateSelection(update) {
        const selection = update.state.selection.ranges;
        // Get the earliest and latest positon of the lines in the selected range
        let lineFrom = update.state.doc.lineAt(selection[0].from).from;
        let lineTo = update.state.doc.lineAt(selection[selection.length - 1].to).to;
        // Return the earliest and latest postions of the current and previous selection range
        let updateFrom = Math.min(lineFrom, this.lastSelectionFrom);
        let updateTo = Math.max(lineTo, this.lastSelectionTo);
        // Retain the current selected range for the next update
        this.lastSelectionFrom = lineFrom;
        this.lastSelectionTo = lineTo;
        return { updateFrom, updateTo };
    }
}

class ConcealViewPlugin {
    decorations; // list of current decorators in view
    matchDecorator; // Creates and updates decorators
    constructor(view$1, regexp) {
        this.matchDecorator = new ConcealMatchDecorator({
            regexp: regexp,
            decorate: (add, from, to, match, view$1) => {
                // Define conditions where a decorator should not be added for a match
                if (this.isCodeblock(view$1, from, to))
                    return;
                if (this.selectionAndRangeOverlap(view$1.state.selection, from, to))
                    return;
                // Add mark decorator for each capture group in regex
                for (let i = 1; i < match.length; i++) {
                    if (!match.indices)
                        continue;
                    // Call function to add decorator to DecorationSet for each capture group
                    const startPos = from + (match.indices[i][0] - match.index);
                    const finalPos = from + (match.indices[i][1] - match.index);
                    add(startPos, finalPos, view.Decoration.mark({ class: 'dtc-hide-match' }));
                }
            },
        });
        // Initialize the DecoratorSet if not in source mode
        this.decorations = this.initializeDecorations(view$1);
    }
    /**
     * isCodeblock returns true if the current current matches
     * from and to position contains a code block
     */
    isCodeblock(view, from, to) {
        let isCodeblock = false;
        language.syntaxTree(view.state).iterate({
            from,
            to,
            enter: (node) => {
                if (/^inline-code/.test(node.name) || node.name == 'HyperMD-codeblock_HyperMD-codeblock-bg') {
                    isCodeblock = true;
                    return false; // short circuit child iteration
                }
            },
        });
        return isCodeblock;
    }
    /**
     * selectionAndRangeOverlap returns true if the specified range
     * overlaps with the current cursor location or selection range
     */
    selectionAndRangeOverlap(selection, rangeFrom, rangeTo) {
        for (const range of selection.ranges) {
            if (range.from <= rangeTo && range.to >= rangeFrom) {
                return true;
            }
        }
        return false;
    }
    update(update) {
        const isSourceMode = !update.state.field(obsidian.editorLivePreviewField);
        // TODO: Make this a state field
        const isEditorLayoutChanged = update.transactions.some((t) => t.effects.some((e) => e.is(workspaceLayoutChangeEffect)));
        // Reinitialize Decorations if sourc mode or recetly switch back to Live Preview
        if (isSourceMode || isEditorLayoutChanged) {
            this.decorations = this.initializeDecorations(update.view);
            return;
        }
        // Update DecorationSet with MatchDecorator
        this.decorations = this.matchDecorator.updateDeco(update, this.decorations);
    }
    destroy() { }
    /**
     * Initializes DecorationSet. Is disabled if the editor is in source mode.
     */
    initializeDecorations(view$1) {
        return view$1.state.field(obsidian.editorLivePreviewField) ? this.matchDecorator.createDeco(view$1) : view.Decoration.none;
    }
}
const pluginSpec = {
    decorations: (instance) => instance.decorations,
};
/**
 * concealViewPlugin creates a ViewPlugin to be registers as an editorExtension
 */
const concealViewPlugin = (regexp) => {
    return view.ViewPlugin.define((view) => new ConcealViewPlugin(view, regexp), pluginSpec);
};
/**
 * A state effect that represents the workspace's layout change.
 * Mainly intended to detect when the user switches between live preview and source mode.
 */
const workspaceLayoutChangeEffect = state.StateEffect.define();

class ConcealPostProcessor {
    regexp;
    ELEMENTS_TO_PROCESS = 'p, li';
    REGEX_CURLY_REPLACEMENT = '$<answer>'; // first capture group; content is not concealed
    constructor(regexp) {
        this.regexp = regexp;
    }
    conceal = (element) => {
        // InnterHTML is the only way to preserve element tags during the regex matches.
        // However, since the replaced text is a capture group, only text in the document itself can cause a replacement
        let resultString = '';
        let prevFinalPos = 0;
        let match;
        while ((match = this.regexp.exec(element.innerHTML)) !== null) {
            for (let i = 1; i < match.length; i++) {
                if (!match.indices)
                    continue;
                const replacement = `<span class="dtc-hide-match">${match[i]}</span>`;
                const startPos = match.indices[i][0];
                const finalPos = match.indices[i][1];
                resultString += element.innerHTML.substring(prevFinalPos, startPos).concat(replacement);
                prevFinalPos = finalPos;
            }
        }
        if (resultString.length > 0) {
            element.innerHTML = resultString;
        }
    };
    // markdownPostProcessor manipulates the DOM of
    // read mode to conceal clozure syntax
    process = (htmlElement) => {
        const elements = htmlElement.querySelectorAll(this.ELEMENTS_TO_PROCESS);
        // Loop through each element
        elements.forEach((element) => {
            this.conceal(element);
        });
    };
}

// Settings
const DEFAULT_SETTINGS = {
    doConcealEditMode: true,
    regexp: ['({{1,2}(?![\\s{])(?:c?\\d+(?::{1,2}|\\|))?)(?:[^}]+)(}{1,2})'],
    enable: true,
};
class DynamicTextConcealPlugin extends obsidian.Plugin {
    settings;
    editorExtensions = [];
    async loadSettings() {
        this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
    }
    async saveSettings() {
        await this.saveData(this.settings);
    }
    addEditorExtension() {
        this.editorExtensions.length = 0;
        if (this.settings.doConcealEditMode) {
            this.settings.regexp.forEach((regexString) => {
                if (!regexString)
                    return; // skip if input is empty
                // Create regex expression from user settings
                // Note: the 'd' flag, enables regexpmatch indices for enabling clickable replacement text
                //			 see: https://github.com/tc39/proposal-regexp-match-indices?tab=readme-ov-file#motivations
                const regex = new RegExp(regexString, 'gmd');
                this.editorExtensions.push(concealViewPlugin(regex));
            });
        }
    }
    updateEditorExtension() {
        this.addEditorExtension();
        this.app.workspace.updateOptions();
    }
    addEvents() {
        if (this.settings.doConcealEditMode) {
            // TODO: Add obsidian typing for EditorView to Editor
            // See :
            //	- https://docs.obsidian.md/Plugins/Editor/Communicating+with+editor+extensions
            //	- https://github.com/blacksmithgu/obsidian-dataview/pull/2088/files
            this.registerEvent(this.app.workspace.on('layout-change', () => {
                this.app.workspace.iterateAllLeaves((leaf) => {
                    if (leaf.view instanceof obsidian.MarkdownView &&
                        // @ts-expect-error, not typed
                        leaf.view.editor.cm) {
                        // @ts-expect-error, not typed
                        const cm = leaf.view.editor.cm;
                        cm.dispatch({
                            effects: workspaceLayoutChangeEffect.of(null),
                        });
                    }
                });
            }));
        }
    }
    addMarkdownPostProcessor() {
        this.settings.regexp.forEach((regexString) => {
            const regex = new RegExp(regexString, 'gmd'); // create regex expression from user settings
            const concealPostProcessor = new ConcealPostProcessor(regex);
            this.registerMarkdownPostProcessor(concealPostProcessor.process);
        });
    }
    async onload() {
        await this.loadSettings();
        console.log('Loading Dynamic Text Conceal Plugin');
        this.addMarkdownPostProcessor();
        this.addEditorExtension();
        this.registerEditorExtension(this.editorExtensions);
        this.addEvents();
        this.addSettingTab(new SettingsTab(this.app, this));
    }
    // Releases any resources configured by the plugin
    onunload() {
        console.log('Unloading Dynamic Text Conceal Plugin...');
    }
}

module.exports = DynamicTextConcealPlugin;


/* nosourcemap */