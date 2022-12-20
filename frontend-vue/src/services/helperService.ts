import * as _ from 'lodash';
import { forIn } from 'lodash';

type GenericObject = { [key: string]: string | number };

const getParams = (paramObject: GenericObject) => {
  const p = _.cloneDeep(paramObject) as Record<string, string>;
  forIn(paramObject,(value, key) => {
    p[key] = value.toString();
  });
  const params = new URLSearchParams(p);
  return params;
};

export { getParams };
