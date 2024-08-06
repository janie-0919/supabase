"use client"

import { supabase } from "@/utils/supabase";
import {useState} from "react";

export default function NewNote({setIsCreating, setActiveNoteId, fetchNotes}) {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const onSave = async () => {
        // note 저장하기
        if (!title || !content) {
            alert('제목과 내용을 입력해주세요');
            return;
        }

        const { data, error } = await supabase.from('note').insert({title, content})

        if (error) {
            alert(error.message);
            return;
        }

        await fetchNotes();
        setActiveNoteId((data as unknown as any[])[0].id);
        setIsCreating(false);
    }

    return (
       <div className="bg-white">
           <div className="flex flex-col p-4 gap-2 bg-white">
               <div className="font-bold">제목</div>
               <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} title="text" className="border border-grey-200 p-2 mb-4" placeholder="제목을 입력해주세요."/>
               <div className="font-bold">내용</div>
               <textarea value={content} onChange={(e) => setContent(e.target.value)} title="textarea" className="border border-grey-200 p-2 grow" placeholder="내용을 입력해주세요."></textarea>
               <div className="w-full flex justify-items-end">
                   <button className="w-100 grow border border-grey-200 p-2 rounded font-bold" onClick={()=>onSave()}>저장</button>
               </div>
           </div>
       </div>
    );
}