import {EditorContent, JSONContent, useEditor} from "@tiptap/react";
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
    const editor = useEditor({
        extensions: [
            Color.configure({types: [TextStyle.name, ListItem.name]}),
            TextStyle.configure({types: [ListItem.name]}),
            StarterKit.configure({
                bulletList: {
                    keepMarks: true,
                    keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
                },
                orderedList: {
                    keepMarks: true,
                    keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
                },
            }),
        ],
        content: "",
        editorProps: {
            attributes: {
                class: "rounded border-none p-4 m-5 min-h-[300px] shadow-doubleOut active:shadow-doubleIn",
            }

        },
        onUpdate({editor}) {
            onChange(editor.getJSON());
            console.log(editor.getJSON());
        },
    });
    return (
        <div
            className="flex flex-col justify-stretch text-center m-5 w-full min-h-[250px] min-w-[300px] overflow-y-scroll">
            <Toolbar editor={editor}/>
            <EditorContent editor={editor}/>
        </div>
    );
}