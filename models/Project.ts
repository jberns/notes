import { getParentOfType, Instance, types } from "mobx-state-tree";
import { uid } from "../utils";

export interface IRootStore extends Instance<typeof RootStore> { }
export interface IProject extends Instance<typeof Project> { }
export interface IPage extends Instance<typeof Page> { }
export interface INote extends Instance<typeof Note> { }

export enum NoteType {
  note = "note",
  task = "task",

}

export const User = types.model({
  id: types.identifier,
  username: types.string,
})

export const Note = types.model({
  id: types.identifier,
  text: types.optional(types.string, ""),
  tag: types.optional(types.string, "p"),
  type: types.optional(types.enumeration<NoteType>("NoteType", Object.values(NoteType)), NoteType.note)
}).actions(self => ({
  updateText(newText: string) {
    self.text = newText
  },
  updateTag(newTag: string) {
    self.tag = newTag
  },
  updateType(newType: NoteType) {
    self.type = newType
  }
}))

export const Page = types.model({
  id: types.identifier,
  name: types.string,
  icon: types.optional(types.string, ""),
  // notes_ref: types.optional(types.array(types.late(() => types.reference(Note))), []),
  notes_ref: types.optional(types.array(types.safeReference(Note, { acceptsUndefined: false })), []),

}).actions(self => ({
  addNoteRef(newNote: INote, key: number) {
    getParentOfType(self, RootStore).addNote(newNote)
    self.notes_ref.splice(key + 1, 0, newNote)
  },
  updateNoteRef(newNoteRefArray: INote[]) {
    //@ts-ignore
    self.notes_ref = newNoteRefArray
  },
  updateName(newName: string) {
    self.name = newName;
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

export const Navigation = types.model({
  isMobileSidebarOpen: types.optional(types.boolean, false)
}).actions(self => ({
  changeMobileSidebarState(isMobileSidebarOpen: boolean) {
    self.isMobileSidebarOpen = isMobileSidebarOpen
  }
}))

export const RootStore = types.model({
  projects: types.array(Project),
  notes: types.map(Note),
  navigation: Navigation
}).actions(self => ({
  addProject(project: IProject) {
    self.projects.push(project)
  },
  addNote(note: INote) {
    self.notes.put(note)
  },
  updateNote(id: string, text: string) {
    self.notes.get(id)?.updateText(text);
  },
  deleteNote(id: string) {
    self.notes.delete(id)
  },
  openMobileSidebar() {
    self.navigation.changeMobileSidebarState(true)
  },
  closeMobileSidebar() {
    self.navigation.changeMobileSidebarState(false)
  }
}))

