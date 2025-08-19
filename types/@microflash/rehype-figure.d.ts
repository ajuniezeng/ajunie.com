declare module '@microflash/rehype-figure' {
  import { Root } from 'hast';
  import { Plugin } from 'unified';

  interface RehypeFigureOptions {
    className?: string;
  }

  /**
   * rehype-figure plugin wraps images with alt text in <figure> and <figcaption>.
   * @param options Optional configuration for the plugin.
   */
  const rehypeFigure: Plugin<[RehypeFigureOptions?], Root>;
  export default rehypeFigure;
}
