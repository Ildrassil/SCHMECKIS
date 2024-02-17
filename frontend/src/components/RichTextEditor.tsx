import {EditorContent, useEditor} from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import {Toolbar} from "./ToolBar.tsx";


export default function RichTextEditor({
                                           rezeptBeschreibung,
                                           onChange,
                                       }: {
    rezeptBeschreibung: string;
    onChange: (rezeptBeschreibung: string) => void;

}) {
    const editor = useEditor({
        extensions: [StarterKit.configure()],
        content: rezeptBeschreibung,
        editorProps: {
            attributes: {
                class: "rounded border-none p-4 m-4 min-h-[300px] shadow-doubleOut active:shadow-doubleIn",
            }

        },
        onUpdate({editor}) {
            onChange(editor.getHTML().toString());
        },
    });
    return (
        <div className="flex flex-col justify-stretch min-h-[250px] min-w-[300px] overflow-y-scroll">
            <Toolbar editor={editor}/>
            <EditorContent editor={editor}/>
        </div>
    );
}