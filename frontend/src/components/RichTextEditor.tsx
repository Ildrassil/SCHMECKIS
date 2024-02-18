import {EditorContent, useEditor} from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";


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
                class: "rounded border-none p-4 m-4 min-h-[150px] shadow-doubleOut active:shadow-doubleIn",
            }

        },
        onUpdate({editor}) {
            onChange(editor.getText());
        },
    });
    return (
        <div className="flex flex-col justify-stretch min-h-[250px]">
            <Toolbar editor={editor}/>
            <EditorContent editor={editor}/>
        </div>
    );
}