import { Instance, types } from "mobx-state-tree";
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
  notes: types.optional(types.map(Note), () => {
    const id = uid();
    return { [id]: { id: id, text: "", tag: "p" } }
  })
}).actions(self => ({
  addNote(newNote: INote) {
    self.notes.put(newNote)
  }
}))

export const Project = types.model({
  id: types.identifier,
  name: types.string,
  icon: types.optional(types.string, ""),
  pages: types.optional(types.map(Page), {})
}).actions(self => ({
  changeName(newName: string) {
    self.name = newName
  },
  addPage(newPage: IPage) {
    self.pages.put(newPage)
  }
}))

export const RootStore = types.model({
  projects: types.map(Project)
}).actions(self => ({
  addProject(project: IProject) {
    self.projects.put(project)
  }
}))

