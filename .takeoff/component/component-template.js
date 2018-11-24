const { kebabCase, pascalCase } = require("../__helpers.js");

module.exports = name => `
import React from "react";
import cn from "classnames";

import style from "./${kebabCase(name)}.scss";

interface ${pascalCase(name)}Props {
  className?: string | Object;
  modifier?: boolean;
}

const ${pascalCase(name)} = ({ className = null, modifier = false}: ${pascalCase(name)}Props) => (
  <div className={cn(style.root, { [style.modifier]: modifier }, className)}>
    <div className={style.someElement}>${pascalCase(name)}</div>
  </div>
);

export default ${pascalCase(name)};
`;
