import type { ComponentPublicInstance, FunctionalComponent, PropType as VuePropType, VNodeChild } from 'vue';

/// <reference types="vite/client" />
declare global {
    // 此处 重新定义 ImportMeta 避免 ts 类型报错
    // 目前框架只用到 env 和 glob
    interface ImportMeta {
        env: Record<string, string>;
        glob: Record<function>;
    }

    // TODO 此处需要根据项目实际需要调整
    declare interface ViteEnv {
        VITE_PORT: number;
        VITE_GLOB_PUBLIC_PATH: string;
        VITE_GLOB_APP_TITLE: string;
        VITE_GLOB_APP_SHORT_NAME: string;
        VITE_DROP_CONSOLE: boolean;
        VITE_GLOB_IMG_URL: string;
        VITE_PROXY: [string, string][];
        VITE_GLOB_API_URL: string;
        VITE_GLOB_API_PREFIX: string;
        VITE_GLOB_UPLOAD_URI: string;
        VITE_TOKEN_KEY: string;
        VITE_TOKEN_PREFIX: string;
    }

    interface ImportMetaEnv extends ViteEnv {
        __: unknown;
    }

    // vue
    declare type PropType<T> = VuePropType<T>;
    declare type VueNode = VNodeChild | JSX.Element;

    export type Writable<T> = {
        -readonly [P in keyof T]: T[P];
    };

    declare type Nullable<T> = T | null;
    declare type NonNullable<T> = T extends null | undefined ? never : T;
    declare type Recordable<T = any> = Record<string, T>;
    declare type ReadonlyRecordable<T = any> = {
        readonly [key: string]: T;
    };
    declare type Indexable<T = any> = {
        [key: string]: T;
    };
    declare type DeepPartial<T> = {
        [P in keyof T]?: DeepPartial<T[P]>;
    };
    declare type TimeoutHandle = ReturnType<typeof setTimeout>;
    declare type IntervalHandle = ReturnType<typeof setInterval>;

    declare type Placement = 'left' | 'right' | 'top' | 'bottom';

    declare interface ChangeEvent extends Event {
        target: HTMLInputElement;
    }

    declare interface WheelEvent {
        path?: EventTarget[];
    }

    declare function parseInt(s: string | number, radix?: number): number;

    declare function parseFloat(string: string | number): number;

    namespace JSX {
        // tslint:disable no-empty-interface
        type Element = VNode;
        // tslint:disable no-empty-interface
        type ElementClass = ComponentRenderProxy;

        interface ElementAttributesProperty {
            $props: any;
        }

        interface IntrinsicElements {
            [elem: string]: any;
        }

        interface IntrinsicAttributes {
            [elem: string]: any;
        }
    }
}

declare module 'vue' {
    export type JSXComponent<Props = any> =
        | { new(): ComponentPublicInstance<Props> }
        | FunctionalComponent<Props>;
}