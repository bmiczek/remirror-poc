import {
    EditorComponent,
    FloatingToolbar,
    FloatingWrapper,
    FormattingButtonGroup,
    HistoryButtonGroup,
    IndentationButtonGroup,
    ListButtonGroup,
    PlaceholderExtension,
    Remirror,
    TableComponents,
    TableExtension,
    ThemeProvider,
    useHelpers,
    useKeymap,
    useRemirror,
} from '@remirror/react';
import {
    DropCursorExtension,
    NodeFormattingExtension,
    wysiwygPreset,
} from 'remirror/extensions';
import React, { useCallback } from 'react';
import { EditorState } from '@remirror/pm';
import { AllStyledComponent } from '@remirror/styles/styled-components';
import { FileExtension } from '@remirror/extension-file';
import { FileAttachmentExtension } from '../extensions/FileAttachmentExtension';
import { AddModuleButton } from './AddModuleButton';

// Hooks can be added to the context without the need for creating custom components
const hooks = [
    () => {
        const { getJSON } = useHelpers();

        const handleSaveShortcut = useCallback(
            ({ state }: { state: Readonly<EditorState> }) => {
                console.log(
                    `Save to backend: ${JSON.stringify(getJSON(state))}`,
                );

                return true; // Prevents any further key handlers from being run.
            },
            [getJSON],
        );

        // "Mod" means platform agnostic modifier key - i.e. Ctrl on Windows, or Cmd on MacOS
        useKeymap('Mod-s', handleSaveShortcut);
    },
];
export const Editor = ({
    placeholder,
    editable = true,
}: {
    placeholder?: string;
    editable?: boolean;
}) => {
    const extensions = useCallback(
        () => [
            new FileAttachmentExtension({ disableExtraAttributes: true }),
            new FileExtension({}),
            new DropCursorExtension(),
            new PlaceholderExtension({ placeholder }),
            new TableExtension(),
            new NodeFormattingExtension(),
            ...wysiwygPreset(),
        ],
        [placeholder],
    );

    const { manager, state } = useRemirror({
        extensions,
    });

    // Using the hooks prop to inject functionality that doesn't require rendered elements
    return (
        <div style={{ position: 'relative' }}>
            <AllStyledComponent>
                <ThemeProvider>
                    <Remirror
                        manager={manager}
                        initialContent={state}
                        hooks={hooks}
                        editable={editable}
                    >
                        <EditorComponent />
                        <TableComponents />
                        {editable && (
                            <FloatingToolbar positioner="selection">
                                <FormattingButtonGroup />
                                <IndentationButtonGroup />
                                <ListButtonGroup />
                                <HistoryButtonGroup />
                            </FloatingToolbar>
                        )}
                        {/* TODO: Figure out why this floating menu isn't rendering on an empty block
                            - it kind of works when using positioner="selection". The goal is for the "Add Module"
                            button to render to the left of the editor when the cursor is on an empty block.
                        */}
                        <FloatingWrapper
                            positioner="emptyBlock"
                            enabled
                            placement="left-start"
                        >
                            <AddModuleButton />
                        </FloatingWrapper>
                        <AddModuleButton />
                    </Remirror>
                </ThemeProvider>
            </AllStyledComponent>
        </div>
    );
};
