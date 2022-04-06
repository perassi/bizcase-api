
import {
  Connection,
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
  UpdateEvent,
} from 'typeorm';
import { Process } from '../entities';
import { KpiLibService } from 'modules/kpi/services';
import * as FormulaParser from 'hot-formula-parser';
const Parser = FormulaParser.Parser;

@EventSubscriber()
export class ProcessSubscriber implements EntitySubscriberInterface<Process> {
  constructor(connection: Connection,
              private readonly kpiLibService: KpiLibService) {
    connection.subscribers.push(this);
  }

  listenTo() {
    return Process;
  }

  async beforeInsert(event: InsertEvent<Process>) {
    await this.addKpiData(event.entity);
  }

  async beforeUpdate(event: UpdateEvent<Process>) {
    await this.addKpiData(event.entity);
  }

  async addKpiData(currentEntity: Process) {
    if (!currentEntity.kpiId || !currentEntity.data) {
      return ;
    }

    try {
      if (isNaN(currentEntity.data.imp_fac_cons)
        || isNaN(currentEntity.data.imp_fac_likely)) {
        throw Error('computeKpi: imp_fac_cons and imp_fac_likely should exists and valid');
      }

      const kpiLib = await this.kpiLibService.findOneById(currentEntity.kpiId);
      if (!kpiLib) {
        throw Error('computeKpi: kpi lib not found');
      }

      let formula = kpiLib.kpi && kpiLib.kpi.formula;
      if (formula && formula.indexOf('=(') !== -1) {
        formula = formula.slice(3, formula.length - 1);
      }
      const variables = kpiLib.kpi && kpiLib.kpi.variables;

      const value = await this.computeFormula(formula, variables, currentEntity.data);

      currentEntity.data.cons = currentEntity.data.imp_fac_cons * value;
      currentEntity.data.likely = currentEntity.data.imp_fac_likely * value;
    } catch (err) {
      console.error(err);
    }
  }

  async computeFormula(formula: string, variables: any[], data: { [key: string]: any }) {
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
  }
}
