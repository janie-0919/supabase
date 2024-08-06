"use client"

export default function Sidebar({ notes, setIsCreating ,setActiveNoteId, activeNoteId, search, setSearch }) {
    return (
        <aside className="absolute top-0 left-0 bottom-0 h-full z-10 overflow-y-auto w-1/3 p-3 border-r">
            <button onClick={() => setIsCreating(true)}
                    className="p-2 text-lg font-bold border border-pink-300 rounded-lg w-full mb-2">새로운 노트 ➕
            </button>
            <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="노트를 검색해보세요" className="w-full p-2 border rounded-md border-gray-300 my-2"/>
            <ul className="flex flex-col gap-2">
                {notes.map(note => (
                    <li key={note.id}>
                        <button className={`${activeNoteId === note.id ? 'font-bold' : ''}`} onClick={() => {
                            setActiveNoteId(note.id);
                            setIsCreating(false)
                        }}>{note.title}</button>
                    </li>
                ))}
            </ul>
        </aside>
    );
}