import { CommandContext, Commander } from '../../core/_api';
import { ImageComponent } from '../../components/image.component';

export class ImageCommander implements Commander<Map<string, string | number | boolean>> {
  recordHistory = true;


  command(context: CommandContext, attrs: Map<string, string | number | boolean>): void {
    const fn = function (component: ImageComponent) {
      component.src = attrs.get('src') as string;
      component.width = attrs.get('width') as string;
      component.height = attrs.get('height') as string;
      component.float = attrs.get('float') as string;
      component.margin = attrs.get('margin') as string;
    }

    context.selection.ranges.forEach(range => {
      if (range.collapsed) {
        if (context.overlap) {
          const component = range.commonAncestorFragment.getContentAtIndex(range.startIndex);
          if (component instanceof ImageComponent) {
            fn(component);
          }
        } else {
          range.commonAncestorFragment.insert(new ImageComponent(attrs.get('src') as string, {
            width: attrs.get('width') as string,
            height: attrs.get('height') as string,
            float: attrs.get('float') as string,
            margin: attrs.get('margin') as string
          }), range.startIndex);
        }
      } else {
        range.getSelectedScope().forEach(scope => {
          scope.fragment.sliceContents(scope.startIndex, scope.endIndex).forEach(component => {
            if (component instanceof ImageComponent) {
              fn(component);
            }
          })
        });
      }
    })
  }
}
