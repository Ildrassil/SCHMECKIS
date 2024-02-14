"use Client"
import {type Editor} from '@tiptap/react'
import {Bold, Heading2, Italic, List, ListOrdered} from "lucide-react";

type props = {
    editor: Editor | null;
}

export function Toolbar({editor}: props) {
    if (!editor) return null;

    return (
        <div className="border-none p4 shadow-doubleIn bg-transparent my-4 rounded">
            <button className="active:shadow-hashtagbuttonOut" type={"button"}
                    onClick={() => editor.chain().focus().toggleBold().run()}><Bold size={24} color="#646464"/></button>
            <button className="active:shadow-hashtagbuttonOut" type={"button"}
                    onClick={() => editor.chain().focus().toggleItalic().run()}><Italic size={24} color="#646464"/>
            </button>
            <button className="active:shadow-hashtagbuttonOut" type={"button"}
                    onClick={() => editor.chain().focus().toggleHeading({level: 2}).run()}><Heading2 size={24}
                                                                                                     color="#646464"/>
            </button>
            <button className="active:shadow-hashtagbuttonOut" type={"button"}
                    onClick={() => editor.chain().focus().toggleBulletList().run()}><List size={24} color="#646464"/>
            </button>
            <button className="active:shadow-hashtagbuttonOut" type={"button"}
                    onClick={() => editor.chain().focus().toggleOrderedList().run()}><ListOrdered size={24}
                                                                                                  color="#646464"/>
            </button>

        </div>
    )

}