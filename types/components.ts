
// Строгие типы для компонентов
export interface StrictComponentProps {
  readonly className?: string;
  readonly children?: React.ReactNode;
  readonly 'data-testid'?: string;
}

export interface ProjectCardProps extends StrictComponentProps {
  readonly project: {
    readonly id: string;
    readonly title: string;
    readonly description: string;
    readonly image: string;
    readonly url: string;
    readonly tags: readonly string[];
    readonly featured: boolean;
    readonly createdAt: string;
  };
  readonly onImageLoad?: () => void;
  readonly onError?: (error: Error) => void;
}

// Утилитарные типы
export type DeepReadonly<T> = {
  readonly [P in keyof T]: T[P] extends object ? DeepReadonly<T[P]> : T[P];
};

export type NonEmptyArray<T> = [T, ...T[]];
