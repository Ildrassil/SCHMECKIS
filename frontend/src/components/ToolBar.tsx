"use Client"
import {type Editor} from '@tiptap/react'

type props = {
    editor: Editor;
}

export function Toolbar({editor}: props) {
    if (!editor) return null;

}