/**
 * Joins jsx components in a similar way to Array.join
 * @param {Array<string | React.ReactNode>}list List of JSX components
 * @param {string | React.ReactNode} inbetween JSX component to insert in between items in the list
 * @returns {React.ReactNode} A new JSX component structure consisting of the JSX elements in the list separated by the
 * inbetween JSX element
 *
 * @example
 * Breadcrumb component
 */
const jsxJoiner = (
  list: Array<string | React.ReactNode>,
  inbetween: string | React.ReactNode,
) =>
  list.reduce((prev, cur) => (
    <>
      {prev}
      {inbetween}
      {cur}
    </>
  ));

export { jsxJoiner };
export default jsxJoiner;
