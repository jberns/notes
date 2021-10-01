import { getParentOfType, Instance, types } from "mobx-state-tree";
import { uid } from "../utils";

export interface IRootStore extends Instance<typeof RootStore> { }
export interface IProject extends Instance<typeof Project> { }
export interface IPage extends Instance<typeof Page> { }
export interface IBlock extends Instance<typeof Block> { }
export interface INote extends Instance<typeof Note> { }
export interface IUser extends Instance<typeof User> { }

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
  type: types.optional(types.enumeration<NoteType>("NoteType", Object.values(NoteType)), NoteType.note),
  complete: types.optional(types.boolean, false),
  createdOn: types.optional(types.Date, new Date()),
  assignedTo: types.maybeNull(types.string)
  // assignedTo: types.maybeNull(types.reference(User))
}).actions(self => ({
  updateText(newText: string) {
    self.text = newText
  },
  updateTag(newTag: string) {
    self.tag = newTag
  },
  updateType(newType: NoteType) {
    self.type = newType
  },
  updateAssignedTo(assignedTo: string) {
    self.assignedTo = assignedTo
  },
  updateStatus(newStatus: boolean) {
    self.complete = newStatus
  }
}))

export const Block = types.model({
  id: types.identifier,
  // content: types.safeReference(Note, { acceptsUndefined: false })
  content: types.reference(Note)
}).actions(self => ({}))

export const Page = types.model({
  id: types.identifier,
  name: types.string,
  icon: types.optional(types.string, ""),
  // notes_ref: types.optional(types.array(types.late(() => types.reference(Note))), []),
  blocks_ref: types.optional(types.array(types.safeReference(Block, { acceptsUndefined: false })), []),

}).actions(self => ({
  addNote(newNote: INote) {
    getParentOfType(self, RootStore).addNote(newNote)
  },
  addBlockRef(newBlock: IBlock, key: number) {
    getParentOfType(self, RootStore).addBlock(newBlock)
    self.blocks_ref.splice(key + 1, 0, newBlock)
  },
  updateBlockRef(newBlocksRefArray: IBlock[]) {
    //@ts-ignore
    self.blocks_ref = newBlocksRefArray
  },
  setName(newName: string) {
    self.name = newName;
  }
}))

export const Project = types.model({
  id: types.identifier,
  name: types.string,
  icon: types.optional(types.string, ""),
  pages: types.optional(types.array(Page), [])
}).actions(self => ({
  setName(newName: string) {
    self.name = newName
  },
  addPage(newPage: IPage) {
    self.pages.push(newPage)
  }
})).views(self => ({
  allTasks() {
    const filteredTasks: IBlock[] = self.pages.reduce((tasks: IBlock[], page) => {
      if (page.blocks_ref) {
        const onlyTasks = page.blocks_ref.filter((block) => {
          return block.content.type === NoteType.task
        })

        tasks.push(...onlyTasks)
      }
      return tasks
    }, [])
    return filteredTasks
  },
  openTasks() {
    const filteredTasks: IBlock[] = self.pages.reduce((tasks: IBlock[], page) => {
      if (page.blocks_ref) {
        const onlyTasks = page.blocks_ref.filter((block) => {
          return block.content.type === NoteType.task && block.content.complete === false
        })

        tasks.push(...onlyTasks)
      }
      return tasks
    }, [])
    return filteredTasks
  },
  pctComplete() {
    const all = this.allTasks().length || 0;
    console.log(all);
    const open = this.openTasks().length || 0;
    if (all > 0) {
    return (all - open) / all
    }

    return 0
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
  blocks: types.map(Block),
  notes: types.map(Note),
  navigation: Navigation,
  copiedNote: types.maybeNull(types.safeReference(Note, { acceptsUndefined: false })),
}).actions(self => ({
  addProject(project: IProject) {
    self.projects.push(project)
  },
  addBlock(block: IBlock) {
    self.blocks.put(block)
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
  },
  setCopiedNote(note: INote) {
    self.copiedNote = note
  }
})).views(self => ({
}))

