import { useActive, useChainedCommands, useHelpers } from '@remirror/react';
import { Button, CustomText, HStack } from '@carta/ink';
import { useCallback } from 'react';

export const TopToolbar = () => {
    const active = useActive();
    const { getJSON } = useHelpers();
    const chain = useChainedCommands();

    const handleSaveClick = useCallback(() => {
        console.log(JSON.stringify(getJSON()));
    }, [getJSON]);

    return (
        <HStack align="distributed">
            <HStack spacing="xsmall">
                <Button
                    size="small"
                    type={active.bold() ? 'primary' : 'default'}
                    onClick={() => chain.toggleBold().focus().run()}
                >
                    B
                </Button>
                <Button
                    size="small"
                    type={active.italic() ? 'primary' : 'default'}
                    onClick={() => chain.toggleItalic().focus().run()}
                >
                    I
                </Button>
            </HStack>
            <Button size="small" type="primary" onClick={handleSaveClick}>
                Save Draft
            </Button>
        </HStack>
    );
};
