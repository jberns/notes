import { types, Instance } from "mobx-state-tree"

export interface IRootStore extends Instance<typeof RootStore> { }
export interface IProject extends Instance<typeof Project> { }

export const User = types.model({
  id: types.identifier,
  username: types.string,
})

export const Note = types.model({
  id: types.identifier,
  text: types.optional(types.string, "")
})

export const Page = types.model({
  id: types.identifier,
  name: types.string,
  icon: types.optional(types.string, ""),
  notes: types.optional(types.map(Note), {})
})

export const Project = types.model({
  id: types.identifier,
  name: types.string,
  icon: types.optional(types.string, ""),
  pages: types.optional(types.map(Page), {})
}).actions(self => ({
  changeName(newName: string) {
    self.name = newName
  }
}))

export const RootStore = types.model({
  projects: types.map(Project)
}).actions(self =>({
  addProject(project: IProject){
    self.projects.put(project)
  }
}))

