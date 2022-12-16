import * as _ from 'lodash';
import { forIn } from 'lodash';

type GenericObject = { [key: string]: string | number };

const getParams = (paramObject: GenericObject) => {
  const p = _.cloneDeep(paramObject) as Record<string, string>;
  forIn(paramObject,(key, value) => {
    p[key] = value.toString();
  });
  const params = new URLSearchParams(p);
  return params;
};

export { getParams };
