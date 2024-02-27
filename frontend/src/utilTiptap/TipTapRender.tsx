import {EditorContent, useEditor} from '@tiptap/react'
import StarterKit from "@tiptap/starter-kit";
import {useEffect} from "react";
import {Color} from "@tiptap/extension-color";
import TextStyle from "@tiptap/extension-text-style";
import ListItem from "@tiptap/extension-list-item";


type props = {
    content: string
}


export default function TipTapRender({content}: props) {


    const editor = useEditor({
                extensions: [
                    Color.configure({types: [TextStyle.name, ListItem.name]}),
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
                                class: "list-decimal"
                            },
                            keepMarks: true,
                            keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
                        },
                        heading: {

                            HTMLAttributes: {
                                class: "font-bold text-center justify-center text-textHeader ml-4"
                            },
                        },

                    }),

        ],
        editable: false,
        content: content,
        editorProps: {
            attributes: {
                class: "rounded bg-transparent border-none p-4 m-4 min-h-[300px] shadow-doubleOut active:shadow-doubleIn",
            }

        }
            }
        )
    ;

    useEffect(() => {
        if (editor) {
            editor.commands.setContent(content)
        }
    }, [content])


    if (!editor) {
        return null
    }

    return (
        <>
            <EditorContent editor={editor}/>
        </>
    )
}
