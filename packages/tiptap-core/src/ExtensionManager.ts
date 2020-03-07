import { keymap } from 'prosemirror-keymap'
import collect from 'collect.js'
import { Editor } from './Editor'
import Extension from './Extension'
import Node from './Node'

export default class ExtensionManager {

  extensions: (Extension | Node)[]

  constructor(extensions: (Extension | Node)[], editor: Editor) {
    this.extensions = extensions
    this.extensions.forEach(extension => {
      extension.bindEditor(editor)
      extension.created()
    })
  }

  get topNode() {
    const topNode = collect(this.extensions).firstWhere('topNode', true)

    if (topNode) {
      return topNode.name
    }
  }

  get nodes(): any {
    return collect(this.extensions)
      .where('type', 'node')
      .mapWithKeys((extension: any) => [extension.name, extension.schema])
      .all()
  }

  get marks(): any {
    return collect(this.extensions)
      .where('type', 'mark')
      .mapWithKeys((extension: any) => [extension.name, extension.schema])
      .all()
  }

  get plugins(): any {
    return collect(this.extensions)
      .flatMap(extension => extension.plugins)
      .toArray()
  }

}
