declare module "react-responsive-masonry" {
  import * as React from "react";

  export interface ResponsiveMasonryProps {
    children?: React.ReactNode;
    columnsCountBreakPoints?: { [key: number]: number };
    gutterBreakPoints?: { [key: number]: string };
    className?: string;
    style?: React.CSSProperties;
  }

  export interface MasonryProps {
    children?: React.ReactNode;
    columnsCount?: number;
    gutter?: string;
    className?: string;
    style?: React.CSSProperties;
    containerTag?: string;
    itemTag?: string;
    itemStyle?: React.CSSProperties;
    sequential?: boolean;
  }

  export class ResponsiveMasonry extends React.Component<ResponsiveMasonryProps> {}
  export default class Masonry extends React.Component<MasonryProps> {}
}
