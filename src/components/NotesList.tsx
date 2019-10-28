import React from 'react';
import { addNote } from '../services/addNote';
import { getNotes, useNotesList } from '../hooks/useNotesList';
import { TripleSubject, TripleDocument } from 'tripledoc';
import { schema } from 'rdf-namespaces';
import { Note } from './Note';

export const NotesList: React.FC = () => {
  const notesList = useNotesList();
  const [formContent, setFormContent] = React.useState('');
  const [updatedNotesList, setUpdatedNotesList] = React.useState<TripleDocument>();

  if (!notesList) {
    return null;
  }
  const notes = getNotes(updatedNotesList || notesList);

  async function saveNote(event: React.FormEvent) {
    event.preventDefault();
    if (!notesList) {
      return;
    }
    const updatedDoc = await addNote(formContent, notesList);
    setUpdatedNotesList(updatedDoc);
    setFormContent('');
  }

  async function editNote(content: string, note: TripleSubject) {
    const notesDocument = updatedNotesList || notesList;
    if (!notesDocument) {
      return;
    }

    note.setLiteral(schema.text, content);
    note.setLiteral(schema.dateModified, new Date(Date.now()));
    const updatedDoc = await notesDocument.save();
    setUpdatedNotesList(updatedDoc);
    return updatedDoc.getSubject(note.asRef());
  }

  const noteElements = notes.sort(byDate).map((note) => (
    <Note
      key={note.asRef()}
      note={note}
      onChange={(updatedContent) => editNote(updatedContent, note)}
    />
  ));

  return (
    <>
      <section className="section">
        <form onSubmit={saveNote}>
          <div className="field">
            <div className="control">
              <textarea
                onChange={(e) => { e.preventDefault(); setFormContent(e.target.value); }}
                name="note"
                id="note"
                className="textarea"
                value={formContent}
              />
            </div>
          </div>
          <div className="field">
            <div className="control">
              <button type="submit" className="button is-primary">Add note</button>
            </div>
          </div>
        </form>
      </section>
      <section className="section">
        {noteElements}
      </section>
    </>
  );
};

function byDate(note1: TripleSubject, note2: TripleSubject): number {
  const date1 = note1.getDateTime(schema.dateCreated);
  const date2 = note2.getDateTime(schema.dateCreated);
  if (!(date1 instanceof Date) || !(date2 instanceof Date)) {
    return 0;
  }

  return date2.getTime() - date1.getTime();
}
