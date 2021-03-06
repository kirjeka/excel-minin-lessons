import {$} from '../../core/dom';

export function resizehandler($root, event) {
  const $resizer = $(event.target)
  // const $parent = $resizer.$el.parentNode  bad! htmlDOm in future destroy
  // const $parent = $resizer.$el.closest('.column') better but bad
  const $parent = $resizer.closest('[data-type="resizeble"]')
  const cords = $parent.getCords()
  const type = $resizer.data.resize
  const sideProp = type === 'col' ? 'bottom' : 'right'
  let value

  $resizer.css(
      {
        opacity: 1,
        zIndex: 1000,
        [sideProp]: '-5000px',
      }
  )

  // const cells = this.$root.findAll(`[data-col="${$parent.data.col}"]`);

  document.onmousemove = e => {
    if (type === 'col') {
      const delta = e.pageX - cords.right
      value = cords.width + delta
      $resizer.css({right: -delta + 'px'})
      // $parent.css({width: value + 'px'})
      // cells.forEach(el => el.style.width = value + 'px')
    } else {
      const delta = e.pageY - cords.bottom
      value = cords.height + delta
      $resizer.css({bottom: -delta + 'px'})

      // $parent.css({height: value + 'px'})
    }
  }
  document.onmouseup = () => {
    document.onmousemove = null
    document.onmouseup = null
    if (type === 'col') {
      $parent.css({width: value + 'px'})
      $root.findAll(`[data-col="${$parent.data.col}"]`)
          .forEach(el => el.style.width = value + 'px')
    } else {
      $parent.css({height: value + 'px'})
    }


    $resizer.css(
        {
          opacity: 0,
          bottom: 0,
          right: 0,
        }
    )
  }
}
