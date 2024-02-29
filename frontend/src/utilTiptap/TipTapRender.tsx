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
                    // @ts-expect-error - starter kit is Libary Example
                    TextStyle.configure({types: [ListItem.name]}),
                    StarterKit.configure({
                        bulletList: {
                            HTMLAttributes: {
                                class: "list-disc"
                            },
                            keepMarks: true,
                            keepAttributes: false,
                        },
                        orderedList: {
                            HTMLAttributes: {
                                class: "list-decimal"
                            },
                            keepMarks: true,
                            keepAttributes: false,
                        },

                    }),

        ],
        editable: false,
        content: content,
        editorProps: {
            attributes: {
                class: "rounded bg-transparent border-none p-12 mx-5 my-8 min-h-[300px] prose",
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
            <EditorContent className="bg-transparent" editor={editor}/>
        </>
    )
}
