import {ExelComponent} from '../../core/ExelComponent';
import {createTable} from './table.template';
import {resizehandler} from './table.resize';
import {shouldResize} from './table.functions';

export class Table extends ExelComponent {
  static className = 'excel__table'
  constructor($root) {
    super($root, {
      listeners: ['mousedown'],
    });
  }
  toHTML() {
    return createTable(35)
  }

  onMousedown(event) {
    if (shouldResize(event)) {
      resizehandler(this.$root, event)
    }
  }
}
