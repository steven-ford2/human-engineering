import { createProject, normalizeProject, WORKBENCH_STORAGE_KEY, LEGACY_WORKBENCH_STORAGE_KEY } from './workbench-model.js';

const HISTORY_LIMIT = 40;

function clone(value) { return JSON.parse(JSON.stringify(value)); }

export class WorkbenchStore {
  constructor(storage = globalThis.localStorage) {
    this.storage = storage;
    this.undoStack = [];
    this.redoStack = [];
    this.project = this.load();
    this.listeners = new Set();
  }

  load() {
    try {
      const current = this.storage?.getItem(WORKBENCH_STORAGE_KEY);
      if (current) return normalizeProject(JSON.parse(current));
      const legacy = this.storage?.getItem(LEGACY_WORKBENCH_STORAGE_KEY);
      if (legacy) {
        const project = normalizeProject(JSON.parse(legacy));
        this.storage?.setItem(WORKBENCH_STORAGE_KEY, JSON.stringify(project));
        return project;
      }
    } catch {}
    return createProject();
  }

  subscribe(listener) { this.listeners.add(listener); return () => this.listeners.delete(listener); }
  emit(event = 'change') { for (const listener of this.listeners) listener(this.project, event); }

  persist() {
    this.project.project.modifiedAt = new Date().toISOString();
    this.storage?.setItem(WORKBENCH_STORAGE_KEY, JSON.stringify(this.project));
  }

  transact(label, change) {
    this.undoStack.push(clone(this.project));
    if (this.undoStack.length > HISTORY_LIMIT) this.undoStack.shift();
    this.redoStack = [];
    change(this.project);
    this.project.activity ??= [];
    this.project.activity.push({ at: new Date().toISOString(), action: 'updated', detail: label });
    this.project.activity = this.project.activity.slice(-100);
    this.persist();
    this.emit(label);
  }

  replace(project, label = 'Imported project') {
    this.transact(label, () => { this.project = normalizeProject(project); });
  }

  undo() {
    if (!this.undoStack.length) return false;
    this.redoStack.push(clone(this.project));
    this.project = this.undoStack.pop();
    this.persist(); this.emit('undo'); return true;
  }

  redo() {
    if (!this.redoStack.length) return false;
    this.undoStack.push(clone(this.project));
    this.project = this.redoStack.pop();
    this.persist(); this.emit('redo'); return true;
  }

  canUndo() { return this.undoStack.length > 0; }
  canRedo() { return this.redoStack.length > 0; }
}

export { clone };
