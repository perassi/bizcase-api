import * as FormulaParser from 'hot-formula-parser';
import { getKpiLibById } from './kpiLibDataService';
const Parser = FormulaParser.Parser;

export const computeFormula = async (formula: string, variables: any[], data: { [key: string]: any }) => {
  try {
    const parser = new Parser();
    if (!Array.isArray(variables)) {
      throw Error('computeFormula: variables should be an array');
    }
    variables.forEach((v: any) => parser.setVariable(v.name, data[v.name]));

    const res = parser.parse(formula);

    if (res.error) {
      throw Error(res.error);
    }
    return res.result;
  } catch (err) {
    throw err;
  }
};

/**
 * compute the kpi formula and get the value  cons and likely
 * @param kpiId string - kpi formular 3 * 3, abc * def + 3 etc
 * @param data object - key value object
 * @returns data object containing the cons and likely
 */
export const computeKpi = async (kpiId: number, data: { [key: string]: any }) => {
  try {
    if (isNaN(data.imp_fac_cons)
      || isNaN(data.imp_fac_likely)) {
      throw Error('computeKpi: imp_fac_cons and imp_fac_likely should exists and valid');
    }

    const kpiLib = await getKpiLibById(kpiId);
    if (!kpiLib) {
      throw Error('computeKpi: kpi lib not found');
    }

    let formula = kpiLib.kpi && kpiLib.kpi.formula;
    if (formula && formula.indexOf('=(') !== -1) {
      formula = formula.slice(3, formula.length - 1);
    }
    const variables = kpiLib.kpi && kpiLib.kpi.variables;

    const value = await computeFormula(formula, variables, data);

    const returnData = { ...data };
    returnData.cons = data.imp_fac_cons * value;
    returnData.likely = data.imp_fac_likely * value;

    return returnData;
  } catch (err) {
    // log and tolerate error
    console.error(err);
    return data;
  }
};
