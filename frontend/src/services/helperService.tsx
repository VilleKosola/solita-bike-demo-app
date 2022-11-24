import * as _ from 'lodash'

const getParams = (paramObject: any) => {
    const p = _.cloneDeep(paramObject);
    Object.keys(paramObject).forEach(key => {
        p[key] = paramObject[key].toString();
    })
    const params = new URLSearchParams(p);
    return params;
}

export { getParams };