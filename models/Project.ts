import { getParentOfType, Instance, types } from "mobx-state-tree";
import { uid } from "../utils/utils";

export interface IRootStore extends Instance<typeof RootStore> { }
export interface IProject extends Instance<typeof Project> { }
export interface IPage extends Instance<typeof Page> { }
export interface INote extends Instance<typeof Note> { }

export const User = types.model({
  id: types.identifier,
  username: types.string,
})

export const Note = types.model({
  id: types.identifier,
  text: types.optional(types.string, ""),
  tag: types.optional(types.string, "p")
}).actions(self => ({
  updateText(newText: string) {
    self.text = newText
  }
}))

export const Page = types.model({
  id: types.identifier,
  name: types.string,
  icon: types.optional(types.string, ""),
  notes_ref: types.optional(types.array(types.late(() => types.reference(Note))), []),
  // notes: types.optional(types.array(Note), () => {
  //   const id = uid();
  //   return [{ id: id, text: "👋 Hey!", tag: "p" }]
  // })
}).actions(self => ({
  // addNote(newNote: INote) {
  //   self.notes.push(newNote)
  // },
  addNoteRef(newNote: INote, key: number) {
    getParentOfType(self, RootStore).addNote(newNote)
    self.notes_ref.splice(key + 1, 0, newNote)
  }
}))

export const Project = types.model({
  id: types.identifier,
  name: types.string,
  icon: types.optional(types.string, ""),
  pages: types.optional(types.array(Page), [])
}).actions(self => ({
  changeName(newName: string) {
    self.name = newName
  },
  addPage(newPage: IPage) {
    self.pages.push(newPage)
  }
}))

export const RootStore = types.model({
  projects: types.array(Project),
  notes: types.map(Note)
}).actions(self => ({
  addProject(project: IProject) {
    self.projects.push(project)
  },
  addNote(note: INote) {
    self.notes.put(note)
  },
  updateNote(id: string, text: string) {
    self.notes.get(id)?.updateText(text);
  }
}))

