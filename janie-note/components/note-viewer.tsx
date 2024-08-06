"use client"

import { supabase } from "@/utils/supabase";
import {useEffect, useState} from "react";

export default function NoteViewer({note, setActiveNoteId, fetchNotes}) {
    const [title, setTitle] = useState(note?.title);
    const [content, setContent] = useState(note?.content);
    const [isEditing, setIsEditing] = useState(false);

    const onEdit = async () => {
        const { data, error } = await supabase.from('note').update({title, content,}).eq('id', note.id);

        if (error) {
            alert(error.message);
            return;
        }
        setIsEditing(false);
        fetchNotes();
    };

    const onDelete = async () => {
        const { data, error } = await supabase.from('note').delete().eq('id', note.id);

        if (error) {
            alert(error.message);
            return;
        }
        setIsEditing(false);
        setActiveNoteId(null);
        fetchNotes();
    };


    useEffect(()=> {
        setTitle(note?.title);
        setContent(note?.content);
        setIsEditing(false);
    }, [note])

    return (
        <div className="bg-white">
            <div className="flex flex-col p-4 gap-2 bg-white">
                {
                    isEditing ? (
                        <>
                            <div className="font-bold">제목</div>
                            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} title="text"
                                   className="border border-grey-200 p-2 mb-4" placeholder="제목을 입력해주세요."/>
                            <div className="font-bold">내용</div>
                            <textarea value={content} onChange={(e) => setContent(e.target.value)} title="textarea"
                                      className="border border-grey-200 p-2 grow"
                                      placeholder="내용을 입력해주세요."></textarea>
                        </>
                    ) : (
                        <>
                            <div className="font-bold">제목</div>
                            <h1 className="p-2 mb-4">{title}</h1>
                            <div className="font-bold">내용</div>
                            <p className="p-2 grow">{content}</p>
                        </>
                    )
                }
                <div className="w-full flex justify-items-end gap-2">
                    {
                        isEditing ? (
                            <>
                                <button onClick={() => onEdit()} className="w-100 grow border border-grey-200 p-2 rounded font-bold">저장</button>
                                <button onClick={() => onDelete()} className="w-100 grow border border-grey-200 p-2 rounded font-bold">삭제</button>
                            </>
                        ) : (
                            <>
                                <button onClick={() => setIsEditing(true)} className="w-100 grow border border-grey-200 p-2 rounded font-bold">수정</button>
                            </>
                        )
                    }
                </div>
            </div>
        </div>
    );
}