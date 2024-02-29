import {EditorContent, generateHTML, JSONContent, useEditor} from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import {Toolbar} from "./ToolBar.tsx";
import {Color} from '@tiptap/extension-color'
import ListItem from '@tiptap/extension-list-item'
import TextStyle from '@tiptap/extension-text-style'


export default function RichTextEditor({
                                           rezeptBeschreibung,
                                           onChange,
                                       }: {
    rezeptBeschreibung: string;
    onChange: (rezeptBeschreibung: JSONContent) => void;

}) {

    const outputHTML = (() => {
        if (rezeptBeschreibung) {

            return generateHTML(JSON.parse(rezeptBeschreibung), [

                    Color.configure({types: [TextStyle.name, ListItem.name]}),
                // @ts-expect-error - starter kit is Libary Example
                    TextStyle.configure({types: [ListItem.name]}),
                    StarterKit.configure({
                        bulletList: {
                            HTMLAttributes: {
                                class: "list-disc"
                            },
                            keepMarks: true,
                            keepAttributes: true, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
                        },
                        orderedList: {
                            HTMLAttributes: {
                                class: "list-decimal"
                            },
                            keepMarks: true,
                            keepAttributes: true, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
                        },
                    }),
                ],
            );
        }
        return "";
    })();
    const editor = useEditor({
        extensions: [
            Color.configure({types: [TextStyle.name, ListItem.name]}),
            // @ts-expect-error - starter kit is Libary Example
            TextStyle.configure({types: [ListItem.name]}),
            StarterKit.configure({
                bulletList: {
                    HTMLAttributes: {
                        class: "list-disc"
                    },
                    keepMarks: true,
                    keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
                },
                orderedList: {
                    HTMLAttributes: {
                        class: "list-disc"
                    },
                    keepMarks: true,
                    keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
                },
            }),
        ],
        content: outputHTML,
        editorProps: {
            attributes: {
                class: "rounded border-none p-4 m-5 min-h-[300px] shadow-doubleOut active:shadow-doubleIn",
            }

        },
        onUpdate({editor}) {
            onChange(editor.getJSON());
        },
    });
    return (
        <div
            className="flex flex-col justify-stretch m-5 w-full min-h-[250px] min-w-[300px] overflow-y-scroll">
            <Toolbar editor={editor}/>
            <EditorContent editor={editor}/>
        </div>
    );
}