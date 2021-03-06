import { AttrState, createElement, createTextNode, Form, FormItem, FormRadio, FormTextField } from '../../uikit/_api';
import { MediaMatcher } from '../matcher/media.matcher';
import { ImageComponent, PreComponent } from '../../components/_api';
import { ImageCommander } from '../commands/image.commander';
import { FormToolConfig, Toolkit } from '../toolkit/_api';

class MarginSetter implements FormItem {
  name = 'margin';
  elementRef: HTMLElement;

  private inputs: HTMLInputElement[] = [];

  constructor() {
    this.elementRef = createElement('div', {
      classes: ['textbus-form-group'],
      children: [
        createElement('label', {
          classes: ['textbus-control-label'],
          children: [
            createTextNode('边距设置')
          ]
        }),
        createElement('div', {
          classes: ['textbus-control-static'],
          children: [
            createElement('div', {
              classes: ['textbus-toolbar-image-margin-setter'],
              children: Array.from({length: 4}).fill(null).map(() => createElement('input', {
                attrs: {
                  type: 'text',
                  value: '0'
                },
                classes: ['textbus-form-control']
              }))
            })
          ]
        })
      ]
    });
    this.inputs = Array.from(this.elementRef.querySelectorAll('input'));
  }

  reset() {
    this.inputs.forEach(input => input.value = '');
  }

  update(value?: any): void {
    this.reset();
    if (value) {
      const vars = (value + '').split(/\s+/g);
      vars.forEach((v, index) => {
        this.inputs[index].value = v;
      });
    }
  }

  getAttr(): AttrState {
    return {
      name: this.name,
      value: this.inputs.map(input => {
        if (Number(input.value)) {
          return input.value + 'px';
        }
        return input.value || '0'
      }).join(' ')
    }
  }

  validate() {
    return true;
  }
}

export const imageToolConfig: FormToolConfig = {
  iconClasses: ['textbus-icon-image'],
  tooltip: '图片',
  menuFactory() {
    return new Form({
      title: '图片设置',
      items: [
        new FormTextField({
          label: '图片链接地址',
          name: 'src',
          placeholder: '请输入链接地址',
          canUpload: true,
          uploadType: 'image',
          uploadBtnText: '上传新图片',
          validateFn(value: string): string | null {
            if (!value) {
              return '必填项不能为空';
            }
            return null;
          }
        }),
        new FormTextField({
          label: '图片宽度',
          name: 'width',
          placeholder: '支持任意 CSS 单位',
          value: '100%'
        }),
        new FormTextField({
          label: '图片高度',
          name: 'height',
          placeholder: '支持任意 CSS 单位',
          value: 'auto'
        }),
        new FormRadio({
          label: '（可选）浮动',
          name: 'float',
          values: [{
            label: '默认',
            value: 'none',
            default: true
          }, {
            label: '左边',
            value: 'left'
          }, {
            label: '右边',
            value: 'right'
          }]
        }),
        new MarginSetter()
      ]
    })
  },
  matcher: new MediaMatcher(ImageComponent, 'img', [PreComponent]),
  commanderFactory() {
    return new ImageCommander();
  }
};
export const imageTool = Toolkit.makeFormTool(imageToolConfig);
