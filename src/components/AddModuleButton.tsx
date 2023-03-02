import { Button } from '@carta/ink';
import { useCallback } from 'react';
import { useCommands } from '@remirror/react';
import { getAttachmentModuleHtml } from '../extensions/FileAttachmentExtension';

export const AddModuleButton = () => {
    const commands = useCommands();

    const handleClick = useCallback(() => {
        // switch focus to the editor
        commands.focus();
        // inserts HTML that the editor will parse and replace with the react component
        commands.insertHtml(getAttachmentModuleHtml(1, 2));
    }, [commands]);

    return (
        <Button onClick={handleClick} type="primary" size="mini">
            Add Module
        </Button>
    );
};
