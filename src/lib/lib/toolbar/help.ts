import { Observable } from 'rxjs';

import { Commander, FormatAbstractData, MediaTemplate, Template, Renderer, TBSelection } from '../core/_api';
import { Matcher } from './matcher/matcher';
import { DropdownHandlerView } from './handlers/utils/dropdown';
import { Keymap } from '../viewer/input';
import { Tool } from './handlers/help';

/**
 * 工具条控件的显示状态
 */
export enum HighlightState {
  Highlight = 'Highlight',
  Normal = 'Normal',
  Disabled = 'Disabled'
}

/**
 * 工具条工具类型
 */
export enum ToolType {
  Button,
  Select,
  Dropdown,
  ActionSheet
}

export interface ContextMenuConfig {
  classes?: string[];
  label?: string;
  displayNeedMatch?: boolean;
  action?: (renderer: Renderer, selection: TBSelection, tool: Tool) => void;
}

/**
 * 按扭型工具的配置接口
 */
export interface ButtonConfig {
  type: ToolType.Button;
  /** 按扭控件点击后调用的命令 */
  execCommand: Commander;
  /** 设置上下文菜单 */
  contextMenu?: ContextMenuConfig[];
  /** 锚中节点的的匹配项配置 */
  match?: Matcher;
  /** 设置按扭显示的文字 */
  label?: string;
  /** 给按扭控件添加一组 css class 类 */
  classes?: string[];
  /** 当鼠标放在控件上的提示文字 */
  tooltip?: string;
  /** 当前按扭控件的快捷键配置 */
  keymap?: Keymap;
}

/**
 * Select 工具选项配置项
 */
export interface SelectOptionConfig {
  /** 当前选项被选中后，要应用的值 */
  value: any;
  /** 当前选项显示的文字，如为空则显示 value */
  label?: string;
  /** 给当前选项添加一组 css class 类 */
  classes?: string[];
  /** 当所有选项都未锚中时，显示的默认项 */
  default?: boolean;
  /** 当前选项应用的快捷键 */
  keymap?: Keymap;
}

export interface SelectConfig {
  type: ToolType.Select;
  /** 当前 Select 某项点击后，应用的命令 */
  execCommand: Commander;
  /** Select 的可选项配置 */
  options: SelectOptionConfig[];

  /** 根据当前匹配的抽象数据，返回要高亮的选项 */
  highlight(options: SelectOptionConfig[], data: FormatAbstractData | Template | MediaTemplate): SelectOptionConfig;

  /** 设置上下文菜单 */
  contextMenu?: ContextMenuConfig[];

  /** 锚中节点的的匹配项配置 */
  match?: Matcher;
  /** 给 Select 控件添加一组 css class */
  classes?: string[];
  /** 设置当前 Select 是否根据内容扩展宽度 */
  mini?: boolean;
  /** 当鼠标放在控件上的提示文字 */
  tooltip?: string;
}

export interface DropdownConfig {
  type: ToolType.Dropdown;
  /** 下拉控件展开后显示的内容 */
  viewer: DropdownHandlerView;
  /** 订阅下拉控件操作完成时的观察者 */
  onHide: Observable<any>;
  /** 锚中节点的的匹配项配置 */
  match?: Matcher;
  /** 订阅下拉控件操作完成时调用的命令 */
  execCommand: Commander;
  /** 设置上下文菜单 */
  contextMenu?: Array<ContextMenuConfig>;
  /** 给当前控件添加一组 css class */
  classes?: string[];
  /** 当鼠标放在控件上的提示文字 */
  tooltip?: string;
  /** 设置控件显示的文字 */
  label?: string;
}

export interface ActionConfig {
  /** 设置当前 action 的 value */
  value?: any;
  /** 设置当前 action 显示的文字 */
  label?: string;
  /** 给当前 action 添加一组 css class */
  classes?: string[];
  /** 给当前 action 添加一组 css class */
  keymap?: Keymap;
}

export interface ActionSheetConfig {
  type: ToolType.ActionSheet;
  /** 当前控件可操作的选项 */
  actions: ActionConfig[];
  /** 当某一项被点击时调用的命令 */
  execCommand: Commander & { actionType: any };
  /** 设置上下文菜单 */
  contextMenu?: ContextMenuConfig[];
  /** 锚中节点的的匹配项配置 */
  match?: Matcher;
  /** 设置控件显示的文字 */
  label?: string;
  /** 给当前控件添加一组 css class */
  classes?: string[];
  /** 当鼠标放在控件上的提示文字 */
  tooltip?: string;
}

export type ToolConfig = ButtonConfig | SelectConfig | DropdownConfig | ActionSheetConfig;

export interface EventDelegate {
  dispatchEvent(type: string): Observable<string>
}
