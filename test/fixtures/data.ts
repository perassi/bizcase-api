export const USERS: any[] = [{
  id: 1,
  email: 'bc@clearprism.com',
  password: 's3cr3t',
}];

export const BC_TEMPLATES: any[] = [{
  id: 1,
  userId: 1,
  name: 'test',
  description: '',
}];

export const PROC_LUTS: any[] = [{
  id: 1,
  name: 'EPM',
  proc: '',
  comment: '',
}, {
  id: 2,
  name: 'Finance',
  proc: '',
  comment: '',
}];

export const TPL_PROCESSES: any[] = [{
  id: 1,
  bcTemplateId: 1,
  procLutId: 1,
  kpiId: 1,
  meta: {},
}, {
  id: 2,
  bcTemplateId: 1,
  procLutId: 2,
  kpiId: 122,
  meta: {},
}];
