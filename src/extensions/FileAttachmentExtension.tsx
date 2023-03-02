import { CustomText, FilePicker, NewCheckbox, VStack } from '@carta/ink';
import React, { ComponentType } from 'react';
import {
    DOMCompatibleAttributes,
    ExtensionTag,
    ExtensionTagType,
    NodeExtension,
    NodeExtensionSpec,
} from 'remirror';
import { NodeViewComponentProps } from '@remirror/react';

/**
 * This is the html that will be rendered in the editor.
 * Remirror will parse this html and replace it with the ReactComponent.
 *
 * @param id
 * @param communicationId
 */
export const getAttachmentModuleHtml = (id: number, communicationId: number) =>
    `<div data-id="${id}" data-communication-id="${communicationId}"/>`;

export class FileAttachmentExtension extends NodeExtension {
    get name() {
        return 'fileAttachment' as const;
    }

    /**
     * The React component that will be rendered in the editor.
     * The parseDom function in the nodeSpec will parse attributes from the html
     * and pass them in the `node` prop to this component.
     * @param node NodeWithAttributes
     */
    ReactComponent: ComponentType<NodeViewComponentProps> = ({ node }) => {
        // TODO: The styling is failing on the Ink component - possibly conflicting with the styles from Remirror

        const { id, communicationId } = node.attrs;
        return (
            <VStack>
                <CustomText weight="bold">Attachment</CustomText>
                <FilePicker id={id} size="full" />
                <NewCheckbox
                    id="watermark-checkbox"
                    label="Add watermark to attachment"
                />
                <NewCheckbox
                    id="nda-checkbox"
                    label="Request recipients to acknowledge confidentiality"
                />
            </VStack>
        );
    };

    createTags(): ExtensionTagType[] {
        return [ExtensionTag.Block];
    }

    createNodeSpec(): NodeExtensionSpec {
        return {
            draggable: true,
            selectable: true,
            atom: true,
            isolating: true,
            attrs: {
                id: { default: null },
                communicationId: { default: null },
            },
            content: 'block*',
            // Takes a node and converts it to a DOM element with the correct attributes
            toDOM: (node) => {
                const attrs: DOMCompatibleAttributes = {
                    'data-id': node.attrs.id,
                    'data-communication-id': node.attrs.communicationId,
                };
                return ['div', attrs];
            },
            // Defines how the DOM element is parsed back into a node
            parseDOM: [
                {
                    attrs: {
                        id: { default: null },
                        communicationId: { default: null },
                    },
                    // Any div element with a data-id attribute will be parsed into this node
                    // (and later rendered as the ReactComponent)
                    // This of this 'tag' as the matcher
                    tag: `div[data-id]`,
                    getAttrs: (dom) => {
                        const node = dom as HTMLElement;
                        const id = node.getAttribute('data-id');
                        const communicationId = node.getAttribute(
                            'data-communication-id',
                        );
                        return {
                            id,
                            communicationId,
                        };
                    },
                },
            ],
        };
    }
}
