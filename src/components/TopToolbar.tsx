import {
    BasicFormattingButtonGroup, CreateTableButton,
    DataTransferButtonGroup, HeadingLevelButtonGroup,
    HistoryButtonGroup, ListButtonGroup,
    useHelpers,
} from '@remirror/react';
import { Button, HStack } from '@carta/ink';
import React, { useCallback } from 'react';

export const TopToolbar = () => {
    const { getJSON } = useHelpers();

    const handleSaveClick = useCallback(() => {
        console.log(JSON.stringify(getJSON()));
    }, [getJSON]);

    return (
        <HStack align="distributed">
            <HStack spacing="xsmall">
                <HistoryButtonGroup />
                <DataTransferButtonGroup />
                <HeadingLevelButtonGroup />
                <BasicFormattingButtonGroup />
                <ListButtonGroup>
                <CreateTableButton />
                </ListButtonGroup>
            </HStack>
            <Button size="small" type="primary" onClick={handleSaveClick}>
                Save Draft
            </Button>
        </HStack>
    );
};
