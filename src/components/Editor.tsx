import {
    EditorComponent,
    Remirror,
    ThemeProvider,
    useHelpers,
    useKeymap,
    useRemirror,
} from '@remirror/react';
import { BoldExtension, ItalicExtension } from 'remirror/extensions';
import { VStack } from '@carta/ink';
import React, { useCallback } from 'react';
import { EditorState } from '@remirror/pm';
import { TopToolbar } from './TopToolbar';
import { AllStyledComponent } from '@remirror/styles/styled-components';

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
export const Editor = ({ editable = true }: { editable?: boolean }) => {
    const extensions = useCallback(
        () => [new BoldExtension(), new ItalicExtension()],
        [],
    );

    const { manager, state } = useRemirror({
        extensions,
    });

    // Using the hooks prop to inject functionality that doesn't require rendered elements
    return (
        <AllStyledComponent>
            <ThemeProvider>
                <Remirror
                    manager={manager}
                    initialContent={state}
                    hooks={hooks}
                    editable={editable}
                >
                    {editable && <TopToolbar />}
                    <EditorComponent />
                </Remirror>
            </ThemeProvider>
        </AllStyledComponent>
    );
};
