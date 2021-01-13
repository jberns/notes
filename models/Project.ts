import { types, Instance } from "mobx-state-tree"

export interface IRootStore extends Instance<typeof RootStore> { }

const Project = types.model({
  id: types.identifier,
  name: types.string,
  icon: types.optional(types.string, ""),
}).actions(self => ({
  changeName(newName: string) {
    self.name = newName
  }
}))

export const RootStore = types.model({
  projects: types.map(Project)
})

