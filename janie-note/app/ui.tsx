"use client"

import Header from "@/components/header";
import NewNote from "@/components/new-note";
import NoteViewer from "@/components/note-viewer";
import EmptyNote from "@/components/empty-note";
import Sidebar from "@/components/sidebar";
import { useEffect, useState } from "react";
import { supabase } from "@/utils/supabase";
import { Database } from "@/types_db";

// const notes = [
//     {
//         id: 1,
//         title: "First note",
//         content: "First content"
//     },
//     {
//         id: 2,
//         title: "Second note",
//         content: "Second content"
//     },
// ]

export default function UI() {
    const [activeNoteId, setActiveNoteId] = useState(null);
    const [isCreating, setIsCreating] = useState(false);
    const [notes, setNotes] = useState<Database['public']['Tables']['note']['Row'][]>([]);
    const [search, setSearch] = useState('');

    const fetchNotes = async () => {
        const { data, error } = await supabase.from('note').select('*').ilike('title', `%${search}%`);
        if(error) {
            alert(error.message);
            return
        }
        setNotes(data);
    };

    useEffect(()=>{
        // supabase.from('note').select('*').then(console.log);
        fetchNotes()
    },[])

    useEffect(() => {
        fetchNotes();
    }, [search]);

    return (
        <main className="h-screen w-full flex flex-col">
            <Header/>
            <div className="grow relative">
                {/*  Sidebar  */}
                <Sidebar notes={notes} setIsCreating={setIsCreating} setActiveNoteId={setActiveNoteId} activeNoteId={activeNoteId} search={search} setSearch={setSearch} />
                <div className="w-2/3 absolute top-0 bottom-0 right-0 bg-neutral-50">
                    {
                        isCreating ?
                            <NewNote setIsCreating={setIsCreating} fetchNotes={fetchNotes} setActiveNoteId={setActiveNoteId}/> :
                            activeNoteId ?
                                <NoteViewer note={notes.find(note => note.id === activeNoteId)} setActiveNoteId={setActiveNoteId} fetchNotes={fetchNotes}/> :
                                <EmptyNote/>
                    }
                </div>
            </div>
        </main>
    );
}