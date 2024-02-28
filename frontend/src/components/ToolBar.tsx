"use Client"
import {type Editor} from '@tiptap/react'
import {
    Bold,
    Heading1,
    Heading2,
    Heading3,
    Italic,
    List,
    ListOrdered,
    Minus,
    Quote,
    Strikethrough,
    Undo,
    WrapText
} from "lucide-react";
import {RiCodeBoxFill} from "react-icons/ri";


type props = {
    editor: Editor | null;
}

export function Toolbar({editor}: props) {
    if (!editor) return null;

    return (
        <div
            className={"flex flex-wrap flex-row justify-self-center content-center justify-center w-fit ml-5 p-1 items-center align-middle align-middle bg-offWhite rounded-2xl border-none w-fit h-fit text-lg"}>
            <button
                type={'button'}
                onClick={() => editor.chain().focus().toggleBold().run()}
                disabled={
                    !editor.can()
                        .chain()
                        .focus()
                        .toggleBold()
                        .run()
                }
                className={editor.isActive('bold') ? 'is-active' : ''}
            >
                <Bold
                    className="bg-offWhite rounded-l border-none p-1 m-1 active:shadow-hashtagbuttonOut hover:shadow-hashtagbuttonOut shadow-hashtagbutton"
                    size={24}/>
            </button>
            <button
                type={'button'}
                onClick={() => editor.chain().focus().toggleItalic().run()}
                disabled={
                    !editor.can()
                        .chain()
                        .focus()
                        .toggleItalic()
                        .run()
                }
                className={editor.isActive('italic') ? 'is-active' : ''}
            >
                <Italic
                    className="bg-offWhite rounded-l border-none p-1 m-1 active:shadow-hashtagbuttonOut hover:shadow-hashtagbuttonOut shadow-hashtagbutton"
                    size={24}/>
            </button>
            <button
                type={'button'}
                onClick={() => editor.chain().focus().toggleStrike().run()}
                disabled={
                    !editor.can()
                        .chain()
                        .focus()
                        .toggleStrike()
                        .run()
                }
                className={editor.isActive('strike') ? 'is-active' : ''}
            >
                <Strikethrough
                    className="bg-offWhite rounded-l border-none p-1 m-1 active:shadow-hashtagbuttonOut hover:shadow-hashtagbuttonOut shadow-hashtagbutton"
                    size={24}/>
            </button>
            <button
                type={'button'}
                onClick={() => editor.chain().focus().toggleCode().run()}
                disabled={
                    !editor.can()
                        .chain()
                        .focus()
                        .toggleCode()
                        .run()
                }
                className={editor.isActive('code') ? 'is-active' : ''}
            >
                <RiCodeBoxFill
                    className="bg-offWhite rounded-l border-none p-1 m-1 active:shadow-hashtagbuttonOut hover:shadow-hashtagbuttonOut shadow-hashtagbutton"
                    size={24}/>
            </button>

            <button
                type={'button'}
                onClick={() => editor.chain().focus().toggleHeading({level: 1}).run()}
                className={editor.isActive('heading', {level: 1}) ? 'is-active' : ''}
            >
                <Heading1
                    className="bg-offWhite rounded-l border-none p-1 m-1 active:shadow-hashtagbuttonOut hover:shadow-hashtagbuttonOut shadow-hashtagbutton"
                    size={24}/>
            </button>
            <button
                type={'button'}
                onClick={() => editor.chain().focus().toggleHeading({level: 2}).run()}
                className={editor.isActive('heading', {level: 2}) ? 'is-active' : ''}
            >
                <Heading2
                    className="bg-offWhite rounded-l border-none p-1 m-1 active:shadow-hashtagbuttonOut hover:shadow-hashtagbuttonOut shadow-hashtagbutton"
                    size={24}/>
            </button>
            <button
                type={'button'}
                onClick={() => editor.chain().focus().toggleHeading({level: 3}).run()}
                className={editor.isActive('heading', {level: 3, id: "EditorButton"}) ? 'is-active' : ''}
            >
                <Heading3
                    className="bg-offWhite rounded-l border-none p-1 m-1 active:shadow-hashtagbuttonOut hover:shadow-hashtagbuttonOut shadow-hashtagbutton"
                    size={24}/>
            </button>
            <button
                type={'button'}
                onClick={() => editor.chain().focus().toggleBulletList().run()}
                className={editor.isActive('bulletList') ? 'is-active' : ''}
            >
                <List
                    className="bg-offWhite rounded-l border-none p-1 m-1 active:shadow-hashtagbuttonOut hover:shadow-hashtagbuttonOut shadow-hashtagbutton"
                    size={24}/>
            </button>
            <button
                type={'button'}
                onClick={() => editor.chain().focus().toggleOrderedList().run()}
                className={editor.isActive('orderedList') ? 'is-active' : ''}
            >
                <ListOrdered
                    className="bg-offWhite rounded-l border-none p-1 m-1 active:shadow-hashtagbuttonOut hover:shadow-hashtagbuttonOut shadow-hashtagbutton"
                    size={24}/>
            </button>

            <button
                type={'button'}
                onClick={() => editor.chain().focus().toggleBlockquote().run()}
                className={editor.isActive('blockquote') ? 'is-active' : ''}
            >
                <Quote
                    className="bg-offWhite rounded-l border-none p-1 m-1 active:shadow-hashtagbuttonOut hover:shadow-hashtagbuttonOut shadow-hashtagbutton"
                    size={24}/>
            </button>
            <button
                type={'button'}
                onClick={() => editor.chain().focus().setHorizontalRule().run()}>
                <Minus
                    className="bg-offWhite rounded-l border-none p-1 m-1 active:shadow-hashtagbuttonOut hover:shadow-hashtagbuttonOut shadow-hashtagbutton"
                    size={24}/>
            </button>
            <button
                type={'button'}
                onClick={() => editor.chain().focus().setHardBreak().run()}>
                <WrapText
                    className="bg-offWhite rounded-l border-none p-1 m-1 active:shadow-hashtagbuttonOut hover:shadow-hashtagbuttonOut shadow-hashtagbutton"
                    size={24}/>
            </button>
            <button
                type={'button'}
                onClick={() => editor.chain().focus().undo().run()}
                disabled={
                    !editor.can()
                        .chain()
                        .focus()
                        .undo()
                        .run()
                }
            >
                <Undo
                    className="bg-offWhite rounded-l border-none p-1 m-1 active:shadow-hashtagbuttonOut hover:shadow-hashtagbuttonOut shadow-hashtagbutton"
                    size={24}/>
            </button>
        </div>

    )

}